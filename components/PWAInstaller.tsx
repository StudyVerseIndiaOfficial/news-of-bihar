"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          console.log("Service worker registration failed");
        });
      });
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShowInstall(false);
    }

    setInstallPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[60] mx-auto max-w-md rounded-3xl border border-red-100 bg-white p-4 shadow-2xl md:bottom-6 md:left-auto md:right-6">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-900 to-orange-500 text-sm font-black text-white">
          NOB
        </div>

        <div className="flex-1">
          <h3 className="text-base font-black text-red-900">
            News of Bihar App Install करें
          </h3>

          <p className="mt-1 text-xs font-bold leading-5 text-gray-600">
            Mobile home screen पर app जैसा fast access पाने के लिए install करें।
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstall}
              className="rounded-2xl bg-red-800 px-4 py-2 text-xs font-black text-white"
            >
              Install
            </button>

            <button
              onClick={() => setShowInstall(false)}
              className="rounded-2xl border border-red-200 px-4 py-2 text-xs font-black text-red-800"
            >
              बाद में
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}