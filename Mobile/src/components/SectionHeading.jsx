import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

/**
 * Consistent section header: small pill + title + optional subtitle.
 * Mirrors the "animate-rise" section headings of the web app.
 */
export default function SectionHeading({ pill, title, subtitle, accentColor }) {
  const color = accentColor || colors.brandStrong;

  return (
    <View style={styles.wrap}>
      {pill ? (
        <View style={styles.pill}>
          <Text style={[styles.pillText, { color }]}>{pill}</Text>
        </View>
      ) : null}

      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginBottom: 22,
  },
  pill: {
    backgroundColor: colors.brandSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 12,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.ink,
    textAlign: "center",
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
    textAlign: "center",
  },
});