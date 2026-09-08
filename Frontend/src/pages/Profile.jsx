import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUser, getToken } from "../services/auth";
import { getUserProfile } from "../services/api";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          setError("Please login first.");
          return;
        }

        const response = await getUserProfile(token);
        console.log("PROFILE RESPONSE:", response);

        const ordersResponse = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(ordersResponse.data);

        setUser(response.data);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleTrackOrder = async (orderId) => {
    try {
      setTrackingLoading(true);
      setTrackingError("");

      const token = getToken();

      const response = await api.get(`/orders/track/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("TRACKING RESPONSE:", response);

      setSelectedOrder(response.data.order);
    } catch (error) {
      setTrackingError(error.message);
    } finally {
      setTrackingLoading(false);
    }
  };

  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[60vh] items-center justify-center">
          <p>Loading profile...</p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16">

        {/* PROFILE */}
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-[#126b5b]">
            My Profile
          </h1>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
              {error}
            </p>
          )}

          {user && (
            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-medium text-gray-800">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-medium text-gray-800">
                  {user.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium text-gray-800">
                  {user.email || "Not provided"}
                </p>
              </div>

            </div>
          )}
        </div>

        {/* MY ORDERS */}
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-[#126b5b]">
            My Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="space-y-4">

              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => handleTrackOrder(order.orderId)}
                  className="cursor-pointer rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.orderId}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                      {order.orderStatus}
                    </span>

                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="text-sm text-gray-500">
                      Total Amount
                    </span>

                    <span className="font-semibold text-gray-900">
                      ₹
                      {Number(
                        order.total || 0
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                  <p className="mt-3 text-sm font-medium text-[#126b5b]">
                    Click to track order →
                  </p>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* TRACKING LOADING */}
        {trackingLoading && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white p-6 text-center shadow-md">
            <p className="text-gray-500">
              Loading order tracking...
            </p>
          </div>
        )}

        {/* TRACKING ERROR */}
        {trackingError && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-red-50 p-6 text-red-600 shadow-md">
            {trackingError}
          </div>
        )}

        {/* ORDER TRACKING */}
        {selectedOrder && !trackingLoading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setSelectedOrder(null)}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
        aria-label="Close order tracking"
      >
        ×
      </button>

      {/* Header */}
      <div className="pr-12">
        <h2 className="text-2xl font-bold text-[#126b5b]">
          Order Tracking
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Order ID
        </p>

        <p className="font-semibold text-gray-900">
          {selectedOrder.orderId}
        </p>
      </div>

      {/* Current Status */}
      <div className="mt-6 rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-500">
          Current Status
        </p>

        <p className="mt-1 text-lg font-bold text-[#126b5b]">
          {selectedOrder.orderStatus}
        </p>
      </div>

      {/* Status Timeline */}
      <div className="mt-8">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Order Status
        </h3>

        <div className="space-y-5">
          {[
            "Pending",
            "Confirmed",
            "Out for Delivery",
            "Delivered",
          ].map((status, index) => {
            const statusOrder = [
              "Pending",
              "Confirmed",
              "Out for Delivery",
              "Delivered",
            ];

            const currentIndex = statusOrder.indexOf(
              selectedOrder.orderStatus
            );

            const isCompleted = index <= currentIndex;
            const isCurrent =
              status === selectedOrder.orderStatus;

            return (
              <div
                key={status}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    isCompleted
                      ? "border-[#126b5b] bg-[#126b5b] text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                <div>
                  <p
                    className={`font-medium ${
                      isCurrent
                        ? "text-[#126b5b]"
                        : isCompleted
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {status}
                  </p>

                  {isCurrent && (
                    <p className="text-sm text-gray-500">
                      Current status
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  </div>
)}

      </main>

      <Footer />
    </>
  );
};

export default Profile;