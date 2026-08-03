import WorkspaceGrid from "./WorkspaceGrid";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-10">
      <div className="text-center mb-20">
        <h1 className="text-7xl font-extrabold tracking-tight text-slate-900">
          School's Never Been So Cool
        </h1>

        <p className="mt-6 text-2xl text-slate-500">
          Select your workspace
        </p>
      </div>

      <WorkspaceGrid />
    </section>
  );
}