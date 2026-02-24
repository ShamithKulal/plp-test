// Google Apps Script for Paperlight Productions Lead Sheet
// 
// SETUP INSTRUCTIONS:
// 1. Go to: https://script.google.com
// 2. Create a new project, paste this entire file's content
// 3. Click "Deploy" → "New Deployment" → "Web App"
//    - Execute as: Me
//    - Who can access: Anyone
// 4. Copy the deployed URL and paste it in .env.local as GOOGLE_SHEETS_WEBHOOK_URL

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID_HERE").getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        // Add header row if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                "Timestamp", "Name", "Phone", "Email", "Event Type",
                "Event Date", "Location", "Message",
                "UTM Source", "UTM Medium", "UTM Campaign", "Referrer URL"
            ]);
        }

        sheet.appendRow([
            data.timestamp,
            data.name,
            data.phone,
            data.email,
            data.eventType,
            data.date,
            data.location,
            data.message,
            data.utm_source,
            data.utm_medium,
            data.utm_campaign,
            data.referrer_url
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
