import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import {
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
  Phone,
  MapPin,
  FileText,
  IndianRupee,
  ChevronDown,
  X,
  User,
  Download,
  ZoomIn,
} from "lucide-react";

import { FaFilePdf } from "react-icons/fa";

/* =========================================================
   STATUS STYLES
   ========================================================= */

const statusStyles = {
  Pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: Clock,
  },

  Confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: CheckCircle2,
  },

  "Out for Delivery": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: Truck,
  },

  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: CheckCircle2,
  },

  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
  },
};

/* =========================================================
   ADMIN COMPONENT
   ========================================================= */

const AdminSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    if (!savedAdmin) return null;

    try {
      return JSON.parse(savedAdmin);
    } catch {
      return null;
    }
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Prescription preview
  const [previewPrescription, setPreviewPrescription] =
    useState(null);

  /* =======================================================
     FETCH REAL ORDERS
     ======================================================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setApiError("");

        const token = localStorage.getItem("adminToken");

        if (!token) {
          setApiError("Admin authentication required");
          return;
        }

        const response = await api.get("/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const statsResponse = await api.get("/admin/dashboard");

        setDashboardStats({
          totalOrders: statsResponse.data.orders?.total || 0,
          pendingOrders: statsResponse.data.orders?.pending || 0,
          confirmedOrders: statsResponse.data.orders?.confirmed || 0,
          deliveredOrders: statsResponse.data.orders?.delivered || 0,
          totalRevenue: statsResponse.data.orders?.totalRevenue || 0,
        });

        console.log("ADMIN ORDERS:", response);

        const backendOrders = Array.isArray(response.data)
          ? response.data
          : [];

        const normalizedOrders = backendOrders.map((order) => {
          const customer = order.customer || {};
          const customerDetails = customer.userId || {};

          const prescription = order.prescription || {};
          const prescriptionDetails = prescription.prescriptionId || {};

          const medicines = Array.isArray(order.medicines)
            ? order.medicines
            : [];

          // Prescription structure:
          // order.prescription.prescriptionId -> Prescription
          // Prescription.file -> uploaded Cloudinary file
          const prescriptionFileData =
            prescriptionDetails.file || null;

          const prescriptionUrl =
            prescriptionFileData?.url || "";

          const prescriptionName =
            prescriptionFileData?.originalName ||
            "Prescription";

          const prescriptionMimeType =
            prescriptionFileData?.mimeType || "";

          const prescriptionType =
            prescriptionMimeType.startsWith("image/")
              ? "image"
              : "pdf";

          const createdAt = order.createdAt
            ? new Date(order.createdAt)
            : null;

          const total = Number(
            order.totalAmount ??
              order.total ??
              order.grandTotal ??
              0
          );

          return {
            ...order,
            id: order.orderId || order._id || "Unknown",
            customerName:
              customer.name ||
              customerDetails.name ||
              order.name ||
              "Unknown Customer",
            phone:
              customer.phone ||
              customerDetails.phone ||
              order.phone ||
              "N/A",
            address:
              typeof customer.address === "string"
                ? customer.address
                : [
                    customer.address?.addressLine,
                    customer.address?.city,
                    customer.address?.state,
                    customer.address?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  [
                    order.deliveryAddress?.addressLine,
                    order.deliveryAddress?.city,
                    order.deliveryAddress?.state,
                    order.deliveryAddress?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  "Address not available",
            date: createdAt
              ? createdAt.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A",
            time: createdAt
              ? createdAt.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            status: order.orderStatus || order.status || "Pending",
            payment:
              order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : order.paymentMethod || "N/A",
            prescription:
              Boolean(prescription.required) ||
              Boolean(prescriptionDetails._id) ||
              Boolean(prescriptionUrl),
            prescriptionFile: prescriptionUrl
              ? {
                  type: prescriptionType,
                  url: prescriptionUrl,
                  name: prescriptionName,
                }
              : null,
            total,
            medicines,
          };
        });

        setOrders(normalizedOrders);
      } catch (error) {
        console.error("Failed to fetch admin orders:", error);
        setApiError(error.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* =======================================================
     FILTER ORDERS
     ======================================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customerName.toLowerCase().includes(searchText) ||
        order.phone.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  /* =======================================================
     STATISTICS
     ======================================================= */

  const pendingOrders = dashboardStats.pendingOrders;

  const confirmedOrders = dashboardStats.confirmedOrders;

  const deliveredOrders = dashboardStats.deliveredOrders;

  const totalRevenue = dashboardStats.totalRevenue;
  /* =======================================================
     UPDATE ORDER STATUS
     ======================================================= */

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setApiError("Admin authentication required");
        return;
      }

      const response = await api.patch(
        `/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedOrder = response.data;

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  updatedOrder?.orderStatus ||
                  updatedOrder?.status ||
                  newStatus,
              }
            : order
        )
      );

      setSelectedOrder((currentOrder) =>
        currentOrder && currentOrder.id === orderId
          ? {
              ...currentOrder,
              status:
                updatedOrder?.orderStatus ||
                updatedOrder?.status ||
                newStatus,
            }
          : currentOrder
      );

      const statsResponse = await api.get("/admin/dashboard");

      setDashboardStats({
        totalOrders: statsResponse.data.orders?.total || 0,
        pendingOrders: statsResponse.data.orders?.pending || 0,
        confirmedOrders: statsResponse.data.orders?.confirmed || 0,
        deliveredOrders: statsResponse.data.orders?.delivered || 0,
        totalRevenue: statsResponse.data.orders?.totalRevenue || 0,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert(error.message || "Failed to update order status.");
    }
  };

  /* =======================================================
     OPEN PRESCRIPTION
     ======================================================= */

  const openPrescription = (prescriptionFile) => {
    if (!prescriptionFile) return;

    setPreviewPrescription(prescriptionFile);
  };

  /* =======================================================
     RENDER
     ======================================================= */

  if (loading) {
    return (
      <section
        id="admin"
        className="flex min-h-screen items-center justify-center bg-gray-50 px-4"
      >
        <div className="rounded-2xl bg-white px-8 py-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="mt-4 font-medium text-gray-700">
            Loading orders...
          </p>
        </div>
      </section>
    );
  }

  if (apiError) {
    return (
      <section
        id="admin"
        className="flex min-h-screen items-center justify-center bg-gray-50 px-4"
      >
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <XCircle size={42} className="mx-auto text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Unable to load orders
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {apiError}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="admin"
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-600">
                ADMIN PANEL
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Orders Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage customer orders and prescriptions.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Logged in as
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {admin?.name || "Administrator"}
                </p>

                <p className="text-xs text-gray-500">
                  {admin?.role || "Admin"}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {dashboardStats.totalOrders}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Package
                  size={22}
                  className="text-blue-600"
                />
              </div>

            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {pendingOrders}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
                <Clock
                  size={22}
                  className="text-yellow-600"
                />
              </div>

            </div>
          </div>

          {/* Confirmed */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Confirmed
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {confirmedOrders}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle2
                  size={22}
                  className="text-blue-600"
                />
              </div>

            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Revenue
                </p>

                <p className="mt-2 flex items-center text-3xl font-bold text-green-600">
                  <IndianRupee size={22} />

                  {Number(totalRevenue || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <IndianRupee
                  size={22}
                  className="text-green-600"
                />
              </div>

            </div>
          </div>

        </div>

        {/* =================================================
            ORDERS TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-gray-100 p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">

                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search order, customer or phone..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">

                <Filter
                  size={18}
                  className="text-gray-500"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-500"
                >
                  <option value="All">
                    All Orders
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

              </div>

            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Prescription
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => {

                    const status =
                      statusStyles[order.status];

                    const StatusIcon =
                      status.icon;

                    return (
                      <tr
                        key={order.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* ORDER */}
                        <td className="px-6 py-5">

                          <p className="font-semibold text-gray-900">
                            {order.id}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.medicines.length} medicine
                            {order.medicines.length !== 1
                              ? "s"
                              : ""}
                          </p>

                        </td>

                        {/* CUSTOMER */}
                        <td className="px-6 py-5">

                          <p className="font-medium text-gray-900">
                            {order.customerName}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {order.phone}
                          </p>

                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-gray-900">
                            {order.date}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.time}
                          </p>

                        </td>

                        {/* PRESCRIPTION */}
                        <td className="px-6 py-5">

                          {order.prescription &&
                          order.prescriptionFile ? (

                            <button
                              onClick={() =>
                                openPrescription(
                                  order.prescriptionFile
                                )
                              }
                              className="group flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 px-3 py-2 text-left transition hover:border-purple-300 hover:bg-purple-100"
                            >

                              {/* Image thumbnail */}
                              {order.prescriptionFile.type ===
                              "image" ? (
                                <div className="h-10 w-10 overflow-hidden rounded-lg border border-purple-200 bg-white">

                                  <img
                                    src={
                                      order
                                        .prescriptionFile
                                        .url
                                    }
                                    alt="Prescription"
                                    className="h-full w-full object-cover transition group-hover:scale-105"
                                  />

                                </div>
                              ) : (

                                /* PDF icon */
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                                  <FaFilePdf
                                    size={22}
                                    className="text-red-500"
                                  />
                                </div>
                              )}

                              <div>

                                <p className="text-xs font-semibold text-purple-700">
                                  {order.prescriptionFile.type ===
                                  "pdf"
                                    ? "PDF Prescription"
                                    : "View Prescription"}
                                </p>

                                <p className="mt-0.5 max-w-[130px] truncate text-xs text-purple-500">
                                  {
                                    order
                                      .prescriptionFile
                                      .name
                                  }
                                </p>

                              </div>

                            </button>

                          ) : (

                            <span className="text-sm text-gray-400">
                              No prescription
                            </span>

                          )}

                        </td>

                        {/* TOTAL */}
                        <td className="px-6 py-5">

                          <p className="flex items-center font-semibold text-gray-900">

                            <IndianRupee size={15} />

                            {order.total.toLocaleString(
                              "en-IN"
                            )}

                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.payment}
                          </p>

                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}
                          >

                            <StatusIcon size={14} />

                            {order.status}

                          </span>

                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              setSelectedOrder(order)
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={16} />
                            View
                          </button>

                        </td>

                      </tr>
                    );
                  })

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="px-6 py-16 text-center"
                    >

                      <Package
                        size={40}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-4 font-semibold text-gray-700">
                        No orders found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filter.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {dashboardStats.totalOrders}
              </span>{" "}
              orders
            </p>

          </div>

        </div>
      </div>

      {/* ===================================================
          ORDER DETAILS MODAL
      =================================================== */}

      {selectedOrder && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedOrder.id}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* CUSTOMER INFORMATION */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <h3 className="font-semibold text-gray-900">
                  Customer Information
                </h3>

                <div className="mt-4 space-y-4">

                  <div className="flex items-start gap-3">

                    <User
                      size={18}
                      className="mt-0.5 text-gray-400"
                    />

                    <div>

                      <p className="text-xs text-gray-500">
                        Customer
                      </p>

                      <p className="font-medium text-gray-900">
                        {selectedOrder.customerName}
                      </p>

                    </div>
                  </div>

                  <div className="flex items-start gap-3">

                    <Phone
                      size={18}
                      className="mt-0.5 text-gray-400"
                    />

                    <div>

                      <p className="text-xs text-gray-500">
                        Phone
                      </p>

                      <a
                        href={`tel:${selectedOrder.phone}`}
                        className="font-medium text-blue-600"
                      >
                        {selectedOrder.phone}
                      </a>

                    </div>
                  </div>

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={18}
                      className="mt-0.5 text-gray-400"
                    />

                    <div>

                      <p className="text-xs text-gray-500">
                        Delivery Address
                      </p>

                      <p className="font-medium leading-6 text-gray-900">
                        {selectedOrder.address}
                      </p>

                    </div>
                  </div>

                </div>
              </div>

              {/* PRESCRIPTION */}
              {selectedOrder.prescription &&
                selectedOrder.prescriptionFile && (

                  <div>

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-gray-900">
                        Prescription
                      </h3>

                      <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                        Customer Uploaded
                      </span>

                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                      {selectedOrder.prescriptionFile.type ===
                      "image" ? (

                        <button
                          onClick={() =>
                            openPrescription(
                              selectedOrder.prescriptionFile
                            )
                          }
                          className="group relative block w-full"
                        >

                          <img
                            src={
                              selectedOrder
                                .prescriptionFile.url
                            }
                            alt="Customer prescription"
                            className="max-h-[450px] w-full object-contain"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">

                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-gray-900 opacity-0 shadow-lg transition group-hover:opacity-100">

                              <ZoomIn size={18} />

                              View Full Size

                            </div>

                          </div>

                        </button>

                      ) : (

                        <div className="flex flex-col items-center justify-center px-6 py-12">

                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">

                            <FaFilePdf
                              size={40}
                              className="text-red-500"
                            />

                          </div>

                          <p className="mt-4 font-semibold text-gray-900">
                            {
                              selectedOrder
                                .prescriptionFile
                                .name
                            }
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            PDF Prescription
                          </p>

                          <div className="mt-5 flex gap-3">

                            <a
                              href={
                                selectedOrder
                                  .prescriptionFile.url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              <Eye size={17} />
                              Open PDF
                            </a>

                            <a
                              href={
                                selectedOrder
                                  .prescriptionFile.url
                              }
                              download
                              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                              <Download size={17} />
                              Download
                            </a>

                          </div>

                        </div>
                      )}

                    </div>

                  </div>
                )}

              {/* MEDICINES */}
              <div>

                <h3 className="font-semibold text-gray-900">
                  Order Items
                </h3>

                <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100">

                  {selectedOrder.medicines.map(
                    (medicine, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between p-4"
                      >

                        <div>

                          <p className="font-medium text-gray-900">
                            {medicine.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity:{" "}
                            {medicine.quantity}
                          </p>

                        </div>

                        <p className="flex items-center font-semibold text-gray-900">

                          <IndianRupee size={14} />

                          {(
                            medicine.price *
                            medicine.quantity
                          ).toLocaleString("en-IN")}

                        </p>

                      </div>

                    )
                  )}

                </div>
              </div>

              {/* SUMMARY */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Order Date
                  </span>

                  <span className="font-medium text-gray-900">
                    {selectedOrder.date}
                  </span>

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span className="text-gray-500">
                    Payment
                  </span>

                  <span className="font-medium text-gray-900">
                    {selectedOrder.payment}
                  </span>

                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-gray-900">
                      Total Amount
                    </span>

                    <span className="flex items-center text-xl font-bold text-gray-900">

                      <IndianRupee size={18} />

                      {selectedOrder.total.toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>
              </div>

              {/* STATUS */}
              <div>

                <h3 className="font-semibold text-gray-900">
                  Update Order Status
                </h3>

                <div className="relative mt-3">

                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        selectedOrder.id,
                        e.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="w-full rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ===================================================
          PRESCRIPTION FULL-SCREEN PREVIEW
      =================================================== */}

      {previewPrescription && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">

          {/* Close */}
          <button
            onClick={() =>
              setPreviewPrescription(null)
            }
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* Image Preview */}
          {previewPrescription.type === "image" ? (

            <div className="flex max-h-[95vh] max-w-[95vw] flex-col items-center">

              <img
                src={previewPrescription.url}
                alt="Prescription preview"
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />

              <div className="mt-4 flex items-center gap-3">

                <p className="max-w-xs truncate text-sm font-medium text-white">
                  {previewPrescription.name}
                </p>

                <a
                  href={previewPrescription.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  <Download size={16} />
                  Open
                </a>

              </div>

            </div>

          ) : (

            /* PDF Preview */
            <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white">

              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

                <div className="flex items-center gap-3">

                  <FaFilePdf
                    size={22}
                    className="text-red-500"
                  />

                  <p className="font-semibold text-gray-900">
                    {previewPrescription.name}
                  </p>

                </div>

                <a
                  href={previewPrescription.url}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  <Download size={16} />
                  Download
                </a>

              </div>

              <iframe
                src={previewPrescription.url}
                title="Prescription PDF"
                className="h-full w-full"
              />

            </div>

          )}

        </div>
      )}

    </section>
  );
};

export default AdminSection;