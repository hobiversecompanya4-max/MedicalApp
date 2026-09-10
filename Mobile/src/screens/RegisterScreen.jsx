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
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { colors, radius } from "../theme";
import Field from "../components/Field";
import PrimaryButton from "../components/PrimaryButton";
import { registerUser } from "../services/api";
import { setAuth } from "../services/auth";

const EMPTY_FORM = { name: "", phone: "", email: "", password: "" };

/**
 * Register screen, ported from pages/Register.jsx.
 */
export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await registerUser(form);

      await setAuth(response.data.token, response.data.user);

      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (err) {
      const message = err.message || "Registration failed";
      setError(message);
      Alert.alert("Registration failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brandWrap}>
            <View style={styles.logoBox}>
              <Image source={require("../../assets/logo.png")} style={styles.logo} />
            </View>
            <Text style={styles.brandName}>
              Panchawati <Text style={styles.brandAccent}>Medical</Text>
            </Text>
            <Text style={styles.brandTagline}>
              Your trusted partner for medicines & healthcare
            </Text>
          </View>

          {/* Register card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create your account</Text>
            <Text style={styles.cardSubtitle}>
              Join Panchawati Medical and manage your healthcare with ease.
            </Text>

            <Field
              label="Full Name"
              value={form.name}
              onChangeText={(v) => handleChange("name", v)}
              placeholder="Enter your full name"
              autoCapitalize="words"
              icon={<Ionicons name="person" size={18} color={colors.textLight} />}
            />

            <Field
              label="Phone Number"
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
              placeholder="Enter 10-digit phone number"
              keyboardType="phone-pad"
              maxLength={10}
              icon={<Ionicons name="call" size={18} color={colors.textLight} />}
            />

            <Field
              label="Email"
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Ionicons name="mail" size={18} color={colors.textLight} />}
            />

            <Field
              label="Password"
              value={form.password}
              onChangeText={(v) => handleChange("password", v)}
              placeholder="Create a password"
              secureTextEntry
              icon={<Ionicons name="lock-closed" size={18} color={colors.textLight} />}
            />

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={17} color={colors.rose} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <PrimaryButton
              title={loading ? "Creating Account..." : "Create Account"}
              loading={loading}
              icon={<Ionicons name="arrow-forward" size={17} color={colors.white} />}
              style={styles.submit}
              onPress={handleSubmit}
            />
          </View>

          {/* Login */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.switchLink}>Login</Text>
            </Pressable>
          </View>

          <View style={styles.securityRow}>
            <Ionicons name="shield-checkmark" size={15} color={colors.textLight} />
            <Text style={styles.securityText}>
              Your information is securely protected
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  brandWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: radius.lg,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.ink,
  },
  brandAccent: {
    color: colors.brand,
  },
  brandTagline: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textLight,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 22,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  cardSubtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
    color: colors.textLight,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: colors.rose,
  },
  submit: {
    marginTop: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  switchText: {
    fontSize: 14,
    color: colors.textLight,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.brand,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 18,
  },
  securityText: {
    fontSize: 12,
    color: colors.textLight,
  },
});