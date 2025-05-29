'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Mail, Globe, Menu, X } from 'lucide-react';
import MailingList from '@/components/MailingList';
import Image from 'next/image';

export default function TuringHouseLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  const people = [
    {
      "name": "Allen Chau",
      "link": "https://www.linkedin.com/in/allen-chau-41342a1b6//",
      "image": "/profile/allen.jpeg",
      "location": "Dallas, TX",
      "bullets": [
        "Junior at Stanford majoring in computer science",
        "Building agents for enterprise sales this summer",
        "Researching reasoning with LLMs + RL at Stanford Hazy Lab"
      ]
    },
    {
      "name": "Dhruv Deshmukh",
      "link": "https://www.linkedin.com/in/dhruv-deshmukh-usc/",
      "image": "/profile/dhruv.jpeg",
      "location": "Singapore, Singapore",
      "bullets": [
        "Freshman CS + Business @USC",
        "Building Veyra Health, a medical bill disputing service that detects errors and negotiates for patients",
        "$35K in funding, Backed by Ben Taft of Genius Ventures ($10K)"
      ]
    },
    {
      "name": "Ismael Duran",
      "link": "https://www.linkedin.com/in/ismael-arechiga-duran/",
      "image": "/profile/ismael.png",
      "location": "San Antonio, TX",
      "bullets": [
        "Sophomore at Stanford majoring in CS",
        "Form-filling automation in the healthcare space",
        "Interned at Amazon Lab126 last summer where I developed a spec that will be used in Amazon's EchoBuds"
      ]
    },
    {
      "name": "Darrow Hartman",
      "link": "https://www.linkedin.com/in/darrow-hartman/",
      "image": "/profile/darrow.jpeg",
      "location": "Seattle, WA",
      "bullets": [
        "Sophomore at Stanford majoring in computer science",
        "Building daily AI podcasts for professionals this summer",
        "Interned at Promoted AI (Acq. Dropbox) where I developed production RAG products"
      ]
    },
    {
      "name": "Jet Jadeja",
      "link": "https://www.linkedin.com/in/jet-jadeja-2a4023247/",
      "image": "/profile/jet.jpeg",
      "location": "Santa Monica, CA",
      "bullets": [
        "Freshman at USC majoring in entrepreneurship",
        "1st employee at Rari Capital (acq for 360m)",
        "Early eng Pentagon (acq FTX)",
        "Built Huff, 3rd largest smart contract programming language in the Ethereum ecosystem"
      ]
    },
    {
      "name": "Makar Kuznietsov",
      "link": "https://www.linkedin.com/in/makar-kuznietsov/",
      "image": "/profile/makar.jpeg",
      "location": "Lviv, Ukraine",
      "bullets": [
        "Senior at MIT majoring in electrical engineering",
        "Building Cursor for performance engineering in embedded systems",
        "Interned at Nvidia where I did GPU design"
      ]
    },
    {
      "name": "Christian Stiker",
      "link": "https://www.linkedin.com/in/cstiker/",
      "image": "/profile/christian.jpeg",
      "location": "New York, NY",
      "bullets": [
        "Freshman at the USC Iovine and Young Academy majoring in arts, tech, and business",
        "Leading growth at AfterQuery, a YC-backed data lab for foundational models",
        "Built a $250K marketing agency in high school"
      ]
    },
    {
      "name": "Hristo Todorov",
      "link": "https://www.linkedin.com/in/hristo-todorov26/",
      "image": "/profile/hristo.jpeg",
      "location": "Bulgaria",
      "bullets": [
        "Junior at Stanford studying Math & Classics.",
        "Building agents for logistics payment this summer.",
        "Personal project on cryptography.",
        "Paper published at ICML recently."
      ]
    },
    {
      "name": "Cooper Weisman",
      "link": "https://www.linkedin.com/in/cooperweisman/",
      "image": "/profile/cooper.jpeg",
      "location": "Palm Beach, FL",
      "bullets": [
        "Stanford sophomore studying Computer Science",
        "Focused on building technology for the construction industry",
        "Former Growth Equity Analyst Intern at Bregal Sagemount"
      ]
    }
  ].sort((a, b) => a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]));

  useEffect(() => {
    // Generate stars only on client side
    const generatedStars = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
    setStars(generatedStars);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/5 via-white to-[#8C1515]/5" />
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration
              }}
            >
              <div className="w-1 h-1 bg-[#8C1515]/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-[#8C1515]">
              Turing House
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Members', 'Newsletter'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-[#8C1515] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-[#8C1515]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {['Members', 'Newsletter'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#8C1515] hover:bg-[#8C1515]/5 rounded transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Turing House
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
            We&apos;re a group of ambitious young founders building the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <div className="w-full max-w-md">
              <form onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                }).then(() => {
                  (e.target as HTMLFormElement).reset();
                  alert('Thanks for subscribing!');
                }).catch(() => {
                  alert('Something went wrong. Please try again.');
                });
              }} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#8C1515] text-gray-900 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#8C1515] text-white rounded-lg font-semibold hover:bg-[#8C1515]/90 transform hover:scale-105 transition-all"
                >
                  Join Us
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown size={32} className="text-[#8C1515]" />
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">What We&apos;re About</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-12 h-12" />,
                title: "Build Together",
                description: "Collaborate on cutting-edge projects with talented developers, designers, and entrepreneurs"
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Live Together",
                description: "Share a space designed for productivity, creativity, and meaningful connections"
              },
              {
                icon: <Rocket className="w-12 h-12" />,
                title: "Grow Together",
                description: "Level up your skills through workshops, mentorship, and hands-on experience"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#8C1515] transition-all hover:transform hover:scale-105 shadow-sm"
              >
                <div className="text-[#8C1515] mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Community Section */}
      {/* <section id="community" className="py-20 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Community</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-6">A Diverse Group of Builders</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">▸</span>
                  <span>Software engineers working on AI, blockchain, and web3</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">▸</span>
                  <span>Designers creating the next generation of user experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">▸</span>
                  <span>Entrepreneurs building startups that matter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">▸</span>
                  <span>Researchers pushing the boundaries of technology</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Members Section */}
      <section id="members" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Meet Our Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((person, index) => (
              <a
                key={index}
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#8C1515] transition-all hover:transform hover:scale-105 cursor-pointer shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{person.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {person.location}
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {person.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="text-gray-600 text-sm flex items-start">
                      <span className="text-[#8C1515] mr-2">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mailing List Section */}
      <section id="newsletter" className="py-20 px-6">
        <MailingList />
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-[#8C1515] mb-2">
                Turing House
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex space-x-6">
              {/* <a href="#" className="text-gray-500 hover:text-[#8C1515] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#8C1515] transition-colors">
                <Github className="w-6 h-6" />
              </a> */}
              {/* <a href="https://x.com/turing_house" className="text-gray-500 hover:text-[#8C1515] transition-colors">
                <X className="w-6 h-6" />
              </a> */}
              <a href="mailto:house@turingsf.com" className="text-gray-500 hover:text-[#8C1515] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://turingsf.com" className="text-gray-500 hover:text-[#8C1515] transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2025 Turing House. Reach out at house@turingsf.com!
          </div>
        </div>
      </footer>


    </div>
  );
}