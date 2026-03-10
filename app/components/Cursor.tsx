'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      requestAnimationFrame(animRing)
    }

    const onEnter = () => {
      if (dotRef.current) { dotRef.current.style.width = '18px'; dotRef.current.style.height = '18px' }
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }
    const onLeave = () => {
      if (dotRef.current) { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .hover-target').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const raf = requestAnimationFrame(animRing)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: '10px', height: '10px',
          background: 'var(--green)',
          top: 0, left: 0,
          mixBlendMode: 'screen',
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: '30px', height: '30px',
          border: '1px solid rgba(63,185,80,0.4)',
          top: 0, left: 0,
          zIndex: 9998,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </>
  )
}