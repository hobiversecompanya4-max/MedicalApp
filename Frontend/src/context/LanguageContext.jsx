import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  'Panchwati': 'पंचवटी',
  'Panchawati': 'पंचवटी',
  'Digital Pharmacy': 'डिजिटल फ़ार्मेसी',
  'Call Pharmacist': 'फ़ार्मासिस्ट को कॉल करें',
  'Home': 'होम',
  'Order': 'ऑर्डर',
  'Contact': 'संपर्क',
  'Profile': 'प्रोफ़ाइल',
  'Logout': 'लॉगआउट',
  'Login': 'लॉगिन',
  'Register': 'रजिस्टर करें',
  'Trusted digital pharmacy': 'विश्वसनीय डिजिटल फ़ार्मेसी',
  'Free delivery within 5 km': '5 किमी के भीतर मुफ़्त डिलीवरी',
  'Genuine medicines': 'असली दवाइयाँ',
  'delivered with ': 'डिलीवरी के साथ ',
  'care': 'देखभाल',
  'Genuine medicines delivered with care': 'असली दवाइयाँ, देखभाल के साथ आपके द्वार',
  'Your trusted digital pharmacy for genuine medicines, prescription verification, pharmacist oversight, and reliable healthcare delivery.': 'असली दवाइयों, प्रिस्क्रिप्शन सत्यापन, फ़ार्मासिस्ट की निगरानी और भरोसेमंद स्वास्थ्य सेवा डिलीवरी के लिए आपकी विश्वसनीय डिजिटल फ़ार्मेसी।',
  'Prescription medicines require a valid prescription from a licensed healthcare professional. Panchawati Medical is not a substitute for professional medical advice.': 'प्रिस्क्रिप्शन वाली दवाइयों के लिए लाइसेंसधारी स्वास्थ्य विशेषज्ञ का वैध प्रिस्क्रिप्शन आवश्यक है। पंचवटी मेडिकल पेशेवर चिकित्सीय सलाह का विकल्प नहीं है।',
  'Upload your prescription, let our pharmacists verify it, and get clean, reliable medicine delivery in a calm, professional experience designed around trust.': 'अपना प्रिस्क्रिप्शन अपलोड करें, हमारे फ़ार्मासिस्ट इसकी जाँच करेंगे और भरोसे पर आधारित शांत, पेशेवर अनुभव में स्वच्छ व विश्वसनीय दवा डिलीवरी पाएँ।',
  'Order now': 'अभी ऑर्डर करें',
  'Contact us': 'हमसे संपर्क करें',
  'Pharmacist verified': 'फ़ार्मासिस्ट द्वारा सत्यापित',
  'Every prescription is reviewed before dispatch.': 'भेजने से पहले हर प्रिस्क्रिप्शन की जाँच की जाती है।',
  'Free delivery': 'मुफ़्त डिलीवरी',
  'Available within a 5 km local delivery zone.': '5 किमी के स्थानीय डिलीवरी क्षेत्र में उपलब्ध।',
  'Fast turnaround': 'तेज़ सेवा',
  'Built for same-day local order handling.': 'उसी दिन स्थानीय ऑर्डर संभालने के लिए बनाया गया।',
  'Secure packaging': 'सुरक्षित पैकेजिंग',
  'Tamper-evident, carefully packed medicines.': 'छेड़छाड़-स्पष्ट, सावधानी से पैक की गई दवाइयाँ।',
  'The Panchawati difference': 'पंचावती की खासियत',
  'Care that stays personal': 'व्यक्तिगत देखभाल हमेशा साथ',
  'A better pharmacy experience': 'बेहतर फ़ार्मेसी अनुभव',
  'Personal support': 'व्यक्तिगत सहायता',
  'A pharmacist who listens': 'सुनने वाला फ़ार्मासिस्ट',
  'Get patient, practical guidance from a real pharmacy team whenever you need help.': 'जब भी आपको मदद चाहिए, हमारी फ़ार्मेसी टीम से धैर्यपूर्ण और उपयोगी मार्गदर्शन पाएँ।',
  'Smarter value': 'बेहतर बचत',
  'Save without guesswork': 'बिना अनुमान के बचत करें',
  'We can point you toward suitable lower-cost options and special savings for regular customers.': 'हम आपके लिए उपयुक्त कम कीमत वाले विकल्प और नियमित ग्राहकों के लिए विशेष बचत सुझा सकते हैं।',
  'Safe packaging': 'सुरक्षित पैकेजिंग',
  'Prepared with care': 'देखभाल के साथ तैयार',
  'Medicines are checked, sealed, and packed thoughtfully before they leave our store.': 'हमारी दुकान से निकलने से पहले दवाइयों की जाँच, सील और सावधानीपूर्वक पैकिंग की जाती है।',
  'Human support included': 'मानवीय सहायता उपलब्ध',
  'Value-focused guidance': 'बचत पर केंद्रित मार्गदर्शन',
  'Carefully prepared': 'सावधानी से तैयार',
  'Start your order': 'अपना ऑर्डर शुरू करें',
  'Show': 'दिखाएँ',
  'Quick Links': 'त्वरित लिंक',
  'Order Medicine': 'दवा ऑर्डर करें',
  'Safety & Verification': 'सुरक्षा और सत्यापन',
  'Delivery Assurances': 'डिलीवरी का भरोसा',
  'Patient Information': 'मरीज़ की जानकारी',
  'Verified Pharmacy': 'सत्यापित फ़ार्मेसी',
  'Genuine medicine sourcing': 'असली दवाइयों की आपूर्ति',
  'Prescription verification': 'प्रिस्क्रिप्शन सत्यापन',
  'Cold-chain delivery when required': 'ज़रूरत पड़ने पर कोल्ड-चेन डिलीवरी',
  'Tamper-evident packaging': 'छेड़छाड़-स्पष्ट पैकेजिंग',
  'Delivery tracking': 'डिलीवरी ट्रैकिंग',
  'Pharmacist Support': 'फ़ार्मासिस्ट सहायता',
  'Privacy Policy': 'गोपनीयता नीति',
  'Terms of Service': 'सेवा की शर्तें',
  'Safety Guidelines': 'सुरक्षा दिशानिर्देश',
  'Back to home': 'होम पर वापस जाएँ',
  'Last updated September 2026': 'अंतिम अपडेट सितंबर 2026',
  'Your health information deserves careful handling.': 'आपकी स्वास्थ्य जानकारी सावधानी से संभाले जाने योग्य है।',
  'This policy explains the information Panchawati Medical collects, why we use it, and the choices available to you when you use our pharmacy services.': 'यह नीति बताती है कि पंचावती मेडिकल कौन-सी जानकारी एकत्र करता है, हम उसका उपयोग क्यों करते हैं और हमारी फ़ार्मेसी सेवाओं का उपयोग करते समय आपके पास कौन-कौन से विकल्प हैं।',
  'Information we collect': 'हम जो जानकारी एकत्र करते हैं',
  'We may collect your name, phone number, email address, delivery details, order history, and prescription information when you create an account or place an order. We also receive basic technical information needed to keep the website secure and reliable.': 'खाता बनाने या ऑर्डर देने पर हम आपका नाम, फ़ोन नंबर, ईमेल पता, डिलीवरी विवरण, ऑर्डर इतिहास और प्रिस्क्रिप्शन की जानकारी एकत्र कर सकते हैं। वेबसाइट को सुरक्षित और विश्वसनीय बनाए रखने के लिए आवश्यक बुनियादी तकनीकी जानकारी भी हमें प्राप्त होती है।',
  'How we use information': 'हम जानकारी का उपयोग कैसे करते हैं',
  'We use information to verify prescriptions, process and deliver orders, provide pharmacist support, communicate service updates, and improve the experience. We do not sell personal health information.': 'हम जानकारी का उपयोग प्रिस्क्रिप्शन सत्यापित करने, ऑर्डर तैयार करने और पहुँचाने, फ़ार्मासिस्ट सहायता देने, सेवा अपडेट बताने और अनुभव बेहतर बनाने के लिए करते हैं। हम व्यक्तिगत स्वास्थ्य जानकारी नहीं बेचते हैं।',
  'How we protect it': 'हम इसकी सुरक्षा कैसे करते हैं',
  'Access to account and prescription information is limited to people and service providers who need it to operate the pharmacy service. We use reasonable technical and organizational safeguards, but no online service can promise absolute security.': 'खाता और प्रिस्क्रिप्शन की जानकारी तक पहुँच केवल उन लोगों और सेवा प्रदाताओं तक सीमित है जिन्हें फ़ार्मेसी सेवा चलाने के लिए इसकी आवश्यकता होती है। हम उचित तकनीकी और संगठनात्मक सुरक्षा उपाय अपनाते हैं, लेकिन कोई भी ऑनलाइन सेवा पूर्ण सुरक्षा का वादा नहीं कर सकती।',
  'Your choices': 'आपके विकल्प',
  'You can ask us to review, update, or correct your account details. You may also contact our support team with questions about how your information is used or retained.': 'आप हमसे अपने खाते के विवरण की समीक्षा, अपडेट या सुधार करने के लिए कह सकते हैं। आपकी जानकारी के उपयोग या रखे जाने से जुड़े सवालों के लिए आप हमारी सहायता टीम से भी संपर्क कर सकते हैं।',
  'Need help with a specific order or question? Contact the Panchawati Medical pharmacist support team before proceeding.': 'किसी विशेष ऑर्डर या सवाल में मदद चाहिए? आगे बढ़ने से पहले पंचावती मेडिकल की फ़ार्मासिस्ट सहायता टीम से संपर्क करें।',
  'Terms of Service': 'सेवा की शर्तें',
  'Clear expectations for a safer pharmacy experience.': 'एक सुरक्षित फ़ार्मेसी अनुभव के लिए स्पष्ट अपेक्षाएँ।',
  'These terms describe the rules for using Panchawati Medical online services, placing orders, and receiving support from our pharmacy team.': 'ये शर्तें पंचावती मेडिकल की ऑनलाइन सेवाओं का उपयोग करने, ऑर्डर देने और हमारी फ़ार्मेसी टीम से सहायता प्राप्त करने के नियम बताती हैं।',
  'Using the service': 'सेवा का उपयोग',
  'You agree to provide accurate account and delivery information, keep your login details private, and use the service only for lawful healthcare and ordering needs.': 'आप सही खाता और डिलीवरी जानकारी देने, अपने लॉगिन विवरण को निजी रखने और सेवा का उपयोग केवल कानूनी स्वास्थ्य एवं ऑर्डर संबंधी आवश्यकताओं के लिए करने से सहमत हैं।',
  'Orders and prescriptions': 'ऑर्डर और प्रिस्क्रिप्शन',
  'Prescription medicines require a valid prescription and may be reviewed by a pharmacist before fulfillment. An order is accepted only when we confirm availability, eligibility, and delivery details.': 'प्रिस्क्रिप्शन वाली दवाइयों के लिए वैध प्रिस्क्रिप्शन आवश्यक है और ऑर्डर पूरा करने से पहले फ़ार्मासिस्ट इसकी जाँच कर सकता है। ऑर्डर तभी स्वीकार किया जाता है जब हम उपलब्धता, पात्रता और डिलीवरी विवरण की पुष्टि कर दें।',
  'Payments and delivery': 'भुगतान और डिलीवरी',
  'Prices, delivery timing, and availability may change before an order is confirmed. You should inspect the package and contact us promptly if it is damaged, incomplete, or does not match your order.': 'ऑर्डर की पुष्टि से पहले कीमत, डिलीवरी का समय और उपलब्धता बदल सकती है। पैकेज की जाँच करें और यदि वह क्षतिग्रस्त, अधूरा या आपके ऑर्डर से अलग हो तो तुरंत हमसे संपर्क करें।',
  'Medical advice': 'चिकित्सीय सलाह',
  'Panchawati Medical helps with medicine access and pharmacist support. Our service does not replace diagnosis, treatment, or advice from your licensed healthcare professional.': 'पंचावती मेडिकल दवाइयों की उपलब्धता और फ़ार्मासिस्ट सहायता में मदद करता है। हमारी सेवा आपके लाइसेंसधारी स्वास्थ्य विशेषज्ञ के निदान, उपचार या सलाह का विकल्प नहीं है।',
  'Safety Guidelines': 'सुरक्षा दिशानिर्देश',
  'Small checks that help protect every order.': 'छोटी-छोटी जाँच जो हर ऑर्डर की सुरक्षा में मदद करती हैं।',
  'Use these practical guidelines when ordering, receiving, and taking medicines. When in doubt, pause and speak with a doctor or pharmacist.': 'दवाइयाँ ऑर्डर करते, प्राप्त करते और लेते समय इन उपयोगी दिशानिर्देशों का पालन करें। संदेह होने पर रुकें और डॉक्टर या फ़ार्मासिस्ट से बात करें।',
  'Before ordering': 'ऑर्डर करने से पहले',
  'Keep your prescription current and share complete medicine details. Tell the pharmacist about allergies, existing conditions, pregnancy, and other medicines when relevant.': 'अपना प्रिस्क्रिप्शन अपडेट रखें और दवा का पूरा विवरण साझा करें। ज़रूरत पड़ने पर फ़ार्मासिस्ट को एलर्जी, मौजूदा बीमारियों, गर्भावस्था और अन्य दवाइयों के बारे में बताएँ।',
  'When your order arrives': 'ऑर्डर पहुँचने पर',
  'Check the seal, label, medicine name, strength, quantity, expiry date, and storage instructions. Do not use a package that appears opened, damaged, or unexpectedly warm.': 'सील, लेबल, दवा का नाम, क्षमता, मात्रा, समाप्ति तिथि और रखने के निर्देश जाँचें। ऐसा पैकेज इस्तेमाल न करें जो खुला, क्षतिग्रस्त या असामान्य रूप से गर्म दिखाई दे।',
  'Taking medicines': 'दवाइयाँ लेना',
  'Follow the directions on your prescription or label. Do not share prescription medicines, change a dose without medical advice, or use medicine past its expiry date.': 'अपने प्रिस्क्रिप्शन या लेबल पर दिए निर्देशों का पालन करें। प्रिस्क्रिप्शन वाली दवाइयाँ साझा न करें, चिकित्सीय सलाह के बिना खुराक न बदलें और समाप्ति तिथि के बाद दवा का उपयोग न करें।',
  'Get help quickly': 'जल्दी सहायता पाएँ',
  'For a serious reaction, breathing difficulty, severe swelling, or suspected overdose, seek emergency medical help immediately. For order concerns, contact our pharmacist support team.': 'गंभीर प्रतिक्रिया, साँस लेने में कठिनाई, तेज़ सूजन या ओवरडोज़ की आशंका होने पर तुरंत आपातकालीन चिकित्सा सहायता लें। ऑर्डर से जुड़ी चिंता के लिए हमारी फ़ार्मासिस्ट सहायता टीम से संपर्क करें।',
  'Streamlined dispensing workflow': 'सरल दवा वितरण प्रक्रिया',
  'How ordering via prescription works': 'प्रिस्क्रिप्शन से ऑर्डर कैसे काम करता है',
  'The process stays simple, compliant, and easy to follow, so your medicine order moves from upload to delivery without unnecessary friction.': 'प्रक्रिया सरल, नियमों के अनुरूप और आसानी से पालन करने योग्य रहती है, ताकि आपका दवा ऑर्डर बिना अनावश्यक परेशानी के अपलोड से डिलीवरी तक पहुँच सके।',
  'Upload your prescription': 'अपना प्रिस्क्रिप्शन अपलोड करें',
  'Share a clear photo or PDF of your prescription and add the delivery details in one quick step.': 'अपने प्रिस्क्रिप्शन की साफ़ फ़ोटो या PDF साझा करें और एक आसान चरण में डिलीवरी का विवरण जोड़ें।',
  'Accepted formats: JPG, PNG, HEIC, PDF': 'स्वीकृत फ़ॉर्मेट: JPG, PNG, HEIC, PDF',
  'Pharmacist review': 'फ़ार्मासिस्ट की जाँच',
  'Our team checks the prescription carefully, confirms dosage details, and prepares the order for dispatch.': 'हमारी टीम प्रिस्क्रिप्शन की सावधानी से जाँच करती है, खुराक का विवरण पक्का करती है और ऑर्डर को भेजने के लिए तैयार करती है।',
  'Review updates are shared by SMS': 'जाँच के अपडेट SMS से भेजे जाते हैं',
  'Fast local delivery': 'तेज़ स्थानीय डिलीवरी',
  'Your medicines are sealed, packed neatly, and dispatched with a simple handoff for local delivery.': 'आपकी दवाइयों को सील करके व्यवस्थित रूप से पैक किया जाता है और स्थानीय डिलीवरी के लिए आसानी से भेजा जाता है।',
  'Step ': 'चरण ',
  'Safety Verification': 'सुरक्षा सत्यापन',
  'Care you can check at every step.': 'हर चरण पर जाँच योग्य देखभाल।',
  'Verified sourcing': 'सत्यापित आपूर्ति',
  'Prescription review': 'प्रिस्क्रिप्शन की जाँच',
  'Temperature care': 'तापमान संबंधी देखभाल',
  'Before you accept delivery': 'डिलीवरी लेने से पहले',
  'Check the package seal and label.': 'पैकेज की सील और लेबल जाँचें।',
  'Confirm the medicine name and quantity.': 'दवा का नाम और मात्रा पक्की करें।',
  'Questions about a medicine or prescription?': 'दवा या प्रिस्क्रिप्शन के बारे में सवाल?',
  'Your medicines, prepared with care.': 'आपकी दवाइयाँ, देखभाल के साथ तैयार।',
  'ORDER MEDICINE': 'दवा ऑर्डर करें',
  "Order Medicines with a Doctor's Prescription": 'डॉक्टर के प्रिस्क्रिप्शन से दवाइयाँ ऑर्डर करें',
  "Doctor's Prescription": 'डॉक्टर का प्रिस्क्रिप्शन',
  "Upload Doctor's Prescription": 'डॉक्टर का प्रिस्क्रिप्शन अपलोड करें',
  'Choose File': 'फ़ाइल चुनें',
  'Prescription selected': 'प्रिस्क्रिप्शन चुना गया',
  'Submit Order': 'ऑर्डर भेजें',
  'Add Medicine': 'दवा जोड़ें',
  'Remove': 'हटाएँ',
  'Panchawati Care Club': 'पंचावती केयर क्लब',
  'Your regular medicines, made a little easier.': 'आपकी नियमित दवाइयाँ, अब थोड़ी और आसान।',
  'Join a pharmacy experience that rewards trust with better value, familiar support, and thoughtful service.': 'ऐसे फ़ार्मेसी अनुभव से जुड़ें जहाँ भरोसे का इनाम बेहतर मूल्य, परिचित सहायता और विचारशील सेवा के रूप में मिलता है।',
  'Join for free': 'मुफ़्त में जुड़ें',
  'Confidence in every order': 'हर ऑर्डर पर भरोसा',
  'Trusted sourcing and careful checks help you order with peace of mind.': 'विश्वसनीय आपूर्ति और सावधानीपूर्वक जाँच आपको निश्चिंत होकर ऑर्डर करने में मदद करती है।',
  'A team that remembers you': 'आपको याद रखने वाली टीम',
  'Get kind, practical support from people who understand your regular needs.': 'ऐसे लोगों से सरल और उपयोगी सहायता पाएँ जो आपकी नियमित ज़रूरतों को समझते हैं।',
  'Member-only savings': 'सदस्यों के लिए विशेष बचत',
  'Regular customers can unlock special discounts and better value on eligible refills.': 'नियमित ग्राहक योग्य रीफिल पर विशेष छूट और बेहतर मूल्य पा सकते हैं।',
  'Help when it matters': 'ज़रूरत के समय सहायता',
  'From recommendations to delivery updates, support stays close after checkout.': 'सुझावों से लेकर डिलीवरी अपडेट तक, चेकआउट के बाद भी सहायता आपके साथ रहती है।',
  'Clarifications & guidance': 'स्पष्टीकरण और मार्गदर्शन',
  'Frequently asked questions': 'अक्सर पूछे जाने वाले सवाल',
  'A quick guide to ordering, verification, and delivery so the experience feels clear from the start.': 'ऑर्डर, सत्यापन और डिलीवरी की आसान जानकारी, ताकि शुरुआत से ही प्रक्रिया स्पष्ट रहे।',
  'Can I order medicines without an official prescription?': 'क्या मैं आधिकारिक प्रिस्क्रिप्शन के बिना दवाइयाँ ऑर्डर कर सकता हूँ?',
  'Over-the-counter products such as vitamins, antacids, first-aid items, and monitoring tools do not require a prescription. Prescription medicines still need a valid prescription from a licensed healthcare professional.': 'विटामिन, एंटासिड, प्राथमिक उपचार की वस्तुओं और निगरानी उपकरणों जैसे ओवर-द-काउंटर उत्पादों के लिए प्रिस्क्रिप्शन आवश्यक नहीं है। प्रिस्क्रिप्शन वाली दवाइयों के लिए लाइसेंसधारी स्वास्थ्य विशेषज्ञ का वैध प्रिस्क्रिप्शन आवश्यक है।',
  'How will I know when my prescription has been verified?': 'मुझे कैसे पता चलेगा कि मेरा प्रिस्क्रिप्शन सत्यापित हो गया है?',
  'Once our pharmacy team reviews your prescription, your order status is updated so you can track the verification progress without guesswork.': 'हमारी फ़ार्मेसी टीम द्वारा आपके प्रिस्क्रिप्शन की जाँच के बाद ऑर्डर की स्थिति अपडेट हो जाती है, ताकि आप सत्यापन की प्रगति आसानी से देख सकें।',
  'What happens if my doctor prescribed a high-cost brand medicine?': 'अगर डॉक्टर ने महंगी ब्रांडेड दवा लिखी है तो क्या होगा?',
  'Our pharmacists can check available alternatives and let you know whether an approved generic or lower-cost option is suitable for your prescription.': 'हमारे फ़ार्मासिस्ट उपलब्ध विकल्पों की जाँच करके बता सकते हैं कि आपके प्रिस्क्रिप्शन के लिए स्वीकृत जेनेरिक या कम कीमत वाला विकल्प उपयुक्त है या नहीं।',
  'How are cold-storage items like insulin transported?': 'इंसुलिन जैसी ठंडे तापमान में रखी जाने वाली वस्तुएँ कैसे पहुँचाई जाती हैं?',
  'Temperature-sensitive medicines are packed using appropriate insulated packaging and monitored during delivery to help maintain the required cold-chain conditions.': 'तापमान-संवेदनशील दवाइयों को उचित इंसुलेटेड पैकेजिंग में पैक किया जाता है और आवश्यक कोल्ड-चेन बनाए रखने के लिए डिलीवरी के दौरान निगरानी की जाती है।',
  'Still have a question about your medication?': 'क्या आपकी दवा के बारे में अभी भी कोई सवाल है?',
  'Our pharmacist support line is ready to help with orders and guidance.': 'हमारी फ़ार्मासिस्ट सहायता लाइन ऑर्डर और मार्गदर्शन में मदद के लिए तैयार है।',
  'Customer experiences': 'ग्राहकों के अनुभव',
  'Care people come back for': 'ऐसी देखभाल जिसके लिए लोग वापस आते हैं',
  'Kind staff, smarter recommendations, and savings that make every refill feel easier.': 'दयालु कर्मचारी, बेहतर सुझाव और ऐसी बचत जो हर रीफिल को आसान बनाती है।',
  '10 local voices': '10 स्थानीय अनुभव',
  'Hover to pause and read a story': 'कहानी पढ़ने के लिए माउस रखें और रोकें',
  'Local customer': 'स्थानीय ग्राहक',
  'Regular customer': 'नियमित ग्राहक',
  'Verified order': 'सत्यापित ऑर्डर',
  'Family care': 'परिवार की देखभाल',
  'Home delivery': 'घर पर डिलीवरी',
  'The staff were polite, patient, and explained every step instead of rushing me through the order.': 'कर्मचारी विनम्र और धैर्यवान थे। उन्होंने ऑर्डर जल्दी-जल्दी कराने के बजाय हर चरण समझाया।',
  'They recommended a suitable lower-cost option for my prescription and helped me save without compromising on care.': 'उन्होंने मेरे प्रिस्क्रिप्शन के लिए कम कीमत वाला उपयुक्त विकल्प सुझाया और देखभाल से समझौता किए बिना बचत में मदद की।',
  'The team is honest about prices and availability, which makes ordering medicines feel simple and trustworthy.': 'टीम कीमतों और उपलब्धता के बारे में ईमानदार है, जिससे दवाइयाँ ऑर्डर करना आसान और भरोसेमंद लगता है।',
  'The staff spoke kindly with my parents and kept us updated from prescription review to delivery.': 'कर्मचारियों ने मेरे माता-पिता से विनम्रता से बात की और प्रिस्क्रिप्शन की जाँच से डिलीवरी तक हमें अपडेट दिया।',
  'I received a helpful recommendation that reduced my monthly medicine cost without making the process confusing.': 'मुझे उपयोगी सुझाव मिला जिससे प्रक्रिया को जटिल बनाए बिना मेरी मासिक दवा की लागत कम हुई।',
  'Everything arrived sealed and well organized, and the staff followed up to make sure the order was right.': 'सब कुछ सील और व्यवस्थित होकर पहुँचा। कर्मचारियों ने यह सुनिश्चित करने के लिए संपर्क भी किया कि ऑर्डर सही है।',
  'Fast delivery, respectful service, and useful savings on my refill make this my first choice.': 'तेज़ डिलीवरी, सम्मानजनक सेवा और रीफिल पर उपयोगी बचत इसे मेरी पहली पसंद बनाते हैं।',
  'The pharmacist listened carefully and suggested a practical option that saved my family money.': 'फ़ार्मासिस्ट ने ध्यान से सुना और ऐसा उपयोगी विकल्प सुझाया जिससे मेरे परिवार के पैसे बचे।',
  'My repeat orders come with special customer discounts, and the friendly service keeps me coming back.': 'मेरे दोबारा दिए गए ऑर्डर पर विशेष ग्राहक छूट मिलती है और दोस्ताना सेवा मुझे वापस आने के लिए प्रेरित करती है।',
  'Professional staff, transparent recommendations, and genuine discounts make Panchawati feel different.': 'पेशेवर कर्मचारी, पारदर्शी सुझाव और वास्तविक छूट पंचावती को अलग बनाते हैं।',
  'OTHER PARTNERS': 'अन्य साझेदार',
  'Community collaborations we value': 'सामुदायिक सहयोग हमारे लिए महत्वपूर्ण हैं',
  'Celebration venue partner': 'समारोह स्थल साझेदार',
  'For parties, marriages, and any celebration, Panchwati Lawn offers a generous setting with a soft, welcoming feel. It suits occasions that need comfort, movement, and a polished backdrop without visual clutter.': 'पार्टियों, शादियों और हर समारोह के लिए पंचावती लॉन एक विशाल और स्वागतपूर्ण स्थान देता है। यह उन आयोजनों के लिए उपयुक्त है जहाँ आराम, खुली जगह और सलीकेदार वातावरण चाहिए।',
  'Weddings': 'शादियाँ',
  'Receptions': 'रिसेप्शन',
  'Birthday celebrations': 'जन्मदिन समारोह',
  'Family gatherings': 'पारिवारिक समारोह',
  'Spacious': 'विशाल',
  'A comfortable venue backdrop for larger gatherings, dining layouts, and smooth guest flow.': 'बड़े समारोहों, भोजन व्यवस्था और मेहमानों की सुगम आवाजाही के लिए आरामदायक स्थान।',
  'Flexible': 'लचीला',
  'Suitable for ceremonial moments, festive programs, and thoughtful event arrangements.': 'समारोहों, उत्सव कार्यक्रमों और सुविचारित आयोजन व्यवस्थाओं के लिए उपयुक्त।',
  'Memorable': 'यादगार',
  'Built for celebrations that feel calm, polished, and easy to enjoy from start to finish.': 'ऐसे समारोहों के लिए बनाया गया जो शुरुआत से अंत तक शांत, सलीकेदार और आनंददायक रहें।',
  'Best for': 'इनके लिए बेहतर',
  'In one line': 'एक पंक्ति में',
  'A dependable venue partner for celebrations that deserve a little more space, softness, and ease.': 'ऐसे समारोहों के लिए भरोसेमंद स्थल साझेदार जिन्हें थोड़ी अधिक जगह, सहजता और आराम चाहिए।',
  '📍 Visit our store': '📍 हमारे स्टोर पर आएँ',
  'Find Panchawati Medical Near You': 'अपने पास पंचावती मेडिकल खोजें',
  'Prefer to visit us in person? Our medical store is available for customers who want to purchase medicines, ask questions, or speak directly with our pharmacy team.': 'क्या आप व्यक्तिगत रूप से आना पसंद करेंगे? हमारा मेडिकल स्टोर उन ग्राहकों के लिए उपलब्ध है जो दवाइयाँ खरीदना, सवाल पूछना या हमारी फ़ार्मेसी टीम से सीधे बात करना चाहते हैं।',
  'Visit our store using the location provided on Google Maps.': 'Google Maps पर दिए गए स्थान का उपयोग करके हमारे स्टोर पर आएँ।',
  'In-Person Assistance': 'व्यक्तिगत सहायता',
  'Our team can help you with medicine availability, prescriptions, and general pharmacy guidance.': 'हमारी टीम दवाइयों की उपलब्धता, प्रिस्क्रिप्शन और सामान्य फ़ार्मेसी मार्गदर्शन में आपकी मदद कर सकती है।',
  'Get Directions': 'दिशा-निर्देश पाएँ',
  'Open location in Google Maps': 'Google Maps में स्थान खोलें',
  'Open Map ↗': 'मैप खोलें ↗',
  'Contact Us': 'हमसे संपर्क करें',
  "We're Here to Help You": 'हम आपकी सहायता के लिए यहाँ हैं',
  'Have a question about medicines, prescriptions, or your order? Get in touch with us and our team will be happy to help.': 'दवाइयों, प्रिस्क्रिप्शन या अपने ऑर्डर के बारे में कोई सवाल है? हमसे संपर्क करें, हमारी टीम आपकी मदद करके खुश होगी।',
  'Get in Touch': 'संपर्क करें',
  'Reach us through phone, WhatsApp, email, or visit our store.': 'फ़ोन, WhatsApp, ईमेल के ज़रिए हमसे संपर्क करें या हमारे स्टोर पर आएँ।',
  'Call Us': 'हमें कॉल करें',
  'Available during store hours': 'स्टोर के समय उपलब्ध',
  'Chat with us on WhatsApp': 'WhatsApp पर हमसे चैट करें',
  'Quick assistance & order enquiries': 'त्वरित सहायता और ऑर्डर संबंधी पूछताछ',
  "We'll get back to you as soon as possible": 'हम जल्द से जल्द आपसे संपर्क करेंगे',
  'Store Address': 'स्टोर का पता',
  'Opening Hours': 'खुलने का समय',
  'Monday – Sunday': 'सोमवार – रविवार',
  'Open Daily': 'प्रतिदिन खुला',
  'Need Assistance?': 'सहायता चाहिए?',
  'Our team is ready to help you with medicine availability, prescription orders, delivery information, and general queries.': 'हमारी टीम दवाइयों की उपलब्धता, प्रिस्क्रिप्शन ऑर्डर, डिलीवरी की जानकारी और सामान्य सवालों में आपकी मदद के लिए तैयार है।',
  'Call Now': 'अभी कॉल करें',
  'Follow Us': 'हमें फ़ॉलो करें',
  'Our social media channels are being prepared. Follow us here for updates, offers, and health tips soon.': 'हमारे सोशल मीडिया चैनल तैयार किए जा रहे हैं। अपडेट, ऑफ़र और स्वास्थ्य सुझावों के लिए जल्द ही हमें यहाँ फ़ॉलो करें।',
  'Coming soon': 'जल्द आ रहा है',
  'Full name': 'पूरा नाम',
  'Create your account': 'अपना खाता बनाएँ',
  'Join us for simpler medicine ordering and prescription support.': 'दवाइयाँ ऑर्डर करने और प्रिस्क्रिप्शन सहायता पाने के आसान अनुभव से जुड़ें।',
  'Welcome back': 'वापसी पर स्वागत है',
  'Sign in to manage orders, prescriptions, and delivery updates.': 'ऑर्डर, प्रिस्क्रिप्शन और डिलीवरी अपडेट प्रबंधित करने के लिए साइन इन करें।',
  'Enter your full name': 'अपना पूरा नाम दर्ज करें',
  'Phone number': 'फ़ोन नंबर',
  '10-digit phone number': '10 अंकों का फ़ोन नंबर',
  'Email address': 'ईमेल पता',
  'Create a password': 'पासवर्ड बनाएँ',
  'Enter your password': 'अपना पासवर्ड दर्ज करें',
  'Please wait...': 'कृपया प्रतीक्षा करें...',
  'Create account': 'खाता बनाएँ',
  'Already have an account?': 'क्या आपका पहले से खाता है?',
  "Don't have an account?": 'क्या आपका खाता नहीं है?',
  'Your information is encrypted and kept private.': 'आपकी जानकारी एन्क्रिप्टेड और निजी रखी जाती है।',
  'Upload your prescription, provide your delivery details, and our pharmacist will verify your medicines before delivery.': 'अपना प्रिस्क्रिप्शन अपलोड करें, डिलीवरी का विवरण दें और हमारा फ़ार्मासिस्ट डिलीवरी से पहले आपकी दवाइयों की जाँच करेगा।',
  'JPG, PNG or PDF': 'JPG, PNG या PDF',
  'Full Name': 'पूरा नाम',
  'Enter mobile number': 'मोबाइल नंबर दर्ज करें',
  'Confirm Mobile Number': 'मोबाइल नंबर की पुष्टि करें',
  'Re-enter mobile number': 'मोबाइल नंबर दोबारा दर्ज करें',
  'Alternate Mobile Number': 'वैकल्पिक मोबाइल नंबर',
  'Enter alternate mobile number': 'वैकल्पिक मोबाइल नंबर दर्ज करें',
  'Delivery Address': 'डिलीवरी का पता',
  'Enter your complete delivery address': 'अपना पूरा डिलीवरी पता दर्ज करें',
  'If you already know the medicine name, you can add it here.': 'अगर आपको दवा का नाम पहले से पता है, तो आप उसे यहाँ जोड़ सकते हैं।',
  'Optional': 'वैकल्पिक',
  'Enter medicine name': 'दवा का नाम दर्ज करें',
  'Pharmacist Verification': 'फ़ार्मासिस्ट सत्यापन',
  'Your prescription will be reviewed by our pharmacist before the order is confirmed.': 'ऑर्डर की पुष्टि से पहले हमारे फ़ार्मासिस्ट द्वारा आपके प्रिस्क्रिप्शन की जाँच की जाएगी।',
  'Submitting Order...': 'ऑर्डर भेजा जा रहा है...',
  'Submit Order Request': 'ऑर्डर अनुरोध भेजें',
  'Your information is used only to process your medicine order.': 'आपकी जानकारी का उपयोग केवल आपके दवा ऑर्डर को पूरा करने के लिए किया जाता है।',
}

