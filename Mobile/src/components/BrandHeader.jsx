import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors, radius, shadows } from "../theme";
import { STORE_PHONE } from "../config";
import { isLoggedIn } from "../services/auth";

/**
 * Sticky-looking top bar for the Home screen: brand logo + name,
 * "Call Pharmacist" chip and a profile shortcut (mirrors the Navbar).
 */
export default function BrandHeader() {
  const navigation = useNavigation();
  const loggedIn = isLoggedIn();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.row}>
        <View style={styles.brandRow}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />

          <View>
            <Text style={styles.eyebrow}>Digital Pharmacy</Text>
            <Text style={styles.brandName}>Panchawati Meds</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.callChip}
          onPress={() => Linking.openURL(`tel:${STORE_PHONE}`)}
        >
          <Ionicons name="call" size={15} color={colors.brandStrong} />
          <Text style={styles.callText}>Call Pharmacist</Text>
        </TouchableOpacity>

        {loggedIn ? (
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person" size={19} color={colors.brandStrong} />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.7)",
    ...shadows.card,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.textLight,
  },
  brandName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.brandStrong,
  },
  callChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.brandSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  callText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.brandStrong,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
});