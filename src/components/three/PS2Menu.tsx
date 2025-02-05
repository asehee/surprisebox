"use client"

import { useState, useRef, useEffect } from "react"

interface MenuItem {
  id: number
  title: string
  gifUrl: string
}

interface Position {
  x: number
  y: number
}

export default function PS2Menu() {
  const [items] = useState<MenuItem[]>([
    {
      id: 1,
      title: "Random",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/randommm-freddyuniverse-BeAcDv9Sj0pSSEOFhnB2FKuHYzIJnP.gif",
    },
    {
      id: 2,
      title: "Pics",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PhotoGallery-freddyuniverse-ZnICokrYxtfEURdHBqOE37pmqgKdUz.gif",
    },
    {
      id: 3,
      title: "Support",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/money-freddyuniverse-uCdh0N8ivWucFPJNYBBonCyld2zWkr.gif",
    },
    {
      id: 4,
      title: "Burn Book",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/burnbook-freddyuniverse-DWcG5CtXVnjaSo8TcHsTE2DKOn1eBs.gif",
    },
    {
      id: 5,
      title: "Brain Games",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/braingames-freddyuniverse-ZwlXB3hvH6rz38LKLTiCVRpdLP1EbH.gif",
    },
    {
      id: 6,
      title: "About Me",
      gifUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aboutme-freddyuniverse-NcbYrvtwIgA2kBNopkqqOccKXMe2QK.gif",
    },
  ])
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-500 to-zinc-600 p-8">
      {/* max-w-5xl 대신 max-w-4xl을 사용하여 컨텐츠 영역을 좀 더 좁게 만듭니다 */}
      <div className="h-full flex flex-col mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-zinc-900 rounded-sm" />
            <div className="text-white">
              <div className="text-xl ps2-text">Memory Card (PS2)/2</div>
              <div className="text-sm text-zinc-200">4,868 KB Free</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-300 ps2-text">
            Burnout Revenge
          </div>
        </div>

        {/* Grid Container - flex-1을 사용하여 남은 공간을 차지하도록 합니다 */}
        <div className="flex-1 flex items-center justify-center mb-16">
          <div 
            className="grid grid-cols-3 gap-8" 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 200px))', // 각 아이템의 최대 너비 제한
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="aspect-[4/3]"> {/* 4:3 비율로 수정 */}
                <DraggableBox item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer - 하단에 고정되도록 수정 */}
        <div className="flex justify-center items-center space-x-16 text-white ps2-text">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 text-lg">×</div>
            <span>Enter</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 text-lg">○</div>
            <span>Back</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 text-lg">△</div>
            <span>Options</span>
          </div>
        </div>
      </div>
    </div>
  )
}
function DraggableBox({ item }: { item: MenuItem }) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [origin, setOrigin] = useState<Position>({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - origin.x
      const dy = e.clientY - origin.y
      setPosition({ x: dx, y: dy })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, origin])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setOrigin({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full cursor-move ps2-icon"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-lg">
        <img
          src={item.gifUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-2 text-center text-sm text-white border-t border-white/10 ps2-text">
          {item.title}
        </div>
      </div>
    </div>
  )
}