const orderedEntries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length)
const originalTextByNode = new WeakMap()
const translationCache = new Map([
  ['en', new Map()],
  ['hi', new Map()],
])

const translate = (value, language) => {
  if (language === 'en' || !value) return value
  const cache = translationCache.get(language)
  if (cache.has(value)) return cache.get(value)

  let translated = value
  orderedEntries.forEach(([english, hindi]) => {
    translated = translated.split(english).join(hindi)
  })
  translated = translated.replaceAll('पंचावती', 'पंचवटी').replaceAll('Medical', 'मेडिकल')
  cache.set(value, translated)
  return translated
}

const translateDom = (language) => {
  const root = document.body
  if (!root) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []
  let node
  while ((node = walker.nextNode())) {
    if (node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) textNodes.push(node)
  }

  textNodes.forEach((textNode) => {
    const currentText = textNode.nodeValue
    const record = originalTextByNode.get(textNode)

    if (!record) {
      originalTextByNode.set(textNode, { original: currentText, translated: currentText })
    } else if (currentText !== record.translated) {
      record.original = currentText
    }

    const originalText = originalTextByNode.get(textNode).original
    const translatedText = translate(originalText, language)
    originalTextByNode.get(textNode).translated = translatedText
    if (textNode.nodeValue !== translatedText) textNode.nodeValue = translatedText
  })

  root.querySelectorAll('input[placeholder], textarea[placeholder], [aria-label], img[alt]').forEach((element) => {
    ;['placeholder', 'aria-label', 'alt'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return
      const originalAttribute = `data-original-${attribute}`
      if (!element.hasAttribute(originalAttribute)) element.setAttribute(originalAttribute, element.getAttribute(attribute))
      element.setAttribute(attribute, translate(element.getAttribute(originalAttribute), language))
    })
  })
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('medical-language') || 'hi')

  useEffect(() => {
    localStorage.setItem('medical-language', language)
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en'
    translateDom(language)

    let frameId = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => translateDom(language))
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    isHindi: language === 'hi',
    toggleLanguage: () => setLanguage((current) => (current === 'hi' ? 'en' : 'hi')),
    t: (text) => translate(text, language),
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)