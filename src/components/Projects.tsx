import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import arkaPerspektif from '../assets/2.4Ghz Antenna/arka_persfektif.png';
import onYuz from '../assets/2.4Ghz Antenna/On_Yuz.png';
import onBaski from '../assets/2.4Ghz Antenna/On_Baski.jpg';
import arkaBaski from '../assets/2.4Ghz Antenna/Arka_baski.jpg';
import s11 from '../assets/2.4Ghz Antenna/S1,1.png';
import farfield from '../assets/2.4Ghz Antenna/Farfield.png';
import AltiumDevreSema from '../assets/DC Guc Kaynak/Altium_Devre_Sema.png';
import AltiumPcb from '../assets/DC Guc Kaynak/Altium_pcb.png';
import DcMultisimDevre from '../assets/DC Guc Kaynak/Dc_Multisim_Devre.png';
import DCBaskiOn from '../assets/DC Guc Kaynak/DCBaski_on.png';
import OlcumDC from '../assets/DC Guc Kaynak/OlcumDC.png';
import Regulator from '../assets/DC Guc Kaynak/Regulator.png';
import DpotAltiumPCB from '../assets/Pmod Dpot/Dpot_Altium_PCB.png';
import DpotAltiumSema from '../assets/Pmod Dpot/Dpot_Altium_Sema.png';
import DpotBaski from '../assets/Pmod Dpot/Dpot_Baski.png';
import DpotDizgisizBaski from '../assets/Pmod Dpot/Dpot_Dizgisiz_Baski.png';
import ComplexAnaArayuz from '../assets/Complex Convert/Complex_AnaArayuz.png';
import ComplexArayuz from '../assets/Complex Convert/Complex_Arayuz.png';
import ComplexKod from '../assets/Complex Convert/Complex_Kod.png';
import MSP430AltiumPCB from '../assets/MSP430/MSP430_Altium_PCB.png';
import MSP430AltiumSema from '../assets/MSP430/MSP430_Altium_Sema.png';
import MSP430Baski from '../assets/MSP430/MSP430_baski.png';
import MSP430DizgisizBaski from '../assets/MSP430/MSP430_Dizgisiz_baski.png';
import MSP430Kod from '../assets/MSP430/MSP430_Kod.png';
import SESAltiumPcb from '../assets/SES DC/SES_Altium_pcb.png';
import SESAltiumSema from '../assets/SES DC/SES_Altium_Sema.png';
import SESBaski from '../assets/SES DC/SES_Baski.jpg';
import SESDizgisizBaski from '../assets/SES DC/SES_Dizgisiz_Baski.png';
import SESMultisimSema from '../assets/SES DC/SES_Multisim_Sema.png';
import STM32IdeArayuz from '../assets/Stm32Sayac/STM32_ide_arayuz.png';
import STM32IdeKod from '../assets/Stm32Sayac/STM32_ide_kod.png';
import STM32Uygulama from '../assets/Stm32Sayac/STM32_uygulamapng.png';
import Array4x4 from '../assets/Array Antenna/4x4_0775_01.gif';
import ArrayPoster from '../assets/Array Antenna/Array_Poster.png';
import ArraySon1 from '../assets/Array Antenna/Array_son1.gif';
import LibraryPatch from '../assets/Array Antenna/libraryPatch Antenna Array_01.gif';
import Pattern1 from '../assets/Array Antenna/pattern1.png';

interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(t('common.all'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      id: 'dc-power-supply',
      title: t('projects.dcPowerSupply.title'),
      category: t('projects.pcb'),
      technologies: ['Altium Designer (PCB design)', 'Multisim (circuit simulation)', 'Analog Circuit Design', 'Power Electronics'],
      description: t('projects.dcPowerSupply.description'),
      features: t('projects.dcPowerSupply.features'),
      image: DcMultisimDevre,
      gallery: [
        DcMultisimDevre,
        Regulator,
        AltiumDevreSema,
        AltiumPcb,
        DCBaskiOn,
        OlcumDC
      ]
    },
    {
      id: 'digital-potentiometer',
      title: t('projects.digitalPotentiometer.title'),
      category: t('projects.pcb'),
      technologies: ['Altium Designer', 'PCB Design', 'Digital & Power Electronics'],
      description: t('projects.digitalPotentiometer.description'),
      features: t('projects.digitalPotentiometer.features'),
      image: DpotAltiumPCB,
      gallery: [
        DpotAltiumPCB,
        DpotAltiumSema,
        DpotDizgisizBaski,
        DpotBaski
      ]
    },
    {
      id: 'complex-number-app',
      title: t('projects.complexNumberApp.title'),
      category: t('projects.software'),
      technologies: ['MATLAB App Designer', 'GUI Development', 'Mathematical Modeling'],
      description: t('projects.complexNumberApp.description'),
      features: t('projects.complexNumberApp.features'),
      image: ComplexAnaArayuz,
      gallery: [
        ComplexArayuz,
        ComplexAnaArayuz,
        ComplexKod
      ]
    },
    {
      id: 'msp430-disco-lights',
      title: t('projects.msp430DiscoLights.title'),
      category: t('projects.embedded'),
      technologies: ['MSP430 Microcontroller', 'Altium Designer', 'Audio Processing', 'C Programming', 'IAR Embedded Workbench', 'Analog Circuit Design'],
      description: t('projects.msp430DiscoLights.description'),
      features: t('projects.msp430DiscoLights.features'),
      image: MSP430AltiumPCB,
      gallery: [
        MSP430AltiumPCB,
        MSP430AltiumSema,
        MSP430DizgisizBaski,
        MSP430Baski,
        MSP430Kod
      ]
    },
    {
      id: 'stm32-oled-counter',
      title: t('projects.stm32OledCounter.title'),
      category: t('projects.embedded'),
      technologies: ['STM32', 'C/C++', 'OLED Display', 'Timer Functions'],
      description: t('projects.stm32OledCounter.description'),
      features: t('projects.stm32OledCounter.features'),
      image: STM32IdeArayuz,
      gallery: [
        STM32IdeArayuz,
        STM32IdeKod,
        STM32Uygulama
      ]
    },
    {
      id: 'voice-controlled-motor',
      title: t('projects.voiceControlledMotor.title'),
      category: t('projects.pcb'),
      technologies: ['Multisim', 'Altium Designer', 'Analog Circuit Design', 'Control Algorithms'],
      description: t('projects.voiceControlledMotor.description'),
      features: t('projects.voiceControlledMotor.features'),
      image: SESAltiumPcb,
      gallery: [
        SESAltiumPcb,
        SESBaski,
        SESAltiumSema,
        SESDizgisizBaski,
        SESMultisimSema
      ]
    },
    {
      id: 'microstrip-antenna',
      title: t('projects.microstripAntenna.title'),
      category: t('projects.antenna'),
      technologies: ['CST Studio Suite', 'RF Design', 'Microstrip Technology'],
      description: t('projects.microstripAntenna.description'),
      features: t('projects.microstripAntenna.features'),
      image: arkaPerspektif,
      gallery: [
        arkaPerspektif,
        onYuz,
        onBaski,
        arkaBaski,
        s11,
        farfield
      ]
    },
    {
      id: 'phased-array-antenna',
      title: t('projects.phasedArrayAntenna.title'),
      category: t('projects.antenna'),
      technologies: ['CST Studio Suite', 'Phased Array Technology', 'MATLAB', 'Beam Steering'],
      description: t('projects.phasedArrayAntenna.description'),
      features: t('projects.phasedArrayAntenna.features'),
      image: ArraySon1,
      gallery: [
        ArraySon1,
        ArrayPoster,
        Array4x4,
        LibraryPatch,
        Pattern1
      ]
    }
  ];

  const categories = [t('common.all'), t('projects.pcb'), t('projects.embedded'), t('projects.software'), t('projects.antenna')];

  const filteredProjects = selectedCategory === t('common.all')
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedProject]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject, currentSlide]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedProject(null);
      }
    };
    
    if (selectedProject) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedProject]);

  const totalSlides = (selectedProject?.gallery?.length ?? 0) + 1;

  const prevSlide = () => {
    if (!selectedProject) return;
    setCurrentSlide((s) => (s <= 0 ? totalSlides - 1 : s - 1));
  };

  const nextSlide = () => {
    if (!selectedProject) return;
    setCurrentSlide((s) => (s >= totalSlides - 1 ? 0 : s + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prevSlide();
    else if (dx < -50) nextSlide();
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                setCurrentSlide(0);
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {t('projects.demo')}
                    </button>
                  )}
                  {project.githubUrl && (
                    <button className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
                      <Github className="w-4 h-4 mr-1" />
                      {t('projects.code')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal with Carousel */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full flex flex-col max-h-[90vh]">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 z-20"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="flex-1 overflow-hidden relative">
                <div
                  ref={slidesContainerRef}
                  className="flex transition-transform duration-300 ease-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {selectedProject.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="w-full flex-shrink-0 flex items-center justify-center min-h-0 p-4"
                    >
                      <div className="w-full h-full overflow-hidden flex items-center justify-center">
                        <img
                          src={img}
                          alt={`${selectedProject.title} - ${i + 1}`}
                          loading="lazy"
                          className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* final detail slide */}
                  <div
                    className="w-full flex-shrink-0 p-8 overflow-y-auto max-h-[90vh]"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {selectedProject.title}
                      </h3>
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
                        {selectedProject.category}
                      </span>
                    </div>

                    <div className="max-h-[30vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('projects.keyFeatures')}</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('projects.toolsTech')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          {t('projects.viewDemo')}
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          {t('projects.sourceCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Prev / Next buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 dark:bg-gray-700 rounded-full shadow hover:scale-105 transition-transform"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 dark:bg-gray-700 rounded-full shadow hover:scale-105 transition-transform"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>

                {/* Dots */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex gap-2">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-3 h-3 rounded-full ${currentSlide === i ? 'bg-white' : 'bg-white/40'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};