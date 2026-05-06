"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import CarModal from "../components/CarModal";
import FloatingChat from "../components/FloatingChat";
import AsesoresCarousel from "../components/AsesoresCarousel";
import { VEHICULOS, EMPRESA } from "../data";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Phone,
  ShieldCheck,
  HandCoins,
  RefreshCcw,
  Star,
  Mail,
  Car,
  CheckCircle2,
} from "lucide-react";

type TipoVehiculo = (typeof VEHICULOS)[0];

const BENEFICIOS = [
  {
    titulo: "Vehículos seleccionados",
    descripcion:
      "Unidades revisadas y publicadas con información clara para que compres con confianza.",
    icono: ShieldCheck,
  },
  {
    titulo: "Financiación a medida",
    descripcion:
      "Opciones de financiación según el vehículo, entrega inicial y perfil del comprador.",
    icono: HandCoins,
  },
  {
    titulo: "Aceptamos permutas",
    descripcion:
      "Tomamos tu usado como parte de pago, sujeto a evaluación previa del estado general.",
    icono: RefreshCcw,
  },
];

const TESTIMONIOS = [
  {
    nombre: "Federico R.",
    texto:
      "La atención fue excelente. Me asesoraron por WhatsApp y pude coordinar la visita rápido.",
  },
  {
    nombre: "Camila S.",
    texto:
      "Muy buena experiencia. La información del vehículo era clara y el proceso fue simple.",
  },
  {
    nombre: "Lucas M.",
    texto:
      "Me ayudaron a encontrar una unidad acorde a mi presupuesto y aceptaron mi usado en parte de pago.",
  },
];

