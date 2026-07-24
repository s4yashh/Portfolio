"use client"

import { motion } from "framer-motion"
import { Building2, MapPin } from "lucide-react"

const logos = ["/jolenergy.png", "/unifiedmentor.jpeg", "/hacktoberfest.png", "/adg.jpeg"]

/** A contained, responsive timeline that keeps every experience easy to scan. */
export function ExperienceStack({ experiences = [] }: { experiences: any[] }) {
  return (
    <section id="experience" className="relative scroll-mt-28 py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Career journey</p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">Experience</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-foreground/65 lg:text-right">
          Building thoughtful products, collaborating with teams, and turning ambitious ideas into reliable experiences.
        </p>
      </div>

      <div className="relative space-y-5 before:absolute before:bottom-8 before:left-4 before:top-8 before:w-px before:bg-border sm:before:left-6">
        {experiences.map((exp: any, index: number) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative pl-10 sm:pl-16"
          >
            <span className="absolute left-2.5 top-8 z-10 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-[0_0_0_5px_hsl(var(--background))] sm:left-[18px]" />

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/60">
                    <span className="rounded-full border border-border bg-muted/40 px-3 py-1.5">{exp.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{exp.role}</h3>
                  <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Building2 className="h-4 w-4" />{exp.company}
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background sm:h-14 sm:w-14">
                  {logos[index] ? <img src={logos[index]} alt="" className="h-full w-full object-contain p-1.5" /> : <Building2 className="h-5 w-5 text-foreground/50" />}
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-foreground/70 sm:text-[0.95rem]">{exp.description}</p>

              {exp.tech?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tech.map((tech: string) => (
                    <span key={tech} className="rounded-md border border-border bg-muted/35 px-2.5 py-1 text-xs font-medium text-foreground/70">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
