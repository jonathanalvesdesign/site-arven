import Button from "../ui/Button";
import SectionTag from "../ui/SectionTag";
import useInView from "../../utils/useInView";
import styles from "./Portfolio.module.css";
import imgOdontoCompany from "../../assets/images/lp odontocompany.webp";
import imgNexframe from "../../assets/images/lp nexframe.webp";
import imgAkronPharma from "../../assets/images/lp akron.webp";
import imgRassaniSkills from "../../assets/images/lp rassani.webp";

const PROJETOS = [
  {
    imagem: imgOdontoCompany,
    titulo: "OdontoCompany",
    texto:
      "Presença online que passa credibilidade antes mesmo do primeiro contato. Pra quem pesquisa seu negócio no Google decidir te escolher.",
    link: "https://odontocompany.framer.website/",
  },
  {
    imagem: imgNexframe,
    titulo: "Nexframe",
    texto:
      "Página única, focada em uma ação: marcar, comprar ou pedir orçamento. Sem distração, sem menu que tira o visitante do caminho.",
    link: "https://usenexframe.com.br/",
  },
  {
    imagem: imgAkronPharma,
    titulo: "Akron Pharma",
    texto:
      "Página única, focada em uma ação: marcar, comprar ou pedir orçamento. Sem distração, sem menu que tira o visitante do caminho.",
  },
  {
    imagem: imgRassaniSkills,
    titulo: "Rassani Skills",
    texto:
      "Presença online que passa credibilidade antes mesmo do primeiro contato. Pra quem pesquisa seu negócio no Google decidir te escolher.",
    link: "https://rasaniskills.com/",
  },
];

function PortfolioCard({ projeto, index }) {
  const [ref, inView, animate] = useInView(0.2);

  return (
    <div
      className={`${styles.card} ${inView ? styles.cardVisible : ""} ${
        inView && !animate ? "no-transition" : ""
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      ref={ref}
    >
      {projeto.link ? (
        <a
          href={projeto.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
          aria-label={`Ver site do projeto ${projeto.titulo}`}
        >
          <img className={styles.cardImage} src={projeto.imagem} alt={projeto.titulo} loading="lazy" />
          <span className={styles.imageOverlay}>
            <span className={styles.imageOverlayText}>Ver site</span>
          </span>
        </a>
      ) : (
        <img className={styles.cardImage} src={projeto.imagem} alt={projeto.titulo} loading="lazy" />
      )}
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{projeto.titulo}</h3>
        <p className={styles.cardDescription}>{projeto.texto}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <SectionTag>nosso portfólio</SectionTag>
            <h2 className={styles.title}>
              Cada projeto aqui foi feito pra vender, não só pra aparecer
              bonito no feed.
            </h2>
          </div>
          <Button variant="dark" />
        </div>

        <div className={styles.grid}>
          {PROJETOS.map((projeto, index) => (
            <PortfolioCard projeto={projeto} index={index} key={projeto.titulo} />
          ))}
        </div>
      </div>
    </section>
  );
}