export default function Home() {
  const [vehiculoSeleccionado, setVehiculoSeleccionado] =
    useState<TipoVehiculo | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [marca, setMarca] = useState("Todas");
  const [modelo, setModelo] = useState("Todos");
  const [año, setAño] = useState("Todos");
  const [transmision, setTransmision] = useState("Todas");
  const [combustible, setCombustible] = useState("Todos");
  const [precioMaximo, setPrecioMaximo] = useState("Todos");

  const marcas = useMemo(() => {
    return ["Todas", ...Array.from(new Set(VEHICULOS.map((v) => v.marca)))];
  }, []);

  const modelos = useMemo(() => {
    const modelosFiltrados =
      marca === "Todas"
        ? VEHICULOS.map((v) => v.modelo)
        : VEHICULOS.filter((v) => v.marca === marca).map((v) => v.modelo);

    return ["Todos", ...Array.from(new Set(modelosFiltrados))];
  }, [marca]);

  const años = useMemo(() => {
    return [
      "Todos",
      ...Array.from(new Set(VEHICULOS.map((v) => v.año))).sort(
        (a, b) => b - a
      ),
    ];
  }, []);

  const transmisiones = useMemo(() => {
    return [
      "Todas",
      ...Array.from(new Set(VEHICULOS.map((v) => v.transmision))),
    ];
  }, []);

  const combustibles = useMemo(() => {
    return [
      "Todos",
      ...Array.from(new Set(VEHICULOS.map((v) => v.combustible))),
    ];
  }, []);

  const marcasDestacadas = useMemo(() => {
    return Array.from(new Set(VEHICULOS.map((v) => v.marca)));
  }, []);

  const vehiculosFiltrados = useMemo(() => {
    return VEHICULOS.filter((auto) => {
      const textoBusqueda =
        `${auto.marca} ${auto.modelo} ${auto.año} ${auto.kilometraje} ${auto.transmision} ${auto.combustible} ${auto.motor}`.toLowerCase();

      return (
        textoBusqueda.includes(busqueda.toLowerCase()) &&
        (marca === "Todas" || auto.marca === marca) &&
        (modelo === "Todos" || auto.modelo === modelo) &&
        (año === "Todos" || auto.año === Number(año)) &&
        (transmision === "Todas" || auto.transmision === transmision) &&
        (combustible === "Todos" || auto.combustible === combustible) &&
        (precioMaximo === "Todos" || auto.precioUSD <= Number(precioMaximo))
      );
    });
  }, [busqueda, marca, modelo, año, transmision, combustible, precioMaximo]);

  const limpiarFiltros = () => {
    setBusqueda("");
    setMarca("Todas");
    setModelo("Todos");
    setAño("Todos");
    setTransmision("Todas");
    setCombustible("Todos");
    setPrecioMaximo("Todos");
  };

  const hayFiltrosActivos =
    busqueda ||
    marca !== "Todas" ||
    modelo !== "Todos" ||
    año !== "Todos" ||
    transmision !== "Todas" ||
    combustible !== "Todos" ||
    precioMaximo !== "Todos";

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex min-h-screen w-full items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src="/autoelite.png"
            alt="Concesionaria AutoElite"
            fill
            unoptimized
            className="object-cover opacity-80"
            priority
          />

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white backdrop-blur">
              Concesionaria premium
            </span>

            <h1 className="max-w-3xl text-4xl font-black leading-[1] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Encontrá el vehículo ideal con atención personalizada.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
              Explorá unidades seleccionadas, consultá financiación, evaluá
              permutas y hablá directamente con nuestros asesores comerciales.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#vehiculos"
                className="rounded-full bg-white px-7 py-3.5 text-center text-xs font-black uppercase tracking-wide text-slate-950 transition hover:bg-slate-200"
              >
                Ver catálogo
              </a>

              <a
                href="#asesores"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center text-xs font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              >
                Hablar con asesor
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VEHÍCULOS */}
      <section id="vehiculos" className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="mb-2 inline-block text-xs font-black uppercase tracking-wide text-blue-600">
                Inventario actualizado
              </span>

              <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Stock disponible
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Buscá por marca, modelo, año, precio o características del
                vehículo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-blue-700"
            >
              {vehiculosFiltrados.length} de {VEHICULOS.length} unidades
            </motion.div>
          </div>

          {/* FILTROS */}
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-950">
                    Filtrar vehículos
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Refiná el stock según lo que está buscando el cliente.
                  </p>
                </div>
              </div>

              {hayFiltrosActivos && (
                <button
                  onClick={limpiarFiltros}
                  className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase text-slate-600 transition hover:bg-slate-100 sm:flex"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              <div className="relative md:col-span-2 xl:col-span-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar: Corolla, Amarok, BMW, híbrido..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <select
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  setModelo("Todos");
                }}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {marcas.map((item) => (
                  <option key={item} value={item}>
                    Marca: {item}
                  </option>
                ))}
              </select>

              <select
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {modelos.map((item) => (
                  <option key={item} value={item}>
                    Modelo: {item}
                  </option>
                ))}
              </select>

              <select
                value={año}
                onChange={(e) => setAño(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {años.map((item) => (
                  <option key={item} value={String(item)}>
                    Año: {item}
                  </option>
                ))}
              </select>

              <select
                value={transmision}
                onChange={(e) => setTransmision(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {transmisiones.map((item) => (
                  <option key={item} value={item}>
                    Transmisión: {item}
                  </option>
                ))}
              </select>

              <select
                value={combustible}
                onChange={(e) => setCombustible(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {combustibles.map((item) => (
                  <option key={item} value={item}>
                    Combustible: {item}
                  </option>
                ))}
              </select>

              <select
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="Todos">Precio: Todos</option>
                <option value="30000">Hasta US$ 30.000</option>
                <option value="50000">Hasta US$ 50.000</option>
                <option value="80000">Hasta US$ 80.000</option>
                <option value="100000">Hasta US$ 100.000</option>
                <option value="150000">Hasta US$ 150.000</option>
              </select>
            </div>

            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase text-slate-600 transition hover:bg-slate-100 sm:hidden"
              >
                <X className="h-4 w-4" />
                Limpiar filtros
              </button>
            )}
          </div>

          {vehiculosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {vehiculosFiltrados.map((auto, index) => (
                <CarCard
                  key={auto.id}
                  vehiculo={auto}
                  index={index}
                  onClick={() => setVehiculoSeleccionado(auto)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-2xl font-black text-slate-950">
                No encontramos vehículos
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Probá limpiando los filtros o buscando por otra marca, modelo o
                característica.
              </p>

              <button
                onClick={limpiarFiltros}
                className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-600"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="bg-white py-18 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="mb-2 inline-block text-xs font-black uppercase tracking-wide text-blue-600">
              Quiénes somos
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Más que una concesionaria.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              En {EMPRESA.nombre} trabajamos para ofrecer una experiencia de
              compra clara, segura y personalizada. Seleccionamos vehículos con
              cuidado, priorizando calidad, estado general y transparencia en
              cada operación.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Nuestro equipo acompaña a cada cliente desde la búsqueda del
              vehículo ideal hasta la entrega final, incluyendo financiación,
              permutas, asesoramiento y atención directa por WhatsApp.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">+10</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Años de experiencia
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">+500</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Vehículos entregados
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">24/7</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Atención online
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-950">100%</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Atención personalizada
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-xl">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  EMPRESA.direccion
                )}&output=embed`}
                width="100%"
                height="360"
                loading="lazy"
                className="border-0"
              />
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-black text-slate-950">
                Sucursal principal
              </h3>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                {EMPRESA.direccion}
              </p>

              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Phone className="h-4 w-4 text-blue-600" />
                {EMPRESA.telefono}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  EMPRESA.direccion
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black text-white transition hover:bg-blue-600"
              >
                Abrir en Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-slate-50 py-18 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="mb-2 inline-block text-xs font-black uppercase tracking-wide text-blue-600">
              Beneficios
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Una compra más simple, segura y acompañada.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {BENEFICIOS.map((beneficio, index) => {
              const Icono = beneficio.icono;

              return (
                <motion.div
                  key={beneficio.titulo}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icono className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-black text-slate-950">
                    {beneficio.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {beneficio.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-wide text-blue-600">
                Marcas destacadas
              </span>
              <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
                Trabajamos con unidades seleccionadas
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              El stock puede variar según disponibilidad. Consultá con nuestros
              asesores por modelos específicos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {marcasDestacadas.map((marcaAuto) => (
              <div
                key={marcaAuto}
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {marcaAuto}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AsesoresCarousel />

      {/* TESTIMONIOS */}
      <section className="bg-white py-18 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-2 inline-block text-xs font-black uppercase tracking-wide text-blue-600">
              Clientes
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Experiencias que generan confianza
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIOS.map((item, index) => (
              <motion.div
                key={item.nombre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-4 flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  “{item.texto}”
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {item.nombre.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {item.nombre}
                    </p>
                    <p className="text-xs font-semibold text-slate-400">
                      Cliente AutoElite
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-9 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
                <Car className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-black">{EMPRESA.nombre}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Concesionaria premium
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Vehículos seleccionados, atención personalizada y contacto directo
              con asesores comerciales.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-wide">
              Secciones
            </h3>

            <div className="grid gap-3 text-sm text-slate-400">
              <a href="#inicio" className="transition hover:text-white">
                Inicio
              </a>
              <a href="#vehiculos" className="transition hover:text-white">
                Vehículos
              </a>
              <a href="#quienes-somos" className="transition hover:text-white">
                Quiénes somos
              </a>
              <a href="#asesores" className="transition hover:text-white">
                Asesores
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-wide">
              Contacto
            </h3>

            <div className="grid gap-3 text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-500" />
                {EMPRESA.direccion}
              </p>

              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                {EMPRESA.telefono}
              </p>

              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                {EMPRESA.email}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-600 to-purple-700 text-white transition hover:scale-110"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:scale-110"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs font-semibold text-slate-500 sm:px-6 md:flex-row lg:px-8">
            <p>
              © {new Date().getFullYear()} {EMPRESA.nombre}. Todos los derechos
              reservados.
            </p>

            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              Sitio demo profesional para concesionaria.
            </p>
          </div>
        </div>
      </footer>

      <CarModal
        vehiculo={vehiculoSeleccionado}
        onClose={() => setVehiculoSeleccionado(null)}
      />

      {!vehiculoSeleccionado && <FloatingChat />}
    </main>
  );
}