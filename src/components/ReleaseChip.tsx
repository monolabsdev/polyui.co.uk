import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchLatestRelease, type ReleaseInfo } from "../releases";

export default function ReleaseChip() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    const abort = new AbortController();
    let isActive = true;

    async function load() {
      try {
        const info = await fetchLatestRelease(abort.signal);
        if (isActive) setRelease(info);
      } catch {
        // ignore
      }
    }

    void load();
    return () => {
      isActive = false;
      abort.abort();
    };
  }, []);

  if (!release) return null;

  return (
    <Link
      href={release.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        maxWidth: "100%",
        gap: 1.1,
        pl: 0.25,
        pr: 1.2,
        py: 0.25,
        borderRadius: 999,
        bgcolor: "rgba(246, 244, 238, 0.74)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(23, 23, 23, 0.1)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.035), inset 0 1px 0 rgba(255,255,255,0.75)",
        color: "text.secondary",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        transition: "background 0.2s, border-color 0.2s",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.88)",
          borderColor: "rgba(125, 72, 255, 0.28)",
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          px: 1.4,
          py: 0.42,
          borderRadius: 999,
          bgcolor: "rgba(125, 72, 255, 0.12)",
          border: "1px solid rgba(125, 72, 255, 0.14)",
          fontWeight: 600,
          color: "#7d48ff",
          fontSize: "inherit",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.78)",
        }}
      >
        {release.tagName}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontWeight: 500,
          color: "text.secondary",
          fontSize: "inherit",
        }}
      >
        Check out latest features
      </Typography>
      <ArrowForwardRoundedIcon sx={{ ml: -0.35, fontSize: "1.05rem", color: "text.secondary" }} />
    </Link>
  );
}
