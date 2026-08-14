import { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const base =
    "rounded-xl px-6 py-3 font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#7B1E3A] text-white hover:bg-[#641730]",

    secondary:
      "bg-[#D4AF37] text-white hover:bg-[#b89324]",

    outline:
      "border border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}