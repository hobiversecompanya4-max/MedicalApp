import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors, radius, shadows } from "../theme";
import { STORE_PHONE } from "../config";
import PrimaryButton from "./PrimaryButton";

const highlights = [
  {
    icon: "shield-checkmark",
    title: "Pharmacist verified",
    copy: "Every prescription is reviewed before dispatch.",
    bg: colors.brandSoft,
    tint: colors.brandStrong,
  },
  {
    icon: "car",
    title: "Free delivery",
    copy: "Available within a 5 km local delivery zone.",
    bg: colors.skySoft,
    tint: colors.sky,
  },
  {
    icon: "time",
    title: "Fast turnaround",
    copy: "Built for same-day local order handling.",
    bg: colors.amberSoft,
    tint: colors.amber,
  },
  {
    icon: "cube",
    title: "Secure packaging",
    copy: "Tamper-evident, carefully packed medicines.",
    bg: colors.violetSoft,
    tint: colors.violet,
  },
];

/**
 * Hero section ported from components/Herosection.jsx.
 */
export default function HeroSection() {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      {/* Badge */}
      <View style={styles.badge}>
        <Ionicons name="sparkles" size={13} color={colors.brand} />
        <Text style={styles.badgeText}>Trusted digital pharmacy</Text>
        <Text style={styles.badgeDivider}>|</Text>
        <Text style={styles.badgeSub}>Free delivery within 5 km</Text>
      </View>

      <Text style={styles.title}>
        Genuine medicines{"\n"}delivered with <Text style={styles.titleAccent}>care</Text>
      </Text>

      <Text style={styles.subtitle}>
        Upload your prescription, let our pharmacists verify it, and get clean,
        reliable medicine delivery in a calm, professional experience designed
        around trust.
      </Text>

      {/* CTAs */}
      <View style={styles.ctaRow}>
        <PrimaryButton
          title="Order Now"
          icon={<Ionicons name="arrow-forward" size={17} color={colors.white} />}
          style={styles.ctaPrimary}
          onPress={() => navigation.navigate("Order")}
        />
        <PrimaryButton
          title="Call Pharmacist"
          variant="light"
          icon={<Ionicons name="call" size={17} color={colors.brandStrong} />}
          style={styles.ctaSecondary}
          onPress={() => Linking.openURL(`tel:${STORE_PHONE}`)}
        />
      </View>

      {/* Trust row */}
      <View style={styles.trustRow}>
        <View style={styles.trustChip}>
          <Ionicons name="shield-checkmark" size={14} color={colors.brandStrong} />
          <Text style={styles.trustText}>Secure healthcare portal</Text>
        </View>
        <Text style={styles.trustNote}>Pharmacist-guided service with clear communication</Text>
      </View>

      {/* Highlights grid */}
      <View style={styles.grid}>
        {highlights.map((item) => {
          const iconName = item.icon;
          return (
            <View key={item.title} style={[styles.card, { backgroundColor: item.bg }]}>
              <Ionicons name={iconName} size={20} color={item.tint} />
              <Text style={[styles.cardTitle, { color: item.tint }]}>{item.title}</Text>
              <Text style={styles.cardCopy}>{item.copy}</Text>
            </View>
          );
        })}
      </View>

      {/* Hero image */}
      <View style={styles.imageCard}>
        <View style={styles.imageBadge}>
          <Ionicons name="shield-checkmark" size={12} color={colors.brandStrong} />
          <Text style={styles.imageBadgeText}>Pharmacist verified</Text>
        </View>
        <Image
          source={require("../../assets/hero.png")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.imageChips}>
          <View style={styles.imageChip}>
            <Text style={[styles.imageChipLabel, { color: colors.brandStrong }]}>Delivery</Text>
            <Text style={styles.imageChipValue}>Free within 5 km</Text>
          </View>
          <View style={styles.imageChip}>
            <Text style={[styles.imageChipLabel, { color: colors.sky }]}>Review</Text>
            <Text style={styles.imageChipValue}>Pharmacist checked</Text>
          </View>
          <View style={styles.imageChip}>
            <Text style={[styles.imageChipLabel, { color: colors.amber }]}>Packaging</Text>
            <Text style={styles.imageChipValue}>Secure and careful</Text>
          </View>
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
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    backgroundColor: colors.brandSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: colors.brandStrong,
  },
  badgeDivider: {
    color: colors.textLight,
  },
  badgeSub: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.8,
  },
  titleAccent: {
    color: colors.brand,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
  },
  ctaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  ctaPrimary: {
    flex: 1,
  },
  ctaSecondary: {
    flex: 1,
  },
  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  trustChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  trustText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.brandStrong,
  },
  trustNote: {
    fontSize: 12,
    color: colors.textLight,
    flexShrink: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  card: {
    width: "48.4%",
    borderRadius: radius.lg,
    padding: 14,
    gap: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  cardCopy: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.ink,
    opacity: 0.75,
  },
  imageCard: {
    marginTop: 22,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    overflow: "hidden",
    ...shadows.card,
  },
  imageBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  imageBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: colors.brandStrong,
  },
  heroImage: {
    width: "100%",
    height: 230,
  },
  imageChips: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    gap: 8,
  },
  imageChip: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
  },
  imageChipLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  imageChipValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.ink,
    marginTop: 2,
  },
});