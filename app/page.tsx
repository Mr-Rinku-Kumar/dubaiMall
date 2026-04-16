'use client'

import Hero from '@/components/hero/Hero'
import Why from '@/components/sections/Why'
import Retail from '@/components/sections/Retail'
import Luxury from '@/components/sections/Luxury'
import Dining from '@/components/sections/Dining'
import Entertainment from '@/components/sections/Entertainment'
import Events from '@/components/sections/Events'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Retail />
      <Luxury />
      <Dining />
      <Entertainment />
      <Events />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}