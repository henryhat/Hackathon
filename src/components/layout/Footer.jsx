import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="font-display text-ivory text-sm">BHD</span>
              </div>
              <span className="font-display text-xl text-ivory">Auctions</span>
            </Link>
            <p className="text-sm leading-relaxed text-ivory/50 max-w-xs">
              Africa's premier marketplace for authenticated antiques, sacred objects, and contemporary works of cultural significance.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Marketplace',
              links: ['Browse Auctions', 'Collections', 'Featured Artists', 'Recently Sold', 'Price Guide'],
            },
            {
              title: 'Sellers',
              links: ['Sell an Item', 'Authentication', 'Shipping Guide', 'Seller Fees', 'Verification'],
            },
            {
              title: 'Company',
              links: ['About BHD Auctions', 'Blog', 'Press', 'Careers', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="section-label text-ivory/40 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-ivory/50 hover:text-ivory transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-ivory/30">
          <p>© 2025 BHD Auctions Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-ivory/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-ivory/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-ivory/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
