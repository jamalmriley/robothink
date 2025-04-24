# robothink
 Marketing automations to retrieve and send email data via Zoho and Bigin.

1. Go to and log into the [Zoho API Console](https://api-console.zoho.com/client/1000.WWR8T7C33QE1YSR0HEE3EUY33ZK8TF).
2. Complete the following fields.
    - For the Scope field, paste the following:
    > ZohoBigin.settings.emails.READ,ZohoBigin.send_mail.all.CREATE
    - For the Time Duration field, set it to your preferred duration. **Tip:** 10 minutes is recommended.
    - For the Scope Description, paste the following:
    > Programmatically send emails from Bigin.
3. Select the proper organization and click *Create*.
4. Copy the generated code and paste it as the value for the `ZOHO_CODE` environment variable key in the `.env` file. **Note:** This code is only valid for the time duration you selected.
5. In the terminal, choose a command to run:
    - Send emails: `npx tsx email.ts`