import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.projects': 'Projeler',
    'nav.skills': 'Yetenekler',
    'nav.experience': 'Deneyim',
    'nav.education': 'Eğitim',
    'nav.certificates': 'Sertifikalar',
    'nav.contact': 'İletişim',

    // Hero Section
    'hero.title': 'Elektronik ve Haberleşme Mühendisi',
    'hero.specializing': 'Uzmanlık Alanları',
    'hero.skills': [
      'PCB Tasarımı',
      'Gömülü Sistemler',
      'Anten Tasarımı',
      'Devre Analizi',
      'Mikrodenetleyiciler',
      'RF Mühendisliği'
    ],
    'hero.description': 'Anten sistemleri, RF devreleri, PCB tasarımı ve mikroşerit anten tasarımı konularında deneyimli; STM32 ve MSP430 gibi mikrodenetleyicilerle gömülü sistemler geliştirme alanında uzmanlaşmış bir elektronik mühendisi.',
    'hero.viewProjects': 'Projelerimi İncele',
    'hero.getInTouch': 'İletişime Geç',
    'hero.downloadCV': 'CV İndir',

    // About Section
    'about.title': 'Hakkımda',
    'about.subtitle': 'Fikirleri yenilikçi elektronik çözümlere dönüştürüyorum',
    'about.mainTitle': 'Genel Bakış',
    'about.description1': "Kocaeli Üniversitesi Elektronik ve Haberleşme Mühendisliği bölümünden mezun oldum. Anten sistemleri, RF devreleri, gömülü sistemler ve PCB tasarımı konularında kapsamlı bilgi ve deneyime sahibim.",
    'about.description2': 'Eğitimim boyunca CST Studio Suite ile anten simülasyonları üzerinde çalıştım ve STM32, MSP430 gibi mikrodenetleyiciler kullanarak çeşitli gömülü sistem projeleri geliştirdim.',
    'about.description3': "PCB tasarımı ve üretimi, dijital kontrol sistemleri ve MATLAB ile karmaşık sayı gösterimleri gibi alanlarda pek çok pratik proje tamamladım. DC güç kaynaklarından gelişmiş fazlı dizi anten sistemlerine kadar geniş bir yelpazede çalıştım. Teorik bilgiyi gerçek dünya uygulamalarına dönüştürme tutkusuyla elektronik mühendisliği alanındaki yetkinliklerimi sürekli geliştiriyorum.",
    'about.stats.projects': 'Tamamlanan Proje',
    'about.stats.graduate': 'Mezuniyet Yılı',
    'about.stats.technologies': 'Kullanılan Teknoloji',
    'about.stats.gpa': 'Not Ortalaması',

    // Skills Section
    'skills.title': 'Teknik Yetenekler',
    'skills.subtitle': 'Donanım tasarımı, gömülü sistemler ve RF mühendisliği alanlarında kapsamlı deneyim',
    'skills.hardware': 'Donanım Tasarımı',
    'skills.embedded': 'Gömülü Sistemler',
    'skills.rf': 'RF ve Anten Tasarımı',
    'skills.simulation': 'Simülasyon ve Analiz',
    'skills.software': 'Yazılım Araçları',
    'skills.languages': 'Diller',

    // Projects Section
    'projects.title': 'Öne Çıkan Projeler',
    'projects.subtitle': 'Elektronik ve gömülü sistem projelerimi keşfedin',
    'projects.all': 'Tümü',
    'projects.pcb': 'PCB Tasarımı',
    'projects.embedded': 'Gömülü Sistemler',
    'projects.software': 'Yazılım Geliştirme',
    'projects.antenna': 'Anten Tasarımı',
    'projects.demo': 'Demo',
    'projects.code': 'Kod',
    'projects.viewDemo': 'Demoyu Görüntüle',
    'projects.sourceCode': 'Kaynak Kod',
    'projects.keyFeatures': 'Temel Özellikler',
    'projects.toolsTech': 'Kullanılan Araçlar ve Teknolojiler',

    // Project Descriptions
    'projects.dcPowerSupply.title': 'DC Güç Kaynağı',
    'projects.dcPowerSupply.description': 'LM317 ayarlanabilir regülatör tabanlı düzenlenmiş DC güç kaynağı tasarımı ve uygulaması. Proje; şematik tasarım, devre simülasyonu ve 2 katmanlı PCB üretimini içermektedir. Regülatörün yerleşik koruma özellikleri güvenli çalışmayı sağlarken, harici tasarım verimlilik ve kararlı çıkışa odaklanmıştır.',
    'projects.dcPowerSupply.features': [
      'Şematik tasarım ve fonksiyonel simülasyon',
      'Optimize edilmiş 2 katmanlı PCB düzeni',
      'Yerleşik aşırı akım ve termal korumalı LM317 regülatör',
      'Komponent seçimi ve tedarik',
      'Fiziksel PCB üretimi ve test'
    ],
    'projects.digitalPotentiometer.title': 'Dijital Potansiyometre',
    'projects.digitalPotentiometer.description': 'Altium Designer\'da sıfırdan geliştirilen dijital potansiyometre devresinin tam PCB tasarımı ve uygulaması. Modül Pmod DPOT Bassy3 arayüzü ile tam uyumlu olup, gömülü sistemler için hassas, dijital kontrollü direnç ayarı sağlamaktadır.',
    'projects.digitalPotentiometer.features': [
      'Altium Designer\'da tam şematik tasarım ve PCB düzeni',
      'Pmod DPOT Bassy3 ile uyumluluk',
      'Gerçek zamanlı geri bildirim izleme',
      'Kararlı ve hassas direnç kontrolü',
      'Başarılı prototipleme ve test'
    ],
    'projects.complexNumberApp.title': 'Karmaşık Sayı Gösterim Uygulaması',
    'projects.complexNumberApp.description': 'Karmaşık sayıların dikdörtgen ve kutupsal koordinatları arasında gerçek zamanlı dönüşüm yapan bir MATLAB uygulaması. MATLAB App Designer ile tasarlanmış, etkileşimli kaydırıcılar ve karmaşık sayı vektörlerinin anında görselleştirilmesi için dinamik bir çizim alanı içermektedir.',
    'projects.complexNumberApp.features': [
      'Gerçek zamanlı dikdörtgen-kutupsal dönüşüm',
      'Etkileşimli grafik görselleştirme',
      'Kullanıcı dostu MATLAB arayüzü',
      'Matematiksel hesaplama motoru',
      'Eğitim odaklı arayüz tasarımı'
    ],
    'projects.msp430DiscoLights.title': 'MSP430 Ses Kontrollü Disko Işık Sistemi',
    'projects.msp430DiscoLights.description': 'Ses yoğunluğuna göre LED\'leri kontrol eden MSP430 mikrodenetleyici tabanlı gömülü sistem. Proje; Altium Designer\'da donanım tasarımı ve C dilinde firmware geliştirmeyi içermektedir. Sistem, gerçek zamanlı ve duyarlı ses-ışık efekti oluşturmak için MSP430\'un ADC\'si aracılığıyla analog ses sinyallerini işlemektedir.',
    'projects.msp430DiscoLights.features': [
      'Gerçek zamanlı ses sinyali işleme',
      'Ses seviyesi algılama için ADC',
      'Özel PCB tasarımı: Kompakt, özel üretilmiş devre kartı',
      'Gömülü C programlama'
    ],
    'projects.stm32OledCounter.title': 'STM32 OLED Zaman Kontrollü Buton Sayacı',
    'projects.stm32OledCounter.description': 'OLED ekran kullanan STM32 tabanlı zaman kontrollü buton sayma sistemi; donanım ve yazılım geliştirme özelliklerine sahiptir.',
    'projects.stm32OledCounter.features': [
      'Kesme tabanlı buton işleme',
      'Zamanlayıcı tabanlı sayma sistemi',
      'OLED ekran arayüzü',
      'STM32 mikrodenetleyici programlama',
      'Gerçek zamanlı gömülü sistem tasarımı'
    ],
    'projects.voiceControlledMotor.title': 'Ses Kontrollü DC Motor Sistemi',
    'projects.voiceControlledMotor.description': 'Ses sinyallerine dayalı olarak DC motoru çalıştıran klasik bir kontrol sistemi. İlk olarak Multisim\'de tasarlanıp simüle edilen devre, sesi yakalamak için kondansatör mikrofon kullanmaktadır. Zayıf sinyal daha sonra iki transistör tarafından DC motoru sürmek için yeterli seviyeye yükseltilmektedir.',
    'projects.voiceControlledMotor.features': [
      'Ses sinyali yükseltme',
      'Analog-mekanik dönüşüm: Ses sinyalini motor hareketine dönüştürme',
      'Özel PCB tasarımı ve üretimi',
      'Entegre tasarım süreci: Simülasyondan fiziksel ürüne tam iş akışı'
    ],
    'projects.microstripAntenna.title': '2.4 GHz Geniş Bant Mikroşerit Anten',
    'projects.microstripAntenna.description': 'CST Studio Suite kullanılarak 2.4 GHz geniş bant mikroşerit anten tasarımı, simülasyonu ve fiziksel üretimi gerçekleştirilmiştir.',
    'projects.microstripAntenna.features': [
      'CST Studio Suite simülasyonu',
      'S-parametre optimizasyonu',
      'Radyasyon paterni analizi',
      'Geniş bant tasarım teknikleri',
      'Fiziksel anten üretimi'
    ],
    'projects.phasedArrayAntenna.title': 'Fazlı Dizi Mikroşerit Antenlerde Işın Yönlendirme (Tez)',
    'projects.phasedArrayAntenna.description': 'Lisans tezi olarak tamamlanan bu proje, ışın yönlendirme uygulamaları için fazlı dizi mikroşerit antenlerin tasarımı ve analizine odaklanmaktadır. CST Studio Suite kullanılarak, fazlı dizilerin teorik ilkeleri ve simülasyon ortamında pratik uygulamaları araştırılmıştır.',
    'projects.phasedArrayAntenna.features': [
      'Fazlı dizi anten tasarımı',
      'Işın yönlendirme algoritması geliştirme',
      'CST Studio Suite simülasyonu',
      'Dizi faktörü analizi',
      'Tez araştırması ve dokümantasyonu'
    ],
    'projects.lpHpFilter.title': 'Alçak Geçiren ve Yüksek Geçiren Filtre',
    'projects.lpHpFilter.description': 'Altium Designer kullanılarak tasarlanmış alçak geçiren ve yüksek geçiren filtre devreleri. Her iki filtre de PCB düzeni ve üretimiyle tamamlanmıştır.',
    'projects.lpHpFilter.features': [
      'Alçak geçiren filtre tasarımı ve PCB',
      'Yüksek geçiren filtre tasarımı ve PCB',
      'Altium Designer ile şematik çizim',
      'İki katmanlı PCB düzeni'
    ],
    'projects.buckBoost.title': 'Buck ve Boost Konvertör',
    'projects.buckBoost.description': 'DC-DC güç dönüştürme için Buck ve Boost konvertör devreleri tasarlanmıştır. Her iki konvertör de Altium Designer\'da tasarlanıp simüle edilmiştir.',
    'projects.buckBoost.features': [
      'Buck konvertör tasarımı (voltaj düşürme)',
      'Boost konvertör tasarımı (voltaj yükseltme)',
      'Güç elektroniği devre tasarımı',
      'Simülasyon ve PCB uygulaması'
    ],
    'projects.acDcAdaptor.title': 'AC-DC Adaptör',
    'projects.acDcAdaptor.description': 'Flyback topolojisi kullanan bir AC-DC adaptör tasarımı. SMPS (Anahtarlamalı Mod Güç Kaynağı) prensipleriyle çalışan, kompakt ve verimli bir güç çözümüdür.',
    'projects.acDcAdaptor.features': [
      'Flyback topolojisi tasarımı',
      'SMPS devre tasarımı',
      'Altium Designer ile şematik ve PCB',
      'Yüksek verimli güç dönüşümü'
    ],
    'projects.stmRelay.title': 'STM32 Röle Kontrol Sistemi',
    'projects.stmRelay.description': 'STM32 mikrodenetleyici kullanılarak kablosuz iletişim ve röle kontrolü sağlayan bir sistem. Altium Designer\'da PCB tasarımı yapılmış ve gömülü yazılım geliştirilmiştir.',
    'projects.stmRelay.features': [
      'STM32 tabanlı kontrol',
      'Röle sürücü devresi',
      'Kablosuz iletişim entegrasyonu',
      'PCB tasarımı ve üretimi',
      'Altium Designer kullanımı'
    ],

    // Experience Section
    'experience.title': 'Deneyim',
    'experience.subtitle': 'Her projede öğrenmeyi ve üretmeyi ön planda tutuyorum',
    'experience.achievements': 'Önemli Başarılar',

    // Education Section
    'education.title': 'Eğitim',
    'education.subtitle': 'Elektronik ve haberleşme mühendisliğinde güçlü akademik altyapı',
    'education.coursework.title': 'İlgili Dersler',
    'education.academicProjects.title': 'Akademik Projeler',
    'education.thesis.title': 'Bitirme Tezi',

    // Certificates Section
    'certificates.title': 'Sertifikalar',
    'certificates.subtitle': 'Sürekli öğrenme ve ileri teknolojilerde mesleki gelişim',
    'certificates.viewDetails': 'Detayları Görüntüle',
    'certificates.verify': 'Doğrula',
    'certificates.download': 'İndir',
    'certificates.issued': 'Verilme Tarihi',
    'certificates.credentialId': 'Kimlik Numarası',

    // Contact Section
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Yenilikçi elektronik projelerde işbirliği yapmaya hazır mısınız? Bir sonraki büyük fikrinizi tartışalım',
    'contact.info': 'İletişim Bilgileri',
    'contact.connect': 'Sosyal Medya',
    'contact.collaborate': 'İşbirliği Yapalım',
    'contact.collaborateText': 'Elektronik ve gömülü sistemler alanındaki bilgi ve deneyimlerimi yeni projelerde paylaşmaya ve geliştirmeye her zaman açığım. PCB tasarımı, gömülü yazılım ve RF mühendisliği konularında fikir alışverişi yapmaktan ve birlikte yenilikçi çözümler üretmekten memnuniyet duyarım.',
    'contact.sendMessage': 'Mesaj Gönderin',
    'contact.fullName': 'Ad Soyad',
    'contact.email': 'E-posta Adresi',
    'contact.subject': 'Konu',
    'contact.message': 'Mesajınız',
    'contact.messagePlaceholder': 'Proje gereksinimleriniz, zaman çizelgeniz ve karşılaştığınız teknik zorluklar hakkında bilgi verin...',
    'contact.send': 'Gönder',
    'contact.submitting': 'Gönderiliyor...',
    'contact.success': 'Mesajınız başarıyla gönderildi!',
    'contact.nameRequired': 'Lütfen adınızı girin',
    'contact.emailInvalid': 'Lütfen geçerli bir e-posta adresi girin',
    'contact.subjectRequired': 'Lütfen bir konu girin',
    'contact.messageRequired': 'Lütfen mesajınızı girin',
    'contact.recaptchaRequired': 'Lütfen robot olmadığınızı doğrulayın',
    'contact.networkError': 'Ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin',
    'contact.generalError': 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin',
    'contact.securityVerification': 'Güvenlik Doğrulaması',
    'contact.securityPrivacy': 'Güvenlik ve Gizlilik',
    'contact.privacyText': 'Bilgileriniz güvenli bir şekilde saklanır ve asla üçüncü taraflarla paylaşılmaz.',

    // Common
    'common.phone': 'Telefon',
    'common.location': 'Konum',
    'common.current': 'Güncel',
    'common.all': 'Tümü'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Electronics & Communication Engineer',
    'hero.specializing': 'Areas of Expertise',
    'hero.skills': [
      'PCB Design',
      'Embedded Systems',
      'Antenna Design',
      'Circuit Analysis',
      'Microcontrollers',
      'RF Engineering'
    ],
    'hero.description': 'Experienced electronics engineer specializing in antenna systems, RF circuits, PCB design, and microstrip antenna design, with expertise in developing embedded systems using STM32 and MSP430 microcontrollers.',
    'hero.viewProjects': 'View Projects',
    'hero.getInTouch': 'Get in Touch',
    'hero.downloadCV': 'Download CV',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Transforming ideas into innovative electronic solutions',
    'about.mainTitle': 'Overview',
    'about.description1': "I graduated from Kocaeli University with a degree in Electronics and Communication Engineering. I have comprehensive knowledge and experience in antenna systems, RF circuits, embedded systems, and PCB design.",
    'about.description2': 'Throughout my education, I worked on antenna simulations using CST Studio Suite and developed various embedded system projects using microcontrollers such as STM32 and MSP430.',
    'about.description3': "I have completed numerous practical projects in areas such as PCB design and fabrication, digital control systems, and complex number representation using MATLAB. I have worked across a wide spectrum, from DC power supplies to advanced phased array antenna systems. I am passionate about transforming theoretical knowledge into real-world applications and continuously developing my expertise in electronic engineering.",
    'about.stats.projects': 'Completed Projects',
    'about.stats.graduate': 'Graduation Year',
    'about.stats.technologies': 'Technologies Used',
    'about.stats.gpa': 'GPA',

    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Comprehensive expertise in hardware design, embedded systems, and RF engineering',
    'skills.hardware': 'Hardware Design',
    'skills.embedded': 'Embedded Systems',
    'skills.rf': 'RF & Antenna Design',
    'skills.simulation': 'Simulation & Analysis',
    'skills.software': 'Software Tools',
    'skills.languages': 'Languages',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Explore my portfolio of electronics and embedded systems projects',
    'projects.all': 'All',
    'projects.pcb': 'PCB Design',
    'projects.embedded': 'Embedded Systems',
    'projects.software': 'Software Development',
    'projects.antenna': 'Antenna Design',
    'projects.demo': 'Demo',
    'projects.code': 'Code',
    'projects.viewDemo': 'View Demo',
    'projects.sourceCode': 'Source Code',
    'projects.keyFeatures': 'Key Features',
    'projects.toolsTech': 'Tools & Technologies',

    // Project Descriptions
    'projects.dcPowerSupply.title': 'DC Power Supply',
    'projects.dcPowerSupply.description': 'Design and implementation of a regulated DC power supply based on the LM317 adjustable regulator. The project included schematic design, circuit simulation, and 2-layer PCB fabrication. While the regulator\'s built-in protection features ensure safe operation, the external design focuses on efficiency and stable output.',
    'projects.dcPowerSupply.features': [
      'Schematic design and functional simulation',
      'Optimized 2-layer PCB layout',
      'LM317 regulator with built-in overcurrent and thermal protection',
      'Component selection and sourcing',
      'Physical PCB fabrication and testing'
    ],
    'projects.digitalPotentiometer.title': 'Digital Potentiometer',
    'projects.digitalPotentiometer.description': 'Complete PCB design and implementation of a digital potentiometer circuit developed from scratch in Altium Designer. The module is fully compatible with the Pmod DPOT Bassy3 interface and provides precise, digitally controlled resistance adjustment for embedded systems.',
    'projects.digitalPotentiometer.features': [
      'Complete schematic design and PCB layout in Altium Designer',
      'Compatibility with Pmod DPOT Bassy3',
      'Real-time feedback monitoring',
      'Stable and precise resistance control',
      'Successful prototyping and testing'
    ],
    'projects.complexNumberApp.title': 'Complex Number Representation App',
    'projects.complexNumberApp.description': 'A MATLAB application that performs real-time conversions between rectangular and polar coordinates of complex numbers. Designed using MATLAB App Designer, it features interactive sliders and a dynamic plotting area for instant visualization of complex number vectors.',
    'projects.complexNumberApp.features': [
      'Real-time rectangular-polar conversion',
      'Interactive graphical visualization',
      'User-friendly MATLAB interface',
      'Mathematical computation engine',
      'Educational interface design'
    ],
    'projects.msp430DiscoLights.title': 'MSP430 Voice-Controlled Disco Light System',
    'projects.msp430DiscoLights.description': 'An embedded system using an MSP430 microcontroller to control LEDs based on sound intensity. The project includes hardware design in Altium Designer and firmware development in C. The system processes analog audio signals through the MSP430\'s ADC to create real-time, responsive sound-to-light effects.',
    'projects.msp430DiscoLights.features': [
      'Real-time audio signal processing',
      'ADC for sound level detection',
      'Custom PCB design: Compact, custom-fabricated circuit board',
      'Embedded C programming'
    ],
    'projects.stm32OledCounter.title': 'STM32 OLED Time-Controlled Button Counter',
    'projects.stm32OledCounter.description': 'An STM32-based time-controlled button counting system with OLED display, featuring comprehensive hardware and software development.',
    'projects.stm32OledCounter.features': [
      'Interrupt-based button handling',
      'Timer-based counting system',
      'OLED display interface',
      'STM32 microcontroller programming',
      'Real-time embedded system design'
    ],
    'projects.voiceControlledMotor.title': 'Voice-Controlled DC Motor System',
    'projects.voiceControlledMotor.description': 'A classic control system that operates a DC motor based on voice signals. Initially designed and simulated in Multisim, the circuit uses a condenser microphone to capture sound. This weak signal is then amplified by two transistors to sufficient levels to drive the DC motor.',
    'projects.voiceControlledMotor.features': [
      'Audio signal amplification',
      'Analog-to-mechanical conversion: Converts audio signals to motor movement',
      'Custom PCB design and fabrication',
      'Integrated design process: Complete workflow from simulation to physical product'
    ],
    'projects.microstripAntenna.title': '2.4 GHz Wideband Microstrip Antenna',
    'projects.microstripAntenna.description': '2.4 GHz wideband microstrip antenna design, simulation, and physical fabrication using CST Studio Suite.',
    'projects.microstripAntenna.features': [
      'CST Studio Suite simulation',
      'S-parameter optimization',
      'Radiation pattern analysis',
      'Wideband design techniques',
      'Physical antenna fabrication'
    ],
    'projects.phasedArrayAntenna.title': 'Beam Steering in Phased Array Microstrip Antennas (Thesis)',
    'projects.phasedArrayAntenna.description': 'Completed as an undergraduate thesis, this project focuses on the design and analysis of phased array microstrip antennas for beam steering applications. Using CST Studio Suite, the theoretical principles of phased arrays and their practical implementation in simulation environments were explored.',
    'projects.phasedArrayAntenna.features': [
      'Phased array antenna design',
      'Beam steering algorithm development',
      'CST Studio Suite simulation',
      'Array factor analysis',
      'Thesis research and documentation'
    ],
    'projects.lpHpFilter.title': 'Low-Pass and High-Pass Filter',
    'projects.lpHpFilter.description': 'Low-pass and high-pass filter circuits designed using Altium Designer. Both filters were completed with PCB layout and fabrication.',
    'projects.lpHpFilter.features': [
      'Low-pass filter design and PCB',
      'High-pass filter design and PCB',
      'Schematic design in Altium Designer',
      'Two-layer PCB layout'
    ],
    'projects.buckBoost.title': 'Buck and Boost Converter',
    'projects.buckBoost.description': 'Buck and Boost converter circuits designed for DC-DC power conversion. Both converters were designed and simulated in Altium Designer.',
    'projects.buckBoost.features': [
      'Buck converter design (voltage step-down)',
      'Boost converter design (voltage step-up)',
      'Power electronics circuit design',
      'Simulation and PCB implementation'
    ],
    'projects.acDcAdaptor.title': 'AC-DC Adaptor',
    'projects.acDcAdaptor.description': 'An AC-DC adaptor design using flyback topology. A compact and efficient power solution working with SMPS (Switched-Mode Power Supply) principles.',
    'projects.acDcAdaptor.features': [
      'Flyback topology design',
      'SMPS circuit design',
      'Schematic and PCB in Altium Designer',
      'High-efficiency power conversion'
    ],
    'projects.stmRelay.title': 'STM32 Relay Control System',
    'projects.stmRelay.description': 'A system providing wireless communication and relay control using an STM32 microcontroller. PCB design was completed in Altium Designer and embedded software was developed.',
    'projects.stmRelay.features': [
      'STM32-based control',
      'Relay driver circuit',
      'Wireless communication integration',
      'PCB design and fabrication',
      'Altium Designer implementation'
    ],

    // Experience Section
    'experience.title': 'Experience',
    'experience.subtitle': 'Prioritizing learning and innovation in every project',
    'experience.achievements': 'Key Achievements',

    // Education Section
    'education.title': 'Education',
    'education.subtitle': 'Strong academic foundation in electronics and communication engineering',
    'education.coursework.title': 'Relevant Coursework',
    'education.academicProjects.title': 'Academic Projects',
    'education.thesis.title': 'Graduation Thesis',

    // Certificates Section
    'certificates.title': 'Certificates',
    'certificates.subtitle': 'Continuous learning and professional development in advanced technologies',
    'certificates.viewDetails': 'View Details',
    'certificates.verify': 'Verify',
    'certificates.download': 'Download',
    'certificates.issued': 'Issued',
    'certificates.credentialId': 'Credential ID',

    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to collaborate on innovative electronics projects? Let\'s discuss your next big idea',
    'contact.info': 'Contact Information',
    'contact.connect': 'Social Media',
    'contact.collaborate': 'Let\'s Collaborate',
    'contact.collaborateText': 'I\'m always open to sharing my knowledge and experience in electronics and embedded systems through new projects. I enjoy exchanging ideas and creating innovative solutions in PCB design, embedded software, and RF engineering.',
    'contact.sendMessage': 'Send Message',
    'contact.fullName': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.messagePlaceholder': 'Tell me about your project requirements, timeline, and any technical challenges you\'re facing...',
    'contact.send': 'Send',
    'contact.submitting': 'Sending...',
    'contact.success': 'Your message has been sent successfully!',
    'contact.nameRequired': 'Please enter your name',
    'contact.emailInvalid': 'Please enter a valid email address',
    'contact.subjectRequired': 'Please enter a subject',
    'contact.messageRequired': 'Please enter your message',
    'contact.recaptchaRequired': 'Please verify that you are not a robot',
    'contact.networkError': 'A network error occurred. Please check your connection and try again',
    'contact.generalError': 'An error occurred. Please try again later',
    'contact.securityVerification': 'Security Verification',
    'contact.securityPrivacy': 'Security & Privacy',
    'contact.privacyText': 'Your information is stored securely and never shared with third parties.',

    // Common
    'common.phone': 'Phone',
    'common.location': 'Location',
    'common.current': 'Current',
    'common.all': 'All'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'tr';
    }
    return 'tr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
