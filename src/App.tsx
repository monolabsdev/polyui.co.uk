import { Box, CssBaseline, ThemeProvider, useColorScheme } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import DocsPage from "./components/DocsPage";
import HeroSection from "./components/HeroSection";
import InstallWizard from "./components/InstallWizard";
import OpenSourceFooter from "./components/OpenSourceFooter";
import SiteHeader from "./components/SiteHeader";
import StartupIntro from "./components/StartupIntro";
import { useDampedScroll } from "./hooks/useDampedScroll";
import theme from "./theme";

const STARTUP_INTRO_STORAGE_KEY = "poly-ui-startup-intro-complete";

function useInternalNavigation() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.origin !== window.location.origin
      ) {
        return;
      }

      const isSameDocument =
        link.pathname === window.location.pathname &&
        link.search === window.location.search;

      if (isSameDocument) return;

      event.preventDefault();
      window.history.pushState({}, "", link.href);
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return pathname;
}

function HomePage() {
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [isIntroComplete, setIntroComplete] = useState(() => {
    if (import.meta.env.DEV) return false;

    try {
      return window.sessionStorage.getItem(STARTUP_INTRO_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const shouldReduceMotion = useReducedMotion();
  const handleGetStarted = () => setWizardOpen(true);
  const handleDownload = () => setWizardOpen(true);
  const handleWizardClose = () => setWizardOpen(false);
  const handleIntroComplete = () => {
    if (!import.meta.env.DEV) {
      try {
        window.sessionStorage.setItem(STARTUP_INTRO_STORAGE_KEY, "true");
      } catch {
        // The intro can still complete when storage is unavailable.
      }
    }

    setIntroComplete(true);
  };

  return (
    <>
      <AnimatePresence>
        {!isIntroComplete && (
          <StartupIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      <Box
        component="main"
        sx={{
          minHeight: "100svh",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        <SiteHeader onGetStarted={handleGetStarted} />
        <HeroSection
          onDownload={handleDownload}
          shouldAnimate={isIntroComplete || Boolean(shouldReduceMotion)}
        />
      </Box>
      <InstallWizard open={isWizardOpen} onClose={handleWizardClose} />
      <OpenSourceFooter />
    </>
  );
}

function ModeTransitionWatcher() {
  const { systemMode } = useColorScheme();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const root = document.documentElement;
    root.classList.add("mode-transitioning");
    const timeout = window.setTimeout(() => {
      root.classList.remove("mode-transitioning");
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [systemMode, shouldReduceMotion]);

  return null;
}

export default function App() {
  const pathname = useInternalNavigation();
  const isDocs = pathname === "/docs" || pathname === "/docs/";
  useDampedScroll();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModeTransitionWatcher />
      {isDocs ? (
        <>
          <DocsPage />
          <OpenSourceFooter />
        </>
      ) : (
        <HomePage />
      )}
    </ThemeProvider>
  );
}
