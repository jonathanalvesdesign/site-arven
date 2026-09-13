import { useState } from "react";
import Button from "../ui/Button";
import useInView from "../../utils/useInView";
import styles from "./CtaForm.module.css";
import formularioImg from "../../assets/images/img formulario.webp";

const SERVICOS_OPCOES = ["Site", "Landing Page", "Google ADS", "Sistema", "Blog"];
const ORCAMENTO_OPCOES = [
  "Menos de R$ 10 mil",
  "R$ 10 mil a R$ 50 mil",
  "Acima de R$ 50 mil",
];

const INITIAL_STATE = {
  nome: "",
  empresa: "",
  whatsapp: "",
  email: "",
  servico: "",
  orcamento: "",
  mensagem: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatWhatsapp(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${ddd}`;

  // Celular (11 dígitos): 5 + 4. Fixo (até 10 dígitos): 4 + 4.
  const splitAt = digits.length > 10 ? 5 : 4;

  if (rest.length <= splitAt) {
    return `(${ddd}) ${rest}`;
  }

  const firstPart = rest.slice(0, splitAt);
  const secondPart = rest.slice(splitAt);
  return `(${ddd}) ${firstPart}-${secondPart}`;
}

function sanitizeName(value) {
  return value.replace(/[^\p{L}\s'-]/gu, "");
}

function StarIcon() {
  return (
    <svg className={styles.star} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.6431 7.17815L11.8306 9.605L12.6875 13.2344C12.7347 13.4314 12.7226 13.638 12.6525 13.8281C12.5824 14.0182 12.4576 14.1833 12.2937 14.3025C12.1299 14.4216 11.9344 14.4896 11.7319 14.4978C11.5295 14.5059 11.3291 14.4538 11.1562 14.3481L8 12.4057L4.84187 14.3481C4.66901 14.4532 4.46893 14.5048 4.26683 14.4964C4.06472 14.4879 3.86964 14.4199 3.70612 14.3008C3.54261 14.1817 3.41797 14.0169 3.34793 13.8271C3.27788 13.6374 3.26555 13.4311 3.31249 13.2344L4.17249 9.605L1.35999 7.17815C1.20706 7.04595 1.09645 6.87165 1.04198 6.677C0.987515 6.4823 0.99161 6.2759 1.05375 6.08355C1.11589 5.8912 1.23332 5.7214 1.39138 5.5954C1.54944 5.4694 1.74112 5.39275 1.94249 5.375L5.63 5.0775L7.0525 1.63502C7.1295 1.44741 7.26055 1.28692 7.42895 1.17398C7.5974 1.06104 7.79565 1.00073 7.99845 1.00073C8.20125 1.00073 8.39945 1.06104 8.5679 1.17398C8.7363 1.28692 8.86735 1.44741 8.94435 1.63502L10.3663 5.0775L14.0538 5.375C14.2555 5.3921 14.4477 5.4683 14.6064 5.59415C14.765 5.72 14.883 5.88985 14.9455 6.08245C15.0081 6.275 15.0124 6.4818 14.9579 6.6768C14.9035 6.8718 14.7926 7.04645 14.6393 7.17875L14.6431 7.17815Z" />
    </svg>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.pill} ${active ? styles.pillActive : ""}`}
      onClick={onClick}
    >
      <span className={styles.radioDot} />
      {label}
    </button>
  );
}

