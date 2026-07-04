import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { useEffect, useMemo, useState } from "react";
import {
  fetchRelease,
  detectOs,
  OS_LABEL,
  type Asset,
  type OsType,
} from "../releases";

const RELEASES_URL = "https://github.com/monolabsdev/poly-ui/releases/latest";

const INSTALL_COMMANDS: Partial<Record<OsType, string>> = {
  linux: "curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh",
  macos: "curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh",
  windows: "irm https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.ps1 | iex",
};

interface InstallWizardProps {
  open: boolean;
  onClose: () => void;
}

type Step = "choose" | "downloading";

interface InstallerOptionProps {
  asset: Asset;
  description: string;
  label: string;
  onSelect: (asset: Asset) => void;
}

interface InstallerOptionData {
  asset: Asset;
  description: string;
  label: string;
}

function findAsset(assets: Asset[], text: string): Asset | null {
  const needle = text.toLowerCase();
  return assets.find((asset) => asset.name.toLowerCase().includes(needle)) ?? null;
}

function getInstallerOptions(assets: Asset[], os: OsType): InstallerOptionData[] {
  const options: InstallerOptionData[] = [];
  const add = (text: string, label: string, description: string) => {
    const asset = findAsset(assets, text);
    if (asset) options.push({ asset, description, label });
  };

  if (os === "windows") {
    add("windows-x64-setup.exe", "Windows setup (.exe)", "Standard installer for Windows x64.");
    add("windows-x64.msi", "Windows MSI", "Package installer for managed Windows setups.");
    add("windows-x64-ollama-setup.exe", "Windows + Ollama", "Includes Ollama for local models.");
  }

  if (os === "macos") {
    add("macos-universal.dmg", "macOS universal DMG", "For Apple Silicon and Intel Macs.");
  }

  if (os === "linux") {
    add("linux-x64.deb", "Debian/Ubuntu x64", "Use on most Intel or AMD Debian-based systems.");
    add("linux-arm64.deb", "Debian/Ubuntu ARM64", "Use on ARM Debian-based systems.");
    add("linux-x64.rpm", "Fedora/RHEL x64", "Use on most Intel or AMD RPM-based systems.");
    add("linux-arm64.rpm", "Fedora/RHEL ARM64", "Use on ARM RPM-based systems.");
    add("linux-x64.appimage", "AppImage x64", "Portable option; may require FUSE on some distros.");
    add("linux-arm64.appimage", "AppImage ARM64", "Portable ARM option; may require FUSE on some distros.");
  }

  return options;
}

function InstallerOption({ asset, description, label, onSelect }: InstallerOptionProps) {
  return (
    <ButtonBase
      onClick={() => onSelect(asset)}
      sx={(theme) => ({
        display: "block",
        height: "100%",
        minWidth: 0,
        border: "1px solid rgba(23, 23, 23, 0.1)",
        borderRadius: 2,
        p: 2.5,
        textAlign: "left",
        transition: "border-color .15s, background-color .15s",
        "&:hover, &:focus-visible": {
          borderColor: "rgba(23, 23, 23, 0.3)",
          bgcolor: "rgba(23, 23, 23, 0.025)",
        },
        ...theme.applyStyles("dark", {
          borderColor: "rgba(255, 255, 255, 0.1)",
          "&:hover, &:focus-visible": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            bgcolor: "rgba(255, 255, 255, 0.04)",
          },
        }),
      })}
    >
      <Typography sx={{ mb: 0.25, fontWeight: 600 }}>{label}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {description}
      </Typography>
      <Box
        component="span"
        sx={(theme) => ({
          display: "block",
          borderRadius: 999,
          bgcolor: "#171717",
          color: "#fff",
          px: 2,
          py: 1,
          textAlign: "center",
          fontSize: ".82rem",
          fontWeight: 700,
          ...theme.applyStyles("dark", {
            bgcolor: "#e8e8e8",
            color: "#171717",
          }),
        })}
      >
        Download
      </Box>
    </ButtonBase>
  );
}

