import React from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors, radius } from "../theme";
import { STORE_PHONE, STORE_PHONE_DISPLAY } from "../config";

const quickLinks = [
  { label: "Home", screen: "Home" },
  { label: "How It Works", screen: "Home" },
  { label: "Order Medicine", screen: "Order" },
  { label: "Contact", screen: "Contact" },
];

const assurances = [
  "Genuine medicine sourcing",
  "Prescription verification",
  "Cold-chain delivery when required",
  "Tamper-evident packaging",
  "Delivery tracking",
];

/**
 * Footer, ported from Footer.jsx.
 */
export default function FooterSection() {
  const navigation = useNavigation();

  const goTo = (screen) => {
    if (screen === "Home") {
      // The footers' "How It Works" anchor scrolls — on mobile just go Home.
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.brandRow}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.brandName}>
          Panchawati <Text style={styles.brandAccent}>Medical</Text>
        </Text>
      </View>

      <Text style={styles.tagline}>
        Your trusted digital pharmacy for genuine medicines, prescription
        verification, pharmacist oversight, and reliable healthcare delivery.
      </Text>

      {/* Quick links */}
      <Text style={styles.heading}>Quick Links</Text>
      <View style={styles.links}>
        {quickLinks.map((link) => (
          <Pressable key={link.label} onPress={() => goTo(link.screen)}>
            <Text style={styles.linkText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Delivery assurances */}
      <Text style={styles.heading}>Delivery Assurances</Text>
      <View style={styles.assuranceList}>
        {assurances.map((item) => (
          <View key={item} style={styles.assuranceRow}>
            <Ionicons name="checkmark-circle" size={15} color={colors.brand} />
            <Text style={styles.assuranceText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Patient info */}
      <Text style={styles.heading}>Patient Information</Text>
      <Text style={styles.disclaimer}>
        Prescription medicines require a valid prescription from a licensed
        healthcare professional. Panchawati Medical is not a substitute for
        professional medical advice.
      </Text>

      <Pressable
        style={styles.support}
        onPress={() => Linking.openURL(`tel:${STORE_PHONE}`)}
      >
        <Ionicons name="call" size={15} color={colors.brand} />
        <Text style={styles.supportText}>
          Pharmacist Support {STORE_PHONE_DISPLAY}
        </Text>
      </Pressable>

      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} Panchawati Medical. All rights reserved.
        </Text>
        <Text style={styles.meta}>Maintained by hobiverse.companyA4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
  },
  brandAccent: {
    color: colors.brand,
  },
  tagline: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 19,
    color: colors.text,
  },
  heading: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  links: {
    marginTop: 10,
    gap: 8,
  },
  linkText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "600",
  },
  assuranceList: {
    marginTop: 10,
    gap: 6,
  },
  assuranceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  assuranceText: {
    fontSize: 12,
    color: colors.text,
  },
  disclaimer: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 19,
    color: colors.text,
  },
  support: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  supportText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand,
  },
  bottomBar: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
    gap: 4,
  },
  copyright: {
    fontSize: 11,
    color: colors.textLight,
  },
  meta: {
    fontSize: 11,
    color: colors.textLight,
  },
});