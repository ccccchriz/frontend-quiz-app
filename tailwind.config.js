/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "error-red": "hsl(0, 82%, 63%)",
      "correct-green": "hsl(151, 70%, 50%)",
      "neutral-100": "hsl(0, 0%, 100%)",
      "neutral-200": "hsl(220, 38%, 97%)",
      "neutral-300": "hsl(216, 47%, 78%)",
      "neutral-400": "hsl(219, 13%, 44%)",
      "neutral-500": "hsl(215, 27%, 32%)",
      "neutral-600": "hsl(216, 25%, 25%)",
      "accent-purple": "hsl(277, 91%, 56%)",
    },
    fontFamily: {
      primary: ["Rubik", "sans-serif"],
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      "body-s": ["1.25rem", 1.5],
      "body-m": ["1.5rem", 1.5],
      "heading-s": ["1.75rem", 1],
      "heading-m": ["2.25rem", 1.2],
      "heading-l": ["4rem", 1],
      display: ["9rem", 1],

      "mb-0.875": ["0.875rem", 1],
      "mb-1.125": ["1.125rem", 1],
      "mb-1.25": ["1.25rem", 1],
      "mb-2.5": ["2.5rem", 1],
      "mb-5.5": ["5.5rem", 1],
    },
    screens: {
      tablet: "48rem",
      desktop: "64rem",
    },
    extend: {
      transitionProperty: {
        bg: "background-color",
      },
    },
  },
  plugins: [],
};
