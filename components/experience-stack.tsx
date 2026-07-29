"use client"

import { motion } from "framer-motion"
import { ArrowDown, Building2, MapPin } from "lucide-react"
import { useEffect, useRef, useCallback } from "react"

const logos = ["/jolenergy.png", "/unifiedmentor.jpeg", "/hacktoberfest.png", "/adg.jpeg"]

export function ExperienceStack({ experiences = [] }: { experiences: any[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const naturalTops = useRef<number[]>([])
  const rafId = useRef(0)

  const updateCards = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const sectionRect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const naturalTop = naturalTops.current[i]
      if (naturalTop === undefined) return

      const cardHeight = card.offsetHeight
      const naturalTopInViewport = naturalTop + sectionRect.top
      const stickyTop = 96 + i * 24

      if (naturalTopInViewport < stickyTop) {
        const translateToSticky = stickyTop - naturalTopInViewport
        const maxTranslate = sectionRect.top + sectionHeight - naturalTopInViewport - cardHeight
        const translateY = Math.max(0, Math.min(translateToSticky, maxTranslate))
        card.style.transform = `translateY(${translateY}px)`
      } else {
        card.style.transform = ""
      }
    })
  }, [])

  const tick = useCallback(() => {
    updateCards()
    rafId.current = requestAnimationFrame(tick)
  }, [updateCards])

  const measureNaturalTops = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = cardRefs.current
    const sectionRect = section.getBoundingClientRect()
    naturalTops.current = cards.map((card) => {
      if (!card) return 0
      return card.getBoundingClientRect().top - sectionRect.top
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    measureNaturalTops()
    updateCards()
    rafId.current = requestAnimationFrame(tick)

    window.addEventListener("resize", measureNaturalTops)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener("resize", measureNaturalTops)
    }
  }, [tick, updateCards, measureNaturalTops])

  return (
    <section id="experience" ref={sectionRef} className="relative scroll-mt-28 py-12 sm:py-16">
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
            className="relative mb-5 last:mb-0"
            style={{ zIndex: index + 1 }}
          >
            <motion.div
              ref={(el) => { cardRefs.current[index] = el }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative min-h-[330px] overflow-hidden rounded-3xl border border-foreground/10 bg-card p-6 text-foreground shadow-[0_18px_45px_rgba(30,35,43,0.08)] sm:p-8 md:min-h-[380px] md:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(218,229,239,0.7),transparent_32%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

              <div className="relative flex h-full min-h-[282px] flex-col">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/48">{exp.period}</p>
                    <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">{exp.role}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/62">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground"><Building2 className="h-4 w-4" />{exp.company}</span>
                      <span className="hidden h-1 w-1 rounded-full bg-foreground/30 sm:block" />
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-white p-2 shadow-sm sm:h-16 sm:w-16">
                    {logos[index] ? <img src={logos[index]} alt={`${exp.company} logo`} className="h-full w-full object-contain" /> : <Building2 className="h-6 w-6 text-foreground/60" />}
                  </div>
                </div>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-foreground/68 sm:text-base">{exp.description}</p>

                {exp.tech?.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {exp.tech.map((tech: string) => (
                      <span key={tech} className="rounded-full border border-foreground/10 bg-foreground/[0.035] px-3 py-1.5 text-xs font-medium text-foreground/70">{tech}</span>
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
