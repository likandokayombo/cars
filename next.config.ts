/** @type {import('next').NextConfig} */
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
let convexHostname = undefined;
try {
  if (convexUrl) convexHostname = new URL(convexUrl).hostname;
} catch {}

const remotePatterns = [
  convexHostname
    ? { protocol: "https", hostname: convexHostname, pathname: "/**" }
    : undefined,
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
