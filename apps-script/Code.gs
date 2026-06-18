/**
 * DealAnalysis — contact form backend (Google Apps Script)
 * ------------------------------------------------------------------
 * What it does on every form submission:
 *   1. Drops obvious spam silently (honeypot field + time-trap)
 *   2. Appends a timestamped row to a Google Sheet (your tracking log)
 *   3. Emails the lead to info@dealanalysis.com
 *
 * Spam protection is built in — no reCAPTCHA, no Google Cloud setup,
 * no cookies, nothing to configure. A hidden "website" field that only
 * bots fill, plus a minimum fill-time, catches the overwhelming majority
 * of automated spam at a contact-form's volume.
 *
 * SETUP (one time, ~5 minutes):
 *   1. Open the Google Sheet you want to log to (in the DealAnalysis
 *      Google/Gmail account). Extensions > Apps Script.
 *   2. Paste this file in as Code.gs. Save.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as:  Me (the DealAnalysis account)
 *        Who has access:  Anyone
 *      Copy the /exec URL it gives you.
 *   4. Paste that URL into CONFIG.FORM_ENDPOINT in the website index.html.
 *
 * The Sheet IS the database — exactly like the current site. No separate
 * database, no Google Cloud project, no API keys.
 */

var NOTIFY_TO   = 'info@dealanalysis.com';
var SHEET_NAME  = 'Leads';   // tab name; created automatically if missing
var MIN_FILL_MS = 2000;      // submissions faster than this are treated as bots

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // --- spam gate 1: honeypot ---
    // The hidden "website" field is invisible to humans. If it has a value,
    // a bot filled it. Return ok so the bot sees "success" and moves on.
    if (p.website && p.website.trim() !== '') {
      return json({ ok: true, dropped: 'honeypot' });
    }

    // --- spam gate 2: time-trap ---
    // Real people take a few seconds to fill a form; bots submit instantly.
    var elapsed = parseInt(p.elapsed, 10);
    if (!isNaN(elapsed) && elapsed < MIN_FILL_MS) {
      return json({ ok: true, dropped: 'too_fast' });
    }

    // --- append to the tracking Sheet ---
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Firm', 'Email', 'Interest', 'Message', 'Page']);
    }
    sheet.appendRow([
      new Date(), p.name || '', p.firm || '', p.email || '',
      p.interest || '', p.message || '', p.page || ''
    ]);

    // --- email notification ---
    var subject = 'New website request — ' + (p.interest || 'enquiry') + ' — ' + (p.firm || p.name || '');
    var bodyLines = [
      'A new request came in via dealanalysis.com:',
      '',
      'Name:     ' + (p.name || ''),
      'Firm:     ' + (p.firm || ''),
      'Email:    ' + (p.email || ''),
      'Interest: ' + (p.interest || ''),
      'Message:  ' + (p.message || '(none)'),
      '',
      'Page:     ' + (p.page || ''),
      'Time:     ' + new Date().toString()
    ];
    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: p.email || NOTIFY_TO,
      subject: subject,
      body: bodyLines.join('\n')
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: 'DealAnalysis contact endpoint' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
