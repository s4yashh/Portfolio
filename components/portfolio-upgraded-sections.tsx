"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Github, ExternalLink, Mail, Linkedin, Copy, Check } from "lucide-react"

// -----------------------------
// CreativeProjects
// -----------------------------
export function CreativeProjects({ 
  projectsRef, 
  projects,
  allTechnologies,
  selectedFilter,
  setSelectedFilter,
}: { 
  projectsRef?: React.RefObject<HTMLElement>
  projects: any[]
  allTechnologies?: string[]
  selectedFilter?: string
  setSelectedFilter?: (filter: string) => void
}) {
  const ref = projectsRef || useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-150px" })

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="relative mb-32"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute -top-40 right-0 w-96 h-96 bg-secondary/15 blur-[120px] rounded-full pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 relative"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
            Projects
          </span>
        </h2>
        <motion.div
          className="absolute left-0 -bottom-4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: "60%" } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6 overflow-hidden hover:border-primary/40 transition-all duration-300"
          >
            {/* Glow Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} className="bg-white/10 text-white/80 text-xs border-0">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href={project.link} target="_blank">
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                    <Github size={14} className="mr-2" />
                    Code
                  </Button>
                </Link>
                <Link href={project.demo} target="_blank">
                  <Button size="sm" variant="outline" className="text-white text-xs border-white/20">
                    <ExternalLink size={14} className="mr-2" />
                    Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// -----------------------------
// CreativeExperience
// -----------------------------
export function CreativeExperience({ 
  experienceRef, 
  experiences 
}: { 
  experienceRef?: React.RefObject<HTMLElement>
  experiences: any[] 
}) {
  const ref = experienceRef || useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-150px" })

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="relative mb-32"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute top-0 -left-40 w-80 h-80 bg-primary/15 blur-[120px] rounded-full pointer-events-none"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 relative"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Experience
          </span>
        </h2>
        <motion.div
          className="absolute left-0 -bottom-4 h-[3px] bg-gradient-to-r from-secondary to-primary rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: "50%" } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </motion.div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6 hover:border-secondary/40 transition-all duration-300 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {exp.role} <span className="text-white/60 font-normal">@ {exp.company}</span>
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    {exp.period} • {exp.location}
                  </p>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((bullet: string, j: number) => (
                    <li key={j} className="text-sm text-white/70 flex gap-3">
                      <span className="text-secondary/80 mt-0.5 flex-shrink-0">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// -----------------------------
// CreativeResume
// -----------------------------
export function CreativeResume({ resumeHref = "/Suyash_Resume 2.pdf" }: { resumeHref?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-150px" })

  return (
    <motion.section
      id="resume"
      ref={ref}
      className="mb-32"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 relative"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Resume
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-8 hover:border-primary/40 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2 text-white">Download my resume</h3>
            <p className="text-white/70">Full background, projects, and contact details in a single PDF.</p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <a href={resumeHref} download target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20">
                <ExternalLink size={16} className="mr-2" />
                Download
              </Button>
            </a>
            <a href={resumeHref} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                View
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// -----------------------------
// CreativeContact
// -----------------------------
export function CreativeContact({ contactRef }: { contactRef?: React.RefObject<HTMLElement> }) {
  const ref = contactRef || useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-150px" })
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard?.writeText("singhsuyash012@gmail.com").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-32"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 relative"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Get In Touch
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Contact Methods */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6 hover:border-secondary/40 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Say Hi</h3>
          <p className="text-sm text-white/70 mb-6">I'm open to internships, collaborations, and interesting projects.</p>

          <div className="space-y-3">
            <button 
              onClick={copyEmail}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Email
                </>
              )}
            </button>
            <a 
              href="mailto:singhsuyash012@gmail.com"
              className="block px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-all text-center"
            >
              <Mail size={16} className="inline mr-2" />
              Email Me
            </a>
            <a 
              href="https://linkedin.com/in/suyashsingh-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-all text-center"
            >
              <Linkedin size={16} className="inline mr-2" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/s4yashh"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-all text-center"
            >
              <Github size={16} className="inline mr-2" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Right Cards: Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6 hover:border-primary/40 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Project Brief</h3>
          <p className="text-sm text-white/70 mb-6">Tell me about your project: scope, timeline, and budget. I'll respond within a couple of days.</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Name" 
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-primary/40 outline-none transition-all"
              />
              <input 
                placeholder="Email" 
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-primary/40 outline-none transition-all"
              />
            </div>
            <input 
              placeholder="Company / Role (optional)" 
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-primary/40 outline-none transition-all"
            />
            <textarea 
              placeholder="Short brief" 
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-primary/40 outline-none transition-all resize-none h-32"
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default {}
