import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useEffect, useMemo, useState } from "react";
import {
  fetchRelease,
  detectOs,
  matchStandaloneAsset,
  matchOllamaAsset,
  OS_LABEL,
  type Asset,
  type OsType,
} from "./releases";

const INSTALLER_INFO: Record<
  OsType,
  | {
  standalone: { label: string; desc: string };
  withOllama: { label: string; desc: string };
    }
  | null
> = {
  windows: {
    standalone: {
      label: "PolyUI",
      desc: "Just the app. Lightweight, minimal.",
    },
    withOllama: {
      label: "PolyUI + Ollama",
      desc: "App with Ollama bundled for local models.",
    },
  },
  macos: {
    standalone: {
      label: "PolyUI",
      desc: "Just the app for Apple Silicon.",
    },
    withOllama: {
      label: "PolyUI + Ollama",
      desc: "App with Ollama bundled for local models.",
    },
  },
  linux: null,
  unknown: null,
};

interface InstallWizardProps {
  open: boolean;
  onClose: () => void;
}

type Step = "choose" | "downloading";

export default function InstallWizard({ open, onClose }: InstallWizardProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("choose");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const os = useMemo(() => detectOs(), []);
  const osLabel = OS_LABEL[os];
  const info = INSTALLER_INFO[os];

  const standaloneAsset = useMemo(() => matchStandaloneAsset(assets, os), [assets, os]);
  const ollamaAsset = useMemo(() => matchOllamaAsset(assets, os), [assets, os]);

  useEffect(() => {
    if (!open) return;
    const abort = new AbortController();
    let isActive = true;

    async function loadRelease() {
      setLoading(true);
      setFetchError(null);
      setStep("choose");
      setSelectedAsset(null);

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

  function handleSelect(asset: Asset) {
    setSelectedAsset(asset);
    setStep("downloading");
  }

  function handleDownload() {
    if (!selectedAsset) return;
    window.open(selectedAsset.browser_download_url, "_blank", "noopener");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
    >
      {loading ? (
        <DialogContent sx={{ display: "grid", placeItems: "center", py: 6 }}>
          <CircularProgress size={28} sx={{ color: "#171717" }} />
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
              sx={{ color: "#242424", borderColor: "rgba(23, 23, 23, 0.12)" }}
            >
              Close
            </Button>
          </DialogContent>
        </>
      ) : !info ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            {os === "linux" ? "Linux not supported yet" : "Unsupported OS"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {os === "linux"
                ? "PolyUI isn't available for Linux yet. Check back later."
                : "Couldn't detect your operating system."}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={{ color: "#242424", borderColor: "rgba(23, 23, 23, 0.12)" }}
            >
              Close
            </Button>
          </DialogContent>
        </>
      ) : step === "choose" ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Get Started with PolyUI
          </DialogTitle>
          <DialogContent>
            <Chip
              label={osLabel}
              size="small"
              sx={{
                mb: 2,
                fontWeight: 600,
                bgcolor: "rgba(23, 23, 23, 0.06)",
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose your setup. We'll download the right installer.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              {standaloneAsset && info.standalone && (
                <Box
                  sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid rgba(23, 23, 23, 0.1)",
                    cursor: "pointer",
                    transition: "border-color .15s",
                    "&:hover": { borderColor: "rgba(23, 23, 23, 0.3)" },
                  }}
                  onClick={() => handleSelect(standaloneAsset)}
                >
                  <Typography sx={{ fontWeight: 600, mb: 0.25 }}>
                    {info.standalone.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {info.standalone.desc}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{
                      bgcolor: "#171717",
                      color: "#fff",
                      "&:hover": { bgcolor: "#171717" },
                    }}
                  >
                    Download
                  </Button>
                </Box>
              )}
              {ollamaAsset && info.withOllama && (
                <Box
                  sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid rgba(23, 23, 23, 0.1)",
                    cursor: "pointer",
                    transition: "border-color .15s",
                    "&:hover": { borderColor: "rgba(23, 23, 23, 0.3)" },
                  }}
                  onClick={() => handleSelect(ollamaAsset)}
                >
                  <Typography sx={{ fontWeight: 600, mb: 0.25 }}>
                    {info.withOllama.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {info.withOllama.desc}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{
                      bgcolor: "#171717",
                      color: "#fff",
                      "&:hover": { bgcolor: "#171717" },
                    }}
                  >
                    Download
                  </Button>
                </Box>
              )}
            </Stack>
            <Button
              variant="text"
              fullWidth
              onClick={onClose}
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Not now
            </Button>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Your download is starting
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedAsset?.name}
            </Typography>
            <Stack direction="row" gap={1.5}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleDownload}
                sx={{
                  bgcolor: "#171717",
                  color: "#fff",
                  "&:hover": { bgcolor: "#171717" },
                }}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
                sx={{ color: "#242424", borderColor: "rgba(23, 23, 23, 0.12)" }}
              >
                Done
              </Button>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
