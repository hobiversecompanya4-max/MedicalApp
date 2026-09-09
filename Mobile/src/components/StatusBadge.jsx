import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

/**
 * Colored pill for an order / prescription status. Mirrors the
 * statusStyles map of the web admin panel.
 */
export default function StatusBadge({ status }) {
  const palette = colors.status[status] || {
    bg: colors.surface2,
    text: colors.text,
    border: colors.border,
  };

  return (
    <View style={[styles.badge, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <View style={[styles.dot, { backgroundColor: palette.text }]} />
      <Text style={[styles.text, { color: palette.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});