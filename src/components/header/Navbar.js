import React, { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  BookOpen,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      title: "Services",
      icon: <BookOpen className="h-4 w-4" />,
      submenu: [
        {title: "Website Development",href: "/academics/islamic-studies"},
        { title: "App Development", href: "/academics/hafiz-program" },
        { title: "Digital Marketing", href: "/academics/arabic-language" },
        { title: "Other Services", href: "/academics/quran-studies" },
        // { title: "Hadith Studies", href: "/academics/hadith-studies" },
        // { title: "Faculty & Staff", href: "/academics/faculty" },
      ],
    },
    {
      title: "Admissions",
      icon: <GraduationCap className="h-4 w-4" />,
      submenu: [
        { title: "Admission Process", href: "/admissions/process" },
        { title: "Requirements", href: "/admissions/requirements" },
        { title: "Scholarships", href: "/admissions/scholarships" },
        { title: "Application Forms", href: "/admissions/apply" },
        { title: "Academic Calendar", href: "/admissions/calendar" },
      ],
    },
    {
      title: "Campus Life",
      icon: <Building2 className="h-4 w-4" />,
      submenu: [
        { title: "Hostel Facilities", href: "/campus/hostel" },
        { title: "Masjid", href: "/campus/masjid" },
        { title: "Library", href: "/campus/library" },
        { title: "Student Activities", href: "/campus/activities" },
        { title: "Campus Rules", href: "/campus/rules" },
      ],
    },
    {
      title: "About",
      icon: <Users className="h-4 w-4" />,
      href: "/about",
    },
  ];

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        staggerChildren: 0,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <header
      className={`fixed shadow w-full z-50 transition-all duration-300 mb-24 ${
        isScrolled ? "bg-white shadow-md" : "bg-white backdrop-blur-md"
      }`}
      role="banner"
    >
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:p-4 focus:bg-blue-600 focus:text-white"
      >
        Skip to main content
      </a>
      {/* Top Bar */}
      <div className="bg-[#6d123f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Left Section */}
            <div className="hidden sm:flex items-center space-x-6">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-1 hover:text-white/80 transition-colors"
                aria-label="Contact phone number"
              >
                <Phone className="h-3 w-3" aria-hidden="true" />
                <span>+1234567890</span>
              </a>
              <a
                href="mailto:info@jamiaassam.com"
                className="flex items-center gap-1 hover:text-white/80 transition-colors"
              >
                <Mail className="h-3 w-3" aria-hidden="true" />
                <span>info@indianwebify.com</span>
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <Link
                href="/portal/student"
                className="hover:text-white/80 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/portal/faculty"
                className="hover:text-white/80 transition-colors"
              >
                About Us
              </Link>
              {/* <Link
                href="/alumni"
                className="hover:text-white/80 transition-colors"
              >
                Login
              </Link> */}
              <Link
                href="/contact"
                className="hover:text-white/80 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <nav
        className={`max-w-7xl mx-auto px-4 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-2"
        }`}
        role="navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Jamia Assam - Home"
          >
            <div className="relative w-44">
              <img
                src="/logos/logo2.png"
                alt="logo"
                className="object-contain"
              />
            </div>
            {/* <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Indian
              </h1>
              <p className="text-xs text-gray-600">Webify</p>
            </div> */}
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
                    className="flex items-center font-bold gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#004aad] transition-all"
                    aria-expanded={hoveredItem === item.title}
                    aria-haspopup="true"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        hoveredItem === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center font-bold gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#004aad] transition-all"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}

                {/* Animated Dropdown */}
                {item.submenu && (
                  <AnimatePresence>
                    {hoveredItem === item.title && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute top-full left-0 w-64 font-bold bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                        style={{ transformOrigin: "top center" }}
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.div
                            key={subItem.title}
                            variants={itemVariants}
                            custom={index}
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-center px-4 py-2 font-bold text-gray-700 hover:bg-gray-50 hover:text-[#6d123f] transition-colors"
                            >
                              <span className="relative">
                                <span className="relative z-10">
                                  {subItem.title}
                                </span>
                                <motion.span
                                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#004aad]"
                                  initial={{ width: 0 }}
                                  whileHover={{ width: "100%" }}
                                  transition={{ duration: 0.3 }}
                                />
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Apply Now Button */}
            <Link
              href="/admissions/apply"
              className="ml-4 px-6 py-2 bg-[#e6961d] text-white rounded-full hover:bg-[#6d123f]/90 transition-all hover:scale-105 duration-300"
            >
              Quotation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              aria-hidden="true"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-[320px] bg-white z-50"
              style={{ height: "100dvh" }} // Using dynamic viewport height
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Menu Content - Scrollable Area */}
                <div className="flex-1 overflow-y-auto">
                  <nav className="p-6 space-y-2">
                    {menuItems.map((item) => (
                      <div key={item.title} className="w-full">
                        {item.submenu ? (
                          <>
                            <button
                              onClick={() =>
                                setActiveSubmenu(
                                  activeSubmenu === item.title
                                    ? null
                                    : item.title
                                )
                              }
                              className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                              aria-expanded={activeSubmenu === item.title}
                            >
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.title}</span>
                              </div>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  activeSubmenu === item.title
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {activeSubmenu === item.title && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden  rounded-lg mt-1"
                                >
                                  <div className="p-2 space-y-1">
                                    {item.submenu.map((subItem, index) => (
                                      <motion.div
                                        key={subItem.title}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{
                                          duration: 0.2,
                                          delay: index * 0.05,
                                        }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          className="block p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#004aad] transition-colors"
                                          onClick={() =>
                                            setIsMobileMenuOpen(false)
                                          }
                                        >
                                          {subItem.title}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
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

                {/* Menu Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/portal/student"
                        className="text-sm text-gray-600 hover:text-[#004aad] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Student Portal
                      </Link>
                      <Link
                        href="/portal/faculty"
                        className="text-sm text-gray-600 hover:text-[#004aad] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Faculty Portal
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <a
                        href="tel:+1234567890"
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Phone className="h-4 w-4" />
                        <span>+1234567890</span>
                      </a>
                      <a
                        href="mailto:info@jamiaassam.com"
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Mail className="h-4 w-4" />
                        <span>info@jamiaassam.com</span>
                      </a>
                    </div>

                    <Link
                      href="/admissions/apply"
                      className="block w-full text-center px-6 py-3 bg-[#004aad] text-white rounded-full hover:bg-[#004aad]/90 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Announcement Banner */}
      {/* <div className="bg-[#004aad]/10 text-[#004aad] px-4 py-2 text-center text-sm">
        <p>
          Admissions open for 2024-25 Academic Year.{" "}
          <Link href="/admissions/apply" className="underline font-medium">
            Apply Now
          </Link>
        </p>
      </div> */}
    </header>
  );
};

export default Navbar;
