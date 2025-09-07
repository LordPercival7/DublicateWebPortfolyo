import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/LordPercivall', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/burakgokcek7/', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:burakgke15@gmail.com', label: 'Email' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold mb-4">
              <span className="text-blue-400">B</span>urak<span className="text-green-400">G</span>ökçek
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Electronics & Embedded Systems Engineer passionate about creating innovative 
              solutions in antenna design, embedded systems, and RF engineering. Specializing in 
              microstrip antennas, beam steering algorithms, and microcontroller programming.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transform hover:scale-110 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Specializations</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Antenna Design & Simulation</li>
              <li>Embedded Programming</li>
              <li>PCB Design & Production</li>
              <li>Microstrip Antennas</li>
              <li>Beam Steering Algorithms</li>
              <li>STM32 & MSP430</li>
              <li>CST Studio Suite</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>© {currentYear} Burak Gökçek. Made with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500" />
              <span>and cutting-edge technology.</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-full hover:from-blue-700 hover:to-green-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};