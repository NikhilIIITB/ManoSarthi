import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export const translations = {
  en: {
    Login: "Login",
    "Enter Your Username": "Enter Your Username",
    "Enter Your Password": "Enter Your Password",
    "Forgot Password?": "Forgot Password?",
    "Login Successful": "Login Successful",
    "Login Failure": "Login Failure",
    "Register Patient": "Register Patient",
    "Missed Followup": "Missed Followup",
    "Sync Data": "Sync Data",
    "Follow-up Schedule": "Follow-up Schedule",
    "First Name": "First Name",
    Address: "Address",
    Status: "Status",
    "Change Password": "Change Password",
    "Enter Your Old Password": "Enter Your Old Password",
    "Enter Your New Password": "Enter Your New Password",
    "Search Prescription":"Search Prescription"
    // Add more key-value pairs for English here
  },
  hi: {
    Login: "लॉगिन",
    "Enter Your Username": "अपना उपयोगकर्ता नाम दर्ज करें",
    "Enter Your Password": "अपना पासवर्ड दर्ज करें",
    "Forgot Password?": "पासवर्ड भूल गए?",
    "Login Successful": "लॉगिन सफल",
    "Login Failure": "लॉगिन विफल",
    "Register Patient": "रोगी का पंजीकरण",
    "Missed Followup": "फॉलोअप छूट गया",
    "Sync Data": "डेटा सिंक्रनाइज़ करें",
    "Follow-up Schedule": "फॉलो-अप अनुसूची",
    "First Name": "नाम",
    Address: "पता",
    Status: "स्थिति",
    "Change Password": "पासवर्ड बदलें",
    "Enter Your Old Password": "अपना पुराना पासवर्ड दर्ज करें",
    "Enter Your New Password": "अपना नया पासवर्ड दर्ज करें",
    "Search Prescription":"पासवर्ड"
    // Add more key-value pairs for Hindi here
  },
};

const i18n = new I18n(translations);

// Get the first locale detected
const locale = Localization.getLocales()[0];
console.log("Locale In i18n: ",locale);
I18n.translations = translations;
I18n.locale = locale.languageCode;
I18n.enableFallback = true; // Enable fallback mechanism

// console.log("Locale:", locale);
// console.log("Translations:", translations);
// console.log("Translated 'Login':", i18n.t("Login"));

export default i18n;
