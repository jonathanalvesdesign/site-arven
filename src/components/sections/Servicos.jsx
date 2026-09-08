import Button from "../ui/Button";
import SectionTag from "../ui/SectionTag";
import BrowserMockup from "../ui/BrowserMockup";
import useInView from "../../utils/useInView";
import styles from "./Servicos.module.css";
// TODO: substituir por <img src={servico1} />, etc. quando os arquivos chegarem
// import servico1 from "../../assets/images/servico-1.jpg";
// import servico2 from "../../assets/images/servico-2.jpg";
// import servico3 from "../../assets/images/servico-3.jpg";

const SERVICOS = [
  {
    fileName: "servico-1.jpg",
    titulo: "Sites institucionais",
    texto:
      "Presença online que passa credibilidade antes mesmo do primeiro contato. Pra quem pesquisa seu negócio no Google decidir te escolher.",
    mockupType: "site",
  },
  {
    fileName: "servico-2.jpg",
    titulo: "Landing Pages",
    texto:
      "Página única, focada em uma ação: marcar, comprar ou pedir orçamento. Sem distração, sem menu que tira o visitante do caminho.",
    mockupType: "landing",
  },
  {
    fileName: "servico-3.jpg",
    titulo: "Google Ads",
    texto:
      "Depois que o site está no ar, o próximo passo é trazer gente pra dentro dele. Campanhas configuradas pra gerar contato, não só clique.",
    mockupType: "ads",
  },
];

function ServicoCard({ servico, index }) {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      className={`${styles.card} ${inView ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      ref={ref}
    >
      {/* TODO: substituir a ilustração por <img src={...} /> quando a foto real chegar */}
      <div className={styles.cardImage}>
        <BrowserMockup type={servico.mockupType} animate={inView} />
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
