import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../theme";

/**
 * Cross-app button with a primary (brand) and secondary (outline/light)
 * variant, plus a loading spinner — mirrors .qm-btn-primary styling.
 */
export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  icon = null,
  style,
  textStyle,
}) {
  const isPrimary = variant === "primary";
  const isLight = variant === "light";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        isLight && styles.light,
        variant === "outline" && styles.outline,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? colors.white : isLight ? colors.brand : colors.brand}
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              isPrimary && styles.primaryText,
              isLight && styles.lightText,
              variant === "outline" && styles.outlineText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.lg,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primary: {
    backgroundColor: colors.brand,
    borderWidth: 1,
    borderColor: "rgba(15,118,110,0.08)",
  },
  light: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.brand,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ translateY: 1 }],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  primaryText: {
    color: colors.white,
  },
  lightText: {
    color: colors.brandStrong,
  },
  outlineText: {
    color: colors.brand,
  },
});