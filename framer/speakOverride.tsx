import React, { useEffect } from "react";
import type { ComponentType } from "react";
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0";

// Learn more: https://www.framer.com/docs/guides/overrides/

// Video 1: https://www.youtube.com/watch?v=Di4WAWZnobg
// Video 2: https://www.youtube.com/watch?v=fXfBBIw6zLw

const useStore = createStore({
  toggleState: "OFF",
});

export function withClick(Component): ComponentType {
  return (props) => {
    const [store, setStore] = useStore();

    useEffect(() => {
      // Define your event handlers
      const handleOpen = () => {
        setStore({ toggleState: "ON" });
      };

      const handleClose = () => {
        setStore({ toggleState: "OFF" });
      };

      if (window.headlessManager) {
        // Add event listeners
        window.headlessManager.on("open", handleOpen);
        window.headlessManager.on("close", handleClose);

        // Clean up: remove event listeners when component unmounts
        return () => {
          window.headlessManager.off("open", handleOpen);
          window.headlessManager.off("close", handleClose);
        };
      }
    }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

    return (
      <Component
        {...props}
        variant={
          store.toggleState === "ON"
            ? "Speak button_On"
            : "Speak Button - Primary"
        }
        onClick={() => {
          const toggleConversation = (window as any).toggleConversation;
          if (typeof toggleConversation === "function") {
            toggleConversation();
          }
        }}
      />
    );
  };
}
