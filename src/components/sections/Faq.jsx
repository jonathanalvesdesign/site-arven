import { useState } from "react";
import SectionTag from "../ui/SectionTag";
import FaqItem from "../ui/FaqItem";
import useInView from "../../utils/useInView";
import styles from "./Faq.module.css";

const FAQ_ITEMS = [
  {
    pergunta: "Quanto tempo demora pra ficar pronto?",
    resposta:
      "[Preencher com seu prazo real. Seja específico, prazo vago gera desconfiança]",
  },
  {
    pergunta: "Preciso ter site pra rodar Google Ads?",
    resposta:
      "Precisa de uma página feita pra converter, pode ser um site completo ou uma landing page única, depende do seu objetivo. A gente te ajuda a decidir na análise.",
  },
  {
    pergunta:
      "Já tenho site, só não converte. Dá pra consertar sem refazer tudo?",
    resposta:
      "Sim. Às vezes o problema não é o design, é a página não deixar claro o que fazer a seguir. Isso a gente identifica na análise.",
  },
  {
    pergunta: "Quanto tempo demora pra eu receber o retorno da análise?",
    resposta:
      '[Preencher com seu prazo real, tipo "em até 24h" ou "em até 2 dias úteis". Prazo claro passa mais confiança que "o mais rápido possível"]',
  },
  {
    pergunta: "E se eu não gostar do resultado?",
    resposta:
      "[Preencher se tiver garantia ou processo de ajuste. Isso reduz muito a fricção de fechar]",
  },
];

function FaqRow({ item, index, open, onToggle }) {
  const [ref, inView, animate] = useInView(0.2);

  return (
    <div
      className={`${styles.itemReveal} ${inView ? styles.itemVisible : ""} ${
        inView && !animate ? "no-transition" : ""
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
      ref={ref}
    >
      <FaqItem {...item} open={open} onToggle={onToggle} />
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.faq}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.headerText}>
            <SectionTag>FICOU COM DÚVIDA?</SectionTag>
            <h2 className={styles.title}>
              As perguntas que quase todo mundo faz antes de fechar
            </h2>
          </div>

          <div className={styles.list}>
            {FAQ_ITEMS.map((item, index) => (
              <FaqRow
                key={item.pergunta}
                item={item}
                index={index}
                open={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
