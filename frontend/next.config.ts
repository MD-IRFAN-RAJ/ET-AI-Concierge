import type { NextConfig } from "next";

const backendApiBaseUrl = process.env.BACKEND_API_BASE_URL || "http://127.0.0.1:8000";
const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS || "localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const nextConfig: NextConfig = {
    // Prevent Next.js from blocking configured dev tunnel domains.
    // @ts-ignore
    allowedDevOrigins,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${backendApiBaseUrl}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
