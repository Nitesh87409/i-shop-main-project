// utils/debugRender.js
import { useEffect } from "react";

// Server + initial render log
export const debugRender = (componentName) => {
  if (typeof window === "undefined") {
    console.log(
      `⚡ Component "${componentName}" rendered on SERVER at ${new Date().toLocaleTimeString()}`
    );
  } else {
    console.log(
      `🔍 Component "${componentName}" rendered on CLIENT at ${new Date().toLocaleTimeString()}`
    );
  }
};

// Client-side hydration log
export const useRenderLogger = (componentName) => {
  useEffect(() => {
    console.log(
      `💡 Component "${componentName}" hydrated on CLIENT at ${new Date().toLocaleTimeString()}`
    );
  }, []);
};
