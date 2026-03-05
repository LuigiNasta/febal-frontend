// components/Footer.tsx
"use client";
import Image from "next/image";

// Lightweight inline SVG icons to avoid dependency on react-icons package
const PhoneIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57.13.34.04.73-.24 1.01l-2.21 2.21z" />
  </svg>
);

const MobileIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 19a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const MailIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const FacebookIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5V12h2V9.8c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 2.9h-1.8v7A10 10 0 0022 12z" />
  </svg>
);

const InstagramIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.265-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11-2.881.001 1.44 1.44 0 012.881-.001z" />
  </svg>
);

const MapMarkerIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    className={props.className}
    aria-hidden
  >
    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo Febal */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/febal-logo.PNG"
            alt="Febal Casa"
            width={150}
            height={50}
            className="mb-4"
          />
          <p className="text-gray-400 text-center md:text-left">
            Rivenditore ufficiale Febal Casa.
          </p>
        </div>

        {/* Contatti */}
        <div className="flex flex-col space-y-3 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Contatti</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <PhoneIcon /> 081 948905
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <MobileIcon /> +39 333 303 8342
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <MailIcon /> flligaeta@libero.it
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <MapMarkerIcon /> Via Nazionale, 216, Angri, Italy
          </p>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="text-xl font-semibold mb-2">Seguici</h3>
          <a
            href="https://www.facebook.com/centroarredamentiflligaetaangri"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-blue-500 transition"
          >
            <FacebookIcon /> Facebook
          </a>
          <a
            href="https://www.instagram.com/centroarredamenti_f.lligaeta?igsh=MWdoeXM5NXZ0cDU5cQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-pink-500 transition"
          >
            <InstagramIcon /> Instagram
          </a>
        </div>

      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} F.lli Gaeta. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
