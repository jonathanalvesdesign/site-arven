import Marquee from "../ui/Marquee";
import styles from "./TrustBar.module.css";

const TRUST_ITEMS = [
  "Feito pra rodar tráfego pago desde o primeiro dia",
  "Você fala direto com quem constrói o seu projeto",
  "Pensado pra quem chega pelo celular, que é a maioria",
  "Site, landing page e Ads sem precisar contratar 3 agências",
];

export default function TrustBar() {
  return (
    <section className={styles.trustBar}>
      <Marquee>
        {TRUST_ITEMS.map((item) => (
          <span className={styles.item} key={item}>
            <span className={styles.star}>✦</span>
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
