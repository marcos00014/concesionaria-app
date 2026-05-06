"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { VENDEDORES } from "../data";
import { motion } from "framer-motion";

export default function AsesoresCarousel() {
  const [actual, setActual] = useState(0);

  const asesor = VENDEDORES[actual];

  const anterior = () => {
    setActual((prev) => (prev === 0 ? VENDEDORES.length - 1 : prev - 1));
  };

  const siguiente = () => {
    setActual((prev) => (prev === VENDEDORES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="asesores" className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-black uppercase tracking-wide text-blue-400">
            Contacto directo
          </span>

          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Contactate con nuestros asesores
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            Elegí un asesor y recibí atención personalizada por WhatsApp.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <button
            onClick={anterior}
            className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-blue-600 md:flex"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={siguiente}
            className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-blue-600 md:flex"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <motion.div
            key={asesor.id}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] bg-slate-900">
                <Image
                  src={asesor.foto}
                  alt={asesor.nombre}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="mb-4 w-fit rounded-full bg-blue-600/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-300">
                  Asesor {actual + 1} de {VENDEDORES.length}
                </span>

                <h3 className="text-4xl font-black tracking-tight">
                  {asesor.nombre}
                </h3>

                <p className="mt-3 text-sm font-black uppercase tracking-wide text-blue-400">
                  {asesor.rol}
                </p>

                <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                  Atención personalizada para ayudarte a elegir el vehículo ideal,
                  consultar financiación, evaluar una permuta o coordinar una visita.
                </p>

                <a
                  href={`https://wa.me/${asesor.telefono}?text=${encodeURIComponent(
                    `Hola ${asesor.nombre}, quiero hacer una consulta sobre un vehículo publicado en la web.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-green-600 px-7 py-3 text-sm font-black text-white transition hover:scale-105 hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar por WhatsApp
                </a>

                <div className="mt-8 flex items-center gap-2">
                  {VENDEDORES.map((vendedor, index) => (
                    <button
                      key={vendedor.id}
                      onClick={() => setActual(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === actual
                          ? "w-8 bg-blue-500"
                          : "w-2.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-8 flex gap-3 md:hidden">
                  <button
                    onClick={anterior}
                    className="flex h-12 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={siguiente}
                    className="flex h-12 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}