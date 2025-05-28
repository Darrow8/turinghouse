'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Code, Users, Rocket, Calendar, MapPin, Mail, Github, Twitter, Globe, Menu, X } from 'lucide-react';
import MailingList from '@/components/MailingList';

export default function HackerHouseLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<Array<{left: string; top: string; delay: string; duration: string}>>([]);

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
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
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              HackerHouse
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Community', 'Apply', 'Events'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {['About', 'Community', 'Apply', 'Events'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-all"
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
            Build the Future,
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            A community of builders, hackers, and dreamers creating the next generation of technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button
              onClick={() => scrollToSection('apply')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all"
            >
              Apply Now
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What We&apos;re About</h2>
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
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-purple-600/50 transition-all hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-6 bg-gradient-to-b from-black to-purple-900/10">
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
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Join?</h2>
          <p className="text-xl text-gray-300 mb-12">
            We&apos;re looking for passionate builders who want to create impact and be part of something bigger
          </p>
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Application Process</h3>
            <ol className="text-left space-y-4 mb-8 max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-3">1.</span>
                <span>Submit your application with portfolio and projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-3">2.</span>
                <span>Video interview with our community team</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-3">3.</span>
                <span>Meet the current residents (virtual or in-person)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-3">4.</span>
                <span>Welcome to the community!</span>
              </li>
            </ol>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all">
              Start Application
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-6 bg-gradient-to-t from-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Hackathon", date: "June 15-16", type: "Hackathon" },
              { title: "Founder Fireside Chat", date: "June 20", type: "Talk" },
              { title: "Web3 Workshop", date: "June 25", type: "Workshop" },
              { title: "Demo Day", date: "July 1", type: "Showcase" },
              { title: "Community BBQ", date: "July 4", type: "Social" },
              { title: "Tech Talk Tuesday", date: "Weekly", type: "Series" }
            ].map((event, index) => (
              <div
                key={index}
                className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-purple-600/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mailing List Section */}
      <section className="py-20 px-6">
        <MailingList />
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                HackerHouse
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2024 HackerHouse. Building the future, one hack at a time.
          </div>
        </div>
      </footer>


    </div>
  );
}