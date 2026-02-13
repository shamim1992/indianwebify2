import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  BookOpen,
  Home,
  Users,
  Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const menuItems = [
    { title: "Home", icon: <Home className="h-4 w-4" />, href: "/" },
    {
      title: "Services",
      icon: <BookOpen className="h-4 w-4" />,
      submenu: [
        { title: "Website Development", href: "/services/website-development" },
        { title: "App Development", href: "/services/app-development" },
        { title: "AI Development", href: "/services/ai-development" },
        { title: "Research Projects", href: "/services/research-projects" },
        { title: "Digital Marketing", href: "/services/digital-marketing" },
        { title: "Other Services", href: "/services/other-services" },
      ],
    },
    { title: "Portfolio", icon: <Building2 className="h-4 w-4" />, href: "/portfolio" },
    { title: "About", icon: <Users className="h-4 w-4" />, href: "/about" },
    { title: "Contact", icon: <Phone className="h-4 w-4" />, href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 shadow w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white backdrop-blur-md"
      }`}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:p-4 focus:bg-[#6d123f] focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Bar */}
      <div className="bg-[#6d123f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden sm:flex items-center space-x-6">
              <a href="tel:+919856876212" className="flex items-center gap-1 hover:text-white/80 transition-colors" aria-label="Contact phone number">
                <Phone className="h-3 w-3" aria-hidden="true" />
                <span>+91 9856876212</span>
              </a>
              <a href="mailto:info@indianwebify.com" className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <Mail className="h-3 w-3" aria-hidden="true" />
                <span>info@indianwebify.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="hover:text-white/80 transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white/80 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`max-w-7xl mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-2"}`} role="navigation">
        <div className="flex items-center justify-between">
          {/* Logo - using Next.js Image instead of <img> */}
          <Link href="/" className="flex items-center gap-3" aria-label="Indian Webify - Home">
            <div className="relative w-44 h-12">
              <Image
                src="/logos/logo2.png"
                alt="Indian Webify logo"
                fill
                className="object-contain"
                sizes="176px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.submenu ? (
                  <button
                    className="flex items-center font-bold gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#6d123f] transition-all"
                    aria-expanded={hoveredItem === item.title}
                    aria-haspopup="true"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${hoveredItem === item.title ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link href={item.href} className="flex items-center font-bold gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#6d123f] transition-all">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}

                {/* Dropdown - CSS animated */}
                {item.submenu && hoveredItem === item.title && (
                  <div className="absolute top-full left-0 w-64 font-bold bg-white rounded-lg shadow-lg py-2 border border-gray-100 animate-fade-in-down" style={{ transformOrigin: "top center" }}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex items-center px-4 py-2 font-bold text-gray-700 hover:bg-gray-50 hover:text-[#6d123f] transition-colors"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/contact" className="ml-4 px-6 py-2 bg-[#e6961d] text-white rounded-full hover:bg-[#6d123f]/90 transition-all hover:scale-105 duration-300">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[60] animate-fade-in"
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div
            className="fixed top-0 right-0 h-screen w-[320px] bg-white z-[70] animate-slide-in-right"
            style={{ height: "100dvh" }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="p-6 space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.title} className="w-full">
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => setActiveSubmenu(activeSubmenu === item.title ? null : item.title)}
                            className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-expanded={activeSubmenu === item.title}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeSubmenu === item.title ? "rotate-180" : ""}`} />
                          </button>

                          <div className={`accordion-content ${activeSubmenu === item.title ? 'open' : ''} rounded-lg mt-1`}>
                            <div className="p-2 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="block p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#6d123f] transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="w-full flex items-center gap-2 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <a href="tel:+919856876212" className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>+91 9856876212</span>
                    </a>
                    <a href="mailto:info@indianwebify.com" className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>info@indianwebify.com</span>
                    </a>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-[#e6961d] text-white rounded-full hover:bg-[#6d123f] transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
