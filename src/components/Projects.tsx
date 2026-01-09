import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import arkaBaski from '../assets/2.4Ghz Antenna/Arka_baski.jpg';
import farfield from '../assets/2.4Ghz Antenna/Farfield.png';

const PLACEHOLDER_PCBPNG = 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400';
const PLACEHOLDER_PCBJPG = 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400';
const PLACEHOLDER_ANTENNA = 'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=400';
const PLACEHOLDER_SOFTWARE = 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400';

const arkaPerspektif = PLACEHOLDER_ANTENNA;
const onYuz = PLACEHOLDER_ANTENNA;
const onBaski = PLACEHOLDER_ANTENNA;
const s11 = PLACEHOLDER_ANTENNA;
const AltiumDevreSema = PLACEHOLDER_PCBPNG;
const AltiumPcb = PLACEHOLDER_PCBPNG;
const DcMultisimDevre = PLACEHOLDER_PCBPNG;
const DCBaskiOn = PLACEHOLDER_PCBPNG;
const OlcumDC = PLACEHOLDER_PCBPNG;
const Regulator = PLACEHOLDER_PCBPNG;
const DpotAltiumPCB = PLACEHOLDER_PCBPNG;
const DpotAltiumSema = PLACEHOLDER_PCBPNG;
const DpotBaski = PLACEHOLDER_PCBPNG;
const DpotDizgisizBaski = PLACEHOLDER_PCBPNG;
const ComplexAnaArayuz = PLACEHOLDER_SOFTWARE;
const ComplexArayuz = PLACEHOLDER_SOFTWARE;
const ComplexKod = PLACEHOLDER_SOFTWARE;
const MSP430AltiumPCB = PLACEHOLDER_PCBPNG;
const MSP430AltiumSema = PLACEHOLDER_PCBPNG;
const MSP430Baski = PLACEHOLDER_PCBPNG;
const MSP430DizgisizBaski = PLACEHOLDER_PCBPNG;
const MSP430Kod = PLACEHOLDER_SOFTWARE;
const SESAltiumPcb = PLACEHOLDER_PCBPNG;
const SESAltiumSema = PLACEHOLDER_PCBPNG;
const SESBaski = PLACEHOLDER_PCBJPG;
const SESDizgisizBaski = PLACEHOLDER_PCBPNG;
const SESMultisimSema = PLACEHOLDER_PCBPNG;
const STM32IdeArayuz = PLACEHOLDER_SOFTWARE;
const STM32IdeKod = PLACEHOLDER_SOFTWARE;
const STM32Uygulama = PLACEHOLDER_SOFTWARE;
const Array4x4 = PLACEHOLDER_ANTENNA;
const ArrayPoster = PLACEHOLDER_ANTENNA;
const ArraySon1 = PLACEHOLDER_ANTENNA;
const LibraryPatch = PLACEHOLDER_ANTENNA;
const Pattern1 = PLACEHOLDER_ANTENNA;
const HpFilterPCB1 = PLACEHOLDER_PCBPNG;
const HpFilterPCB2 = PLACEHOLDER_PCBPNG;
const HpFilterSheet = PLACEHOLDER_PCBPNG;
const LpFilterPCB1 = PLACEHOLDER_PCBPNG;
const LpFilterPCB2 = PLACEHOLDER_PCBPNG;
const LpFilterSheet = PLACEHOLDER_PCBPNG;
const BuckPCB1 = PLACEHOLDER_PCBJPG;
const BuckPCB2 = PLACEHOLDER_PCBJPG;
const BuckSheet = PLACEHOLDER_PCBJPG;
const BoostPCB1 = PLACEHOLDER_PCBJPG;
const BoostPCB2 = PLACEHOLDER_PCBJPG;
const BoostSheet = PLACEHOLDER_PCBJPG;
const ACDCadaptorPCB1 = PLACEHOLDER_PCBJPG;
const ACDCadaptorPCB2 = PLACEHOLDER_PCBJPG;
const ACDCadaptorSheet = PLACEHOLDER_PCBJPG;
const STMRelayPcb1 = PLACEHOLDER_PCBPNG;
const STMRelayPcb2 = PLACEHOLDER_PCBPNG;
const STMRelaySheet = PLACEHOLDER_PCBPNG;

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
    },
    {
  id: 'lp-hp-filter',
  title: t('projects.lpHpFilter.title'),
  category: t('projects.pcb'),
  technologies: ['Altium Designer', 'PCB design'],
  description: t('projects.lpHpFilter.description'),
  features: t('projects.lpHpFilter.features'),
  image: HpFilterPCB2,
  gallery: [
    HpFilterPCB2,
    HpFilterPCB1,
    HpFilterSheet,
    LpFilterPCB1,
    LpFilterPCB2,
    LpFilterSheet,
  ]
},
    {
  id: 'buck-boost-converter',
  title: t('projects.buckBoost.title'),
  category: t('projects.pcb'),
  technologies: ['Altium Designer', 'Power Electronics', 'Simülasyon'],
  description: t('projects.buckBoost.description'),
  features: t('projects.buckBoost.features'),
  image: BuckPCB2, // Proje kartında görünecek ana görsel
  gallery: [
    BuckPCB2,
    BuckPCB1,
    BuckSheet,
    BoostPCB1,
    BoostPCB2,
    BoostSheet
  ]
},
    {
  id: 'ac-dc-adaptor',
  title: t('projects.acDcAdaptor.title'),
  category: t('projects.pcb'),
  technologies: ['Altium Designer', 'SMPS Design', 'Flyback Topology'],
  description: t('projects.acDcAdaptor.description'),
  features: t('projects.acDcAdaptor.features'),
  image: ACDCadaptorPCB1,
  gallery: [
    ACDCadaptorPCB1,
    ACDCadaptorPCB2,
    ACDCadaptorSheet
  ]
},
    {
  id: 'stm-relay-control',
  title: t('projects.stmRelay.title'),
  category: t('projects.pcb'),
  technologies: ['STM32', 'Relay Control', 'Wireless Communication', 'PCB Design', 'Altium Designer'],
  description: t('projects.stmRelay.description'),
  features: t('projects.stmRelay.features'),
  image: STMRelayPcb1,
  gallery: [
    STMRelayPcb1,
    STMRelayPcb2,
    STMRelaySheet
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