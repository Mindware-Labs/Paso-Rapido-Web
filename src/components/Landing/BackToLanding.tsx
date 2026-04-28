import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  /** Ruta a la home; por defecto al inicio */
  href?: string;
  label?: string;
};

export default function BackToLanding({ href = "/", label = "Volver al inicio" }: Props) {
  return (
    <div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f9d58] transition-colors hover:text-[#0c7a45]"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        {label}
      </Link>
    </div>
  );
}
