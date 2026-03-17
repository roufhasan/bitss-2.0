"use client";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      );
      setReady(true);
    };

    const existing = document.querySelector(
      'script[src*="translate.google.com"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Inject styles directly into head — bypasses all CSS specificity issues
    const style = document.createElement("style");
    style.id = "goog-translate-style";
    style.innerHTML = `
  .goog-te-gadget { font-size: 0 !important; }
  .goog-te-gadget > span { display: none !important; }
  .goog-te-gadget a { display: none !important; }
  .goog-logo-link { display: none !important; }
  .goog-te-gadget img { display: none !important; }
  .goog-te-combo option[value=""] { display: none !important; }
  .goog-te-combo {
    font-size: 13px !important;
    font-family: inherit !important;
    color: #475569 !important;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    cursor: pointer !important;
    padding: 2px 0 !important;
    margin: 0 !important;
    max-width: 140px !important;
  }
  .goog-te-banner-frame { display: none !important; }
  body { top: 0 !important; }
  .translated-ltr, .translated-rtl { margin-top: 0 !important; }
`;
    if (!document.getElementById("goog-translate-style")) {
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors">
      <Globe size={15} className="text-slate-500 shrink-0" />
      <div id="google_translate_element" />
    </div>
  );
}
