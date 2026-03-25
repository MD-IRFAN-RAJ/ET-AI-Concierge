import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { DashboardProvider } from "@/context/DashboardContext";
import "./globals.css";

export const metadata = {
  title: "Sovereign AI",
  description: "Premium Financial Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
      </head>
      <body className="min-h-full overflow-x-hidden bg-[#0e0e0e] text-white font-sans selection:bg-[#97a9ff]/30">
        <DashboardProvider>
          <Sidebar />
          <div className="flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 transition-all duration-500">
              {children}
            </main>
          </div>
        </DashboardProvider>
      </body>
    </html>
  );
}
