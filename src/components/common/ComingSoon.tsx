// app/coming-soon/page.tsx
export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#080809] flex flex-col items-center justify-center text-white px-4">
      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(60,242,57,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3CF239]/25 bg-[#3CF239]/10 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3CF239] animate-pulse" />
        <span className="text-[#3CF239] text-xs font-medium uppercase tracking-wider">
          Coming Soon
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-4">
        We&apos;re building{' '}
        <span className="bg-[linear-gradient(90deg,#3CF239_0%,#DDF239_100%)] bg-clip-text text-transparent">
          something great.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-white/40 text-base font-light text-center max-w-sm mt-3">
        Viro is getting a major upgrade. Stay tuned — it&apos;s worth the wait.
      </p>

      {/* Back link — optional */}
    </div>
  );
}
