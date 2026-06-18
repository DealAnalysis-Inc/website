# Contact form backend (Google Apps Script)

`Code.gs` powers the enquiry form on the website. It is **deployed separately to
Google Apps Script — it is not served as part of the website.**

## Deploy
1. Go to https://script.google.com and create a new project.
2. Paste in the contents of `Code.gs`.
3. Deploy → **New deployment** → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the resulting **/exec** URL.
5. In `index.html`, set `CONFIG.FORM_ENDPOINT` to that URL (replace the empty string).

Until `FORM_ENDPOINT` is set, the form falls back to a `mailto:` to
info@dealanalysis.com.
