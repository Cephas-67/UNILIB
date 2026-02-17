const EFriLogo = ({ size = "md", white = false }: { size?: "sm" | "md" | "lg"; white?: boolean }) => {
  const sizes = { sm: { icon: 24, text: "text-lg" }, md: { icon: 32, text: "text-xl" }, lg: { icon: 40, text: "text-2xl" } };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
        <circle cx="16" cy="24" r="12" fill={white ? "white" : "#3D5AFE"} opacity={white ? 0.3 : 0.85} />
        <circle cx="24" cy="24" r="12" fill={white ? "white" : "#FF9800"} opacity={white ? 0.25 : 0.75} />
        <circle cx="20" cy="14" r="12" fill={white ? "white" : "#69F0AE"} opacity={white ? 0.35 : 0.8} />
      </svg>
      <span className={`font-poppins ${s.text}`}>
        <span className={`font-medium ${white ? "text-white/80" : "text-muted-foreground"}`}>e-</span>
        <span className={`font-bold ${white ? "text-white" : "text-foreground"}`}>FRI</span>
      </span>
    </div>
  );
};

export default EFriLogo;
