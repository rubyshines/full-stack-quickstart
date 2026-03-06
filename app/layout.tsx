import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Stack App",
  description: "Built with Claude Code",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 700, margin: "40px auto", padding: "0 20px" }}>
        {children}
      </body>
    </html>
  );
}
