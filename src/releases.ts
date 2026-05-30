export interface Asset {
  name: string;
  browser_download_url: string;
}

export interface ReleaseInfo {
  tagName: string;
  htmlUrl: string;
}

export type OsType = "windows" | "macos" | "linux" | "unknown";

export function detectOs(): OsType {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "windows";
  if (ua.includes("Mac OS X") || ua.includes("macOS")) return "macos";
  if (ua.includes("Linux")) return "linux";
  return "unknown";
}

export const OS_LABEL: Record<OsType, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  unknown: "your OS",
};

export function matchStandaloneAsset(assets: Asset[], os: OsType): Asset | null {
  if (os === "windows") {
    return assets.find(
      (a) => a.name.includes("x64-setup.exe") && !a.name.includes("Ollama")
    ) ?? null;
  }
  if (os === "macos") {
    return assets.find((a) => a.name.endsWith(".dmg")) ?? null;
  }
  return null;
}

export function matchOllamaAsset(assets: Asset[], os: OsType): Asset | null {
  if (os === "windows") {
    return assets.find(
      (a) => a.name.includes("x64-setup.exe") && a.name.includes("Ollama")
    ) ?? null;
  }
  if (os === "macos") {
    return assets.find((a) => a.name.endsWith(".pkg")) ?? null;
  }
  return null;
}

export async function fetchRelease(signal: AbortSignal): Promise<Asset[]> {
  const res = await fetch(
    "https://api.github.com/repos/monolabsdev/poly-ui/releases?per_page=5",
    { signal }
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  const releases = await res.json();
  for (const r of releases) {
    if (r.assets?.length > 0) return r.assets;
  }
  return [];
}

export async function fetchLatestRelease(signal: AbortSignal): Promise<ReleaseInfo | null> {
  const res = await fetch(
    "https://api.github.com/repos/monolabsdev/poly-ui/releases?per_page=1",
    { signal }
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  const releases = await res.json();
  const latest = releases[0];
  if (!latest?.tag_name) return null;
  return { tagName: latest.tag_name, htmlUrl: latest.html_url };
}
