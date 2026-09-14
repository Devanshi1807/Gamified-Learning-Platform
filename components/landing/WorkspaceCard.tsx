import Link from "next/link";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

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
    <Link href={href} className="block h-full min-h-0">
      <div
  className="
    group
    relative
    flex
    h-full
    min-h-[190px]
    w-full
    items-center
    justify-between
    overflow-hidden
    rounded-3xl
    border
    border-white/40
    bg-white/80
    p-5
    shadow-lg
    backdrop-blur-md
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
    sm:min-h-[210px]
    sm:p-6
    lg:min-h-[235px]
    lg:p-7
  "
>
        <div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20 sm:h-40 sm:w-40"
          style={{ backgroundColor: color }}
        />

        <div className="relative z-10 min-w-0 pr-4 sm:pr-6">
          <h2
            className="text-4xl font-black tracking-tight sm:text-5xl lg:text-[50px]"
            style={{ color }}
          >
            {number}
          </h2>

          <div>
            <h3 className="mt-2 text-lg font-extrabold leading-tight text-slate-900 sm:text-xl lg:text-[23px]">
              {title}
            </h3>
            <p className="mt-2 max-w-[210px] text-xs leading-5 text-slate-500 sm:text-sm">
              {description}
            </p>

            <div
              className="mt-4 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 sm:h-11 sm:w-11"
              style={{ backgroundColor: color }}
            >
              <FaArrowRight className="text-sm text-white" />
            </div>
          </div>
        </div>

        <Icon
          size={95}
          color={color}
          className="relative z-10 shrink-0 opacity-70 transition-transform duration-300 group-hover:scale-105 sm:size-[105px] lg:size-[115px]"
        />
      </div>
    </Link>
  );
}
