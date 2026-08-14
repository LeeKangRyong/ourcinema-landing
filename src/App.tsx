import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { DetailGrowth } from "./sections/DetailGrowth";
import { DetailCare } from "./sections/DetailCare";
import { DetailCommunity } from "./sections/DetailCommunity";
import { DetailStore } from "./sections/DetailStore";
import { Reviews } from "./sections/Reviews";
import { CtaSection } from "./sections/CtaSection";

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <DetailGrowth />
        <DetailCare />
        <DetailCommunity />
        <DetailStore />
        <Reviews />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
