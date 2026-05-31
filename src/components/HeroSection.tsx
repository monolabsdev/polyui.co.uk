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
  );
}
