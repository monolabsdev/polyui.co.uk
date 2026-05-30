import { Link, Typography } from "@mui/material";

export default function OpenSourceFooter() {
  return (
    <Typography
      sx={{
        position: "fixed",
        right: 12,
        bottom: 8,
        zIndex: 9999,
        display: { xs: "none", sm: "block" },
        color: "text.secondary",
        fontSize: "0.7rem",
        opacity: 0.45,
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
  );
}
