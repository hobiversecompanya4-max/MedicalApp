import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, shadows } from "../theme";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    icon: "cloud-upload",
    title: "Upload your prescription",
    description:
      "Share a clear photo or PDF of your prescription and add the delivery details in one quick step.",
    note: "Accepted formats: JPG, PNG, HEIC, PDF",
    bg: colors.brandSoft,
    tint: colors.brandStrong,
  },
  {
    number: "02",
    icon: "clipboard",
    title: "Pharmacist review",
    description:
      "Our team checks the prescription carefully, confirms dosage details, and prepares the order for dispatch.",
    note: "Review updates are shared by SMS",
    bg: colors.skySoft,
    tint: colors.sky,
  },
  {
    number: "03",
    icon: "car",
    title: "Fast local delivery",
    description:
      "Your medicines are sealed, packed neatly, and dispatched with a simple handoff for local delivery.",
    note: "Free delivery within 5 km",
    bg: colors.amberSoft,
    tint: colors.amber,
  },
];

/**
 * "How ordering via prescription works" section, ported from HowToOrder.jsx.
 */
export default function HowToOrderSection() {
  return (
    <View style={styles.section}>
      <View style={styles.card}>
        <SectionHeading
          pill="Streamlined dispensing workflow"
          title="How ordering via prescription works"
          subtitle="The process stays simple, compliant, and easy to follow, so your medicine order moves from upload to delivery without unnecessary friction."
        />

        <View style={styles.steps}>
          {steps.map((step) => {
            return (
              <View key={step.number} style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <View style={[styles.iconBox, { backgroundColor: step.bg }]}>
                    <Ionicons name={step.icon} size={18} color={step.tint} />
                  </View>
                  <View style={[styles.numberChip, { backgroundColor: step.bg }]}>
                    <Text style={[styles.numberText, { color: step.tint }]}>{step.number}</Text>
                  </View>
                </View>

                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>

                <View style={styles.noteChip}>
                  <Ionicons name="arrow-forward" size={13} color={step.tint} />
                  <Text style={[styles.noteText, { color: step.tint }]}>{step.note}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: colors.surface,
  },
  card: {
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
    padding: 18,
    ...shadows.card,
  },
  steps: {
    gap: 12,
  },
  stepCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
    padding: 16,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  numberChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  numberText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  stepDescription: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: colors.text,
  },
  noteChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: 12,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noteText: {
    fontSize: 11,
    fontWeight: "700",
  },
});