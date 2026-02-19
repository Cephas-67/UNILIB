import logoifri from "@/assets/logoifri.png";

const EFriLogo = ({ size = "md", white = false }: { size?: "sm" | "md" | "lg"; white?: boolean }) => {
  const sizes = {
    sm: { img: "w-6 h-6", text: "text-lg" },
    md: { img: "w-8 h-8", text: "text-xl" },
    lg: { img: "w-10 h-10", text: "text-2xl" }
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <img src={logoifri} alt="Logo IFRI" className={`${s.img} object-contain`} />
      <span className={`font-poppins ${s.text}`}>
        <span className={`font-medium ${white ? "text-white/80" : "text-muted-foreground"}`}>e-</span>
        <span className={`font-bold ${white ? "text-white" : "text-foreground"}`}>FRI</span>
      </span>
    </div>
  );
};

export default EFriLogo;
