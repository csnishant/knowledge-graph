const config = {
  plugins: {
    "@tailwindcss/postcss": {
      extend: {
        animation: {
          "spin-slow": "spin 4s linear infinite",
        },
      },
    },
  },
};

export default config;
