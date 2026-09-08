import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import EmBreve from "./pages/EmBreve";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<EmBreve />} />
        <Route path="/blog" element={<EmBreve />} />
        <Route path="/sobre" element={<EmBreve />} />
        <Route path="/termos-de-servico" element={<EmBreve />} />
        <Route path="/politicas-de-privacidade" element={<EmBreve />} />
        <Route path="*" element={<EmBreve />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
