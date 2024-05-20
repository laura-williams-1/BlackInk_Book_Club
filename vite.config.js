import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      "process.env": {
        API_URL: env.VITE_API_URL,
        REACT_APP_RAPIDAPI_KEY: env.VITE_RAPIDAPI_KEY,
        REACT_APP_RAPIDAPI_HOST: env.VITE_RAPIDAPI_HOST,
      },
    },
    plugins: [react()],
  };
});
