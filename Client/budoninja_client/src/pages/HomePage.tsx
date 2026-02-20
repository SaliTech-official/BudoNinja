import React from 'react'
import { HeroSection } from '../components/Public/Home/HeroSection'
import { AboutStatsSection } from '../components/Public/Home/AboutStatsSection'
import { NewsSection } from '../components/Public/Home/NewsSection'
import { MapSection } from '../components/Public/Home/MapSection'
import { CtaSection } from '../components/Public/Home/CtaSection'

export default function HomePage() {
  return (
    <div>
        <HeroSection />
        <AboutStatsSection />
        <NewsSection />
        <MapSection />
        <CtaSection />
    </div>
  )
}
