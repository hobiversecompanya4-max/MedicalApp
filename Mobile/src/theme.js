/**
 * Design tokens mirroring the original web app
 * (Frontend/src/index.css CSS variables).
 */
export const colors = {
  brand: "#0f766e",
  brandStrong: "#0b5f59",
  brandSoft: "#e6fffb",
  brandSoft2: "#eff6ff",
  accent: "#c07a2a",
  sky: "#3b82f6",
  skySoft: "#e8f1ff",
  violet: "#7c3aed",
  violetSoft: "#f2ebff",
  rose: "#db2777",
  roseSoft: "#fff1f5",
  amber: "#d97706",
  amberSoft: "#fff6e8",
  surface: "#f8fcfb",
  surface2: "#eef5f4",
  ink: "#0f172a",
  text: "#475569",
  textLight: "#64748b",
  border: "#d8e4e1",
  borderSoft: "#dbe7e4",
  white: "#ffffff",
  black: "#000000",

  status: {
    Pending: { bg: "#fefce8", text: "#a16207", border: "#fde68a" },
    Confirmed: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    "Out for Delivery": { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
    Delivered: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    Cancelled: { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  },
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  huge: 48,
};

export const fonts = {
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
};

export const shadows = {
  card: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  brand: {
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 6,
  },
};

export const FormStatus = ["Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled"];
export const ORDER_STATUS_FLOW = ["Pending", "Confirmed", "Out for Delivery", "Delivered"];