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
        gap: 0.8,
        px: 1.8,
        py: 0.55,
        borderRadius: 999,
        bgcolor: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        color: "text.secondary",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        transition: "background 0.2s",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.78)",
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          fontSize: "inherit",
        }}
      >
        {release.tagName}
      </Typography>
      Released
      <Typography
        component="span"
        sx={{
          fontWeight: 500,
          color: "text.primary",
          fontSize: "inherit",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "2px",
        }}
      >
        Patch notes
      </Typography>
    </Link>
  );
}
