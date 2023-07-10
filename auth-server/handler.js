
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2
const calendar = google.calendar("v3");
/* SCOPES allow you to set access levels */
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];


/* Credentials are values required to get access to your calendar. If you see “process.env” this means the value is in the “config.json” file. */

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://x-lamprocapnos-x.github.io/meet/"],
  javascript_origins: ["https://x-lamprocapnos-x.github.io", "http://localhost:3000"],
};

const { client_id, client_secret, calendar_id, redirect_uris} = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports.getAuthUrl = async () => {

    const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {

    oAuth2Client.getToken(code, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response); //response
    });
  })
    .then((results) => { //results
      // Respond with OAuth token 
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};