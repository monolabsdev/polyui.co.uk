import assert from "node:assert/strict";
import { matchOllamaAsset, matchStandaloneAsset } from "../src/releases.ts";

const assets = [
  {
    name: "PolyUI-0.16.1-linux-x64.deb",
    browser_download_url: "https://example.com/polyui.deb",
  },
  {
    name: "PolyUI-0.16.1-linux-x64.AppImage",
    browser_download_url: "https://example.com/polyui.AppImage",
  },
  {
    name: "PolyUI-0.16.1-linux-x64.rpm",
    browser_download_url: "https://example.com/polyui.rpm",
  },
];

assert.equal(matchStandaloneAsset(assets, "linux")?.name, "PolyUI-0.16.1-linux-x64.AppImage");

assert.equal(
  matchOllamaAsset(
    [
      {
        name: "PolyUI-0.16.1-windows-x64-ollama-setup.exe",
        browser_download_url: "https://example.com/polyui-ollama.exe",
      },
    ],
    "windows",
  )?.name,
  "PolyUI-0.16.1-windows-x64-ollama-setup.exe",
);
