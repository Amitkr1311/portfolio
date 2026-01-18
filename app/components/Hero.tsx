'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Github, Linkedin, Mail } from 'lucide-react'
import ParticleBackground from './ParticleBackground'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()

    timeline
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      )
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Amit Kumar
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-gray-300 mb-10 font-medium">
          Full Stack Developer | AI/ML Enthusiast | Top 1.4% LeetCode
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
        <div className="flex gap-6 justify-center mt-12">
          <a href="https://github.com/Amitkr1311" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-300">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/amit-kumar-iiitr" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-300">
            <Linkedin size={28} />
          </a>
          <a href="mailto:1311amitkr@gmail.com" className="text-slate-700 dark:text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-300">
            <Mail size={28} />
          </a>
        </div>
      </div>
    </section>
  )
}
