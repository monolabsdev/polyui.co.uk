import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import SiteHeader from "./SiteHeader";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "requirements", label: "Requirements" },
  { id: "installation", label: "Installation" },
  { id: "get-started", label: "Get started" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <Box
      component="pre"
      sx={(theme) => ({
        m: 0,
        mt: 1.5,
        overflowX: "auto",
        overflowWrap: "anywhere",
        border: "1px solid rgba(23, 23, 23, 0.1)",
        borderRadius: 1.5,
        bgcolor: "#f4f4f0",
        px: 2,
        py: 1.5,
        color: "#313739",
        fontFamily:
          '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        fontSize: ".82rem",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
        ...theme.applyStyles("dark", {
          borderColor: "rgba(255, 255, 255, 0.08)",
          bgcolor: "#1e1e1e",
          color: "#d4d4d4",
        }),
      })}
    >
      <code>{children}</code>
    </Box>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={`${id}-title`}
      sx={{ scrollMarginTop: 96, pt: 1, pb: 5 }}
    >
      <Typography
        id={`${id}-title`}
        component="h2"
        sx={{ mb: 1.5, fontSize: "1.45rem", fontWeight: 600, letterSpacing: "-.02em" }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

const bodyCopy = {
  color: "text.secondary",
  fontSize: ".98rem",
  lineHeight: 1.75,
};

export default function DocsPage() {
  return (
    <Box component="main" sx={{ minHeight: "100svh", bgcolor: "background.default" }}>
      <SiteHeader page="docs" />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "12rem minmax(0, 42rem)" },
            justifyContent: { md: "center" },
            columnGap: { md: 8 },
            py: { xs: 5, md: 8 },
          }}
        >
          <Box
            component="nav"
            aria-label="Documentation sections"
            sx={{
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 104,
              alignSelf: "start",
            }}
          >
            <Typography
              sx={(theme) => ({
                mb: 1.5,
                color: "#899095",
                fontSize: ".72rem",
                fontWeight: 700,
                letterSpacing: ".1em",
                ...theme.applyStyles("dark", { color: "#6b7280" }),
              })}
            >
              ON THIS PAGE
            </Typography>
            <Stack spacing={0.4}>
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  underline="none"
                  sx={{
                    py: 0.55,
                    color: "text.secondary",
                    fontSize: ".88rem",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {section.label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box component="article">
            <Typography
              sx={(theme) => ({
                mb: 1,
                color: "#687077",
                fontSize: ".82rem",
                fontWeight: 700,
                ...theme.applyStyles("dark", { color: "#9ca3af" }),
              })}
            >
              POLY UI DOCUMENTATION
            </Typography>
            <Typography
              component="h1"
              sx={{
                maxWidth: "14ch",
                fontSize: { xs: "2.55rem", sm: "3.3rem" },
                fontWeight: 500,
                letterSpacing: "-.055em",
                lineHeight: 1.03,
              }}
            >
              Set up Poly UI.
            </Typography>
            <Typography sx={{ ...bodyCopy, maxWidth: "38rem", mt: 2, mb: 3.5 }}>
              Install Poly UI, connect it to a provider, and start chatting
              with a local model in a few minutes.
            </Typography>

            <Box
              role="note"
              sx={(theme) => ({
                display: "flex",
                gap: 1.5,
                mb: 6,
                border: "1px solid rgba(26, 139, 173, 0.28)",
                borderRadius: 1.5,
                bgcolor: "rgba(225, 248, 255, 0.72)",
                px: 2,
                py: 1.75,
                ...theme.applyStyles("dark", {
                  borderColor: "rgba(96, 165, 250, 0.2)",
                  bgcolor: "rgba(30, 58, 95, 0.5)",
                }),
              })}
            >
              <WarningAmberRoundedIcon sx={(theme) => ({
                mt: 0.15,
                color: "#1d7a9a",
                fontSize: 20,
                ...theme.applyStyles("dark", { color: "#60a5fa" }),
              })} />
              <Box>
                <Typography
                  sx={(theme) => ({
                    color: "#184c71",
                    fontSize: ".9rem",
                    fontWeight: 700,
                    ...theme.applyStyles("dark", { color: "#93c5fd" }),
                  })}
                >
                  Multi-provider support is now available
                </Typography>
                <Typography
                  sx={(theme) => ({
                    mt: 0.35,
                    color: "#2d5b79",
                    fontSize: ".88rem",
                    lineHeight: 1.65,
                    ...theme.applyStyles("dark", { color: "#b9d4f0" }),
                  })}
                >
                  Poly UI now supports multiple backends alongside Ollama.
                  Switch between providers from the settings panel.
                </Typography>
              </Box>
            </Box>

            <Section id="introduction" title="Introduction">
              <Typography sx={bodyCopy}>
                Poly UI is a desktop interface for running private conversations
                with local language models. Your model runs locally on your
                machine, so you can use Poly UI without sending chat content to a
                hosted provider.
              </Typography>
            </Section>

            <Section id="requirements" title="Requirements">
              <Typography sx={bodyCopy}>Before installing Poly UI, make sure you have:</Typography>
              <Box component="ul" sx={{ mt: 1.5, pl: 2.5, color: "text.secondary" }}>
                <li><Typography sx={bodyCopy}>A Windows x64 PC, macOS device, or Linux x64/arm64 machine.</Typography></li>
                <li><Typography sx={bodyCopy}>Enough memory for the model you plan to run. Smaller models are the best place to start.</Typography></li>
                <li><Typography sx={bodyCopy}>An internet connection for the initial download and for pulling models.</Typography></li>
                <li><Typography sx={bodyCopy}>A local model provider such as Ollama, unless you choose the installer that includes it.</Typography></li>
              </Box>
              <Typography sx={{ ...bodyCopy, mt: 1.5 }}>
                Linux downloads are available as AppImage, Debian, and RPM packages.
              </Typography>
            </Section>

            <Section id="installation" title="Installation">
              <Typography sx={bodyCopy}>
                Poly UI can be installed from the latest GitHub release, or with
                the command line installer.
              </Typography>

              <Typography component="h3" sx={{ mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Command line install
              </Typography>
              <Typography sx={bodyCopy}>
                Linux and macOS:
              </Typography>
              <CodeBlock>curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh</CodeBlock>
              <Typography sx={{ ...bodyCopy, mt: 2 }}>
                Windows PowerShell:
              </Typography>
              <CodeBlock>irm https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.ps1 | iex</CodeBlock>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Install from releases
              </Typography>
              <Typography sx={bodyCopy}>
                Download the file that matches your operating system and CPU.
                Use x64 for most Intel/AMD PCs, and arm64 for ARM Linux devices.
              </Typography>
              <Button
                href="https://github.com/monolabsdev/poly-ui/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                sx={(theme) => ({
                  mt: 2,
                  minHeight: 0,
                  borderColor: "rgba(23, 23, 23, 0.14)",
                  color: "text.primary",
                  py: 0.9,
                  ...theme.applyStyles("dark", {
                    borderColor: "rgba(255, 255, 255, 0.14)",
                  }),
                })}
              >
                Open releases
              </Button>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                macOS
              </Typography>
              <Typography sx={bodyCopy}>
                Download <strong>PolyUI-*-macos-universal.dmg</strong>, open the
                disk image, and drag Poly UI into Applications.
              </Typography>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Windows
              </Typography>
              <Typography sx={bodyCopy}>
                Download <strong>PolyUI-*-windows-x64-setup.exe</strong> or
                <strong> PolyUI-*-windows-x64.msi</strong>. To install Poly UI
                with Ollama bundled, download
                <strong> PolyUI-*-windows-x64-ollama-setup.exe</strong>.
              </Typography>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Linux Debian/Ubuntu
              </Typography>
              <Typography sx={bodyCopy}>
                Download <strong>PolyUI-*-linux-x64.deb</strong> or
                <strong> PolyUI-*-linux-arm64.deb</strong>, then install it with:
              </Typography>
              <CodeBlock>sudo apt install ./PolyUI-*-linux-*.deb</CodeBlock>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Linux Fedora/RHEL/openSUSE
              </Typography>
              <Typography sx={bodyCopy}>
                Download <strong>PolyUI-*-linux-x64.rpm</strong> or
                <strong> PolyUI-*-linux-arm64.rpm</strong>, then install it with:
              </Typography>
              <CodeBlock>sudo rpm -i PolyUI-*-linux-*.rpm</CodeBlock>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Other Linux distributions
              </Typography>
              <Typography sx={bodyCopy}>
                Download <strong>PolyUI-*-linux-x64.AppImage</strong> or
                <strong> PolyUI-*-linux-arm64.AppImage</strong>, then run:
              </Typography>
              <CodeBlock>{`chmod +x PolyUI-*-linux-*.AppImage
./PolyUI-*-linux-*.AppImage`}</CodeBlock>
              <Typography sx={{ ...bodyCopy, mt: 1.5 }}>
                AppImage support varies by distro and may require FUSE. Use the
                Debian or RPM package when your distro supports one.
              </Typography>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Ollama
              </Typography>
              <Typography sx={bodyCopy}>
                If your installer does not include Ollama and you need it,
                download Ollama from the official website.
              </Typography>
              <Button
                href="https://ollama.com/download"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                sx={(theme) => ({
                  mt: 2,
                  minHeight: 0,
                  borderColor: "rgba(23, 23, 23, 0.14)",
                  color: "text.primary",
                  py: 0.9,
                  ...theme.applyStyles("dark", {
                    borderColor: "rgba(255, 255, 255, 0.14)",
                  }),
                })}
              >
                Download Ollama
              </Button>
            </Section>

            <Section id="get-started" title="Get started">
              <Typography sx={bodyCopy}>
                Once Poly UI and Ollama are installed, pull a model using your
                terminal. A small model is a good first check:
              </Typography>
              <CodeBlock>ollama pull llama3.2</CodeBlock>
              <Typography sx={{ ...bodyCopy, mt: 2 }}>
                Open Poly UI, choose the model, and start a new chat. If Ollama is
                installed but not running, start it with:
              </Typography>
              <CodeBlock>ollama serve</CodeBlock>
            </Section>

            <Section id="troubleshooting" title="Troubleshooting">
              <Typography component="h3" sx={{ mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Poly UI cannot find Ollama
              </Typography>
              <Typography sx={bodyCopy}>
                Make sure Ollama is installed and running. Try <strong>ollama serve</strong> in
                your terminal, then restart Poly UI.
              </Typography>
              <Typography component="h3" sx={{ mt: 2.5, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                No models appear
              </Typography>
              <Typography sx={bodyCopy}>
                Pull at least one model with <strong>ollama pull llama3.2</strong>, then reopen Poly UI.
              </Typography>
            </Section>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
