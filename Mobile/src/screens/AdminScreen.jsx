import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { colors, radius, shadows } from "../theme";
import { FormStatus } from "../theme";
import { getAdmin, getAdminToken, isAdminLoggedIn, logoutAdmin } from "../services/auth";
import api from "../services/api";

import ScreenHeader from "../components/ScreenHeader";
import StatusBadge from "../components/StatusBadge";
import PrimaryButton from "../components/PrimaryButton";

const DEFAULT_STATS = {
  totalOrders: 0,
  pendingOrders: 0,
  confirmedOrders: 0,
  deliveredOrders: 0,
  totalRevenue: 0,
};

/* ------------------------- stat card ------------------------- */

function StatCard({ label, value, icon, tint, bg }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={tint} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

/* ------------------- prescription viewer modal ------------------- */

function PrescriptionModal({ file, onClose }) {
  if (!file) return null;
  const isImage = file.type === "image";

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.previewBackdrop} onPress={onClose}>
        {isImage ? (
          <View style={styles.previewWrap}>
            <Image
              source={{ uri: file.url }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <View style={styles.previewFooter}>
              <Text style={styles.previewName} numberOfLines={1}>
                {file.name}
              </Text>
              <Pressable
                style={styles.openBtn}
                onPress={() => Linking.openURL(file.url)}
              >
                <Ionicons name="open-outline" size={15} color={colors.ink} />
                <Text style={styles.openBtnText}>Open</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.previewPdf}>
            <View style={styles.pdfIcon}>
              <Ionicons name="document-text" size={44} color={colors.rose} />
            </View>
            <Text style={styles.previewName}>{file.name}</Text>
            <Text style={styles.previewPdfSub}>PDF Prescription</Text>
            <Pressable
              style={styles.openBtn}
              onPress={() => Linking.openURL(file.url)}
            >
              <Ionicons name="open-outline" size={15} color={colors.white} />
              <Text style={styles.openBtnTextLight}>Open PDF</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </Modal>
  );
}

/* --------------------- order detail modal --------------------- */

function OrderDetailModal({ order, onClose, onUpdateStatus, onOpenPrescription }) {
  if (!order) return null;
  const [saving, setSaving] = useState(false);

  const changeStatus = async (status) => {
    setSaving(true);
    try {
      await onUpdateStatus(order.id, status);
    } finally {
      setSaving(false);
    }
  };

  const items = Array.isArray(order.medicines) ? order.medicines : [];
  const total = Number(order.total || 0);

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.detailBackdrop}>
        <View style={styles.detailCard}>
          {/* Header */}
          <View style={styles.detailHeader}>
            <View style={styles.detailHeaderText}>
              <Text style={styles.detailOrderId}>{order.id}</Text>
              <StatusBadge status={order.status || "Pending"} />
            </View>
            <Pressable
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>

          {/* Customer */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Customer</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.detailText}>📞 {order.phone}</Text>
            <Text style={styles.detailText}>📍 {order.address}</Text>
          </View>

          {/* Prescription */}
          {order.prescription && order.prescriptionFile ? (
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionLabel}>Prescription</Text>
                <View style={styles.uploadedChip}>
                  <Text style={styles.uploadedChipText}>Customer Uploaded</Text>
                </View>
              </View>
              <Pressable
                style={styles.prescriptionRow}
                onPress={() => onOpenPrescription(order.prescriptionFile)}
              >
                <View style={styles.prescriptionIcon}>
                  <Ionicons
                    name={order.prescriptionFile.type === "image" ? "image" : "document-text"}
                    size={20}
                    color={order.prescriptionFile.type === "image" ? colors.violet : colors.rose}
                  />
                </View>
                <Text style={styles.prescriptionName} numberOfLines={1}>
                  {order.prescriptionFile.name}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
              </Pressable>
            </View>
          ) : null}

          {/* Medicines */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Order Items</Text>
            {items.length === 0 ? (
              <Text style={styles.detailText}>No items recorded.</Text>
            ) : (
              items.map((medicine, index) => (
                <View key={index} style={styles.medicineItem}>
                  <View style={styles.medicineInfo}>
                    <Text style={styles.medicineName}>{medicine.name}</Text>
                    <Text style={styles.detailText}>Qty: {medicine.quantity}</Text>
                  </View>
                  <Text style={styles.medicinePrice}>
                    ₹{(Number(medicine.price || 0) * Number(medicine.quantity || 1)).toLocaleString("en-IN")}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.detailText}>Order Date</Text>
              <Text style={styles.summaryValue}>{order.date}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.detailText}>Payment</Text>
              <Text style={styles.summaryValue}>{order.payment}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>Total Amount</Text>
              <Text style={styles.summaryTotalValue}>
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>

          {/* Status update */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Update Order Status</Text>
            <View style={styles.statusButtons}>
              {FormStatus.map((status) => {
                const selected = order.status === status;
                return (
                  <Pressable
                    key={status}
                    style={[
                      styles.statusButton,
                      selected && styles.statusButtonSelected,
                    ]}
                    onPress={() => changeStatus(status)}
                    disabled={saving}
                  >
                    {saving && selected ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <Text
                        style={[
                          styles.statusButtonText,
                          selected && styles.statusButtonTextSelected,
                        ]}
                      >
                        {status}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <PrimaryButton
            title="Close"
            variant="light"
            onPress={onClose}
            style={styles.detailClose}
          />
        </View>
      </View>
    </Modal>
  );
}

/* ------------------------- main admin screen ------------------------- */

/**
 * Admin orders dashboard, ported from components/AdminSection.jsx.
 */
export default function AdminScreen() {
  const navigation = useNavigation();

  const [admin, setAdmin] = useState(getAdmin());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [previewPrescription, setPreviewPrescription] = useState(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      const token = getAdminToken();

      if (!token) {
        setApiError("Admin authentication required");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (!isRefresh) setLoading(true);
      if (isRefresh) setRefreshing(true);
      setApiError("");

      const [ordersResponse, statsResponse] = await Promise.all([
        api.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/admin/dashboard"),
      ]);

      setStats({
        totalOrders: statsResponse.data.orders?.total || 0,
        pendingOrders: statsResponse.data.orders?.pending || 0,
        confirmedOrders: statsResponse.data.orders?.confirmed || 0,
        deliveredOrders: statsResponse.data.orders?.delivered || 0,
        totalRevenue: statsResponse.data.orders?.totalRevenue || 0,
      });

      const backendOrders = Array.isArray(ordersResponse.data)
        ? ordersResponse.data
        : [];

      const normalized = backendOrders.map((order) => {
        const customer = order.customer || {};
        const customerDetails = customer.userId || {};
        const prescription = order.prescription || {};
        const prescriptionDetails = prescription.prescriptionId || {};
        const prescriptionFileData = prescriptionDetails.file || null;

        const medicines = Array.isArray(order.medicines) ? order.medicines : [];
        const createdAt = order.createdAt ? new Date(order.createdAt) : null;
        const total = Number(order.totalAmount ?? order.total ?? order.grandTotal ?? 0);

        return {
          ...order,
          id: order.orderId || order._id || "Unknown",
          customerName:
            customer.name || customerDetails.name || order.name || "Unknown Customer",
          phone: customer.phone || customerDetails.phone || order.phone || "N/A",
          address:
            (typeof customer.address === "string"
              ? customer.address
              : [customer.address?.addressLine, customer.address?.city, customer.address?.state, customer.address?.pincode].filter(Boolean).join(", ")) ||
            [order.deliveryAddress?.addressLine, order.deliveryAddress?.city, order.deliveryAddress?.state, order.deliveryAddress?.pincode].filter(Boolean).join(", ") ||
            "Address not available",
          date: createdAt
            ? createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "N/A",
          time: createdAt
            ? createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
            : "N/A",
          status: order.orderStatus || order.status || "Pending",
          payment:
            order.paymentMethod === "COD"
              ? "Cash on Delivery"
              : order.paymentMethod || "N/A",
          prescription: Boolean(prescription.required) || Boolean(prescriptionDetails._id) || Boolean(prescriptionFileData?.url),
          prescriptionFile: prescriptionFileData?.url
            ? {
                type: (prescriptionFileData.mimeType || "").startsWith("image/") ? "image" : "pdf",
                url: prescriptionFileData.url,
                name: prescriptionFileData.originalName || "Prescription",
              }
            : null,
          total,
          medicines,
        };
      });

      setOrders(normalized);
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
      setApiError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Re-check admin auth + load data whenever the screen regains focus.
  useFocusEffect(
    useCallback(() => {
      if (!isAdminLoggedIn()) {
        navigation.replace("AdminLogin");
        return;
      }
      fetchData();
    }, [fetchData, navigation])
  );

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customerName.toLowerCase().includes(searchText) ||
      order.phone.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = getAdminToken();
      if (!token) {
        setApiError("Admin authentication required");
        return;
      }

      const response = await api.patch(
        `/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedOrder = response.data;

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updatedOrder?.orderStatus || updatedOrder?.status || newStatus,
              }
            : order
        )
      );
      setSelectedOrder((current) =>
        current && current.id === orderId
          ? { ...current, status: updatedOrder?.orderStatus || updatedOrder?.status || newStatus }
          : current
      );

      const statsResponse = await api.get("/admin/dashboard");
      setStats({
        totalOrders: statsResponse.data.orders?.total || 0,
        pendingOrders: statsResponse.data.orders?.pending || 0,
        confirmedOrders: statsResponse.data.orders?.confirmed || 0,
        deliveredOrders: statsResponse.data.orders?.delivered || 0,
        totalRevenue: statsResponse.data.orders?.totalRevenue || 0,
      });
    } catch (err) {
      console.error("Failed to update order status:", err);
      Alert.alert("Failed", err.message || "Failed to update order status.");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigation.replace("AdminLogin");
  };

  const filterOptions = ["All", ...FormStatus];

  const renderOrder = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.orderCard, pressed && styles.pressed]}
      onPress={() => setSelectedOrder(item)}
    >
      <View style={styles.orderTopRow}>
        <View style={styles.orderIdWrap}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDate}>
            {item.date}{item.time ? ` · ${item.time}` : ""}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <Text style={styles.orderCustomer}>{item.customerName}</Text>
      <Text style={styles.orderPhone}>📞 {item.phone}</Text>
      <View style={styles.orderBottomRow}>
        <Text style={styles.orderTotal}>₹{Number(item.total || 0).toLocaleString("en-IN")}</Text>
        {item.prescription ? (
          <View style={styles.rxChip}>
            <Ionicons name="document-text" size={12} color={colors.violet} />
            <Text style={styles.rxChipText}>RX</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.wrap}>
        <ScreenHeader title="Admin Panel" subtitle="Orders Dashboard" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.brand} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ScreenHeader
        title="Orders Dashboard"
        subtitle="Admin panel"
        onBack={() => navigation.navigate("Tabs")}
        right={
          <Pressable
            style={styles.logoutBtn}
            onPress={handleLogout}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="log-out" size={20} color={colors.rose} />
          </Pressable>
        }
      />

      {apiError ? (
        <View style={styles.center}>
          <Ionicons name="close-circle" size={42} color={colors.rose} />
          <Text style={styles.errorTitle}>Unable to load orders</Text>
          <Text style={styles.errorText}>{apiError}</Text>
          <PrimaryButton title="Retry" style={styles.retryBtn} onPress={fetchData} />
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => fetchData(true)}
          ListHeaderComponent={
            <View>
              {/* Admin identity */}
              <View style={styles.adminRow}>
                <View style={styles.adminAvatar}>
                  <Ionicons name="person" size={20} color={colors.brand} />
                </View>
                <View style={styles.adminInfo}>
                  <Text style={styles.adminLabel}>Logged in as</Text>
                  <Text style={styles.adminName}>{admin?.name || "Administrator"}</Text>
                  <Text style={styles.adminRole}>{admin?.role || "Admin"}</Text>
                </View>
              </View>

              {/* Stats */}
              <View style={styles.statsGrid}>
                <StatCard label="Total Orders" value={stats.totalOrders} icon="receipt" tint={colors.sky} bg={colors.skySoft} />
                <StatCard label="Pending" value={stats.pendingOrders} icon="time" tint={colors.amber} bg={colors.amberSoft} />
                <StatCard label="Confirmed" value={stats.confirmedOrders} icon="checkmark-circle" tint={colors.violet} bg={colors.violetSoft} />
                <StatCard label="Delivered" value={stats.deliveredOrders} icon="cube" tint={colors.brand} bg={colors.brandSoft} />
              </View>

              {/* Search */}
              <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color={colors.textLight} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search order, customer or phone..."
                  placeholderTextColor={colors.textLight}
                  style={styles.searchInput}
                />
                {search ? (
                  <Pressable
                    onPress={() => setSearch("")}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close-circle" size={18} color={colors.textLight} />
                  </Pressable>
                ) : null}
              </View>

              {/* Filter chips */}
              <View style={styles.filterRow}>
                {filterOptions.map((status) => {
                  const selected = statusFilter === status;
                  return (
                    <Pressable
                      key={status}
                      style={[styles.filterChip, selected && styles.filterChipSelected]}
                      onPress={() => setStatusFilter(status)}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          selected && styles.filterChipTextSelected,
                        ]}
                      >
                        {status}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.listHeading}>
                {filteredOrders.length} order(s)
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="receipt-outline" size={30} color={colors.textLight} />
              <Text style={styles.emptyText}>No orders match your filters.</Text>
            </View>
          }
        />
      )}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={updateOrderStatus}
        onOpenPrescription={setPreviewPrescription}
      />

      <PrescriptionModal
        file={previewPrescription}
        onClose={() => setPreviewPrescription(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textLight,
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  errorText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
  retryBtn: {
    marginTop: 8,
  },
  listContent: {
    padding: 18,
    paddingBottom: 40,
  },
  adminRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  adminAvatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  adminInfo: {
    flex: 1,
  },
  adminLabel: {
    fontSize: 11,
    color: colors.textLight,
  },
  adminName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
  },
  adminRole: {
    fontSize: 12,
    color: colors.textLight,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    width: "48.4%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 10,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  filterChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterChipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  filterChipTextSelected: {
    color: colors.white,
  },
  listHeading: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textLight,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.85,
  },
  orderTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  orderIdWrap: {
    flex: 1,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
  },
  orderDate: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textLight,
  },
  orderCustomer: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  orderPhone: {
    marginTop: 2,
    fontSize: 13,
    color: colors.text,
  },
  orderBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
  },
  rxChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.violetSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rxChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.violet,
  },
  emptyBox: {
    alignItems: "center",
    padding: 30,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
  },

detailBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.55)",
    justifyContent: "flex-end",
  },
  detailCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: 20,
    paddingBottom: 34,
    maxHeight: "90%",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailHeaderText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  detailOrderId: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.ink,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginTop: 18,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.textLight,
    marginBottom: 6,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
  },
  detailText: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },
  uploadedChip: {
    backgroundColor: "#faf5ff",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  uploadedChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.violet,
  },
  prescriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
  },
  prescriptionIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  prescriptionName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.ink,
  },
  medicineItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  medicinePrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  summary: {
    marginTop: 18,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.ink,
  },
  summaryTotalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  statusButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  statusButtonSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  statusButtonTextSelected: {
    color: colors.white,
  },
  detailClose: {
    marginTop: 20,
  },
  previewBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  previewWrap: {
    width: "100%",
    maxWidth: 520,
  },
  previewImage: {
    width: "100%",
    height: 320,
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
  },
  previewFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  previewName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
    marginRight: 10,
  },
  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  openBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
  },
  openBtnTextLight: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  previewPdf: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 28,
    gap: 8,
  },
  pdfIcon: {
    width: 84,
    height: 84,
    borderRadius: radius.lg,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  previewPdfSub: {
    fontSize: 13,
    color: colors.textLight,
  },
});