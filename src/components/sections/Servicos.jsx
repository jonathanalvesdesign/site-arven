import Button from "../ui/Button";
import SectionTag from "../ui/SectionTag";
import useInView from "../../utils/useInView";
import styles from "./Servicos.module.css";
import imgInstitucional from "../../assets/images/img institucional.webp";
import imgLp from "../../assets/images/img lp.webp";
import imgGoogleAds from "../../assets/images/img google ads.webp";

const SERVICOS = [
  {
    imagem: imgInstitucional,
    titulo: "Sites institucionais",
    texto:
      "Presença online que passa credibilidade antes mesmo do primeiro contato. Pra quem pesquisa seu negócio no Google decidir te escolher.",
  },
  {
    imagem: imgLp,
    titulo: "Landing Pages",
    texto:
      "Página única, focada em uma ação: marcar, comprar ou pedir orçamento. Sem distração, sem menu que tira o visitante do caminho.",
  },
  {
    imagem: imgGoogleAds,
    titulo: "Google Ads",
    texto:
      "Depois que o site está no ar, o próximo passo é trazer gente pra dentro dele. Campanhas configuradas pra gerar contato, não só clique.",
  },
];

function ServicoCard({ servico, index }) {
  const [ref, inView, animate] = useInView(0.2);

  return (
    <div
      className={`${styles.card} ${inView ? styles.cardVisible : ""} ${
        inView && !animate ? "no-transition" : ""
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      ref={ref}
    >
      <div className={styles.cardImage}>
        <img src={servico.imagem} alt={servico.titulo} loading="lazy" className={styles.cardImg} />
      </div>
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{servico.titulo}</h3>
        <p className={styles.cardDescription}>{servico.texto}</p>
      </div>
    </div>
  );
}

export default function Servicos() {
  return (
    <section className={styles.servicos} id="servicos">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <SectionTag>nossos serviços</SectionTag>
            <h2 className={styles.title}>
              Soluções digitais pensadas para crescer junto com o seu negócio.
            </h2>
          </div>
          <Button variant="dark" />
        </div>

        <div className={styles.grid}>
          {SERVICOS.map((servico, index) => (
            <ServicoCard servico={servico} index={index} key={servico.titulo} />
          ))}
        </div>
      </div>
    </section>
  );
}
