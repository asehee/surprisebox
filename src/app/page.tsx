'use client'
import dynamic from 'next/dynamic'
import Loading from '@/components/ui/Loading'

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => <Loading />
})

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Scene />
    </main>
  )
}