import React from 'react'
import { HeroSection } from '../components/Public/Home/HeroSection'
import { AboutStatsSection } from '../components/Public/Home/AboutStatsSection'
import { NewsSection } from '../components/Public/Home/NewsSection'

export default function HomePage() {
  return (
    <div>
        <HeroSection />
        <AboutStatsSection />
        <NewsSection />
    </div>
  )
}
