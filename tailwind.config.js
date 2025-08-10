import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        "primary-color": "var(--color-primary)",
        "secondary-color": "var(--color-secondary)",
        "accent-color": "var(--color-accent)",
        "text-color": "var(--color-text)",
        "background-color": "var(--color-background)",
      },
      backgroundColor: {
        "primary-color": "var(--color-primary)",
        "secondary-color": "var(--color-secondary)",
        "accent-color": "var(--color-accent)",
        "background-color": "var(--color-background)",
      },
    },
  },
  plugins: [daisyui],
};
