//  node: Write an expressjs boiler plate code for server starting
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import { google } from "googleapis";
// import passport from "passport";
import cors from "cors";
import { decode } from "jsonwebtoken";

config();

const auth = await new google.auth.GoogleAuth({
  clientOptions: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
console.log("googleapis", auth);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/sso/login", (request, response) => {
  console.log("Checking g-sso", request.headers, "\n\nBody:\t", request.body);
  const { credential } = request.body;
  const responseData = decode(credential, { json: true });
  console.log(responseData);

  // store these details
  const { sub: userId, email, name, picture } = responseData;

  return response.redirect("http://localhost:4200/home");
});

app.post("/logout", (request, response) => {
  //   auth.scop;
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// sso jwt details
// {
//     iss: 'https://accounts.google.com',
//     azp: '462068634772-l8n75472f4q373msfq8g9pgu4dvhtg2v.apps.googleusercontent.com',
//     aud: '462068634772-l8n75472f4q373msfq8g9pgu4dvhtg2v.apps.googleusercontent.com',
//     sub: '106824998094494388763',
//     email: 'rukku93223@gmail.com',
//     email_verified: true,
//     nbf: 1734275554,
//     name: 'PILLA RUKMESH',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIfw5jfNNOAKlgLErc11zXU_98xWBGeDuDY8ETBke24Rf324kE8=s96-c',
//     given_name: 'PILLA',
//     family_name: 'RUKMESH',
//     iat: 1734275854,
//     exp: 1734279454,
//     jti: '1e04a08c2f12da648976293c6b045917000c81b1'
//   }
