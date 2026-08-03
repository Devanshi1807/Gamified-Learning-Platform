import Link from "next/link";
import { IconType } from "react-icons";
import {FaArrowRight } from "react-icons/fa";

interface WorkspaceCardProps {
  number: string;
  title: string;
  description: string;
  color: string;
  Icon: IconType;
  href: string;
}

export default function WorkspaceCard({
  number,
  title,
  description,
  color,
  Icon,
  href,
}: WorkspaceCardProps) {
  return (
    <Link href={href}>
      <div
  className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/40
    bg-white/80
    backdrop-blur-md
    p-10
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
    h-72
    flex
    justify-between
    items-center
  "
>

  <div
  className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20"
  style={{ backgroundColor: color }}
/>
        <div className="space-y-5">
          <h2
            className="text-6xl font-black tracking-tight"
            style={{ color }}
          >
            {number}
          </h2>

          <div>
            <h3 className="text-3xl font-extrabold text-slate-900">
              {title}
            </h3>

            <p className="mt-4 max-w-xs text-slate-500 leading-relaxed">
              {description}
            </p>
            <div
            className="mt-8 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
            style={{ backgroundColor: color }}
            >
            <FaArrowRight className="text-white" />
            </div>
          </div>
          
        </div>

        <Icon
          size={140}
          color={color}
          className= "opacity-80 group-hover:scale-110 transition"
        />
      </div>
    </Link>
  );
}