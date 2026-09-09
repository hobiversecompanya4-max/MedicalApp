import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows } from "../theme";

const celebrationTags = [
  { label: "Weddings", bg: colors.brandSoft, tint: colors.brandStrong },
  { label: "Receptions", bg: colors.skySoft, tint: colors.sky },
  { label: "Birthday celebrations", bg: colors.brandSoft, tint: colors.brandStrong },
  { label: "Family gatherings", bg: colors.skySoft, tint: colors.sky },
];

const strengths = [
  {
    title: "Spacious",
    description:
      "A comfortable venue backdrop for larger gatherings, dining layouts, and smooth guest flow.",
    accent: "rgba(15, 118, 110, 0.34)",
    chip: { bg: colors.brandSoft, tint: colors.brandStrong },
  },
  {
    title: "Flexible",
    description:
      "Suitable for ceremonial moments, festive programs, and thoughtful event arrangements.",
    accent: "rgba(59, 130, 246, 0.32)",
    chip: { bg: colors.skySoft, tint: colors.sky },
  },
  {
    title: "Memorable",
    description:
      "Built for celebrations that feel calm, polished, and easy to enjoy from start to finish.",
    accent: "rgba(15, 118, 110, 0.34)",
    chip: { bg: colors.brandSoft, tint: colors.brandStrong },
  },
];

/**
 * "Other Partners" section (Panchwati Lawn), ported from OtherPartners.jsx.
 */
export default function PartnersSection() {
  return (
    <View style={styles.section}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowLabel}>OTHER PARTNERS</Text>
        <Text style={styles.rowHint}>Community collaborations we value</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.body}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Celebration venue partner</Text>
          </View>

          <Text style={styles.title}>Panchwati Lawn</Text>

          <Text style={styles.description}>
            For parties, marriages, and any celebration, Panchwati Lawn offers a
            generous setting with a soft, welcoming feel. It suits occasions that
            need comfort, movement, and a polished backdrop without visual clutter.
          </Text>

          <View style={styles.tags}>
            {celebrationTags.map((item) => (
              <View
                key={item.label}
                style={[styles.tag, { backgroundColor: item.bg }]}
              >
                <Text style={[styles.tagText, { color: item.tint }]}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.strengths}>
            {strengths.map((item) => (
              <View
                key={item.title}
                style={[styles.strengthCard, { borderLeftColor: item.accent }]}
              >
                <View
                  style={[styles.strengthChip, { backgroundColor: item.chip.bg }]}
                >
                  <Text
                    style={[styles.strengthChipText, { color: item.chip.tint }]}
                  >
                    {item.title}
                  </Text>
                </View>
                <Text style={styles.strengthText}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.side}>
          <Text style={styles.sideLabel}>Best for</Text>
          <View style={styles.sideCard}>
            <Text style={styles.sideCardLabel}>In one line</Text>
            <Text style={styles.sideCardText}>
              A dependable venue partner for celebrations that deserve a little
              more space, softness, and ease.
            </Text>
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
    backgroundColor: colors.surface,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  rowLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    color: colors.brandStrong,
  },
  rowHint: {
    fontSize: 10,
    color: colors.textLight,
  },
  card: {
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.92)",
    overflow: "hidden",
    ...shadows.card,
  },
  body: {
    padding: 18,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.brandStrong,
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
    color: colors.ink,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  tag: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },
  strengths: {
    gap: 10,
    marginTop: 18,
  },
  strengthCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderLeftWidth: 4,
    padding: 12,
  },
  strengthChip: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  strengthChipText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  strengthText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },
  side: {
    backgroundColor: "rgba(230,255,251,0.92)",
    padding: 18,
  },
  sideLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    color: colors.brandStrong,
  },
  sideCard: {
    marginTop: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.brandSoft,
    padding: 14,
  },
  sideCardLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.brandStrong,
    textTransform: "uppercase",
  },
  sideCardText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: colors.text,
  },
});