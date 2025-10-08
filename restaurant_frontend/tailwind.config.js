module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#6B7280",
        success: "#10B981",
        error: "#EF4444",
        background: "#F3E8FF",
        surface: "#FFFFFF",
        text: "#374151",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};
