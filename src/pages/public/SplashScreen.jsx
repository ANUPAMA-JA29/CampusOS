import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">

      <motion.div
        className="splash-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
        >
          <Sparkles size={45} color="#BBA9FF" />
        </motion.div>

        <h1>CampusOS</h1>

        <p>Your Campus. Your Opportunities.</p>

        <div className="splash-loader">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
          />
        </div>

      </motion.div>

    </div>
  );
}

export default SplashScreen;