export default function InstallWizard({ open, onClose }: InstallWizardProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("choose");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isCommandCopied, setCommandCopied] = useState(false);
  const os = useMemo(() => detectOs(), []);
  const osLabel = OS_LABEL[os];
  const installCommand = INSTALL_COMMANDS[os] ?? null;
  const installerOptions = useMemo(() => getInstallerOptions(assets, os), [assets, os]);

  useEffect(() => {
    if (!open) return;
    const abort = new AbortController();
    let isActive = true;

    async function loadRelease() {
      setLoading(true);
      setFetchError(null);
      setStep("choose");
      setSelectedAsset(null);
      setCommandCopied(false);

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

  async function handleCopyCommand() {
    if (!installCommand) return;
    try {
      await navigator.clipboard.writeText(installCommand);
      setCommandCopied(true);
    } catch {
      setCommandCopied(false);
    }
  }

  function handleDownload() {
    if (!selectedAsset) return;
    window.open(selectedAsset.browser_download_url, "_blank", "noopener");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: {
          sx: (theme) => ({
            backgroundColor: "rgba(251, 251, 248, 0.5)",
            backdropFilter: "blur(4px)",
            ...theme.applyStyles("dark", {
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            }),
          }),
        },
        paper: {
          sx: {
            width: { xs: "calc(100% - 2rem)", sm: "100%" },
            m: { xs: 2, sm: 4 },
            borderRadius: "12px",
            p: { xs: 0.25, sm: 1 },
          },
        },
      }}
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
      ) : !installCommand && installerOptions.length === 0 ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Unsupported OS
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Couldn't detect your operating system.
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
      ) : step === "choose" ? (
        <>
          <DialogTitle sx={{ fontWeight: 600, pb: 0.5 }}>
            Install PolyUI
          </DialogTitle>
          <DialogContent>
            <Chip
              label={osLabel}
              size="small"
              sx={(theme) => ({
                mb: 2,
                fontWeight: 600,
                bgcolor: "rgba(23, 23, 23, 0.06)",
                ...theme.applyStyles("dark", {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                }),
              })}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {os === "linux"
                ? "Pick the package for your distro and CPU, or copy the command line installer."
                : "Choose a download, or copy the command line installer."}
            </Typography>
            {installCommand && (
              <Box
                sx={(theme) => ({
                  mb: 2.5,
                  border: "1px solid rgba(23, 23, 23, 0.1)",
                  borderRadius: 2,
                  p: 2,
                  ...theme.applyStyles("dark", {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }),
                })}
              >
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Command line install
                </Typography>
                <Box
                  component="code"
                  sx={(theme) => ({
                    display: "block",
                    overflowX: "auto",
                    borderRadius: 1.5,
                    bgcolor: "#f4f4f0",
                    px: 1.5,
                    py: 1.25,
                    color: "#313739",
                    fontFamily:
                      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
                    fontSize: ".78rem",
                    lineHeight: 1.7,
                    whiteSpace: "nowrap",
                    ...theme.applyStyles("dark", {
                      bgcolor: "#1e1e1e",
                      color: "#d4d4d4",
                    }),
                  })}
                >
                  {installCommand}
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon fontSize="small" />}
                  onClick={handleCopyCommand}
                  sx={(theme) => ({
                    mt: 1.5,
                    minHeight: 0,
                    borderColor: "rgba(23, 23, 23, 0.12)",
                    color: "#242424",
                    py: 0.8,
                    ...theme.applyStyles("dark", {
                      color: "#d0d0d0",
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    }),
                  })}
                >
                  {isCommandCopied ? "Copied" : "Copy command"}
                </Button>
              </Box>
            )}
            {installerOptions.length > 0 && (
              <>
                <Typography sx={{ mb: 1.25, fontWeight: 600 }}>
                  Release downloads
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: installerOptions.length > 2
                        ? "repeat(2, minmax(0, 1fr))"
                        : "repeat(auto-fit, minmax(0, 1fr))",
                    },
                    gap: 1.5,
                  }}
                >
                  {installerOptions.map((option) => (
                    <InstallerOption
                      key={option.asset.name}
                      asset={option.asset}
                      description={option.description}
                      label={option.label}
                      onSelect={handleSelect}
                    />
                  ))}
                </Box>
              </>
            )}
            {installerOptions.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No release downloads were found for {osLabel}. Check the releases page for older builds.
              </Typography>
            )}
            <Link
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                color: "text.secondary",
                fontSize: ".82rem",
              }}
            >
              View all releases
            </Link>
            <Link
              href="/docs"
              underline="hover"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 1.5,
                color: "text.secondary",
                fontSize: ".82rem",
              }}
              onClick={onClose}
            >
              Not sure? Read the docs
            </Link>
            <Button
              variant="text"
              fullWidth
              onClick={onClose}
              sx={{ mt: 1, color: "text.secondary" }}
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
                Done
              </Button>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
