/** @type {import('next').NextConfig} */
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
let convexHostname = undefined;
try {
  if (convexUrl) convexHostname = new URL(convexUrl).hostname;
} catch {}

// Define allowed remote image patterns
const remotePatterns = [
  convexHostname
    ? { protocol: "https", hostname: convexHostname, pathname: "/**" }
    : undefined,
  // ✅ Add your static image hosts explicitly:
  { protocol: "https", hostname: "uq15wewaib.ufs.sh", pathname: "/**" },
  { protocol: "https", hostname: "utfs.io", pathname: "/**" },
  { protocol: "https", hostname: "another-domain.com", pathname: "/**" },
].filter(Boolean) as Array<{
  protocol: "https";
  hostname: string;
  pathname: "/**";
}>;

const nextConfig = {
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
