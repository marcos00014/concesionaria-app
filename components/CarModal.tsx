"use client";

import { useState } from "react";
import {
  X,
  CheckCircle2,
  Droplet,
  Car,
  GitBranch,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MessageCircle,
  UserRound,
  Link2,
} from "lucide-react";
import Image from "next/image";

interface CarModalProps {
  vehiculo: {
    id: number;
    marca: string;
    modelo: string;
    año: number;
    precioUSD: number;
    kilometraje: string;
    transmision: string;
    motor: string;
    combustible: string;
    puertas: number;
    color: string;
    traccion: string;
    imagenes: string[];
    descripcion: string;
  } | null;
  onClose: () => void;
}

const vendedores = [
  { id: 1, nombre: "Carlos Gómez", telefono: "5493454166622" },
  { id: 2, nombre: "Mariana López", telefono: "5493455555555" },
  { id: 3, nombre: "Federico Ruiz", telefono: "5493456666666" },
];

export default function CarModal({ vehiculo, onClose }: CarModalProps) {
  const [fotoActual, setFotoActual] = useState(0);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);
  const [nivelZoom, setNivelZoom] = useState(1);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState(vendedores[0]);

  if (!vehiculo) return null;

  const linkAuto = `${window.location.origin}${window.location.pathname}?auto=${vehiculo.id}`;

  const mensajeWhatsApp = `Hola ${vendedorSeleccionado.nombre}, estoy interesado en el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año} publicado en la web.

Link del vehículo:
${linkAuto}

¿Podrías darme más información?`;

  const linkWhatsApp = `https://wa.me/${
    vendedorSeleccionado.telefono
  }?text=${encodeURIComponent(mensajeWhatsApp)}`;

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkAuto);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 1800);
    } catch (error) {
      console.error("Error al copiar link", error);
    }
  };

  const acercarZoom = () => setNivelZoom((prev) => Math.min(prev + 0.5, 3));
  const alejarZoom = () => setNivelZoom((prev) => Math.max(prev - 0.5, 1));

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative z-[10000] grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-[1fr_0.9fr]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-[10001] rounded-full bg-white p-2 text-slate-600 shadow-md transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

          {/* GALERÍA */}
          <section className="bg-slate-100">
            <div
              onClick={() => {
                setPantallaCompleta(true);
                setNivelZoom(1);
              }}
              className="group relative h-[300px] cursor-zoom-in overflow-hidden bg-slate-200 sm:h-[360px] lg:h-[460px]"
            >
              <Image
                src={vehiculo.imagenes[fotoActual]}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                fill
                unoptimized
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
              />

              <div className="absolute left-4 top-4 rounded-full bg-black/45 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto bg-white p-4">
              {vehiculo.imagenes.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setFotoActual(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    index === fotoActual
                      ? "border-blue-600 opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* INFO */}
          <section className="max-h-[82vh] overflow-y-auto bg-white">
            <div className="p-6">
              <div className="mb-3 flex gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {vehiculo.año}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {vehiculo.kilometraje}
                </span>
              </div>

              <h2 className="mb-2 text-2xl font-black leading-tight text-slate-950 md:text-3xl">
                {vehiculo.marca}{" "}
                <span className="text-blue-600">{vehiculo.modelo}</span>
              </h2>

              <p className="mb-5 text-sm leading-6 text-slate-500">
                {vehiculo.descripcion}
              </p>

              <div className="mb-5 border-y border-slate-100 py-4">
                <p className="text-xs font-bold uppercase text-slate-400">
                  Precio
                </p>
                <p className="text-3xl font-black text-slate-950">
                  US$ {vehiculo.precioUSD.toLocaleString("es-AR")}
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Motor
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {vehiculo.motor}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <GitBranch className="mb-2 h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Caja
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {vehiculo.transmision}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Droplet className="mb-2 h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Combustible
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {vehiculo.combustible}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Car className="mb-2 h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Tracción
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {vehiculo.traccion}
                  </p>
                </div>
              </div>

              {/* CONTACTO */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-black text-slate-950">
                  Contactar con un vendedor
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Elegí un asesor y consultá directamente por esta unidad.
                </p>

                <label className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-slate-500">
                  <UserRound className="h-4 w-4" />
                  Vendedor
                </label>

                <select
                  value={vendedorSeleccionado.id}
                  onChange={(e) => {
                    const vendedor = vendedores.find(
                      (v) => v.id === Number(e.target.value)
                    );
                    if (vendedor) setVendedorSeleccionado(vendedor);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {vendedores.map((vendedor) => (
                    <option key={vendedor.id} value={vendedor.id}>
                      {vendedor.nombre}
                    </option>
                  ))}
                </select>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={linkWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>

                  <button
                    onClick={copiarLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Link2 className="h-4 w-4" />
                    {linkCopiado ? "Copiado" : "Copiar link"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ZOOM */}
      {pantallaCompleta && (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center overflow-hidden bg-slate-950/95">
          <div className="absolute left-0 right-0 top-6 z-[10051] flex items-center justify-between px-8">
            <div className="flex gap-3 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur">
              <button
                onClick={alejarZoom}
                className="rounded-full p-2 text-white transition hover:text-blue-400"
              >
                <ZoomOut className="h-5 w-5" />
              </button>

              <div className="flex items-center px-2 text-sm font-bold text-white">
                {Math.round(nivelZoom * 100)}%
              </div>

              <button
                onClick={acercarZoom}
                className="rounded-full p-2 text-white transition hover:text-blue-400"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => setPantallaCompleta(false)}
              className="rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex h-full w-full items-center justify-center overflow-auto p-6">
            <div
              style={{
                transform: `scale(${nivelZoom})`,
                transition: "transform 0.2s ease-out",
              }}
              className="relative h-full max-h-[82vh] w-full max-w-6xl"
            >
              <Image
                src={vehiculo.imagenes[fotoActual]}
                alt="Zoom del vehículo"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}