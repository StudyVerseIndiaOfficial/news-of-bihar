"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallAppPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("nob-install-dismissed");

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      if (dismissed === "yes") return;

      setInstallEvent(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = async () => {
    if (!installEvent) return;

    await installEvent.prompt();

    const choice = await installEvent.userChoice;

    if (choice.outcome === "accepted") {
      setIsVisible(false);
      setInstallEvent(null);
    }
  };

  const closePrompt = () => {
    localStorage.setItem("nob-install-dismissed", "yes");
    setIsVisible(false);
  };

  if (!isVisible || !installEvent) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-[9999] mx-auto max-w-md rounded-3xl border border-red-100 bg-white p-4 shadow-2xl">
      <div className="flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-900 to-orange-500 text-sm font-black text-white">
          NOB
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-black text-gray-950">
            News of Bihar App Install करें
          </h3>

          <p className="mt-1 text-xs font-bold leading-5 text-gray-600">
            ताजा खबरें जल्दी देखने के लिए इस web app को अपने mobile home screen
            पर add करें।
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={installApp}
              className="rounded-2xl bg-red-800 px-4 py-2 text-xs font-black text-white"
            >
              Install App
            </button>

            <button
              onClick={closePrompt}
              className="rounded-2xl bg-gray-100 px-4 py-2 text-xs font-black text-gray-700"
            >
              बाद में
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}