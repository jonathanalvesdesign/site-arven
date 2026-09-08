import { useLocation, useNavigate } from "react-router-dom";

const EASE = 0.12;
const MAX_FRAMES = 90; // ~1.5s a 60fps, evita loop infinito

let activeCancel = null;

// Cancela qualquer scroll fluido em andamento (ex: se o usuário rolar
// manualmente no meio da animação, ela não deve "brigar" com ele).
function cancelActiveScroll() {
  if (activeCancel) {
    activeCancel();
    activeCancel = null;
  }
}

if (typeof window !== "undefined") {
  ["wheel", "touchstart", "pointerdown"].forEach((eventName) => {
    window.addEventListener(eventName, cancelActiveScroll, { passive: true });
  });
}

// Rola suavemente recalculando a posição a cada quadro. Necessário porque
// a Seção 4 (Estatísticas) muda de altura durante o próprio scroll (efeito
// de cascata animado) — um scrollIntoView comum mira num ponto fixo e
// "trava"/salta quando o alvo se move embaixo dele. Recalculando a cada
// frame, o movimento continua fluido mesmo com o alvo em movimento; o
// limite de frames e o cancelamento por interação evitam que o loop
// rode pra sempre e prenda o scroll do usuário.
function fluidScrollBy(getRemaining) {
  cancelActiveScroll();

  let rafId = null;
  let cancelled = false;
  activeCancel = () => {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };

  const step = (frame) => {
    if (cancelled) return;
    const remaining = getRemaining();

    if (Math.abs(remaining) < 1 || frame >= MAX_FRAMES) {
      activeCancel = null;
      return;
    }

    window.scrollTo({ top: window.scrollY + remaining * EASE, behavior: "instant" });
    rafId = requestAnimationFrame(() => step(frame + 1));
  };

  rafId = requestAnimationFrame(() => step(0));
}

function fluidScrollTo(el) {
  fluidScrollBy(() => el.getBoundingClientRect().top);
}

function fluidScrollToTop() {
  fluidScrollBy(() => -window.scrollY);
}

// Faz os links do menu/footer rolarem até a seção (#id) na home,
// navegando pra home primeiro quando o usuário está em outra página.
export default function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) fluidScrollTo(el);
  };

  // Tenta repetidamente até a seção existir no DOM (útil logo após
  // navegar pra home, quando o React ainda está montando a página).
  const waitAndScrollToId = (id, attempts = 20) => {
    const el = document.getElementById(id);
    if (el) {
      fluidScrollTo(el);
      return;
    }
    if (attempts > 0) {
      setTimeout(() => waitAndScrollToId(id, attempts - 1), 50);
    }
  };

  return (href) => (event) => {
    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      if (href === "/" && location.pathname === "/") {
        event.preventDefault();
        fluidScrollToTop();
      }
      return;
    }

    const id = href.slice(hashIndex + 1);
    event.preventDefault();

    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      waitAndScrollToId(id);
    }
  };
}
