import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const ClerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_dmFsaWQtcmFjZXItMS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!ClerkPublishableKey) {
  throw new Error("Missing Publishible key for clerk");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={ClerkPublishableKey}
      afterSignInUrl="/registration"
      afterSignUpUrl="/registration"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
