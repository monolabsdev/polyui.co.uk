import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";
import DownloadDialog from "./DownloadDialog";
import DocsPage from "./DocsPage";
import InstallWizard from "./InstallWizard";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fbfbf8",
      paper: "rgba(255, 255, 255, 0.72)",
    },
    text: {
      primary: "#171717",
      secondary: "#606a70",
    },
  },
  typography: {
    fontFamily:
      '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.02,
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "3.2rem",
          borderRadius: 999,
          paddingInline: "1.25rem",
        },
      },
    },
  },
});

const MotionContainer = motion.create(Container);

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [isDownloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [isWizardOpen, setWizardOpen] = useState(false);
  const handleDownloadClick = () => setDownloadDialogOpen(true);
  const handleDownloadDialogClose = () => setDownloadDialogOpen(false);
  const handleGetStartedClick = () => setWizardOpen(true);
  const handleWizardClose = () => setWizardOpen(false);
  const heroCopyVariants: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion ? {} : { staggerChildren: 0.12 },
    },
  };
  const heroTextVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 12, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (window.location.pathname === "/docs" || window.location.pathname === "/docs/") {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DocsPage />
        <Typography
          sx={{
            position: "fixed",
            bottom: 8,
            right: 12,
            fontSize: "0.7rem",
            color: "text.secondary",
            opacity: 0.45,
            zIndex: 9999,
          }}
        >
          this website is{" "}
          <Link
            href="https://github.com/monolabsdev/poly-ui"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: "inherit", fontSize: "inherit" }}
          >
            open source
          </Link>
          .
        </Typography>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          minHeight: "100svh",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        <AppBar
          elevation={0}
          position="fixed"
          color="transparent"
          sx={{ inset: "0 0 auto", px: { xs: 1, md: 3 }, py: 1 }}
        >
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link
              href="/"
              aria-label="Poly UI home"
              underline="none"
              color="text.primary"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                width: "fit-content",
                fontWeight: 700,
              }}
            >
              <Box
                component="img"
                src="/assets/openbench-logo.svg"
                alt=""
                sx={{ width: 33, height: 33, borderRadius: 1.2 }}
              />
              Poly UI
            </Link>
            <Button
              href="/docs"
              sx={{
                ml: "auto",
                mr: 1,
                minHeight: 0,
                color: "text.primary",
                py: 0.6,
                px: 1.25,
                fontSize: ".85rem",
              }}
            >
              Docs
            </Button>
            <Button
              variant="contained"
              onClick={handleGetStartedClick}
              sx={{
                bgcolor: "#171717",
                color: "#fff",
                minHeight: 0,
                py: 0.6,
                px: 1.75,
                fontSize: ".85rem",
                borderRadius: 999,
                "&:hover": { bgcolor: "#171717" },
              }}
            >
              Get Started
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          id="hero"
          component="section"
          aria-labelledby="hero-title"
          sx={{
            position: "relative",
            minHeight: "100svh",
            isolation: "isolate",
            px: { xs: 2, md: 5, lg: 10 },
            py: { xs: 3, md: 6 },
          }}
        >
          <Box
            component="img"
            src="/assets/poly-hero-nature.png"
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: -4,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: { xs: "62% center", md: "center" },
              transform: "scale(1.02)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: -3,
              background: {
                xs: "linear-gradient(90deg, rgba(251,251,248,.98) 0%, rgba(251,251,248,.82) 55%, rgba(251,251,248,.35) 100%), linear-gradient(0deg, rgba(251,251,248,1) 0%, rgba(251,251,248,.2) 45%, rgba(251,251,248,.5) 100%)",
                md: "linear-gradient(90deg, rgba(251,251,248,.96) 0%, rgba(251,251,248,.75) 34%, rgba(251,251,248,.2) 68%), linear-gradient(0deg, rgba(251,251,248,1) 0%, rgba(251,251,248,.18) 34%, rgba(251,251,248,.5) 100%)",
              },
            }}
          />

          <MotionContainer
            maxWidth={false}
            disableGutters
            initial="hidden"
            animate="visible"
            variants={heroCopyVariants}
            sx={{
              position: "absolute",
              left: { xs: 16, md: "clamp(1.25rem, 4vw, 5rem)" },
              bottom: { xs: 24, md: "clamp(2rem, 7vh, 5rem)" },
              zIndex: 2,
              width: {
                xs: "calc(100% - 2rem)",
                md: "min(37rem, calc(100% - 2.5rem))",
              },
            }}
          >
            <motion.div variants={heroTextVariants}>
              <Typography
                component="p"
                sx={{
                  mb: 1.2,
                  color: "#687077",
                  fontSize: ".95rem",
                  fontWeight: 700,
                }}
              >
                Poly UI
              </Typography>
            </motion.div>
            <motion.div variants={heroTextVariants}>
              <Typography
                id="hero-title"
                variant="h1"
                sx={{
                  maxWidth: "12ch",
                  fontSize: {
                    xs: "clamp(2.45rem, 11vw, 3.4rem)",
                    md: "clamp(2.65rem, 5.1vw, 5.05rem)",
                  },
                }}
              >
                One calm window for your models.
              </Typography>
            </motion.div>
            <motion.div variants={heroTextVariants}>
              <Typography
                sx={{
                  maxWidth: "31rem",
                  mt: 1.5,
                  color: "text.secondary",
                  fontSize: {
                    xs: "1rem",
                    md: "clamp(.98rem, 1.1vw, 1.08rem)",
                  },
                  lineHeight: 1.6,
                }}
              >
                Use Ollama from a simple interface built for private, everyday
                conversations with local models.
              </Typography>
            </motion.div>
            <motion.div variants={heroTextVariants}>
              <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="inherit"
                endIcon={<ArrowOutwardIcon fontSize="small" />}
                onClick={handleDownloadClick}
                sx={{
                  bgcolor: "#171717",
                  color: "#fff",
                  boxShadow: "0 1rem 2.6rem rgba(12, 19, 28, 0.16)",
                  "&:hover": { bgcolor: "#171717" },
                }}
              >
                Download PolyUI
              </Button>
              <Button
                href="https://github.com/monolabsdev/poly-ui"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{
                  color: "#242424",
                  borderColor: "rgba(23, 23, 23, 0.12)",
                  bgcolor: "rgba(255, 255, 255, 0.72)",
                  boxShadow: "0 1rem 2.6rem rgba(32, 46, 62, 0.08)",
                  backdropFilter: "blur(18px)",
                  "&:hover": {
                    borderColor: "rgba(23, 23, 23, 0.2)",
                    bgcolor: "rgba(255, 255, 255, 0.84)",
                  },
                }}
              >
                GitHub
              </Button>
            </Stack>
            </motion.div>
          </MotionContainer>
        </Box>
      </Box>
      <DownloadDialog open={isDownloadDialogOpen} onClose={handleDownloadDialogClose} />
      <InstallWizard open={isWizardOpen} onClose={handleWizardClose} />
      <Typography
        sx={{
          position: "fixed",
          bottom: 8,
          right: 12,
          fontSize: "0.7rem",
          color: "text.secondary",
          opacity: 0.45,
          zIndex: 9999,
        }}
      >
        this website is{" "}
        <Link
          href="https://github.com/monolabsdev/poly-ui"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ color: "inherit", fontSize: "inherit" }}
        >
          open source
        </Link>
        .
      </Typography>
    </ThemeProvider>
  );
}

export default App;
