export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-orb left-[-12%] top-[-4rem] h-[24rem] w-[24rem] bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.9),rgba(122,203,255,0.55)_24%,rgba(15,121,255,0.3)_55%,transparent_74%)]" />
      <div className="hero-orb right-[-10%] top-[-3rem] h-[28rem] w-[28rem] bg-[radial-gradient(circle_at_48%_38%,rgba(255,255,255,0.82),rgba(116,239,241,0.48)_22%,rgba(19,181,186,0.3)_54%,transparent_74%)]" />
      <div className="hero-orb left-[36%] top-[14%] h-[18rem] w-[18rem] bg-[radial-gradient(circle,rgba(255,255,255,0.7),rgba(84,177,255,0.34)_36%,transparent_74%)]" />
      <div className="hero-orb bottom-[-6rem] left-[8%] h-[22rem] w-[22rem] bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.76),rgba(93,223,226,0.34)_28%,rgba(19,181,186,0.16)_58%,transparent_78%)]" />
      <div className="hero-orb bottom-[-5rem] right-[12%] h-[20rem] w-[20rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.75),rgba(82,157,255,0.28)_34%,transparent_76%)]" />
      <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/35 to-transparent" />
    </div>
  );
}
