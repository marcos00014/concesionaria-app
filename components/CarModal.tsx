"use client";

import { useEffect, useState } from "react";
import { VENDEDORES } from "../data";
import {
  X,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  Car,
  GitBranch,
  MessageCircle,
  UserRound,
  Link2,
  ChevronLeft,
  ChevronRight,
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

export default function CarModal({ vehiculo, onClose }: CarModalProps) {
  const [fotoActual, setFotoActual] = useState(0);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [vendedorSeleccionado, setVendedorSeleccionado] =
    useState(VENDEDORES[0]);

  useEffect(() => {
    if (vehiculo) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [vehiculo]);

  if (!vehiculo) return null;

  const anteriorFoto = () => {
    setFotoActual((prev) =>
      prev === 0 ? vehiculo.imagenes.length - 1 : prev - 1
    );
  };

  const siguienteFoto = () => {
    setFotoActual((prev) =>
      prev === vehiculo.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const linkAuto =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?auto=${vehiculo.id}`
      : "";

  const mensajeWhatsApp = `Hola ${vendedorSeleccionado.nombre}, estoy interesado en el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año} publicado en la web.

Link del vehículo:
${linkAuto}

¿Podrías darme más información?`;

  const linkWhatsApp = `https://wa.me/${
    vendedorSeleccionado.telefono
  }?text=${encodeURIComponent(mensajeWhatsApp)}`;

  const copiarLink = async () => {
    await navigator.clipboard.writeText(linkAuto);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white lg:flex lg:items-center lg:justify-center lg:bg-slate-950/80 lg:p-5">
      <div className="hidden lg:block fixed inset-0" onClick={onClose} />

      <div className="relative z-[10000] h-[100dvh] w-screen overflow-y-auto overflow-x-hidden bg-white lg:h-auto lg:max-h-[86vh] lg:w-full lg:max-w-5xl lg:overflow-hidden lg:rounded-2xl lg:shadow-2xl">
        {/* BARRA SUPERIOR MOBILE */}
        <div className="sticky top-0 z-[10002] flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BOTÓN CERRAR DESKTOP */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[10003] hidden h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-xl transition hover:bg-slate-100 lg:flex"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="lg:grid lg:max-h-[86vh] lg:grid-cols-[1fr_0.88fr]">
          {/* GALERÍA */}
          <section className="bg-slate-100">
            <div className="relative h-[230px] bg-slate-200 sm:h-[320px] lg:h-[405px]">
              <Image
                src={vehiculo.imagenes[fotoActual]}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                fill
                unoptimized
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

              <button
                onClick={anteriorFoto}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={siguienteFoto}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-black text-white backdrop-blur">
                {fotoActual + 1} / {vehiculo.imagenes.length}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto bg-white p-3">
              {vehiculo.imagenes.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setFotoActual(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    index === fotoActual
                      ? "border-blue-600 shadow-md opacity-100"
                      : "border-transparent opacity-55 hover:opacity-100"
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
          <section className="bg-white lg:max-h-[86vh] lg:overflow-y-auto">
            <div className="p-5 pb-10 sm:p-6 lg:p-6 lg:pr-8">
              <div className="mb-2 flex gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
                  {vehiculo.año}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                  {vehiculo.kilometraje}
                </span>
              </div>

              <h2 className="mb-2 text-2xl font-black leading-tight text-slate-950 lg:text-[28px]">
                {vehiculo.marca}{" "}
                <span className="text-blue-600">{vehiculo.modelo}</span>
              </h2>

              <p className="mb-4 text-sm font-medium leading-6 text-slate-800">
                {vehiculo.descripcion}
              </p>

              <div className="mb-4 border-y border-slate-100 py-3">
                <p className="text-[11px] font-bold uppercase text-slate-400">
                  Precio
                </p>
                <p className="text-3xl font-black text-slate-950 lg:text-[30px]">
                  US$ {vehiculo.precioUSD.toLocaleString("es-AR")}
                </p>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2.5">
                <Dato
                  icono={<CheckCircle2 />}
                  titulo="Motor"
                  valor={vehiculo.motor}
                />
                <Dato
                  icono={<GitBranch />}
                  titulo="Caja"
                  valor={vehiculo.transmision}
                />
                <Dato
                  icono={<Droplet />}
                  titulo="Combustible"
                  valor={vehiculo.combustible}
                />
                <Dato
                  icono={<Car />}
                  titulo="Tracción"
                  valor={vehiculo.traccion}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-black text-slate-950">
                  Contactar con un vendedor
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Elegí un asesor y consultá directamente por esta unidad.
                </p>

                <label className="mt-3 flex items-center gap-1 text-[11px] font-black uppercase text-slate-500">
                  <UserRound className="h-4 w-4" />
                  Vendedor
                </label>

                <select
                  value={vendedorSeleccionado.id}
                  onChange={(e) => {
                    const vendedor = VENDEDORES.find(
                      (v) => v.id === Number(e.target.value)
                    );
                    if (vendedor) setVendedorSeleccionado(vendedor);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none"
                >
                  {VENDEDORES.map((vendedor) => (
                    <option key={vendedor.id} value={vendedor.id}>
                      {vendedor.nombre}
                    </option>
                  ))}
                </select>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <a
                    href={linkWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>

                  <button
                    onClick={copiarLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <Link2 className="h-4 w-4" />
                    {linkCopiado ? "Copiado" : "Copiar link"}
                  </button>
                </div>
              </div>

              <p className="mt-4 hidden text-center text-xs font-semibold text-slate-400 lg:block">
                Deslizá dentro del panel para ver toda la información del vehículo.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Dato({
  icono,
  titulo,
  valor,
}: {
  icono: React.ReactNode;
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 lg:p-2.5">
      <div className="mb-1.5 h-4 w-4 text-blue-600">{icono}</div>

      <p className="text-[10px] font-bold uppercase text-slate-400">
        {titulo}
      </p>

      <p className="text-sm font-bold text-slate-800">{valor}</p>
    </div>
  );
}