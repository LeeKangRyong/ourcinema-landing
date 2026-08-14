import { motion } from "motion/react";
import { PhoneFrame } from "../components/PhoneFrame";
import { HomeFeedScreen, AlbumScreen } from "../remotion/screens";
import heroBg from "../assets/hero-bg.svg";

export function Hero() {
  return (
    <section className="section hero">
      <motion.div
        className="panel hero__panel"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="hero__content">
          <h1 className="hero__title">
            우리 아이와 처음
            <br />
            만나는 순간부터
          </h1>
          <p className="hero__subtitle">
            우리 아이을 위해서라면 깔아야 하는 필수 앱!
          </p>
          <div className="hero__buttons">
            <button className="store-button">Google Play</button>
            <button className="store-button store-button--light">
              App Store
            </button>
          </div>
        </div>
        <div className="hero__visuals">
          <div className="hero__bg-graphic">
            <img src={heroBg} alt="" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            style={{ position: "absolute", left: 86, top: 59 }}
          >
            <PhoneFrame screen={HomeFeedScreen} style={{ opacity: 0.95 }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            style={{ position: "absolute", left: 246, top: 123 }}
          >
            <PhoneFrame screen={AlbumScreen} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
