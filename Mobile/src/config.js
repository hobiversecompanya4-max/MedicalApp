import Constants from "expo-constants";

/**
 * Backend API URL
 *
 * Priority:
 * 1. app.json / app.config.js -> expo.extra.apiUrl
 * 2. EXPO_PUBLIC_API_URL
 * 3. Production backend URL
 */

const EXTRA_API_URL = Constants.expoConfig?.extra?.apiUrl;

const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_URL =
  EXTRA_API_URL ||
  ENV_API_URL ||
  "https://medicalapp-twhy.onrender.com/api";

export const STORE_PHONE = "6392323282";
export const STORE_PHONE_DISPLAY = "+91 63923 23282";

export const STORE_CONTACT = {
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  rawPhone: "919876543210",
  email: "info@yourmedicalstore.com",
  whatsapp: "919876543210",
  mapUrl: "https://maps.app.goo.gl/iHdoo14SYty1eU426",
  mapsEmbed:
    "https://www.google.com/maps?q=Lucknow%2C%20Uttar%20Pradesh&output=embed",
  address: "Your Medical Store, Lucknow, Uttar Pradesh, India",
  hours: "Monday – Sunday",
  hoursTime: "8:00 AM – 10:00 PM",
  social: {
    instagram: "https://instagram.com/yourmedicalstore",
    facebook: "https://facebook.com/yourmedicalstore",
    twitter: "https://x.com/yourmedicalstore",
    youtube: "https://youtube.com/@yourmedicalstore",
  },
};