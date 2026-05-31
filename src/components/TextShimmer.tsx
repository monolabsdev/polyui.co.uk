import {
  useInsertionEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Box, useTheme } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const shimmer = keyframes`
  from { background-position: 200% center; }
  to { background-position: -200% center; }
`;

export type TextShimmerProps = {
  as?: ElementType;
  baseColor?: string;
  duration?: number;
  highlightColor?: string;
  spread?: number;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function TextShimmer({
  as = "span",
  baseColor,
  duration = 2.4,
  highlightColor,
  spread = 20,
  children,
  ...props
}: TextShimmerProps) {
  const dynamicSpread = Math.min(Math.max(spread, 5), 45);
  const theme = useTheme();
  const injected = useRef(false);

  useInsertionEffect(() => {
    if (injected.current) return;

    injected.current = true;
    const style = document.createElement("style");
    style.textContent = shimmer.styles;
    document.head.appendChild(style);

    return () => {
      style.remove();
      injected.current = false;
    };
  }, []);

  return (
    <Box
      component={as}
      sx={{
        display: as === "span" ? "inline-block" : undefined,
        color: "transparent",
        backgroundImage: `linear-gradient(to right, ${baseColor ?? theme.palette.text.secondary} ${50 - dynamicSpread}%, ${highlightColor ?? theme.palette.text.primary} 50%, ${baseColor ?? theme.palette.text.secondary} ${50 + dynamicSpread}%)`,
        backgroundSize: "200% auto",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `${shimmer.name} ${duration}s infinite linear`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
