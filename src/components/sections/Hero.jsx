import { Link } from "react-router-dom";
import Button from "../ui/Button";
import styles from "./Hero.module.css";
import heroBg from "../../assets/images/bg hero oficial.webp";
import heroVideo from "../../assets/Videos/Vídeo 1.mp4";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={heroBg}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

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
          <Link to="/portfolio" className={styles.link}>
            Ver Projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
