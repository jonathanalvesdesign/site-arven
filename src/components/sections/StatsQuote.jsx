import { useEffect, useRef } from "react";
import useInView from "../../utils/useInView";
import styles from "./StatsQuote.module.css";
import sobreNosImg from "../../assets/images/bg sobre nós.webp";
import founderImg from "../../assets/images/img founder.webp";

const STATS = [
  { numero: "+200", label: "Negócios atendidos" },
  { numero: "+5", label: "Anos de atividade" },
  { numero: "+50", label: "Indicações de clientes" },
  { numero: "100%", label: "Foco em conversão, não só estética" },
];

// Deslocamento em cascata de cada card (deve bater com o nth-child no CSS)
const CARD_OFFSETS = [0, 200, 400, 600];
// Mesmo breakpoint em que o CSS zera a cascata e empilha os cards
const CASCADE_BREAKPOINT = "(min-width: 1025px)";

const MAX_OFFSET = CARD_OFFSETS[CARD_OFFSETS.length - 1];

export default function StatsQuote() {
  const rowRef = useRef(null);
  const cardRefs = useRef([]);
  const quoteBlockRef = useRef(null);
  const [sectionRef, sectionInView, sectionAnimate] = useInView(0.1);

  useEffect(() => {
    let frame = null;

    const updatePositions = () => {
      frame = null;
      const rowEl = rowRef.current;
      if (!rowEl) return;

      if (!window.matchMedia(CASCADE_BREAKPOINT).matches) {
        cardRefs.current.forEach((el) => {
          if (el) el.style.transform = "";
        });
        if (quoteBlockRef.current) {
          quoteBlockRef.current.style.transform = "";
          quoteBlockRef.current.style.marginBottom = "";
        }
        return;
      }

      const rect = rowEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 = card recém entrando na tela (cascata completa)
      // 1 = topo do bloco alcançou o topo da tela (cards alinhados com o +200)
      const raw = (windowHeight - rect.top) / windowHeight;
      const progress = Math.min(Math.max(raw, 0), 1);

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const offset = CARD_OFFSETS[index];
        el.style.transform = `translateY(-${offset * progress}px)`;
      });

      // O bloco da citação acompanha o último card, fechando o vão que a
      // cascata deixaria para trás conforme os cards sobem e se alinham.
      // A margem negativa encolhe a seção no mesmo ritmo, evitando o
      // espaço vazio que sobraria abaixo dela quando tudo já alinhou.
      if (quoteBlockRef.current) {
        const shift = MAX_OFFSET * progress;
        quoteBlockRef.current.style.transform = `translateY(-${shift}px)`;
        quoteBlockRef.current.style.marginBottom = `-${shift}px`;
      }
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(updatePositions);
      }
    };

    updatePositions();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} id="sobre">
      <div className={`container ${styles.inner}`} ref={sectionRef}>
        <div className={styles.statsRow} ref={rowRef}>
          {STATS.map((stat, index) => (
            <div
              className={`${styles.statCard} ${styles.reveal} ${
                sectionInView ? styles.revealVisible : ""
              } ${sectionInView && !sectionAnimate ? "no-transition" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              key={stat.label}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <span className={styles.statNumber}>{stat.numero}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div
          className={`${styles.quoteBlock} ${styles.reveal} ${
            sectionInView ? styles.revealVisible : ""
          } ${sectionInView && !sectionAnimate ? "no-transition" : ""}`}
          style={{ transitionDelay: "300ms" }}
          ref={quoteBlockRef}
        >
          <div className={styles.quoteImage}>
            <img src={sobreNosImg} alt="Arven" className={styles.quoteImg} />
          </div>

          <div className={styles.quoteCard}>
            <p className={styles.quoteText}>
              Site bonito qualquer um faz. Difícil é fazer um site que
              vende, e é nisso que a gente foca em cada projeto.
            </p>

            <div className={styles.author}>
              <img src={founderImg} alt="Jonathan Alves" className={styles.avatar} />
              <div>
                <div className={styles.authorName}>Jonathan Alves</div>
                <div className={styles.authorRole}>Founder Arven</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
