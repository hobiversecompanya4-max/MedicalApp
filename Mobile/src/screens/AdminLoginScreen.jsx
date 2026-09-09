import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import ScreenHeader from "../components/ScreenHeader";
import { loginAdmin } from "../services/api";
import { setAdminAuth } from "../services/auth";

/**
 * Admin sign-in, ported from pages/AdminLogin.jsx.
 */
export default function AdminLoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin({ email, password });

      await setAdminAuth(response.data.token, response.data.admin);

      navigation.replace("Admin");
    } catch (err) {
      const message = err.message || "Admin login failed";
      setError(message);
      Alert.alert("Admin sign in failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <ScreenHeader
        title="Admin Portal"
        subtitle="Panchawati Meds"
        onBack={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.safe} edges={["bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.brandWrap}>
              <View style={styles.logoBox}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
              </View>
              <Text style={styles.brandName}>
                Panchawati <Text style={styles.brandAccent}>Meds</Text>
              </Text>
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>ADMIN PORTAL</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Admin Sign In</Text>
              <Text style={styles.cardSubtitle}>
                Sign in to manage orders, prescriptions and medicines.
              </Text>

              <Field
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter admin email"
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Ionicons name="mail" size={18} color={colors.textLight} />}
              />

              <Field
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter admin password"
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
                title={loading ? "Signing in..." : "Login as Admin"}
                loading={loading}
                icon={<Ionicons name="arrow-forward" size={17} color={colors.white} />}
                style={styles.submit}
                onPress={handleSubmit}
              />
            </View>

            <View style={styles.securityRow}>
              <Ionicons name="shield-checkmark" size={15} color={colors.textLight} />
              <Text style={styles.securityText}>Secure administrator access</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  safe: {
    flex: 1,
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
    marginBottom: 26,
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
  adminBadge: {
    marginTop: 8,
    backgroundColor: colors.brandSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.brand,
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
    marginBottom: 18,
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