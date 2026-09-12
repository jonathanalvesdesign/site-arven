import { useState } from "react";
import { Link } from "react-router-dom";
import useSectionNav from "../../utils/useSectionNav";
import styles from "./Header.module.css";
import logoArven from "../../assets/Logo/Logo.svg";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Sobre", href: "/#sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavClick = useSectionNav();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src={logoArven} alt="Arven" className={styles.logoImg} />
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={styles.navLink}
              onClick={handleNavClick(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={styles.navLink}
            onClick={(event) => {
              handleNavClick(item.href)(event);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
