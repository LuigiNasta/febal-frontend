import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "F.lli Gaeta | Arredamenti su misura – Rivenditore ufficiale Febal Casa",
  description:
    "Vendita e montaggio arredamenti su misura. Siamo rivenditori ufficiali Febal Casa. Progettazione, consulenza e installazione arredamenti per la tua casa.",
    verification: {
    google: "Khef-5-VkzmO4BMvbSOejIU9z9LHwskan8lFB2tflAw",
  },
  };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-transparent">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
