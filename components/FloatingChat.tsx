"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

const respuestas = [
  {
    pregunta: "¿Financian vehículos?",
    respuesta:
      "Sí, contamos con opciones de financiación adaptadas a cada vehículo y cliente.",
  },
  {
    pregunta: "¿Aceptan permutas?",
    respuesta: "Sí, tomamos usados en parte de pago sujetos a evaluación.",
  },
  {
    pregunta: "¿Dónde están ubicados?",
    respuesta:
      "Nuestra sucursal principal está ubicada en Av. Libertador 1234, CABA.",
  },
  {
    pregunta: "¿Los autos tienen garantía?",
    respuesta:
      "Sí, muchas unidades cuentan con garantía mecánica y revisión técnica.",
  },
  {
    pregunta: "¿Puedo reservar un vehículo?",
    respuesta:
      "Sí, podés reservarlo hablando directamente con uno de nuestros asesores.",
  },
];

export default function FloatingChat() {
  const [abierto, setAbierto] = useState(false);
  const mensajesRef = useRef<HTMLDivElement | null>(null);

  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto:
        "👋 Hola, soy el asistente de AutoElite. Elegí una consulta rápida.",
    },
  ]);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarPregunta = (pregunta: string, respuesta: string) => {
    setMensajes((prev) => [
      ...prev,
      { tipo: "usuario", texto: pregunta },
      { tipo: "bot", texto: respuesta },
    ]);
  };

  const irAAsesores = () => {
    setAbierto(false);

    setTimeout(() => {
      const asesores = document.getElementById("asesores");

      if (asesores) {
        const offset = 90;
        const posicion =
          asesores.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: posicion,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
      {abierto && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[90vw] max-w-[330px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                <Bot className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-black">AutoEliteBot</p>
                <p className="text-[11px] text-slate-400">
                  Respuestas automáticas
                </p>
              </div>
            </div>

            <button
              onClick={() => setAbierto(false)}
              className="text-slate-300 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={mensajesRef}
            className="h-56 space-y-3 overflow-y-auto bg-slate-50 p-3"
          >
            {mensajes.map((mensaje, index) => (
              <div
                key={index}
                className={`flex ${
                  mensaje.tipo === "usuario" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-3 py-2 text-xs leading-5 ${
                    mensaje.tipo === "usuario"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {mensaje.texto}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <p className="mb-2 text-[10px] font-black uppercase text-slate-400">
              Preguntas frecuentes
            </p>

            <div className="grid gap-1.5">
              {respuestas.map((item) => (
                <button
                  key={item.pregunta}
                  onClick={() => enviarPregunta(item.pregunta, item.respuesta)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.pregunta}
                </button>
              ))}
            </div>

            <button
              onClick={irAAsesores}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
              Ver asesores por WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setAbierto((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl transition hover:scale-105 hover:bg-blue-600"
      >
        {abierto ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
}