import React, { useState } from "react";
import {
  Alert,
  Image,
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

import api from "../services/api";
import { colors, radius, shadows } from "../theme";
import Field from "./Field";
import PrimaryButton from "./PrimaryButton";

const EMPTY_FORM = {
  name: "",
  phone: "",
  confirmMobile: "",
  alternatePhone: "",
  address: "",
  medicine: "",
};

/**
 * Order form ported from components/OrderMedicine.jsx.
 * Prescription upload uses the device camera / photo library.
 */
export default function OrderMedicineForm() {
  const [prescription, setPrescription] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const pickPrescription = async (mode) => {
    try {
      if (mode === "camera") {
        const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPerm.granted) {
          Alert.alert(
            "Camera permission needed",
            "Please allow camera access to capture your prescription."
          );
          return;
        }
      } else {
        const libraryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!libraryPerm.granted) {
          Alert.alert(
            "Photo access needed",
            "Please allow photo access to upload your prescription."
          );
          return;
        }
      }

      const pickerOptions = {
        mediaTypes: ["images"],
        quality: 0.8,
      };

      const result =
        mode === "camera"
          ? await ImagePicker.launchCameraAsync(pickerOptions)
          : await ImagePicker.launchImageLibraryAsync(pickerOptions);

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        setPrescription({
          uri: asset.uri,
          name: asset.fileName || `prescription-${Date.now()}.jpg`,
          type: asset.mimeType || "image/jpeg",
        });
      }
    } catch (error) {
      Alert.alert("Upload failed", error.message || "Could not pick an image.");
    }
  };

  const addMedicine = () => {
    if (!formData.medicine.trim()) return;

    setMedicines((prev) => [
      ...prev,
      { name: formData.medicine.trim(), quantity: 1, price: 0 },
    ]);
    setFormData((prev) => ({ ...prev, medicine: "" }));
  };

  const removeMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (formData.phone !== formData.confirmMobile) {
      Alert.alert("Mobile numbers do not match");
      return;
    }

    if (!prescription) {
      Alert.alert("Prescription required", "Please upload your prescription.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("alternatePhone", formData.alternatePhone);
      data.append(
        "deliveryAddress",
        JSON.stringify({
          addressLine: formData.address,
          city: "Lucknow",
          state: "Uttar Pradesh",
          pincode: "226001",
          landmark: "",
        })
      );
      data.append("medicines", JSON.stringify(medicines));
      data.append("prescriptionRequired", "true");
      data.append("paymentMethod", "COD");
      data.append("notes", "");
      data.append("prescription", {
        uri: prescription.uri,
        name: prescription.name,
        type: prescription.type,
      });

      const response = await api.post("/orders", data);

      Alert.alert(
        "Order submitted successfully!",
        `Order ID: ${response.data.orderId}`
      );

      setFormData(EMPTY_FORM);
      setMedicines([]);
      setPrescription(null);
    } catch (error) {
      console.error("Order submission failed:", error);
      Alert.alert("Order failed", error.message || "Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderFormBody
      prescription={prescription}
      pickPrescription={pickPrescription}
      formData={formData}
      handleChange={handleChange}
      medicines={medicines}
      addMedicine={addMedicine}
      removeMedicine={removeMedicine}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}

function SectionLabel({ icon, title, subtitle, optional }) {
  return (
    <View style={styles.sectionLabel}>
      <View style={styles.sectionLabelText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {optional ? (
        <Text style={styles.optionalText}>Optional</Text>
      ) : (
        <Ionicons name={icon} size={18} color={colors.brand} />
      )}
    </View>
  );
}

function OrderFormBody({
  prescription,
  pickPrescription,
  formData,
  handleChange,
  medicines,
  addMedicine,
  removeMedicine,
  handleSubmit,
  loading,
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Heading */}
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>Order Medicine</Text>
          <Text style={styles.headingSubtitle}>
            Upload your prescription and add the delivery details in one quick step.
          </Text>
        </View>

        {/* Prescription upload */}
        <View style={styles.card}>
          <SectionLabel
            icon="document-text"
            title="Upload Prescription"
            subtitle="A clear photo of your prescription helps our pharmacist verify faster."
          />

          {prescription ? (
            <View style={styles.uploadedWrap}>
              <Image source={{ uri: prescription.uri }} style={styles.uploadedPreview} />
              <View style={styles.uploadedInfo}>
                <Text style={styles.uploadedName} numberOfLines={1}>
                  {prescription.name}
                </Text>
                <Text style={styles.uploadedNote}>
                  Tap “Change” to pick a different file.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadEmpty}>
              <Ionicons name="cloud-upload" size={34} color={colors.brand} />
              <Text style={styles.uploadEmptyTitle}>No prescription uploaded yet</Text>
              <Text style={styles.uploadEmptySub}>JPG, PNG, HEIC or PDF</Text>
            </View>
          )}

          <View style={styles.uploadButtons}>
            <PrimaryButton
              title="Take Photo"
              variant="light"
              icon={<Ionicons name="camera" size={17} color={colors.brandStrong} />}
              style={styles.uploadBtn}
              onPress={() => pickPrescription("camera")}
            />
            <PrimaryButton
              title={prescription ? "Change" : "Choose from Library"}
              variant="light"
              icon={<Ionicons name="images" size={17} color={colors.brandStrong} />}
              style={styles.uploadBtn}
              onPress={() => pickPrescription("library")}
            />
          </View>
        </View>

        {/* Delivery details */}
        <View style={styles.card}>
          <SectionLabel
            icon="person"
            title="Delivery Details"
            subtitle="Where should we deliver your medicines?"
          />

          <Field
            label="Full Name"
            value={formData.name}
            onChangeText={(v) => handleChange("name", v)}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <Field
            label="Mobile Number"
            value={formData.phone}
            onChangeText={(v) => handleChange("phone", v.replace(/\D/g, ""))}
            placeholder="Enter 10-digit mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Confirm Mobile"
            value={formData.confirmMobile}
            onChangeText={(v) => handleChange("confirmMobile", v.replace(/\D/g, ""))}
            placeholder="Re-enter mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Alternate Phone"
            value={formData.alternatePhone}
            onChangeText={(v) => handleChange("alternatePhone", v.replace(/\D/g, ""))}
            placeholder="Alternate number (optional)"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Field
            label="Delivery Address"
            value={formData.address}
            onChangeText={(v) => handleChange("address", v)}
            placeholder="House no, street, area..."
            multiline
            numberOfLines={3}
            style={styles.addressStyle}
          />
        </View>
{/* Medicines */}
        <View style={styles.card}>
          <SectionLabel
            icon="medkit"
            title="Medicines"
            subtitle="If you already know the medicine name, you can add it here."
            optional
          />

          <View style={styles.medicineInputRow}>
            <TextInput
              value={formData.medicine}
              onChangeText={(v) => handleChange("medicine", v)}
              placeholder="Enter medicine name"
              placeholderTextColor={colors.textLight}
              style={styles.medicineInput}
            />
            <Pressable style={styles.medicineAddBtn} onPress={addMedicine}>
              <Text style={styles.medicineAddText}>+ Add</Text>
            </Pressable>
          </View>

          {medicines.length > 0 ? (
            <View style={styles.medicineList}>
              {medicines.map((medicine, index) => (
                <View key={index} style={styles.medicineRow}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <Pressable
                    onPress={() => removeMedicine(index)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.medicineRemove}>Remove</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* Verification note */}
        <View style={styles.verifyCard}>
          <Ionicons name="checkmark-circle" size={20} color={colors.brand} />
          <View style={styles.verifyTextWrap}>
            <Text style={styles.verifyTitle}>Pharmacist Verification</Text>
            <Text style={styles.verifyText}>
              Your prescription will be reviewed by our pharmacist before the
              order is confirmed.
            </Text>
          </View>
        </View>

        <PrimaryButton
          title={loading ? "Submitting Order..." : "Submit Order Request"}
          loading={loading}
          style={styles.submit}
          onPress={handleSubmit}
        />

        <Text style={styles.footnote}>
          Your information is used only to process your medicine order.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 16,
  },
  headingTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.ink,
  },
  headingSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 14,
    ...shadows.card,
  },
  sectionLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 10,
  },
  sectionLabelText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colors.text,
  },
  optionalText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  uploadEmpty: {
    alignItems: "center",
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.border,
    paddingVertical: 24,
    gap: 6,
  },
  uploadEmptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  uploadEmptySub: {
    fontSize: 12,
    color: colors.textLight,
  },
  uploadedWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
  },
  uploadedPreview: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
  },
  uploadedInfo: {
    flex: 1,
  },
  uploadedName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  uploadedNote: {
    marginTop: 2,
    fontSize: 12,
    color: colors.text,
  },
  uploadButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  uploadBtn: {
    flex: 1,
  },
  addressStyle: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  medicineInputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  medicineInput: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.ink,
  },
  medicineAddBtn: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.brand,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  medicineAddText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.brand,
  },
  medicineList: {
    marginTop: 12,
    gap: 8,
  },
  medicineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  medicineName: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
  },
  medicineRemove: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.rose,
  },
  verifyCard: {
    flexDirection: "row",
    gap: 10,
    borderRadius: radius.md,
    backgroundColor: colors.brandSoft,
    borderWidth: 1,
    borderColor: "#cfe9e1",
    padding: 14,
    marginBottom: 14,
  },
  verifyTextWrap: {
    flex: 1,
  },
  verifyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  verifyText: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: colors.text,
  },
  submit: {
    marginBottom: 10,
  },
  footnote: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textLight,
  },
});