import * as dotenv from "dotenv";
dotenv.config();

type Method = "GET" | "POST" | "PUT" | "DELETE";

export type AccessCodeResponse = {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  api_domain?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
};

async function apiRequest(
  baseUrl: string = "https://www.zohoapis.com/bigin",
  endpoint: string,
  method: Method,
  headers?: any,
  body?: any
) {
  try {
    const response = await fetch(baseUrl + endpoint, { method, headers, body });
    return response;
  } catch (error) {
    // Handle errors here
    throw error; // Or return a default value/error object
  }
}

/* Scope Information

Scope - Indicates the scope of the access request. This parameter informs the Bigin authorization server about the level of access the client is requesting. The following 2 lines must be copied to assist in generating a expiry code that will then be used to generate a required access code for the API request. Set the duration to 10 minutes.

ZohoBigin.settings.emails.READ,ZohoBigin.send_mail.all.CREATE
Programmatically send emails from Bigin.

Scope                               Description
ZohoBigin.settings.emails.READ      - Get configured from-addresses
ZohoBigin.send_mail.all.CREATE      - Send emails from Bigin to the email addresses associated with records.
*/

export async function getAccessCode(): Promise<AccessCodeResponse> {
  const [client_id, client_secret, code] = [
    process.env.ZOHO_CLIENT_ID,
    process.env.ZOHO_CLIENT_SECRET,
    process.env.ZOHO_CODE,
  ];

  // If any of the required request parameters are missing, throw an error.
  if (!client_id) throw new Error("Missing client ID");
  if (!client_secret) throw new Error("Missing client secret");
  if (!code) throw new Error("Missing code");

  // The Client ID and secret are securely stored in a .env file.
  // These OAuth 2.0 credentials were generated on https://api-console.zoho.com.

  const queryString = `?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`;

  const accessCode = await apiRequest(
    "https://accounts.zoho.com/oauth/v2",
    "/token" + queryString,
    "POST"
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

  // console.log(accessCode);
  return accessCode;
}
