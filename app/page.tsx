'use client'

import Image from 'next/image'
import Navigation from './components/Navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

type ScreenSize = 'mobile' | 'tablet' | 'desktop'

const sectionContent = {
  default: {
    images: {
      left: '/sections/default-1.jpg',
      right: '/sections/default-2.jpg'
    },
    alt: {
      left: 'Premium coffee beans',
      right: 'Coffee shop interior'
    },
    title: 'Premium Coffee Experience',
    description: 'Discover the art of coffee crafting'
  },
  about: {
    images: {
      left: '/sections/about-1.jpg',
      right: '/sections/about-2.jpg'
    },
    alt: {
      left: 'Coffee Shop History',
      right: 'Our Coffee Journey'
    },
    title: 'Our Story',
    description: 'A journey that began with a simple love for coffee, growing into a community of passionate coffee lovers and expert baristas.'
  },
  roastery: {
    images: {
      left: '/sections/roastery-1.jpg',
      right: '/sections/roastery-2.jpg'
    },
    alt: {
      left: 'Coffee Roasting Process',
      right: 'Fresh Roasted Beans'
    },
    title: 'The Roastery',
    description: 'Where science meets art in the pursuit of the perfect roast.'
  },
  locations: {
    images: {
      left: '/sections/locations-1.jpg',
      right: '/sections/locations-2.jpg'
    },
    alt: {
      left: 'Coffee Shop Locations',
      right: 'Visit Our Shops'
    },
    title: 'Our Locations',
    description: 'Find your nearest coffee sanctuary.'
  },
  eshop: {
    images: {
      left: '/sections/eshop-1.jpg',
      right: '/sections/eshop-2.jpg'
    },
    alt: {
      left: 'Coffee Products',
      right: 'Online Shopping'
    },
    title: 'E-Shop',
    description: 'Bring our premium coffee experience to your home.'
  },
  contact: {
    images: {
      left: '/sections/contact-1.jpg',
      right: '/sections/contact-2.jpg'
    },
    alt: {
      left: 'Contact Us',
      right: 'Get in Touch'
    },
    title: 'Contact',
    description: 'Let\'s start a conversation over coffee.'
  }
} as const

export default function Home() {
  const [currentSection, setCurrentSection] = useState('default')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop')
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize('mobile')
      else if (width < 1024) setScreenSize('tablet')
      else setScreenSize('desktop')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardNav(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardNav(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  useEffect(() => {
    const preloadImages = async () => {
      if (typeof window === 'undefined') return

      const imageUrls = Object.values(sectionContent).flatMap(section => 
        [section.images.left, section.images.right]
      )

      try {
        await Promise.all(
          imageUrls.map(url => {
            return new Promise((resolve, reject) => {
              const img = document.createElement('img')
              img.src = url
              img.onload = resolve
              img.onerror = reject
            })
          })
        )
        setImagesLoaded(true)
      } catch (error) {
        console.error('Error preloading images:', error)
        setImagesLoaded(true) // Continue anyway to not block the user
      }
    }

    preloadImages()
  }, [])

  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
  }

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
          role="status"
          aria-label="Loading content"
        >
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading experience...</p>
        </motion.div>
      </div>
    )
  }

  const content = sectionContent[currentSection as keyof typeof sectionContent]

  return (
    <main 
      className="flex min-h-screen relative bg-white"
      role="main"
    >
      {/* Left Image */}
      <motion.div 
        className="w-1/2 h-screen relative"
        initial={false}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-left`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={content.images.left}
              alt={content.alt.left}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Centered Navigation */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 bg-white px-16 py-12 flex items-center z-10"
        style={{ width: '300px' }}
        initial={false}
        animate={{ opacity: 1 }}
      >
        <Navigation 
          onSectionChange={handleSectionChange} 
          screenSize={screenSize} 
        />
      </motion.div>

      {/* Right Image */}
      <motion.div 
        className="w-1/2 h-screen relative"
        initial={false}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-right`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={content.images.right}
              alt={content.alt.right}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"
              aria-hidden="true"
            />
            {/* Text Overlay - Only show if not default section */}
            {currentSection !== 'default' && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center"
                role="region"
                aria-label={`${currentSection} section content`}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl font-bold mb-4 text-shadow-lg"
                >
                  {content.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="max-w-md text-lg text-shadow"
                >
                  {content.description}
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  )
} 