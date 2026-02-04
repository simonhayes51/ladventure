import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-white border-t-4 border-primary py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white uppercase font-display">
              Ladventure
            </Link>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed font-medium">
              Custom weekend trip planning for UK groups. We handle the details, you enjoy the adventure.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-secondary mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300 font-medium">
              <li><Link href="/#about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/#pricing" className="hover:text-secondary transition-colors">Pricing</Link></li>
              <li><Link href="/#contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-secondary mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300 font-medium">
              <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-secondary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-secondary mb-4 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300 font-medium">
              <li><a href="/" className="hover:text-secondary transition-colors">Instagram</a></li>
              <li><a href="/" className="hover:text-secondary transition-colors">Twitter</a></li>
              <li><a href="mailto:hello@ladventure.co.uk" className="hover:text-secondary transition-colors">hello@ladventure.co.uk</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Ladventure. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
