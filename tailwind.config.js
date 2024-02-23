// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         dropShadow: {
            "2xl": "15px 15px 40px rgba(102, 252, 241, 0.3)", 
         },
         boxShadow: {
            "3xl": "0 20px 50px -20px rgba(102, 252, 241, 0.3)",
         },
      },
   },
   darkMode: "class",
   plugins: [
      nextui({
         addCommonColors: true,
         themes: {
            light: {
               colors: {
                  default:  "#262626", 
                  primary: {
                     DEFAULT: "#66FCF1",
                     foreground: "#0B0C10",
                  }, 
                  secondary: "#45A29E",
                  background: "#0B0C10",
                  foreground: "#ECEDEE",
                  focus: "#45A29E",
               },
            },
         },
      }),
   ],
};
