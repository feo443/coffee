import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, KeyboardEvent } from 'react'

type ScreenSize = 'mobile' | 'tablet' | 'desktop'

interface NavigationProps {
  onSectionChange: (section: string) => void
  screenSize: ScreenSize
}

const menuItems = [
  { href: '#about', label: 'ABOUT' },
  { href: '#roastery', label: 'ROASTERY' },
  { href: '#locations', label: 'LOCATIONS' },
  { href: '#eshop', label: 'ESHOP' },
  { href: '#contact', label: 'CONTACT' },
]

export default function Navigation({ onSectionChange, screenSize }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const isMobile = screenSize === 'mobile'
  const isTablet = screenSize === 'tablet'
  const isDesktop = screenSize === 'desktop'

  const handleInteraction = (href: string) => {
    const section = href.substring(1)
    setActiveSection(section)
    onSectionChange(section)
  }

  const handleKeyDown = (e: KeyboardEvent, index?: number) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setFocusIndex(prev => (prev <= 0 ? menuItems.length - 1 : prev - 1))
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusIndex(prev => (prev >= menuItems.length - 1 ? 0 : prev + 1))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (index !== undefined) {
          handleInteraction(menuItems[index].href)
        }
        break
      case 'Escape':
        e.preventDefault()
        handleInteraction('#default')
        setFocusIndex(-1)
        break
    }
  }

  // Manejar focus cuando cambia el índice
  useEffect(() => {
    const elements = document.querySelectorAll('[role="menuitem"]')
    if (focusIndex >= 0 && elements[focusIndex]) {
      (elements[focusIndex] as HTMLElement).focus()
    }
  }, [focusIndex])

  return (
    <nav 
      className="flex flex-col justify-center items-center h-full w-full" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg"
          onClick={() => handleInteraction('#default')}
          onMouseEnter={() => isDesktop && handleInteraction('#default')}
          onKeyDown={(e) => handleKeyDown(e)}
          tabIndex={0}
          role="button"
          aria-label="Return to home section"
        >
          <Image
            src="/logo.svg"
            alt="Coffee Premium Logo"
            width={isMobile ? 60 : 80}
            height={isMobile ? 30 : 40}
            className={`${isMobile ? 'mb-8' : 'mb-16'} hover:opacity-80 transition-opacity`}
          />
        </motion.div>
      </motion.div>
      
      <ul 
        className={`space-y-4 text-center ${isMobile ? 'space-y-2' : ''}`}
        role="menu"
        onKeyDown={handleKeyDown}
      >
        {menuItems.map((item, index) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: activeSection === item.href.substring(1) ? 1 : 0.95
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => !isDesktop && handleInteraction(item.href)}
            onMouseEnter={() => isDesktop && handleInteraction(item.href)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`py-2 ${isMobile ? 'py-1' : ''} ${!isDesktop ? 'cursor-pointer' : ''}`}
            tabIndex={0}
            role="menuitem"
            aria-current={activeSection === item.href.substring(1)}
          >
            <span
              className={`nav-link transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg px-2
                ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg'}
                ${activeSection === item.href.substring(1) ? 'active' : ''}
              `}
            >
              {item.label}
            </span>
          </motion.li>
        ))}
      </ul>
      
      <motion.div
        className={`text-center ${isMobile ? 'mt-6' : 'mt-12'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div 
          className={`${isMobile ? 'mt-2' : 'mt-4'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg p-1"
            aria-label="Visit our Instagram page"
          >
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </a>
        </motion.div>
      </motion.div>
    </nav>
  )
} 