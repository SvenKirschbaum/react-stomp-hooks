import "./index.css";

import React from "react";
import { App } from "./App.jsx";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
