import Image from "next/image"; 

export default function Navbar() {
  return (
    <nav className="w-full px-12 py-8">
      <div className="max-w-7xl mx-auto flex items-center">
      <Image
       src="/nois_logo.png"
       alt="NOIS Logo"
       width={220}
       height={90}
       className="scale-200"
       priority
       />
      </div>
    </nav>
  );
}