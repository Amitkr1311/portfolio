'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Download } from 'lucide-react'

export default function ResumeDownload() {
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2 }
      )
    }
  }, [mounted])

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/resume.pdf' // You'll need to place your resume.pdf in the public folder
    link.download = 'Amit_Kumar_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!mounted) return null

  return (
    <button
      ref={buttonRef}
      onClick={handleDownload}
      className="fixed bottom-28 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-2xl hover:shadow-green-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-110 hover:-rotate-6 transition-all duration-300 hover:brightness-110 animate-pulse hover:animate-none"
      aria-label="Download Resume"
      title="Download Resume"
    >
      <Download size={28} />
    </button>
  )
}
