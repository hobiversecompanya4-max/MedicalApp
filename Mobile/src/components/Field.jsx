import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius } from "../theme";

/**
 * Labeled text input wrapper used across login / register / order / admin forms.
 */
export default function Field({
  label,
  icon,
  error,
  style,
  inputStyle,
  ...inputProps
}) {
  return (
    <View style={[styles.wrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputWrap, error && styles.inputError]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <TextInput
          placeholderTextColor={colors.textLight}
          style={[styles.input, icon ? styles.inputWithIcon : null, inputStyle]}
          {...inputProps}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: "#fca5a5",
  },
  icon: {
    paddingLeft: 14,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.ink,
  },
  inputWithIcon: {
    paddingLeft: 10,
  },
  error: {
    color: colors.rose,
    fontSize: 12,
    marginTop: 6,
  },
});