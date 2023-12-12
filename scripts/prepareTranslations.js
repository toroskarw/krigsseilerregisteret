"use strict";
const fs = require("fs-extra");

/*
  Uses the extracted message descriptors in <rootDir>/src/lang/messages.json to create
  other locale files with the following logic:
  - Key/Id already exist: Keep it 
  - Key/Id missing: add key and value.  

  TODO: Warn if there are redundant entries in previously generated locale files
*/

const basePath = "src/lang";

const otherLocales = ["no", "en"];
const messagesPath = `${basePath}/messages.json`;
fs.ensureFileSync(messagesPath);
let messages = {};
try {
  messages = fs.readJSONSync(messagesPath);
} catch (e) {
  console.log(e.message);
}

otherLocales.forEach((locale) => {
  const otherLocalePath = `${basePath}/locales/${locale}.json`;
  fs.ensureFileSync(otherLocalePath);
  let otherLocale = {};
  try {
    otherLocale = fs.readJSONSync(otherLocalePath);
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      console.log(e.message);
    }
  }

  Object.entries(messages).map(([key, value]) => {
    if (!otherLocale[key]) {
      otherLocale[key] = value;
    }
  });

  fs.writeJsonSync(otherLocalePath, otherLocale, { spaces: 2 });
  console.log("Translations prepared for " + locale);
});
