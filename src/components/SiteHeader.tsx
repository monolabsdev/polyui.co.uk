import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import ReleaseChip from "./ReleaseChip";
import { useMobileMenu } from "../hooks/useMobileMenu";

interface SiteHeaderProps {
  page?: "home" | "docs";
  onGetStarted?: () => void;
}

function Brand({ showDocsLabel = false }: { showDocsLabel?: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
      <Link
        href="/"
        aria-label="Poly UI home"
        underline="none"
        color="text.primary"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.25,
          minWidth: 0,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        <Box
          component="img"
          src="/assets/polyui-logo.png"
          alt=""
          sx={{ width: 32, height: 32, borderRadius: 1.2 }}
        />
        <Box sx={{ display: "inline-flex", alignItems: "baseline", gap: 0.5 }}>
          Poly UI
          <Typography
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
              color: "text.secondary",
              fontSize: ".72rem",
              fontWeight: 400,
            }}
          >
            by monolabs
          </Typography>
        </Box>
      </Link>
      {showDocsLabel && (
        <>
          <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 0.75 }} />
          <Typography sx={{ color: "text.secondary", fontSize: ".9rem", fontWeight: 600 }}>
            Docs
          </Typography>
        </>
      )}
    </Box>
  );
}

function PrimaryButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor: "#171717",
        color: "#fff",
        minHeight: 0,
        py: 0.7,
        px: 1.75,
        fontSize: ".85rem",
        borderRadius: 999,
        "&:hover": { bgcolor: "#2a2a2a" },
      }}
    >
      Get Started
    </Button>
  );
}

function ColorModeToggle() {
  const { mode, setMode, systemMode } = useColorScheme();

  const handleToggle = () => {
    if (mode !== "system") {
      setMode(mode === "light" ? "dark" : "light");
    } else {
      setMode(systemMode === "light" ? "dark" : "light");
    }
  };

  const isDark = mode === "dark" || (mode === "system" && systemMode === "dark");

  return (
    <IconButton
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      sx={(theme) => ({
        border: "1px solid",
        borderColor: "rgba(23, 23, 23, 0.08)",
        bgcolor: "rgba(255, 255, 255, 0.54)",
        backdropFilter: "blur(18px)",
        ...theme.applyStyles("dark", {
          borderColor: "rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(255, 255, 255, 0.06)",
        }),
      })}
    >
      {isDark ? <LightModeRounded /> : <DarkModeRounded />}
    </IconButton>
  );
}

export default function SiteHeader({ page = "home", onGetStarted }: SiteHeaderProps) {
  const { isOpen, openMenu, closeMenu } = useMobileMenu();
  const isDocs = page === "docs";

  return (
    <>
      <AppBar
        elevation={0}
        position={isDocs ? "sticky" : "fixed"}
        color="transparent"
        sx={(theme) => ({
          inset: "0 0 auto",
          px: { xs: 1.25, md: 3 },
          py: isDocs ? 0 : 1,
          borderBottom: isDocs ? "1px solid rgba(23, 23, 23, 0.08)" : "none",
          bgcolor: isDocs ? "rgba(251, 251, 248, 0.82)" : "transparent",
          backdropFilter: isDocs ? "blur(18px)" : "none",
          ...(isDocs && theme.applyStyles("dark", {
            borderBottomColor: "rgba(255, 255, 255, 0.08)",
            bgcolor: "rgba(18, 18, 18, 0.82)",
          })),
        })}
      >
        <Toolbar disableGutters sx={{ minHeight: "56px !important" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Brand showDocsLabel={isDocs} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <ReleaseChip />
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ flex: 1, display: { xs: "none", md: "flex" } }}
            gap={1}
          >
            {isDocs ? (
              <Button
                href="/"
                startIcon={<ArrowBackIcon />}
                sx={{ minHeight: 0, color: "text.secondary", fontSize: ".85rem" }}
              >
                Back home
              </Button>
            ) : (
              <>
                <Button
                  href="/docs"
                  sx={{ minHeight: 0, color: "text.primary", px: 1.25, py: 0.6, fontSize: ".85rem" }}
                >
                  Docs
                </Button>
                <PrimaryButton onClick={onGetStarted} />
              </>
            )}
            <ColorModeToggle />
          </Stack>
          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", flex: 1, gap: 1 }}>
            <ColorModeToggle />
            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={openMenu}
              sx={(theme) => ({
                border: "1px solid",
                borderColor: "rgba(23, 23, 23, 0.08)",
                bgcolor: "rgba(255, 255, 255, 0.54)",
                backdropFilter: "blur(18px)",
                ...theme.applyStyles("dark", {
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  bgcolor: "rgba(255, 255, 255, 0.06)",
                }),
              })}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={isOpen}
        onClose={closeMenu}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              width: "min(86vw, 22rem)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.72)",
              bgcolor: "rgba(250, 250, 247, 0.74)",
              backgroundImage:
                "linear-gradient(145deg, rgba(255,255,255,.62), rgba(255,255,255,.16))",
              boxShadow: "-1rem 0 3rem rgba(37, 49, 56, 0.12)",
              backdropFilter: "blur(28px) saturate(145%)",
              ...theme.applyStyles("dark", {
                borderLeftColor: "rgba(0, 0, 0, 0.72)",
                bgcolor: "rgba(26, 26, 26, 0.85)",
                backgroundImage:
                  "linear-gradient(145deg, rgba(30,30,30,.82), rgba(18,18,18,.66))",
                boxShadow: "-1rem 0 3rem rgba(0, 0, 0, 0.32)",
              }),
            }),
          },
        }}
      >
        <Stack sx={{ minHeight: "100%", p: 2 }} spacing={2}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Brand showDocsLabel={isDocs} />
            <IconButton aria-label="Close navigation menu" onClick={closeMenu}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Stack component="nav" aria-label="Mobile navigation" spacing={0.5}>
            {isDocs ? (
              <Button
                href="/"
                startIcon={<ArrowBackIcon />}
                onClick={closeMenu}
                sx={{ justifyContent: "flex-start", color: "text.primary" }}
              >
                Back home
              </Button>
            ) : (
              <>
                <Button
                  href="/docs"
                  onClick={closeMenu}
                  sx={{ justifyContent: "flex-start", color: "text.primary" }}
                >
                  Docs
                </Button>
                <PrimaryButton
                  onClick={() => {
                    closeMenu();
                    onGetStarted?.();
                  }}
                />
              </>
            )}
          </Stack>
          <Box sx={{ mt: "auto !important", overflow: "hidden" }}>
            <ReleaseChip />
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}
