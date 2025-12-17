// app/contatti/page.tsx
"use client";
import Image from "next/image";
import { FaFacebookF, FaPhoneAlt, FaMobileAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Header della pagina */}
      <section className="bg-gray-800 text-white py-25 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Contattaci</h1>
        <p className="mt-2 text-lg md:text-xl">Vieni a trovarci o contattaci per informazioni</p>
      </section>

      {/* Mappa */}
      <section className="max-w-7xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Dove siamo</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.719276038043!2d14.63908427616118!3d40.67892157933415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b6eb7f5026adf%3A0xa4d6b5740d01f2c5!2sVia%20Nazionale%2C%20216%2C%2084001%20Angri%20SA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Contatti */}
      <section className="max-w-7xl mx-auto p-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info di contatto */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Informazioni</h2>
          <p className="flex items-center gap-2"><FaPhoneAlt className="text-red-600"/> 081 948905</p>
          <p className="flex items-center gap-2"><FaMobileAlt className="text-red-600"/> +39 333 303 8342</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-red-600"/> flligaeta@libero.it</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600"/> Via Nazionale, 216, Angri, Italy</p>
          <p className="flex items-center gap-2">
            <FaFacebookF className="text-blue-500"/> 
            <a href="https://www.facebook.com/centroarredamentiflligaetaangri" target="_blank" className="underline hover:text-red-600">
              Facebook
            </a>
          </p>
        </div>

        {/* Orari di apertura */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Orari di apertura</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Lunedì:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Martedì:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Mercoledì:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Giovedì:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Venerdì:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Sabato:</strong> 09:30 - 13:00 | 16:30 - 20:30</li>
            <li><strong>Domenica:</strong> Chiuso</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
