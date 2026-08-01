const POSITION = {
  "top-left": "left-[-8%] top-[-10%]",
  "top-right": "right-[-8%] top-[-10%]",
  "bottom-left": "left-[-8%] bottom-[-15%]",
  "bottom-right": "right-[-8%] bottom-[-15%]",
} as const;

export function AmbientGlow({
  position,
  color = "accent",
  size = 26,
}: {
  position: keyof typeof POSITION;
  color?: "accent" | "accent-2";
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[100px] ${
        color === "accent" ? "bg-accent/15" : "bg-accent-2/15"
      } ${POSITION[position]}`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    />
  );
}
