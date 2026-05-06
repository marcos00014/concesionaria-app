"use client";

import { useState } from "react";
import {
  Gauge,
  Cog,
  ChevronLeft,
  ChevronRight,
  Eye,
  Fuel,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CarProps {
  vehiculo: {
    id: number;
    marca: string;
    modelo: string;
    año: number;
    precioUSD: number;
    kilometraje: string;
    transmision: string;
    combustible?: string;
    imagenes: string[];
  };
  onClick: () => void;
  index: number;
}

export default function CarCard({ vehiculo, onClick, index }: CarProps) {
  const [fotoActual, setFotoActual] = useState(0);

  const fotoAnterior = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFotoActual((prev) =>
      prev === 0 ? vehiculo.imagenes.length - 1 : prev - 1
    );
  };

  const fotoSiguiente = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFotoActual((prev) =>
      prev === vehiculo.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      onClick={onClick}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl"
    >
      {/* IMAGEN */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <Image
          src={vehiculo.imagenes[fotoActual]}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

        {/* BADGES */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-900 shadow-sm backdrop-blur">
            {vehiculo.año}
          </span>

          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white shadow-sm">
            Disponible
          </span>
        </div>

        {/* CONTROLES */}
        {vehiculo.imagenes.length > 1 && (
          <>
            <button
              onClick={fotoAnterior}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={fotoSiguiente}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* INDICADORES */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {vehiculo.imagenes.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === fotoActual ? "w-5 bg-white" : "w-1.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-wide text-blue-600">
            {vehiculo.marca}
          </p>

          <h3 className="mt-1 line-clamp-1 text-xl font-black text-slate-950">
            {vehiculo.modelo}
          </h3>
        </div>

        <div className="mb-5">
          <p className="text-xs font-bold uppercase text-slate-400">Precio</p>
          <p className="text-2xl font-black text-slate-950">
            US$ {vehiculo.precioUSD.toLocaleString("es-AR")}
          </p>
        </div>

        {/* DETALLES */}
        <div className="grid grid-cols-2 gap-2 border-y border-slate-100 py-4 text-sm">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
            <Gauge className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">{vehiculo.kilometraje}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
            <Cog className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">{vehiculo.transmision}</span>
          </div>

          {vehiculo.combustible && (
            <div className="col-span-2 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
              <Fuel className="h-4 w-4 text-blue-600" />
              <span className="font-semibold">{vehiculo.combustible}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400">
            Ver ficha completa
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-blue-600">
            <Eye className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}