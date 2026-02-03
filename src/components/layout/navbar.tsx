"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [logoError, setLogoError] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: "#what-we-do", label: "What We Do" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#examples", label: "Examples" },
    { href: "#pricing", label: "Pricing" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 flex items-center">
               {!logoError ? (
                 <img 
                   src="/logo.png" 
                   alt="Ladventure" 
                   className="h-full w-auto object-contain"
                   onError={() => setLogoError(true)}
                 />
               ) : (
                 <span className="text-3xl font-display text-primary retro-text-shadow uppercase tracking-wider">
                   Ladventure
                 </span>
               )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#pricing" className={cn(buttonVariants({ size: "sm" }))}>
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground border-2 border-transparent hover:border-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-b-2 border-foreground">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-base font-bold uppercase text-foreground hover:text-primary hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="#pricing" className={cn(buttonVariants({ className: "w-full" }))} onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
