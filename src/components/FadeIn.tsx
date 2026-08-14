import { motion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
};

/** 스크롤 진입 시 떠오르며 페이드 인, 벗어나면 페이드 아웃되는 모션 래퍼 */
export function FadeIn({ children, delay = 0, y = 28, className, style }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
