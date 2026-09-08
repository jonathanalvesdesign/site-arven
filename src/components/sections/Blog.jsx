import Button from "../ui/Button";
import SectionTag from "../ui/SectionTag";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import useInView from "../../utils/useInView";
import styles from "./Blog.module.css";
// TODO: substituir por <img src={...} /> quando os arquivos chegarem
// import blog1 from "../../assets/images/blog-1.jpg";
// import blog2 from "../../assets/images/blog-2.jpg";
// import blog3 from "../../assets/images/blog-3.jpg";

const POSTS = [
  {
    fileName: "blog-1.jpg",
    titulo: "Conversão",
    texto:
      "Como transformar visita em contato real: o que fazer, e o que evitar, na hora de estruturar seu site ou LP.",
  },
  {
    fileName: "blog-2.jpg",
    titulo: "Design que vende",
    texto:
      "Decisões de design pensadas pra gerar resultado, não só pra ficar bonito na tela.",
  },
  {
    fileName: "blog-3.jpg",
    titulo: "Tráfego pago",
    texto:
      "Como tirar mais proveito do Google Ads sem queimar verba em cliques que não convertem.",
  },
];

function BlogCard({ post, index }) {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      className={`${styles.card} ${inView ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      ref={ref}
    >
      <ImagePlaceholder fileName={post.fileName} height="404px" />
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{post.titulo}</h3>
        <p className={styles.cardDescription}>{post.texto}</p>
      </div>
    </div>
  );
}

export default function Blog() {
  return (
    <section className={styles.blog}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <SectionTag>NOSSO BLOG</SectionTag>
            <h2 className={styles.title}>
              Conteúdo de verdade pra quem quer vender mais pela internet
            </h2>
          </div>
          <Button variant="dark">Ver todos os posts</Button>
        </div>

        <div className={styles.grid}>
          {POSTS.map((post, index) => (
            <BlogCard post={post} index={index} key={post.titulo} />
          ))}
        </div>
      </div>
    </section>
  );
}
