import { Link } from "react-router-dom";
import UniLibLogo from "../UniLibLogo";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <Link to="/">
          <UniLibLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#accueil" className="font-inter text-sm font-medium text-foreground">
            Accueil
          </a>
          <a href="#fonctionnalites" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">
            Fonctionnalités
          </a>
          <a href="#ecoles" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ecoles connectées
          </a>
        </nav>

        <Link
          to="/e-fri/connexion"
          className="rounded-lg border border-border px-5 py-2 font-inter text-sm text-foreground hover:bg-muted transition-colors"
        >
          Se connecter
        </Link>
      </div>
    </header>
  );
};

export default Header;
