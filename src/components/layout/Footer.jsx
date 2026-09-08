import { Link } from "react-router-dom";
import useSectionNav from "../../utils/useSectionNav";
import styles from "./Footer.module.css";
// TODO: substituir por <img src={logoArven} /> quando o arquivo chegar
// import logoArven from "../../assets/images/logo-arven.svg";

const COLUMNS = [
  {
    title: "Links Úteis",
    links: [
      { label: "Início", href: "/" },
      { label: "Serviços", href: "/#servicos" },
      { label: "Portfólio", href: "/#portfolio" },
      { label: "Sobre", href: "/#sobre" },
    ],
  },
  {
    title: "Universo Arven",
    links: [
      { label: "Arven Studio", href: "/" },
      { label: "Arven Blog", href: "/blog" },
      { label: "Arven Academy", href: "/" },
    ],
  },
  {
    title: "Redes Sociais",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/arven.digital/" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "ola@arven.com.br", href: "mailto:ola@arven.com.br" },
      { label: "(62) 99277 2843", href: "tel:+5562992772843" },
    ],
  },
];

export default function Footer() {
  const handleNavClick = useSectionNav();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <span className={styles.logo}>Arven</span>

          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <div className={styles.column} key={column.title}>
                <span className={styles.columnTitle}>{column.title}</span>
                <div className={styles.linksList}>
                  {column.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <Link
                        key={link.label}
                        to={link.href}
                        className={styles.link}
                        onClick={handleNavClick(link.href)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a key={link.label} href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomBlock}>
          <hr className={styles.divider} />

          <div className={styles.bottom}>
            <span>©2026 Arven. Todos os direitos reservados.</span>
            <Link to="/politicas-de-privacidade">Políticas de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
