/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const StaggerAnimation = ({ children, delayChildren, staggerChildren }) => {
  const stagger = {
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delayChildren: delayChildren,
        staggerChildren: staggerChildren,
        staggerDirection: 1,
      },
    },
    initial: {
      scale: 0.1,
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      //   animate="animate"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerAnimation;
