import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../animations/variants";
// import newart from "../assets/Hack Pic/newart.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-r from-blue-100 to-blue-300">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cobalt-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#0A0A0F 1px, transparent 1px), linear-gradient(90deg, #0A0A0F 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-7"
          >
            <motion.div variants={staggerItem}>
              <span className="section-label flex items-center gap-2">
                <span className="live-dot" />
                Live Auctions in Progress
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="display-heading text-5xl md:text-6xl lg:text-6xl text-ink"
            >
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Find Rare Deals Through{" "}
                <span className="text-blue-600">Live Auctions</span>
              </h1>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-base text-ink/55 leading-relaxed max-w-md font-body"
            >
              Authenticated antiques, sacred objects, and contemporary African
              art. Bid safely, discover premium products, and win amazing items
              at unbeatable prices.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/auctions"
                className="btn-primary text-base px-7 py-4 rounded-full"
              >
                Explore Auctions <ArrowRight size={16} />
              </Link>
              {/* <button className="btn-ghost flex items-center gap-2.5 text-base px-5 py-4">
                <div className="w-9 h-9 bg-ink rounded-full flex items-center justify-center">
                  <Play size={12} fill="white" className="ml-0.5" />
                </div>
                Watch how it works
              </button> */}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-8 pt-4 border-t border-ink/8"
            >
              {[
                { value: "3,400+", label: "Authenticated works" },
                { value: "₦2.1B+", label: "Total traded" },
                { value: "47", label: "Countries reached" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl text-ink">{value}</p>
                  <p className="text-xs text-ink/40 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — featured art mosaic */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-2 gap-3"
          >
            <motion.div
              className="col-span-2 overflow-hidden aspect-[6.8/8]"
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
            >
              <img
                src="src/assets/Hack Pic/art.png"
                alt="Featured artwork"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
