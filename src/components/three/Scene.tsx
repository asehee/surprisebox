'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SurpriseBox } from './SurpriseBox'

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const surpriseBox = new SurpriseBox(containerRef.current)

    return () => {
      // cleanup
      surpriseBox.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}