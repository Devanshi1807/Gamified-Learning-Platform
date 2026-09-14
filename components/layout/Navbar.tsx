import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-5">
      <div className="mx-auto flex max-w-6xl items-center">
        <Image
          src="/nois_logo.png"
          alt="NOIS Logo"
          width={190}
          height={78}
          className="h-auto w-[135px] sm:w-[155px] lg:w-[175px]"
          priority
        />
      </div>
    </nav>
  );
}