export default function CtaForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [wrapperRef, wrapperInView, wrapperAnimate] = useInView(0.15);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleNomeChange = (event) => {
    setFormData((prev) => ({ ...prev, nome: sanitizeName(event.target.value) }));
  };

  const handleWhatsappChange = (event) => {
    setFormData((prev) => ({ ...prev, whatsapp: formatWhatsapp(event.target.value) }));
  };

  const handleSelect = (field, value) => () => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ["nome", "empresa", "whatsapp", "email", "servico"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Campo obrigatório";
      }
    });

    if (!newErrors.email && !EMAIL_PATTERN.test(formData.email.trim())) {
      newErrors.email = "E-mail inválido";
    }

    if (!newErrors.whatsapp && formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // TODO: integrar com WhatsApp/CRM depois (redirecionar pro zap com a mensagem preenchida)
    console.log(formData);
    setSubmitted(true);
    setFormData(INITIAL_STATE);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper} ref={wrapperRef}>
          <div
            className={`${styles.infoCard} ${styles.reveal} ${wrapperInView ? styles.revealVisible : ""} ${
              wrapperInView && !wrapperAnimate ? "no-transition" : ""
            }`}
          >
            <div
              className={styles.infoGlow}
              style={{ backgroundImage: `url(${formularioImg})` }}
            />

            <div className={styles.socialProof}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <span className={styles.socialProofText}>
                Ajudamos mais de 200 empresas.
              </span>
            </div>

            <div className={styles.infoContent}>
              <h2 className={styles.infoTitle}>Seu próximo projeto começa aqui</h2>
              <p className={styles.infoText}>
                Preenche o formulário ao lado e a gente te retorna com os
                próximos passos, sem compromisso.
              </p>
            </div>
          </div>

          <div
            className={`${styles.formCard} ${styles.reveal} ${styles.revealDelay} ${
              wrapperInView ? styles.revealVisible : ""
            } ${wrapperInView && !wrapperAnimate ? "no-transition" : ""}`}
          >
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <h3 className={styles.formTitle}>
                Conte para nós o que você quer construir.
              </h3>

              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="nome">
                    Nome*
                  </label>
                  <input
                    id="nome"
                    className={`${styles.input} ${errors.nome ? styles.fieldError : ""}`}
                    value={formData.nome}
                    onChange={handleNomeChange}
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                  {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="whatsapp">
                    WhatsApp*
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={15}
                    className={`${styles.input} ${errors.whatsapp ? styles.fieldError : ""}`}
                    value={formData.whatsapp}
                    onChange={handleWhatsappChange}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <span className={styles.errorText}>{errors.whatsapp}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="empresa">
                    Empresa*
                  </label>
                  <input
                    id="empresa"
                    autoComplete="organization"
                    className={`${styles.input} ${errors.empresa ? styles.fieldError : ""}`}
                    value={formData.empresa}
                    onChange={handleChange("empresa")}
                    placeholder="Nome da empresa"
                  />
                  {errors.empresa && (
                    <span className={styles.errorText}>{errors.empresa}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="email">
                    E-mail*
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={`${styles.input} ${errors.email ? styles.fieldError : ""}`}
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div className={styles.questionBlock}>
                <label className={styles.label}>
                  Qual serviço você busca na Arven?*
                </label>
                <div className={styles.pillGroup}>
                  {SERVICOS_OPCOES.map((opcao) => (
                    <Pill
                      key={opcao}
                      label={opcao}
                      active={formData.servico === opcao}
                      onClick={handleSelect("servico", opcao)}
                    />
                  ))}
                </div>
                {errors.servico && (
                  <span className={styles.errorText}>{errors.servico}</span>
                )}
              </div>

              <div className={styles.questionBlock}>
                <label className={styles.label}>
                  Você já tem algum orçamento em mente?
                </label>
                <div className={styles.pillGroup}>
                  {ORCAMENTO_OPCOES.map((opcao) => (
                    <Pill
                      key={opcao}
                      label={opcao}
                      active={formData.orcamento === opcao}
                      onClick={handleSelect("orcamento", opcao)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <textarea
                  className={styles.textarea}
                  value={formData.mensagem}
                  onChange={handleChange("mensagem")}
                  placeholder="Conte-nos sobre o seu negócio..."
                />
              </div>

              <div className={styles.submitBlock}>
                <Button
                  type="submit"
                  variant="dark"
                  withIcon={false}
                  className={styles.submitButton}
                  style={submitted ? { background: "var(--color-blue-accent)" } : undefined}
                >
                  {submitted ? "Recebemos sua solicitação!" : "Quero um orçamento"}
                </Button>
                <p className={styles.disclaimer}>
                  Ao enviar, você concorda com nossos{" "}
                  <a href="/termos-de-servico">termos de serviço.</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
