"use client";
type BulletProps = { n: number; label: string; active: boolean; done: boolean };
function Bullet({ n, label, active, done }: BulletProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "h-7 w-7 rounded-full text-[13px] font-bold grid place-items-center border",
          done ? "bg-brand-600 text-white border-brand-600" :
          active ? "bg-white text-brand-700 border-brand-600" : "bg-gray-200 text-gray-700 border-gray-300"
        ].join(" ")}
        aria-current={active ? "step" : undefined}
      >
        {n}
      </div>
      <span className={["text-xs", active ? "text-gray-900" : "text-gray-600"].join(" ")}>{label}</span>
    </div>
  );
}
export default function Stepper({ step }: { step: 1|2|3|4 }) {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      <Bullet n={1} label="Sélection"     active={step===1} done={step>1} />
      <div className="h-[2px] w-10 md:w-24 bg-gray-300" />
      <Bullet n={2} label="Date/Heure"    active={step===2} done={step>2} />
      <div className="h-[2px] w-10 md:w-24 bg-gray-300" />
      <Bullet n={3} label="Coordonnées"   active={step===3} done={step>3} />
      <div className="h-[2px] w-10 md:w-24 bg-gray-300" />
      <Bullet n={4} label="Confirmation"  active={step===4} done={step>4} />
    </div>
  );
}