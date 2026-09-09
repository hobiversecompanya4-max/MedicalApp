import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { colors } from "../theme";
import { isLoggedIn } from "../services/auth";
import ScreenHeader from "../components/ScreenHeader";
import OrderMedicineForm from "../components/OrderMedicineForm";
import PrimaryButton from "../components/PrimaryButton";

/**
 * Order screen — mirrors web Order.jsx (redirects to login when logged out).
 */
export default function OrderScreen() {
  const navigation = useNavigation();
  const loggedIn = isLoggedIn();

  // Keep the guard reactive when the tab regains focus.
  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn()) {
        navigation.navigate("Login");
      }
    }, [navigation])
  );

  if (!loggedIn) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader title="Order Medicine" />
        <View style={styles.prompt}>
          <Ionicons name="lock-closed" size={30} color={colors.brand} />
          <Text style={styles.promptTitle}>Login required</Text>
          <Text style={styles.promptText}>
            Please login to upload your prescription and place an order.
          </Text>
          <PrimaryButton
            title="Go to Login"
            style={styles.promptBtn}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="Order Medicine" subtitle="Panchawati Meds" />
      <OrderMedicineForm />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  prompt: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    gap: 10,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  promptText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
  promptBtn: {
    marginTop: 8,
    alignSelf: "stretch",
  },
});