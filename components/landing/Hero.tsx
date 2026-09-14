import WorkspaceGrid from "./WorkspaceGrid";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-5">
      <div className="mb-6 text-center sm:mb-7 lg:mb-6">
        <h1 className="text-2xl font-semibold text-slate-500 sm:text-3xl lg:text-[32px]">
          Select your workspace
        </h1>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-5 text-slate-400 sm:text-sm">
          Choose the workspace you want to continue with.
        </p>
      </div>

      <WorkspaceGrid />
    </section>
  );
}