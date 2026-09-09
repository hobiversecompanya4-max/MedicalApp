import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";

import { api } from "../services/api";
import Field from "./Field";
import PrimaryButton from "./PrimaryButton";

const COLORS = {
  primary: "#0F766E",
  primaryLight: "#E4F3F0",
  background: "#F8FAFC",
  white: "#FFFFFF",
  text: "#17202A",
  muted: "#6B7280",
  border: "#DDE4E8",
  light: "#F4F9F8",
  success: "#16A34A",
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  confirmPhone: "",
  alternatePhone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const OrderMedicineForm = ({ navigation }) => {
  const [prescription, setPrescription] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const pickPrescription = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo library access so you can upload your prescription."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];

      let extension = "jpg";

      if (asset.mimeType === "image/png") {
        extension = "png";
      } else if (asset.mimeType === "image/webp") {
        extension = "webp";
      }

      const generatedName =
        "prescription-" + Date.now() + "." + extension;

      setPrescription({
        uri: asset.uri,
        name: asset.fileName || generatedName,
        type: asset.mimeType || "image/jpeg",
      });

      console.log("Prescription selected:", asset.uri);
    } catch (error) {
      console.error("Prescription picker error:", error);

      Alert.alert(
        "Unable to Select Image",
        "Something went wrong while selecting the prescription."
      );
    }
  };

  const addMedicine = () => {
    const name = medicineName.trim();

    if (!name) {
      return;
    }

    setMedicines((previous) => [
      ...previous,
      {
        name: name,
        price: 0,
        quantity: 1,
      },
    ]);

    setMedicineName("");
  };

  const removeMedicine = (index) => {
    setMedicines((previous) =>
      previous.filter((_, medicineIndex) => medicineIndex !== index)
    );
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Missing Information", "Please enter your name.");
      return false;
    }

    const phone = formData.phone.trim();
    const confirmPhone = formData.confirmPhone.trim();

    if (!phone) {
      Alert.alert(
        "Missing Information",
        "Please enter your mobile number."
      );
      return false;
    }

    if (phone.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return false;
    }

    if (!confirmPhone) {
      Alert.alert(
        "Missing Information",
        "Please confirm your mobile number."
      );
      return false;
    }

    if (phone !== confirmPhone) {
      Alert.alert(
        "Mobile Numbers Do Not Match",
        "Please make sure both mobile numbers are the same."
      );
      return false;
    }

    if (formData.alternatePhone.trim()) {
      if (formData.alternatePhone.trim().length !== 10) {
        Alert.alert(
          "Invalid Alternate Number",
          "Please enter a valid 10-digit alternate mobile number."
        );
        return false;
      }
    }

    if (!formData.addressLine.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your delivery address."
      );
      return false;
    }

    if (!formData.city.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your city."
      );
      return false;
    }

    if (!formData.state.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your state."
      );
      return false;
    }

    if (!formData.pincode.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your 6-digit pincode."
      );
      return false;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      Alert.alert(
        "Invalid Pincode",
        "Please enter a valid 6-digit pincode."
      );
      return false;
    }

    if (!prescription) {
      Alert.alert(
        "Prescription Required",
        "Please upload a prescription image before submitting your order."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Preparing prescription upload:",
        prescription.uri
      );

      /*
       * Create FormData.
       */
      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("phone", formData.phone.trim());
      data.append("confirmPhone", formData.confirmPhone.trim());

      if (formData.alternatePhone.trim()) {
        data.append(
          "alternatePhone",
          formData.alternatePhone.trim()
        );
      }

      const deliveryAddress = {
        addressLine: formData.addressLine.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      };

      data.append(
        "deliveryAddress",
        JSON.stringify(deliveryAddress)
      );

      data.append("prescriptionRequired", "true");

      if (medicines.length > 0) {
        data.append(
          "medicines",
          JSON.stringify(medicines)
        );
      }

      /*
       * IMPORTANT:
       *
       * Do NOT append:
       *
       * {
       *   uri: "...",
       *   name: "...",
       *   type: "..."
       * }
       *
       * directly.
       *
       * That caused:
       *
       * Unsupported FormDataPart implementation
       *
       * Instead we use Expo's File object.
       */
      const prescriptionFile = new File(prescription.uri);

      console.log("Prescription file created:", {
        uri: prescriptionFile.uri,
        name: prescriptionFile.name,
        size: prescriptionFile.size,
        type: prescriptionFile.type,
      });

      if (!prescriptionFile.exists) {
        throw new Error(
          "Prescription file no longer exists. Please select the prescription again."
        );
      }

      data.append(
        "prescription",
        prescriptionFile
      );

      console.log("Submitting order to backend...");

      const response = await api.post(
        "/orders",
        data
      );

      console.log("Order response:", response);

      const orderId =
        response?.orderId ||
        response?.order?._id ||
        response?.order?.id ||
        response?._id ||
        response?.id;

      Alert.alert(
        "Order Submitted Successfully!",
        orderId
          ? "Your order has been submitted successfully.\n\nOrder ID: " +
            String(orderId)
          : "Your order has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              setFormData(EMPTY_FORM);
              setMedicines([]);
              setMedicineName("");
              setPrescription(null);

              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error(
        "Order submission failed:",
        error
      );

      Alert.alert(
        "Order Submission Failed",
        error?.message ||
          "Unable to connect to the server. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.text}
            />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>
              Order Medicines
            </Text>

            <Text style={styles.subtitle}>
              Upload your prescription and we'll take care of the rest.
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Personal Information
          </Text>

          <Field
            label="Full Name"
            value={formData.name}
            onChangeText={(value) =>
              updateField("name", value)
            }
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <Field
            label="Mobile Number"
            value={formData.phone}
            onChangeText={(value) =>
              updateField(
                "phone",
                value.replace(/[^0-9]/g, "")
              )
            }
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Confirm Mobile Number"
            value={formData.confirmPhone}
            onChangeText={(value) =>
              updateField(
                "confirmPhone",
                value.replace(/[^0-9]/g, "")
              )
            }
            placeholder="Re-enter mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Alternate Mobile Number (Optional)"
            value={formData.alternatePhone}
            onChangeText={(value) =>
              updateField(
                "alternatePhone",
                value.replace(/[^0-9]/g, "")
              )
            }
            placeholder="Enter alternate mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Delivery Address"
            value={formData.addressLine}
            onChangeText={(value) =>
              updateField("addressLine", value)
            }
            placeholder="House no., street, area, landmark"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Field
            label="City"
            value={formData.city}
            onChangeText={(value) =>
              updateField("city", value)
            }
            placeholder="Enter your city"
            autoCapitalize="words"
          />

          <Field
            label="State"
            value={formData.state}
            onChangeText={(value) =>
              updateField("state", value)
            }
            placeholder="Enter your state"
            autoCapitalize="words"
          />

          <Field
            label="Pincode"
            value={formData.pincode}
            onChangeText={(value) =>
              updateField(
                "pincode",
                value.replace(/[^0-9]/g, "")
              )
            }
            placeholder="Enter 6-digit pincode"
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        {/* Medicines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Medicines (Optional)
          </Text>

          <Text style={styles.sectionDescription}>
            Add medicine names if you want to provide additional
            details along with your prescription.
          </Text>

          <View style={styles.medicineInputRow}>
            <TextInput
              style={styles.medicineInput}
              value={medicineName}
              onChangeText={setMedicineName}
              placeholder="Enter medicine name"
              placeholderTextColor={COLORS.muted}
              returnKeyType="done"
              onSubmitEditing={addMedicine}
            />

            <Pressable
              style={styles.addButton}
              onPress={addMedicine}
            >
              <Ionicons
                name="add"
                size={24}
                color={COLORS.white}
              />
            </Pressable>
          </View>

          {medicines.length > 0 && (
            <View style={styles.medicineList}>
              {medicines.map((medicine, index) => (
                <View
                  key={medicine.name + "-" + index}
                  style={styles.medicineItem}
                >
                  <View style={styles.medicineItemLeft}>
                    <Ionicons
                      name="medical-outline"
                      size={20}
                      color={COLORS.primary}
                    />

                    <Text style={styles.medicineText}>
                      {medicine.name}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      removeMedicine(index)
                    }
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                  >
                    <Ionicons
                      name="close-circle"
                      size={22}
                      color={COLORS.muted}
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Prescription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Prescription
          </Text>

          <Text style={styles.sectionDescription}>
            Upload a clear photo of your prescription.
            JPG, PNG and WEBP images are supported.
          </Text>

          <Pressable
            style={[
              styles.uploadBox,
              prescription &&
                styles.uploadBoxSelected,
            ]}
            onPress={pickPrescription}
            disabled={loading}
          >
            {prescription ? (
              <>
                <View style={styles.uploadIconSelected}>
                  <Ionicons
                    name="document-text"
                    size={30}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.selectedFileInfo}>
                  <Text
                    style={styles.selectedFileName}
                    numberOfLines={2}
                  >
                    {prescription.name}
                  </Text>

                  <Text style={styles.selectedFileHint}>
                    Prescription selected
                  </Text>
                </View>

                <Ionicons
                  name="checkmark-circle"
                  size={28}
                  color={COLORS.success}
                />
              </>
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={34}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.uploadTitle}>
                  Upload Prescription
                </Text>

                <Text style={styles.uploadHint}>
                  Tap to select an image
                </Text>
              </>
            )}
          </Pressable>

          {prescription && (
            <Pressable
              style={
                styles.changePrescriptionButton
              }
              onPress={pickPrescription}
              disabled={loading}
            >
              <Ionicons
                name="image-outline"
                size={18}
                color={COLORS.primary}
              />

              <Text
                style={
                  styles.changePrescriptionText
                }
              >
                Change prescription
              </Text>
            </Pressable>
          )}
        </View>

        {/* Submit */}
        <View style={styles.submitContainer}>
          <PrimaryButton
            title={
              loading
                ? "Submitting Order..."
                : "Submit Order"
            }
            onPress={handleSubmit}
            disabled={loading}
          />

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={COLORS.primary}
              />

              <Text style={styles.loadingText}>
                Uploading prescription and submitting
                your order...
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.muted,
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
    marginBottom: 15,
  },

  medicineInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicineInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: "#FAFCFC",
  },

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },

  medicineList: {
    marginTop: 14,
  },

  medicineItem: {
    minHeight: 50,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  medicineItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  medicineText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
    flex: 1,
  },

  uploadBox: {
    minHeight: 150,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#C9DAD8",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8FCFB",
  },

  uploadBoxSelected: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#B8D8D3",
    backgroundColor: "#F4FAF8",
    minHeight: 90,
    justifyContent: "flex-start",
  },

  uploadIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
    marginBottom: 12,
  },

  uploadIconSelected: {
    width: 55,
    height: 55,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
    marginRight: 12,
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },

  uploadHint: {
    fontSize: 13,
    color: COLORS.muted,
  },

  selectedFileInfo: {
    flex: 1,
    marginRight: 10,
  },

  selectedFileName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },

  selectedFileHint: {
    fontSize: 12,
    color: COLORS.primary,
  },

  changePrescriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingVertical: 8,
  },

  changePrescriptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 6,
  },

  submitContainer: {
    marginTop: 2,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    paddingHorizontal: 10,
  },

  loadingText: {
    fontSize: 12,
    color: COLORS.muted,
    marginLeft: 8,
  },

  bottomSpace: {
    height: 20,
  },
});

export default OrderMedicineForm;