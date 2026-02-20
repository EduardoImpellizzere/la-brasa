import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav>
          <Link href="/">Inicio</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
