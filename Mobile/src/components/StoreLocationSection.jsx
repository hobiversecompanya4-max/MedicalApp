import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, shadows } from "../theme";
import { STORE_CONTACT } from "../config";
import PrimaryButton from "./PrimaryButton";

/**
 * Store location section, ported from StoreLocation.jsx.
 */
export default function StoreLocationSection() {
  const openMap = () => Linking.openURL(STORE_CONTACT.mapUrl);

  return (
    <View style={styles.section}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Visit our store</Text>
      </View>

      <Text style={styles.title}>Find Panchawati Medical Near You</Text>

      <Text style={styles.description}>
        Prefer to visit us in person? Our medical store is available for customers
        who want to purchase medicines, ask questions, or speak directly with our
        pharmacy team.
      </Text>

      <View style={styles.cards}>
        <View style={styles.infoCard}>
          <View style={[styles.iconBox, { backgroundColor: colors.brandSoft }]}>
            <Ionicons name="location" size={18} color={colors.brandStrong} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Panchawati Medical Store</Text>
            <Text style={styles.infoText}>
              Visit our store using the location provided on Google Maps.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={[styles.iconBox, { backgroundColor: colors.skySoft }]}>
            <Ionicons name="time" size={18} color={colors.sky} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>In-Person Assistance</Text>
            <Text style={styles.infoText}>
              Our team can help you with medicine availability, prescriptions, and
              general pharmacy guidance.
            </Text>
          </View>
        </View>
      </View>

      <PrimaryButton
        title="  Get Directions  ↗"
        icon={<Ionicons name="navigate" size={17} color={colors.white} />}
        style={styles.directionsBtn}
        onPress={openMap}
      />

      <View style={styles.mapCard}>
        <View style={styles.mapDecor} />
        <View style={styles.pin}>
          <Ionicons name="location" size={26} color={colors.white} />
        </View>
        <View style={styles.mapLabel}>
          <Text style={styles.mapLabelTitle}>Panchawati Medical Store</Text>
          <Text style={styles.mapLabelSub}>Open location in Google Maps</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: colors.brandStrong,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.ink,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  cards: {
    gap: 10,
    marginTop: 16,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  infoText: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    color: colors.text,
  },
  directionsBtn: {
    marginTop: 16,
  },
  mapCard: {
    marginTop: 18,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
    padding: 10,
    ...shadows.card,
  },
  mapDecor: {
    height: 190,
    borderRadius: radius.lg,
    backgroundColor: "rgba(233,242,239,0.98)",
    alignItems: "center",
    justifyContent: "center",
  },
  pin: {
    position: "absolute",
    top: "34%",
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.brand,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapLabel: {
    marginTop: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 12,
    alignItems: "center",
  },
  mapLabelTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.ink,
  },
  mapLabelSub: {
    marginTop: 2,
    fontSize: 10,
    color: colors.textLight,
  },
});