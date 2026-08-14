import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Card({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:shadow-xl
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}