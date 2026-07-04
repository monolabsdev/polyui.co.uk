import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { motion, useReducedMotion, type Variants } from "motion/react";

const MotionContainer = motion.create(Container);

interface HeroSectionProps {
  onDownload: () => void;
  shouldAnimate?: boolean;
}

export default function HeroSection({ onDownload, shouldAnimate = true }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
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

  return (
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
        src="/assets/polyui-hero-neutral.png"
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
          opacity: 1,
        }}
      />
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          zIndex: -3,
          transition: "opacity 0.4s ease",
          backgroundColor: "rgba(251,251,248,.56)",
          ...theme.applyStyles("dark", {
            backgroundColor: "rgba(18,18,18,.58)",
          }),
        })}
      />

      <MotionContainer
        maxWidth={false}
        disableGutters
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
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
            sx={(theme) => ({
              mb: 1.2,
              color: "#687077",
              fontSize: ".95rem",
              fontWeight: 700,
              ...theme.applyStyles("dark", { color: "#9ca3af" }),
            })}
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
            A clean interface for private, everyday conversations with
            local models — multi-provider support included.
          </Typography>
        </motion.div>
        <motion.div variants={heroTextVariants}>
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="inherit"
              endIcon={<ArrowOutwardIcon fontSize="small" />}
              onClick={onDownload}
              sx={(theme) => ({
                bgcolor: "#171717",
                color: "#fff",
                boxShadow: "0 1rem 2.6rem rgba(12, 19, 28, 0.16)",
                "&:hover": { bgcolor: "#171717" },
                ...theme.applyStyles("dark", {
                  bgcolor: "#e8e8e8",
                  color: "#171717",
                  boxShadow: "0 1rem 2.6rem rgba(0, 0, 0, 0.4)",
                  "&:hover": { bgcolor: "#d0d0d0" },
                }),
              })}
            >
              Download PolyUI
            </Button>
            <Button
              href="https://github.com/monolabsdev/poly-ui"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={(theme) => ({
                color: "#242424",
                borderColor: "rgba(23, 23, 23, 0.12)",
                bgcolor: "rgba(255, 255, 255, 0.72)",
                boxShadow: "0 1rem 2.6rem rgba(32, 46, 62, 0.08)",
                backdropFilter: "blur(18px)",
                "&:hover": {
                  borderColor: "rgba(23, 23, 23, 0.2)",
                  bgcolor: "rgba(255, 255, 255, 0.84)",
                },
                ...theme.applyStyles("dark", {
                  color: "#d0d0d0",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  bgcolor: "rgba(255, 255, 255, 0.06)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }),
              })}
            >
              GitHub
            </Button>
          </Stack>
        </motion.div>
      </MotionContainer>
    </Box>
  );
}
