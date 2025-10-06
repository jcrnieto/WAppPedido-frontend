import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function RightSheet({
  trigger,
  title = "Información",
  children,
  open,
  onOpenChange,
  // opcionales:
  side = "right", // "right" | "left"
  mobileWidth = "w-[85vw]", // cuánto ocupa en mobile
  desktopMax = "sm:max-w-md", // tope en desktop
}) {
  // util para decidir de qué lado slidea
  const sideClasses = side === "left"
    ? "left-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
    : "right-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay: opaco + fade */}
        <Dialog.Overlay
          className="
            fixed inset-0 bg-black/50 backdrop-blur-[1px]
            data-[state=open]:animate-in data-[state=open]:fade-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out
            duration-300 ease-out z-[9998]
          "
        />

        {/* Panel: sheet con animación */}
        <Dialog.Content
          className={`
            fixed inset-y-0 ${sideClasses}
            ${mobileWidth} ${desktopMax}
            bg-[#F4F9F4]  /* verde muy claro, ajustá si querés blanco */
            shadow-2xl border-l border-black/5
            p-6 overflow-y-auto
            rounded-l-2xl /* borde curvo lado interior */
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            duration-300 ease-out
            focus:outline-none
            z-[9999]
          `}
        >
          {/* Header: título + botón X */}
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {title}
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              Panel lateral con información de horarios, ubicación, contacto y redes sociales.
            </Dialog.Description>

            <Dialog.Close
              className="
                inline-flex items-center justify-center
                h-8 w-8 rounded-full border
                border-green-600 text-green-700
                hover:bg-green-50 active:scale-95
                transition
              "
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Contenido */}
          <div className="mt-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
