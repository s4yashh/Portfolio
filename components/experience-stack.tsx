"use client"

import { motion } from "framer-motion"
import { ArrowDown, Building2, MapPin } from "lucide-react"

const logos = ["/jolenergy.png", "/unifiedmentor.jpeg", "/hacktoberfest.png", "/adg.jpeg"]

/** Scroll-driven experience cards: each card settles over the previous one. */
export function ExperienceStack({ experiences = [] }: { experiences: any[] }) {
  return (
    <section id="experience" className="relative scroll-mt-28 py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Career journey</p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">Experience</h2>
        </div>
        <div className="flex items-center gap-3 lg:justify-end">
          <p className="max-w-md text-sm leading-7 text-foreground/65 lg:text-right">Scroll to explore the teams, products, and communities that have shaped my work.</p>
          <ArrowDown className="h-4 w-4 shrink-0 text-foreground/45" aria-hidden="true" />
        </div>
      </div>

      <div className="relative pb-[14vh]">
        {experiences.map((exp: any, index: number) => (
          <article
            key={exp.id}
            className="relative mb-5 last:mb-0 md:sticky"
            style={{ top: `${96 + index * 24}px`, zIndex: index + 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative min-h-[330px] overflow-hidden rounded-3xl border border-foreground/10 bg-foreground p-6 text-background shadow-2xl shadow-foreground/10 sm:p-8 md:min-h-[380px] md:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,hsl(var(--primary-foreground)/0.16),transparent_32%)] opacity-70" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-background/60 to-transparent" />
              <span className="absolute -right-2 -top-8 select-none text-[8rem] font-semibold leading-none tracking-tighter text-background/[0.06] sm:right-4 sm:text-[11rem]">{String(index + 1).padStart(2, "0")}</span>

              <div className="relative flex h-full min-h-[282px] flex-col">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/55">{exp.period}</p>
                    <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">{exp.role}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-background/65">
                      <span className="inline-flex items-center gap-1.5 font-medium text-background"><Building2 className="h-4 w-4" />{exp.company}</span>
                      <span className="hidden h-1 w-1 rounded-full bg-background/35 sm:block" />
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-background/15 bg-background/10 p-1.5 backdrop-blur-sm sm:h-16 sm:w-16">
                    {logos[index] ? <img src={logos[index]} alt={`${exp.company} logo`} className="h-full w-full object-contain" /> : <Building2 className="h-6 w-6 text-background/70" />}
                  </div>
                </div>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-background/75 sm:text-base">{exp.description}</p>

                {exp.tech?.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {exp.tech.map((tech: string) => (
                      <span key={tech} className="rounded-full border border-background/15 bg-background/[0.08] px-3 py-1.5 text-xs font-medium text-background/80 backdrop-blur-sm">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  )
}
