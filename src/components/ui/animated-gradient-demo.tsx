import { AnimatedGradient } from "@/components/ui/animated-gradient";

export default function AnimatedGradientDemo() {
  return (
    <div className="relative h-[420px] w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <AnimatedGradient config={{ preset: "Aurora" }} radius="12px" noise={{ opacity: 0.15 }} />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center bg-black/20 backdrop-blur-[2px]">
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-white drop-shadow-md">
          Animated
          <br />
          Gradient
        </h1>
      </div>
    </div>
  );
}

