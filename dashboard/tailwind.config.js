module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "940px" },
        sm: { max: "640px" },
      },
      colors: {
        primary: "#03d357",
        primaryLight: "#2a7857",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
