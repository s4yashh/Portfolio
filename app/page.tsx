"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePreloaderContext } from "@/components/preloader-wrapper"

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { ExperienceStack } from "@/components/experience-stack"

// Projects Section Component
function ProjectsSection({
  projectsRef,
  projects,
  allTechnologies,
  selectedFilter,
  setSelectedFilter,
}: {
  projectsRef: React.RefObject<HTMLElement>
  projects: any[]
  allTechnologies: string[]
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
}) {
  const isInView = useInView(projectsRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="projects"
      ref={projectsRef}
      className="mb-16 sm:mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 tracking-tight" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedFilter("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-light text-xs sm:text-sm transition-all ${
              selectedFilter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            All
          </motion.button>
          {allTechnologies.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedFilter(tech)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-light text-xs sm:text-sm transition-all ${
                selectedFilter === tech
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg sm:text-xl font-light mb-2 text-white" style={{ fontFamily: "var(--font-inter)" }}>{project.title}</h3>
              <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{project.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-white/10 text-white/80 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Link href={project.link} target="_blank">
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                    <Github size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Code</span>
                    <span className="sm:hidden">Code</span>
                  </Button>
                </Link>
                <Link href={project.demo} target="_blank">
                  <Button size="sm" variant="outline" className="text-white text-xs">
                    <ExternalLink size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

// Contact Section Component
function ContactSection({ contactRef }: { contactRef: React.RefObject<HTMLElement> }) {
  const isInView = useInView(contactRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="contact"
      ref={contactRef}
      className="mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-light mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-8 font-light">
          I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="mailto:singhsuyash012@gmail.com">
            <Button className="bg-white/10 hover:bg-white/20 text-white w-full justify-start">
              <Mail size={18} className="mr-3" />
              singhsuyash012@gmail.com
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/suyashsingh-dev" target="_blank">
            <Button variant="outline" className="text-white w-full justify-start">
              <Linkedin size={18} className="mr-3" />
              LinkedIn Profile
            </Button>
          </Link>
          <Link href="https://github.com/s4yashh" target="_blank">
            <Button variant="outline" className="text-white w-full justify-start">
              <Github size={18} className="mr-3" />
              GitHub Profile
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default function Portfolio() {
  const { preloaderComplete } = usePreloaderContext()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -500])

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "resume", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const resumeRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const projects = [
    {
      id: 1,
      title: "SEED (Frontend Developer)",
      description: "Built a responsive startup platform with chatbot UI, dynamic listings, internship features, and seamless navigation.",
      image: "image.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/SEED",
      demo: "https://thecompanyseed.vercel.app/",
    },
    {
      id: 2,
      title: "Amazon Clone App",
      description: "Developed an iOS e-commerce app with SwiftUI, Firebase auth, real-time DB, cart, checkout, and order tracking.",
      image: "Screenshot 2025-07-30 at 2.56.51 PM.png",
      tags: ["Swift", "SwiftUI", "HealthKit", "Core Data", "iOS"],
      category: "ios",
      link: "https://github.com/SUYASHSINGH7985/Amazon-Clone",
      demo: "https://drive.google.com/file/d/1x1QwaK2j2Xg_4MJdXbX5CWN9Cll9cI3_/view",
    },
    {
      id: 3,
      title: "Apple Futuristic Landing Page",
      description: "Crafted a modern Apple-style landing page with 3D product visuals using Three.js and smooth animations for seamless UX.",
      image: "image.png",
      tags: ["React", "Socket.io", "Node.js"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/APPLE-LandingPage-",
      demo: "https://suyashsingh7985.github.io/APPLE-LandingPage-/",
    },
  ]

  const skills = [
    { name: "React/Next.js", icon: <Globe className="w-5 h-5" /> },
    { name: "Swift/SwiftUI", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Node.js", icon: <Code className="w-5 h-5" /> },
    { name: "iOS Development", icon: <Smartphone className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  ]

  const experiences = [
    {
      id: 1,
      company: "Jol Energy",
      role: "Software Developer Intern",
      period: "Sep 2025 – Present",
      location: "Remote",
      description: "Built AI-powered interview platform with real-time feedback system. Designed and optimized Supabase database schema for user authentication and interview data. Integrated Gemini API for advanced speech-to-text transcription and analysis.",
      tech: ["Next.js", "Supabase", "NextAuth.js", "Gemini API", "TypeScript"],
    },
    {
      id: 2,
      company: "Unified Mentor Private Limited",
      role: "Full Stack Web Development Intern",
      period: "Oct 2025 – Present",
      location: "Remote",
      description: "Developed SuperMall marketplace platform with 15+ product management features. Created vendor dashboard with analytics and order management system. Implemented RESTful APIs and integrated payment gateway integration.",
      tech: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    },
    {
      id: 3,
      company: "Hacktoberfest",
      role: "Open Source Contributor",
      period: "Oct 2025 – Oct 2025",
      location: "Remote",
      description: "Successfully contributed to Hacktoberfest 2024 with 6 pull requests merged across cross-platform open-source repositories, fixing bugs, and solving issues.",
     
    },
    {
      id: 4,
      company: "VIT Vellore",
      role: "Technical Lead - College Club",
      period: "Jan 2024 – Present",
      location: "Vellore, India",
      description: "Leading technical initiatives and mentoring junior developers. Organized hackathons and coding workshops for 200+ students. Built and maintained club website and internal tools for event management.",
      tech: ["React", "Node.js", "MongoDB", "Git", "Docker"],
    },
  ]

  const navigationItems = [
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
  ]

  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase().includes(selectedFilter.toLowerCase())),
        )

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    let musicStarted = false
    
    const startMusic = () => {
      // Start music on user tap/click
      if (!musicStarted && audioRef.current) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio playback started successfully
              setIsAudioPlaying(true)
              musicStarted = true
            })
            .catch((error) => {
              // Autoplay was prevented or error occurred
              console.log("Playback error:", error)
            })
        } else {
          // Older browsers
          setIsAudioPlaying(true)
          musicStarted = true
        }
        // Remove listener after first successful attempt
        document.removeEventListener("click", startMusic)
        document.removeEventListener("touchstart", startMusic)
      }
    }

    document.addEventListener("click", startMusic)
    document.addEventListener("touchstart", startMusic)
    
    return () => {
      document.removeEventListener("click", startMusic)
      document.removeEventListener("touchstart", startMusic)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Animated Background */}
      <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatType: "loop" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatType: "loop" }}
        />
      </motion.div>

      {/* Horizontal Navigation Bar */}
      <nav className="sticky top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center justify-between w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 gap-4 sm:gap-6 md:gap-8">
          {/* Left Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.id)}
                className={`font-light text-xs sm:text-sm md:text-base tracking-wide transition-all duration-300 pb-2 relative group whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                <motion.div
                  layoutId="underline"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary ${
                    activeSection === item.id ? "block" : "hidden"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Music Player - Dots when paused, Equalizer when playing with Song Name */}
            <motion.div 
              className="flex items-center gap-2 h-6 cursor-pointer"
              onClick={() => {
                if (audioRef.current) {
                  if (isAudioPlaying) {
                    audioRef.current.pause()
                    setIsAudioPlaying(false)
                  } else {
                    audioRef.current.play()
                    setIsAudioPlaying(true)
                  }
                }
              }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {isAudioPlaying ? (
                  // Equalizer Bars when playing with Song Name
                  <motion.div
                    key="equalizer-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    {/* Equalizer Bars */}
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ backgroundColor: "#001085" }}
                          animate={{
                            height: ["4px", "12px", "8px", "12px", "4px"]
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    {/* Song Name */}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-xs font-light text-white/80 whitespace-nowrap"
                    >
                      ≪Lose My Mind≫
                    </motion.span>
                  </motion.div>
                ) : (
                  // Three Dots when paused (stationary, no color change)
                  <motion.div
                    key="dots"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="w-full pb-20">
        {/* Hero Section - Takes full viewport height so About is hidden initially */}
        <section className="w-full bg-background pt-20 sm:pt-24 md:pt-32 min-h-screen flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* LEFT SECTION — TEXT CONTENT */}
              <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
                {/* "Hi" - appears first */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    className="mb-2 sm:mb-4 md:mb-6"
                  >
                    <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tighter leading-tight">
                      <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                        Hi,
                      </span>
                    </h1>
                  </motion.div>
                )}

                {/* "I'm Suyash" - appears smoothly after Hi */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-6 sm:mb-8 md:mb-12 relative inline-block"
                  >
                  <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold tracking-tighter leading-tight relative whitespace-nowrap">
                    I'm{" "}
                    <span className="relative inline">
                      {/* Black text background */}
                      <span className="text-black dark:text-black relative z-10" style={{ color: "#0232B8" }}>
                        Suyash
                      </span>
                      
                      {/* Light brown fill rectangle (#EDE4D9) */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: "#D9E2ED", originX: 0 }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                      />
                    </span>
                  </h2>
                </motion.div>
                )}

                {/* "Aspiring Software Engineer" - appears last with stagger */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8 sm:mb-10 md:mb-12"
                  >
                    <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground/80 tracking-tight leading-snug whitespace-nowrap">
                      Aspiring <span style={{ color: "#880808", fontFamily: "Dancing Script, cursive", fontWeight: 600 }}>Software</span> Engineer
                    </p>
                  </motion.div>
                )}

                {/* Subtitle with smooth entry */}
                {preloaderComplete && (
                  <motion.p
                    className="text-lg sm:text-xl text-foreground/60 mb-12 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  >
                  </motion.p>
                )}
              </div>

              {/* RIGHT SECTION — IMAGE + LET'S CONNECT */}
              {preloaderComplete && (
                <div className="w-full md:w-1/2 flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
                  {/* Image */}
                  <div
                    className="w-full flex justify-center"
                    style={{ paddingRight: "clamp(0rem, 6vw, 8rem)" }}
                  >
                    <motion.div
                      className="relative w-[clamp(220px,35vw,420px)] aspect-square rounded-full overflow-hidden shadow-2xl hover:shadow-primary/30 transition-shadow duration-300"
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                    >
                      <Image
                        src="/suyash1.png"
                        alt="Suyash Singh"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw,
                               (max-width: 1024px) 60vw,
                               50vw"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Let's Connect Section Below Image - Centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="flex flex-col items-center gap-3 sm:gap-4"
                    style={{ paddingRight: "clamp(0rem, 6vw, 8rem)" }}
                  >
                    <p style={{ fontSize: "clamp(2rem, 2.5vw, 1.3rem)", fontWeight: 400, color: "white" }}>
                      Let's <span style={{ fontFamily: "Dancing Script, cursive", fontWeight: 600, color: "#0232B8" }}>Connect-</span>
                    </p>
                    {/* Social Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <a
                        href="https://github.com/s4yashh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors duration-300"
                      >
                        <Github size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                      <a
                        href="https://linkedin.com/in/suyashsingh-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors duration-300"
                      >
                        <Linkedin size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                      <a
                        href="mailto:singhsuyash012@gmail.com"
                        className="hover:text-primary transition-colors duration-300"
                      >
                        <Mail size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
          <ExperienceStack experiences={experiences} />
        </div>

        {/* Projects Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
          <ProjectsSection
            projectsRef={projectsRef}
            projects={filteredProjects}
            allTechnologies={allTechnologies}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/Losingmymind.mp3"
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
      />

      {/* Footer - Exact 94vh, no scroll below this */}
      <footer style={{ 
        height: "94vh", 
        maxHeight: "94vh", 
        backgroundColor: "#000000",
        flexShrink: 0,
        position: "relative"
      }}>

        {/* Content Container */}
        <div className="h-full flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 relative">

          {/* Social Links - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 md:bottom-16 md:left-16 flex items-center gap-4"
          >
            <a href="https://twitter.com/S4yash" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/suyashsingh-dev" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com/s4yashh" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </motion.div>

          {/* Main "THANKYOU" Heading with Phone Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-full ml-0 sm:ml-1 md:ml-2 mt-2 sm:mt-3 md:mt-4 overflow-visible flex flex-col"
          >
            {/* Phone Number - Above THANKYOU, between text and right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-1 mb-2 sm:mb-3 md:mb-4 ml-auto mr-5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
              <span style={{ color: "white", fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)", fontWeight: 400 }}>
                +917985043880
              </span>
            </motion.div>

            {/* THANKYOU Heading */}
            <h2 className="sayhi">
              THANKYOU
            </h2>
          </motion.div>

          {/* Description text - Below heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 sm:mt-12 md:mt-16 max-w-2xl"
          >
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              lineHeight: 1.6,
              margin: "0 0 4px 0",
              color: "white",
              WebkitTextFillColor: "white",
              mixBlendMode: "normal",
              opacity: 1
            }}>
              Tell us about your project.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 400,
              fontFamily: "Poppins, sans-serif",
              lineHeight: 1.6,
              margin: "0 0 4px 0",
              color: "white",
              WebkitTextFillColor: "white",
              mixBlendMode: "normal",
              opacity: 1
            }}>
              Let's collaborate and make great stuff.

            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
