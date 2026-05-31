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
      sx={{
        m: 0,
        mt: 1.5,
        overflowX: "auto",
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
      }}
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
              sx={{ mb: 1.5, color: "#899095", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em" }}
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
            <Typography sx={{ mb: 1, color: "#687077", fontSize: ".82rem", fontWeight: 700 }}>
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
              Install Poly UI, connect it to Ollama, and start chatting with a
              local model in a few minutes.
            </Typography>

            <Box
              role="note"
              sx={{
                display: "flex",
                gap: 1.5,
                mb: 6,
                border: "1px solid rgba(173, 116, 26, 0.28)",
                borderRadius: 1.5,
                bgcolor: "rgba(255, 248, 225, 0.72)",
                px: 2,
                py: 1.75,
              }}
            >
              <WarningAmberRoundedIcon sx={{ mt: 0.15, color: "#9a681d", fontSize: 20 }} />
              <Box>
                <Typography sx={{ color: "#714c18", fontSize: ".9rem", fontWeight: 700 }}>
                  Ollama is the only supported provider at the moment
                </Typography>
                <Typography sx={{ mt: 0.35, color: "#795b2d", fontSize: ".88rem", lineHeight: 1.65 }}>
                  Poly UI currently connects to local models through Ollama.
                  Support for other providers is planned, but is not available yet.
                </Typography>
              </Box>
            </Box>

            <Section id="introduction" title="Introduction">
              <Typography sx={bodyCopy}>
                Poly UI is a desktop interface for running private conversations
                with local language models. Your model runs through Ollama on your
                machine, so you can use Poly UI without sending chat content to a
                hosted model provider.
              </Typography>
            </Section>

            <Section id="requirements" title="Requirements">
              <Typography sx={bodyCopy}>Before installing Poly UI, make sure you have:</Typography>
              <Box component="ul" sx={{ mt: 1.5, pl: 2.5, color: "text.secondary" }}>
                <li><Typography sx={bodyCopy}>A Windows x64 PC or an Apple Silicon Mac.</Typography></li>
                <li><Typography sx={bodyCopy}>Enough memory for the model you plan to run. Smaller models are the best place to start.</Typography></li>
                <li><Typography sx={bodyCopy}>An internet connection for the initial download and for pulling models.</Typography></li>
                <li><Typography sx={bodyCopy}>Ollama, unless you choose the installer that includes it.</Typography></li>
              </Box>
              <Typography sx={{ ...bodyCopy, mt: 1.5 }}>
                Linux builds are not available yet.
              </Typography>
            </Section>

            <Section id="installation" title="Installation">
              <Typography component="h3" sx={{ mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Option 1: Install Poly UI with Ollama
              </Typography>
              <Typography sx={bodyCopy}>
                This is the easiest setup for most people. Download the installer
                labelled <strong>PolyUI + Ollama</strong>, open it, and follow the
                prompts. Ollama is installed alongside Poly UI.
              </Typography>

              <Typography component="h3" sx={{ mt: 3, mb: 0.75, fontSize: "1.05rem", fontWeight: 700 }}>
                Option 2: Install Poly UI only
              </Typography>
              <Typography sx={bodyCopy}>
                Choose the standalone <strong>PolyUI</strong> installer if Ollama
                is already installed on your machine. If you need to install Ollama
                separately, download it from the official Ollama website.
              </Typography>
              <Button
                href="https://ollama.com/download"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                sx={{
                  mt: 2,
                  minHeight: 0,
                  borderColor: "rgba(23, 23, 23, 0.14)",
                  color: "text.primary",
                  py: 0.9,
                }}
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
