import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Servicos from "../components/sections/Servicos";
import StatsQuote from "../components/sections/StatsQuote";
import Portfolio from "../components/sections/Portfolio";
import CtaForm from "../components/sections/CtaForm";
import Faq from "../components/sections/Faq";
import Blog from "../components/sections/Blog";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Servicos />
      <StatsQuote />
      <Portfolio />
      <CtaForm />
      <Faq />
      <Blog />
    </>
  );
}
