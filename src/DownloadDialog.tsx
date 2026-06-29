import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import {
  fetchRelease,
  detectOs,
  OS_LABEL,
  type Asset,
  type OsType,
} from "./releases";

function matchAsset(assets: Asset[], os: OsType): Asset | null {
  if (os === "windows") {
    const standalone = assets.find(
      (a) => a.name.includes("x64-setup.exe") && !a.name.includes("Ollama")
    );
    if (standalone) return standalone;
    return assets.find((a) => a.name.includes("x64-setup.exe")) ?? null;
  }
  if (os === "macos") {
    const dmg = assets.find((a) => a.name.endsWith(".dmg"));
    if (dmg) return dmg;
    return assets.find((a) => a.name.endsWith(".pkg")) ?? null;
  }
  return null;
}

interface DownloadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DownloadDialog({ open, onClose }: DownloadDialogProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const os = useMemo(() => detectOs(), []);
  const asset = matchAsset(assets, os);
  const osLabel = OS_LABEL[os];

  useEffect(() => {
    if (!open) return;
    const abort = new AbortController();
    let isActive = true;

    async function loadRelease() {
      setLoading(true);
      setFetchError(null);

      try {
        setAssets(await fetchRelease(abort.signal));
      } catch (err) {
        if (isActive && err instanceof Error && err.name !== "AbortError") {
          setFetchError(err.message);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    void loadRelease();
    return () => {
      isActive = false;
      abort.abort();
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
    >
      {loading ? (
        <DialogContent sx={{ display: "grid", placeItems: "center", py: 6 }}>
          <CircularProgress size={28} sx={(theme) => ({
            color: "#171717",
            ...theme.applyStyles("dark", { color: "#e8e8e8" }),
          })} />
        </DialogContent>
      ) : fetchError ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Something went wrong
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fetchError}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={(theme) => ({
                color: "#242424",
                borderColor: "rgba(23, 23, 23, 0.12)",
                ...theme.applyStyles("dark", {
                  color: "#d0d0d0",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }),
              })}
            >
              Close
            </Button>
          </DialogContent>
        </>
      ) : asset ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Download for {osLabel}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {asset.name}
            </Typography>
            <Stack direction="row" gap={1.5}>
              <Button
                variant="contained"
                fullWidth
                href={asset.browser_download_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                sx={(theme) => ({
                  bgcolor: "#171717",
                  color: "#fff",
                  "&:hover": { bgcolor: "#171717" },
                  ...theme.applyStyles("dark", {
                    bgcolor: "#e8e8e8",
                    color: "#171717",
                    "&:hover": { bgcolor: "#d0d0d0" },
                  }),
                })}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
                sx={(theme) => ({
                  color: "#242424",
                  borderColor: "rgba(23, 23, 23, 0.12)",
                  ...theme.applyStyles("dark", {
                    color: "#d0d0d0",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  }),
                })}
              >
                Cancel
              </Button>
            </Stack>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            {os === "linux" ? "Linux not supported yet" : "No download found"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {os === "linux"
                ? "PolyUI isn't available for Linux yet. Check back later."
                : `Couldn't find an installer for ${osLabel}.`}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={(theme) => ({
                color: "#242424",
                borderColor: "rgba(23, 23, 23, 0.12)",
                ...theme.applyStyles("dark", {
                  color: "#d0d0d0",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }),
              })}
            >
              Close
            </Button>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
