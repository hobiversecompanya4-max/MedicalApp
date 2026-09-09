import Constants from "expo-constants";

/**
 * Where the Express backend lives.
 *
 * Update per environment:
 *  - iOS simulator ........ http://localhost:5000/api
 *  - Android emulator ..... http://10.0.2.2:5000/api
 *  - Physical device ...... http://<your-computer-LAN-IP>:5000/api
 *                           (e.g. http://192.168.1.23:5000/api)
 *
 * You can also override it in app.json -> expo.extra.apiUrl without
 * changing any source code.
 */
const EXTRA_API_URL = Constants.expoConfig?.extra?.apiUrl;

export const API_URL = EXTRA_API_URL || "http://10.0.2.2:5000/api";

export const STORE_PHONE = "6392323282"; // pharmacist support line
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