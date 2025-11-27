"use client"

import { motion } from "framer-motion"

/**
 * Experience Stack - Cards stack on top of each other as you scroll
 * Using CSS position:sticky with incrementing top values
 */
export function ExperienceStack({ experiences = [] }: { experiences: any[] }) {
  return (
    <section className="relative py-16 w-full overflow-visible">
      {/* Section Title - Left aligned */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Experience
          </h2>
        </div>
        <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed mt-2 md:mt-0 md:ml-8 text-right">
          A journey shaped by learning, building, and solving real problems. Each experience has helped me grow into a better engineer.
        </p>
      </div>

      {/* Cards Container - Full width cards */}
      <div className="relative w-full">
        {experiences.map((exp: any, i: number) => {
          // Each card sticks 30px lower than the previous one
          const stickyTop = 80 + i * 30

          return (
            <div
              key={exp.id}
              className="sticky w-full"
              style={{
                top: `${stickyTop}px`,
                zIndex: i + 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative p-6 md:p-10 rounded-2xl bg-white group w-full"
              >
                {/* Card Number - Large faded */}
                <div className="absolute top-4 right-6 text-white text-7xl font-bold pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Role */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {exp.role}
                  </h3>
                  
                  {/* Company with icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary font-medium text-lg">{exp.company}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">{exp.location}</span>
                  </div>

                  {/* Period badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white/70 text-sm font-medium">{exp.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-5 max-w-2xl">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech?.map((t: string, idx: number) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30 transition-all cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Extra space to allow seeing the stacking effect */}
      <div className="h-[30vh]" />
    </section>
  )
}