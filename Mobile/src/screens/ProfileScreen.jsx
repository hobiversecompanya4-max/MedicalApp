import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { colors, radius, shadows } from "../theme";
import { ORDER_STATUS_FLOW } from "../theme";
import { getUser, getToken, isLoggedIn, logout } from "../services/auth";
import { getUserProfile } from "../services/api";
import api from "../services/api";

import ScreenHeader from "../components/ScreenHeader";
import StatusBadge from "../components/StatusBadge";
import PrimaryButton from "../components/PrimaryButton";

const ORDERS_STATUS_FLOW = ORDER_STATUS_FLOW;

function TrackingModal({ order, onClose }) {
  if (!order) return null;

  const currentIndex = ORDERS_STATUS_FLOW.indexOf(order.orderStatus);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderText}>
              <Text style={styles.modalTitle}>Order Tracking</Text>
              <Text style={styles.modalSubtitle}>
                Order ID: {order.orderId}
              </Text>
            </View>

            <Pressable
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.currentStatus}>
            <Text style={styles.currentStatusLabel}>Current Status</Text>
            <StatusBadge status={order.orderStatus} />
          </View>

          <Text style={styles.timelineHeading}>Order Status</Text>

          <View style={styles.timeline}>
            {ORDERS_STATUS_FLOW.map((status, index) => {
              const isCompleted = index <= currentIndex;
              const isCurrent = status === order.orderStatus;

              return (
                <View key={status} style={styles.timelineRow}>
                  <View
                    style={[
                      styles.timelineDot,
                      isCompleted && styles.timelineDotDone,
                    ]}
                  >
                    {isCompleted ? (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={colors.white}
                      />
                    ) : (
                      <Text style={styles.timelineDotNumber}>
                        {index + 1}
                      </Text>
                    )}
                  </View>

                  <View style={styles.timelineTextWrap}>
                    <Text
                      style={[
                        styles.timelineStatus,
                        isCurrent && styles.timelineStatusCurrent,
                        !isCompleted &&
                          !isCurrent &&
                          styles.timelineStatusMuted,
                      ]}
                    >
                      {status}
                    </Text>

                    {isCurrent ? (
                      <Text style={styles.timelineNote}>
                        Current status
                      </Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>

          <PrimaryButton
            title="Close"
            variant="light"
            onPress={onClose}
            style={styles.modalClose}
          />
        </View>
      </View>
    </Modal>
  );
}

/**
 * Profile screen
 * - Logged out: shows a Login button
 * - Logged in: loads profile and orders
 * - Expired/invalid token: shows login state instead of infinite loading
 */
export default function ProfileScreen() {
  const navigation = useNavigation();

  const initiallyLoggedIn = Boolean(getToken()) && isLoggedIn();

  const [user, setUser] = useState(initiallyLoggedIn ? getUser() : null);
  const [loading, setLoading] = useState(initiallyLoggedIn);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingError, setTrackingError] = useState("");

  const fetchProfile = useCallback(async (isRefresh = false) => {
    const token = getToken();

    // Not logged in: do not make an API request.
    if (!token || !isLoggedIn()) {
      setUser(null);
      setOrders([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      if (!isRefresh) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response = await getUserProfile(token);

      const ordersResponse = await api.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);

      setOrders(
        Array.isArray(ordersResponse.data)
          ? ordersResponse.data
          : []
      );
    } catch (err) {
      console.log("Profile fetch error:", err);

      // Token expired or is invalid.
      if (
        err?.response?.status === 401 ||
        err?.response?.status === 403
      ) {
        setUser(null);
        setOrders([]);
        setError("Your session has expired. Please login again.");
      } else {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load profile."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Re-check authentication and refresh the profile
  // whenever the Profile tab gets focus.
  useFocusEffect(
    useCallback(() => {
      fetchProfile();

      return undefined;
    }, [fetchProfile])
  );

  const handleTrackOrder = async (orderId) => {
    try {
      setTrackingError("");

      const token = getToken();

      if (!token || !isLoggedIn()) {
        setTrackingError("Please login first.");
        return;
      }

      const response = await api.get(`/orders/track/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedOrder(response.data.order);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to track this order.";

      setTrackingError(message);
      Alert.alert("Tracking failed", message);
    }
  };

  const handleLogout = async () => {
    await logout();

    setUser(null);
    setOrders([]);
    setError("");
    setSelectedOrder(null);

    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  // Logged-out state.
  // Show Login immediately instead of "Loading profile..."
  if (!isLoggedIn() || !getToken()) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader
          title="My Profile"
          subtitle="Panchawati Medical"
        />

        <View style={styles.loginContainer}>
          <View style={styles.loginIcon}>
            <Ionicons
              name="person-outline"
              size={42}
              color={colors.brand}
            />
          </View>

          <Text style={styles.loginTitle}>
            Login to view your profile
          </Text>

          <Text style={styles.loginDescription}>
            Login to see your profile, orders and track your
            medicine deliveries.
          </Text>

          <PrimaryButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            style={styles.loginButton}
          />
        </View>
      </View>
    );
  }

  // Logged-in state while the profile is loading.
  if (loading) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader
          title="My Profile"
          subtitle="Panchawati Medical"
        />

        <View style={styles.center}>
          <Text style={styles.loadingText}>
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ScreenHeader
        title="My Profile"
        subtitle="Panchawati Medical"
        right={
          <Pressable
            style={styles.logoutBtn}
            onPress={handleLogout}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <Ionicons
              name="log-out"
              size={20}
              color={colors.rose}
            />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchProfile(true)}
          />
        }
      >
        {/* Profile card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>My Profile</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {user ? (
            <View style={styles.profileRows}>
              <ProfileRow
                label="Name"
                value={user.name}
                icon="person"
              />

              <ProfileRow
                label="Phone"
                value={user.phone}
                icon="call"
              />

              {user.email ? (
                <ProfileRow
                  label="Email"
                  value={user.email}
                  icon="mail"
                />
              ) : null}

              {user.address ? (
                <ProfileRow
                  label="Address"
                  value={String(user.address)}
                  icon="location"
                />
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Orders */}
        <View style={styles.ordersHeader}>
          <Text style={styles.ordersTitle}>My Orders</Text>
          <Text style={styles.ordersCount}>
            {orders.length} order(s)
          </Text>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="receipt-outline"
              size={30}
              color={colors.textLight}
            />

            <Text style={styles.emptyTitle}>
              No orders yet
            </Text>

            <Text style={styles.emptyText}>
              Once you place an order, it will show up here
              for tracking.
            </Text>

            <PrimaryButton
              title="Order Medicine"
              style={styles.emptyBtn}
              onPress={() => navigation.navigate("Order")}
            />
          </View>
        ) : (
          <View style={styles.ordersList}>
            {orders.map((order) => (
              <Pressable
                key={order.orderId || order._id}
                style={({ pressed }) => [
                  styles.orderCard,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  handleTrackOrder(
                    order.orderId || order._id
                  )
                }
              >
                <View style={styles.orderTop}>
                  <Text style={styles.orderId}>
                    {order.orderId || order._id}
                  </Text>

                  <StatusBadge
                    status={
                      order.orderStatus ||
                      order.status ||
                      "Pending"
                    }
                  />
                </View>

                {Array.isArray(order.medicines) &&
                order.medicines.length > 0 ? (
                  <Text
                    style={styles.orderMedicines}
                    numberOfLines={1}
                  >
                    {order.medicines
                      .map((m) => m.name)
                      .join(", ")}
                  </Text>
                ) : null}

                <View style={styles.orderBottom}>
                  {order.createdAt ? (
                    <Text style={styles.orderDate}>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  ) : null}

                  <View style={styles.trackLink}>
                    <Text style={styles.trackLinkText}>
                      Track
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={colors.brand}
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {trackingError ? (
          <Text style={styles.trackingError}>
            {trackingError}
          </Text>
        ) : null}
      </ScrollView>

      <TrackingModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </View>
  );
}

function ProfileRow({ label, value, icon }) {
  if (!value) return null;

  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons
          name={icon}
          size={16}
          color={colors.brand}
        />
      </View>

      <View>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 15,
    color: colors.textLight,
  },

  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loginIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  loginTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.ink,
    textAlign: "center",
  },

  loginDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textLight,
    textAlign: "center",
    maxWidth: 320,
  },

  loginButton: {
    marginTop: 22,
    minWidth: 180,
  },

  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 18,
    ...shadows.card,
  },

  cardHeading: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.brand,
    marginBottom: 12,
  },

  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 12,
  },

  errorText: {
    fontSize: 13,
    color: colors.rose,
  },

  profileRows: {
    gap: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  rowLabel: {
    fontSize: 12,
    color: colors.textLight,
  },

  rowValue: {
    marginTop: 1,
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink,
  },

  ordersHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 12,
  },

  ordersTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },

  ordersCount: {
    fontSize: 13,
    color: colors.textLight,
  },

  emptyCard: {
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    backgroundColor: colors.white,
    padding: 26,
    gap: 8,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },

  emptyText: {
    fontSize: 13,
    color: colors.text,
    textAlign: "center",
  },

  emptyBtn: {
    marginTop: 8,
    alignSelf: "stretch",
  },

  ordersList: {
    gap: 10,
  },

  pressed: {
    opacity: 0.85,
  },

  orderCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 14,
    ...shadows.card,
  },

  orderTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  orderId: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
  },

  orderMedicines: {
    marginTop: 8,
    fontSize: 13,
    color: colors.text,
  },

  orderBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  orderDate: {
    fontSize: 12,
    color: colors.textLight,
  },

  trackLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  trackLinkText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand,
  },

  trackingError: {
    marginTop: 12,
    fontSize: 13,
    color: colors.rose,
    textAlign: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },

  modalCard: {
    width: "100%",
    maxWidth: 480,
    maxHeight: "85%",
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  modalHeaderText: {
    flex: 1,
    paddingRight: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.brand,
  },

  modalSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textLight,
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  currentStatus: {
    marginTop: 16,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  currentStatusLabel: {
    fontSize: 13,
    color: colors.textLight,
  },

  timelineHeading: {
    marginTop: 20,
    marginBottom: 14,
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },

  timeline: {
    gap: 14,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  timelineDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  timelineDotDone: {
    borderColor: colors.brand,
    backgroundColor: colors.brand,
  },

  timelineDotNumber: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textLight,
  },

  timelineTextWrap: {
    flex: 1,
  },

  timelineStatus: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },

  timelineStatusCurrent: {
    color: colors.brand,
  },

  timelineStatusMuted: {
    color: colors.textLight,
  },

  timelineNote: {
    marginTop: 1,
    fontSize: 12,
    color: colors.textLight,
  },

  modalClose: {
    marginTop: 20,
  },
});
