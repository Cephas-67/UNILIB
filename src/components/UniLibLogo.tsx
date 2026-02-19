const UniLibLogo = ({ size = "default" }: { size?: "default" | "small" }) => {
  const iconSize = size === "small" ? 28 : 36;
  const textClass = size === "small" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none">
        {/* Cercles de UniLib alignés sur le FavIcon */}
        <circle cx="16" cy="24" r="12" fill="#3D5AFE" opacity="0.9" /> {/* Bleu */}
        <circle cx="24" cy="24" r="12" fill="#FF9800" opacity="0.8" />  {/* Orange */}
        <circle cx="20" cy="14" r="12" fill="#69F0AE" opacity="0.85" /> {/* Vert */}
      </svg>
      <span className={`font-poppins ${textClass}`}>
        <span className="font-medium text-foreground">Uni</span>
        <span className="font-bold text-foreground font-poppins">Lib</span>
      </span>
    </div>
  );
};

export default UniLibLogo;
