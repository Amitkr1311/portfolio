'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current && imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          },
        }
      )

      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          },
        }
      )
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef}>
            <div className="w-full h-96 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-8xl text-white">👨‍💻</div>
            </div>
          </div>
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg md:text-xl text-slate-900 dark:text-gray-200 leading-relaxed">
              Hi! I'm Amit, a Computer Science undergraduate at IIT Raichur and a Top 1.4% LeetCode performer. 
              I build full-stack, AI-driven, and Cloud applications using React.js, Next.js, and Node.js with 
              strong expertise in AWS and Golang.
            </p>
            <p className="text-lg md:text-xl text-slate-900 dark:text-gray-200 leading-relaxed">
              My journey in tech is driven by a passion for solving complex problems through innovative code. 
              I thrive on building scalable systems and continuously learning new technologies to stay at the forefront 
              of full-stack development and cloud architecture.
            </p>
            <p className="text-lg md:text-xl text-slate-900 dark:text-gray-200 leading-relaxed">
              When I'm not coding, you can find me solving DSA problems on LeetCode, exploring AI applications, 
              or contributing to open-source projects that make a real impact.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex-1 text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-primary">1.4%</div>
                <div className="text-sm text-slate-700 dark:text-gray-400 mt-1 font-medium">LeetCode Rank</div>
              </div>
              <div className="flex-1 text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-primary">400+</div>
                <div className="text-sm text-slate-700 dark:text-gray-400 mt-1 font-medium">DSA Problems</div>
              </div>
              <div className="flex-1 text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-slate-700 dark:text-gray-400 mt-1 font-medium">Major Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
