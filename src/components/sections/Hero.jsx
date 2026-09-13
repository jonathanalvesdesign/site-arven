import { Link } from "react-router-dom";
import Button from "../ui/Button";
import useSectionNav from "../../utils/useSectionNav";
import styles from "./Hero.module.css";
import heroBg from "../../assets/images/bg hero oficial.webp";

export default function Hero() {
  const handleNavClick = useSectionNav();

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={`container ${styles.content}`}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Site bonito não vende. Site que converte, sim.
          </h1>
          <p className={styles.subtitle}>
            A Arven cria sites, landing pages e campanhas de Google Ads
            pensados para transformar clique em cliente, não só para ficar
            bonito na tela.
          </p>
        </div>

        <div className={styles.actions}>
          <Button variant="light" />
          <Link to="/#portfolio" className={styles.link} onClick={handleNavClick("/#portfolio")}>
            Ver Projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
