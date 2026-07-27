"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

// ── Types ────────────────────────────────────────────

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  link: string
  demo: string
}

interface ProjectsSectionProps {
  projectsRef: React.RefObject<HTMLElement>
  projects: Project[]
}

// ── Sub-components ───────────────────────────────────

function TerminalHeader() {
  return (
    <div className="mb-10 sm:mb-14">
      <p
      className="mb-4 text-sm sm:text-base tracking-widest uppercase"
      style={{ color: "#0232B8" }}
      >
        &#47;&#47; terminal v1.0
      </p>
      <div className="flex items-center gap-3">
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-black"
        >
          PROJECTS
        </h2>
        <span
          className="cursor-blink inline-block h-[1em] w-[3px] sm:h-[1.1em] sm:w-[4px] -mt-1"
          style={{ backgroundColor: "#0232B8" }}
        />
      </div>
      <div
        className="mt-4 h-px w-full opacity-20"
        style={{ backgroundColor: "#0232B8" }}
      />
    </div>
  )
}

function ProjectNumber({ index }: { index: number }) {
  const num = String(index + 1).padStart(2, "0")
  return (
    <span
      className="mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shrink-0 terminal-glow"
      style={{ color: "#0232B8" }}
    >
      {num}
    </span>
  )
}

function ProjectTitle({ title, size = "md" }: { title: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
  }

  return (
    <span
      className={`${sizeClasses[size]} font-normal tracking-wide inline-block`}
    >
      <span className="terminal-title-block">{`\u2588\u2588\u2588\u2588 ${title} \u2588\u2588\u2588\u2588`}</span>
    </span>
  )
}

function TechTag({ tag }: { tag: string }) {
  return (
    <span
      className="inline-block px-3 py-1 text-base sm:text-lg md:text-xl tracking-wide"
      style={{
        color: "#0232B8",
        border: "1px solid rgba(2, 50, 184, 0.25)",
        background: "rgba(2, 50, 184, 0.05)",
      }}
    >
      {tag}
    </span>
  )
}

function ActionButton({
  href,
  icon,
  label,
  variant = "primary",
}: {
  href: string
  icon: ReactNode
  label: string
  variant?: "primary" | "outline"
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 text-base sm:text-lg tracking-wide transition-all duration-200 hover:scale-105 cursor-pointer"
  const primary =
    "bg-[#0232B8] text-white hover:bg-[#0228a0] hover:shadow-[0_0_16px_rgba(2,50,184,0.35)]"
  const outline =
    "text-[#0232B8] hover:bg-[rgba(2,50,184,0.08)] hover:shadow-[0_0_12px_rgba(2,50,184,0.15)]"
    const borderStyle = variant === "outline" ? { border: "1px solid rgba(2, 50, 184, 0.4)" } : {}

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variant === "primary" ? primary : outline}`}
      style={{ ...borderStyle }}
    >
      {icon}
      {label}
    </a>
  )
}

// ── Accordion Item ───────────────────────────────────

function ProjectAccordionItem({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const [readMore, setReadMore] = useState(false)
  const descriptionLimit = 160
  const needsTruncation = project.description.length > descriptionLimit
  const displayText =
    readMore || !needsTruncation
      ? project.description
      : project.description.slice(0, descriptionLimit) + "..."

  return (
    <div className="terminal-border" style={{ background: "rgba(2, 50, 184, 0.02)" }}>
      {/* Collapsed row — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-left transition-all duration-200 hover:bg-[rgba(2,50,184,0.04)] cursor-pointer"
      >
        <ProjectNumber index={index} />
        <div className="min-w-0 flex-1">
          <ProjectTitle title={project.title} size="sm" />
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs sm:text-sm tracking-wide opacity-50"
                style={{ color: "#0232B8" }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span
                className="text-xs sm:text-sm tracking-wide opacity-40"
                style={{ color: "#0232B8" }}
              >
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          className="ml-4 shrink-0"
        >
          <ChevronRight
            size={20}
            style={{ color: "#0232B8" }}
          />
        </motion.div>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              className="h-px w-full opacity-15"
          style={{ backgroundColor: "#0232B8" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-0">
              {/* Left — Content */}
              <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-sm tracking-widest uppercase opacity-50"
                    style={{ color: "#0232B8" }}
                  >
                    0{index + 1} / {project.category}
                  </span>
                </div>

                <ProjectTitle title={project.title} size="md" />

                <p
                  className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-black/70"
                >
                  {displayText}
                </p>

                {needsTruncation && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setReadMore(!readMore)
                    }}
                    className="mt-2 text-sm sm:text-base tracking-wide transition-colors duration-200 hover:opacity-100 opacity-70 cursor-pointer"
                    style={{ color: "#0232B8" }}
                  >
                    [{readMore ? "read less" : "read more"}]
                  </button>
                )}

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <TechTag key={tag} tag={tag} />
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {project.link && (
                    <ActionButton
                      href={project.link}
                      icon={<Github size={16} />}
                      label="Code"
                      variant="primary"
                    />
                  )}
                  {project.demo && (
                    <ActionButton
                      href={project.demo}
                      icon={<ExternalLink size={16} />}
                      label="Live"
                      variant="outline"
                    />
                  )}
                </div>
              </div>

              {/* Right — Image */}
              <div className="relative mx-4 mb-4 mt-2 aspect-video overflow-hidden md:mx-0 md:mr-8 md:my-8 md:aspect-auto md:min-h-[320px]">
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ border: "1px solid rgba(2, 50, 184, 0.15)" }}
                />
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={`/${project.image}`}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </motion.div>
                {/* CRT vignette on image */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    boxShadow: "inset 0 0 60px rgba(2, 50, 184, 0.03), inset 0 0 120px rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Component ───────────────────────────────────

export function ProjectsSection({ projectsRef, projects }: ProjectsSectionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const isInView = useInView(projectsRef, { once: true, margin: "-80px" })

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.section
      id="projects"
      ref={projectsRef}
      className="scroll-mt-28 crt-section"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-12 sm:py-16 md:py-20">
        <TerminalHeader />

        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <ProjectAccordionItem
                project={project}
                index={index}
                isExpanded={expandedId === project.id}
                onToggle={() => handleToggle(project.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-10 flex items-center gap-3 opacity-30">
          <div className="h-px flex-1" style={{ backgroundColor: "#0232B8" }} />
          <span
            className="text-sm tracking-widest"
            style={{ color: "#0232B8" }}
          >
            end of projects
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "#0232B8" }} />
        </div>
      </div>
    </motion.section>
  )
}
