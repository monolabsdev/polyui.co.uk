import { Box } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import TextShimmer from "./TextShimmer";

const INTRO_DURATION_MS = 3150;
const MotionBox = motion.create(Box);

interface StartupIntroProps {
  onComplete: () => void;
}

export default function StartupIntro({ onComplete }: StartupIntroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionBox
      aria-hidden="true"
      initial={{ y: 0 }}
      animate={shouldReduceMotion ? { opacity: 0 } : { y: "-100%" }}
      transition={
        shouldReduceMotion
          ? { duration: 0.01 }
          : {
              delay: 2.42,
              duration: 0.73,
              ease: [0.76, 0, 0.24, 1],
            }
      }
      onAnimationComplete={onComplete}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: (theme) => theme.zIndex.modal + 10,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        bgcolor: "#111312",
        willChange: "transform",
      }}
    >
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.035, filter: "blur(2px)" }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: [0, 1, 1],
                scale: [0.035, 1, 1.015],
                filter: ["blur(2px)", "blur(0px)", "blur(0px)"],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : {
                duration: 2.7,
                times: [0, 0.33, 1],
                ease: [0.22, 1, 0.36, 1],
              }
        }
        style={{ willChange: "transform, opacity, filter" }}
      >
        <TextShimmer
          baseColor="#8e9692"
          duration={1.7}
          highlightColor="#f8f8f4"
          spread={16}
          style={{
            fontSize: "clamp(3.25rem, 9vw, 7rem)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 1,
          }}
        >
          Poly UI
        </TextShimmer>
      </motion.div>
    </MotionBox>
  );
}

export { INTRO_DURATION_MS };
