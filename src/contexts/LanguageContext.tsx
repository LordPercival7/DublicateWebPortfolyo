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
    'hero.specializing': 'Alanlar',
    'hero.skills': [
      'PCB Tasarımı',
      'Gömülü Sistemler',
      'Anten Tasarımı',
      'Devre Analizi',
      'Mikrodenetleyiciler',
      'RF Mühendisliği'],
    'hero.description': 'Anten sistemleri, RF devreleri, PCB tasarımı, mikroşerit ve dizi anten tasarımı gibi konularla birlikte, STM32 ve MSP430 gibi mikrodenetleyicilerle gömülü sistemler tasarlama konularına ilgili ve deneyim sahibi',
    'hero.viewProjects': 'Projelerimi Görüntüle',
    'hero.getInTouch': 'İletişime Geç',
    'hero.downloadCV': 'CV İndir',

    // About Section
    'about.title': 'Hakkımda',
    'about.subtitle': 'Fikirleri yenilikçi elektronik çözümlere dönüştürme',
    'about.mainTitle': 'Genel Bakış',
    'about.description1': "Elektronik ve Haberleşme Mühendisliği alanında aldığım eğitim, beni Kocaeli Üniversitesi'nden donanımlı bir mühendis olarak mezun etti. Anten sistemleri, RF devreleri, gömülü sistemler ve PCB tasarımı konularında kapsamlı bir birikime sahibim.",
    'about.description2': 'Eğitimim sırasında CST Studio Suite ile anten simülasyonları üzerine çalıştım. STM32 ve MSP430 gibi mikrodenetleyicileri kullanarak gömülü sistem projelerinde yer aldım.',
    'about.description3': "Bunun yanı sıra, PCB tasarımı ve üretimi, dijital kontrol sistemleri ve MATLAB'i kullanarak karmaşık sayı gösterimlerini kapsayan birçok pratik çalışmada bulundum. DC güç kaynaklarının tasarımından, gelişmiş fazlı dizi antenlerin yönlendirme sistemlerine kadar çeşitli projeler geliştirdim. Teorik bilgiyi gerçek dünya uygulamalarına dönüştürme motivasyonuyla elektronik mühendisliği alanındaki yetkinliklerimi sürekli olarak artırmayı hedefliyorum.",
    'about.stats.projects': 'Tamamlanan Proje',
    'about.stats.graduate': 'Mezuniyet Yılı',
    'about.stats.technologies': 'Kullanılan Teknolojiler',
    'about.stats.gpa': 'GPA',

    // Skills Section
    'skills.title': 'Teknik Yetenekler',
    'skills.subtitle': 'Donanım tasarımı, gömülü sistemler ve RF mühendisliği üzerine edindiğim deneyimler',
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
    'projects.viewDemo': 'Demo Görüntüle',
    'projects.sourceCode': 'Kaynak Kod',
    'projects.keyFeatures': 'Temel Özellikler',
    'projects.toolsTech': 'Araçlar ve Teknolojiler',

    // Project Descriptions
    'projects.dcPowerSupply.title': 'DC Güç Kaynağı',
    'projects.dcPowerSupply.description': 'LM317 ayarlanabilir regülatör tabanlı düzenlenmiş DC güç kaynağı tasarımı ve uygulaması. Proje şematik tasarım, devre simülasyonu ve 2 katmanlı PCB üretimini içerdi. Regülatörün yerleşik koruma özellikleri güvenli çalışmayı sağlarken, harici tasarım verimlilik ve kararlı çıkışa odaklandı.',
    'projects.dcPowerSupply.features': [
      'Şematik tasarım ve fonksiyonel simülasyon',
      'Optimize edilmiş 2 katmanlı PCB düzeni',
      'Yerleşik aşırı akım ve termal korumalı LM317 regülatör',
      'Komponent seçimi ve tedarik',
      'Fiziksel PCB üretimi ve test'
    ],
    'projects.digitalPotentiometer.title': 'Dijital Potansiyometre',
    'projects.digitalPotentiometer.description': 'Altium Designer\'da sıfırdan geliştirilen dijital potansiyometre devresinin tam PCB tasarımı ve uygulaması. Modül Pmod DPOT Bassy3 arayüzü ile tamamen uyumludur ve gömülü sistemler için hassas, dijital kontrollü direnç ayarı sağlar.',
    'projects.digitalPotentiometer.features': [
      'Altium Designer\'da tam şematik tasarım ve PCB düzeni',
      'Pmod DPOT Bassy3 ile uyumluluk',
      'Gerçek zamanlı geri bildirim izleme',
      'Kararlı ve hassas direnç kontrolü',
      'Başarılı prototipleme ve test'
    ],
    'projects.complexNumberApp.title': 'Karmaşık Sayı Gösterim Uygulaması',
    'projects.complexNumberApp.description': 'Bu proje, karmaşık sayıların dikdörtgen ve kutupsal koordinatları arasında gerçek zamanlı dönüşümler gerçekleştiren bir MATLAB Uygulamasıdır. Kullanıcı dostu Matlab App Designer ile tasarlanmış, etkileşimli kaydırıcılar ve karmaşık sayı vektörlerini anında görselleştirmek için dinamik bir çizim alanı içerir.',
    'projects.complexNumberApp.features': [
      'Gerçek zamanlı dikdörtgen-kutupsal dönüşüm',
      'Etkileşimli grafik görselleştirme',
      'Kullanıcı dostu MATLAB GUI',
      'Matematiksel hesaplama motoru',
      'Eğitim arayüzü tasarımı'
    ],
    'projects.msp430DiscoLights.title': 'MSP430 Ses Kontrollü Disko Işık Sistemi',
    'projects.msp430DiscoLights.description': 'Bu gömülü sistem, ses yoğunluğuna göre LED\'leri kontrol etmek için MSP430 mikrodenetleyici kullanır. Proje Altium Designer\'da donanım tasarımı ve C\'de firmware geliştirmeyi içerir. Sistem, gerçek zamanlı, duyarlı ses-ışık efekti oluşturmak için MSP430\'un ADC\'si aracılığıyla analog ses sinyallerini işler.',
    'projects.msp430DiscoLights.features': [
      'Gerçek zamanlı ses sinyali işleme',
      'Ses seviyesi algılama için ADC',
      'Özel PCB Tasarımı: Kompakt, özel üretilmiş devre kartı',
      'Gömülü C programlama'
    ],
    'projects.stm32OledCounter.title': 'STM32 OLED Zaman Kontrollü Buton Sayacı',
    'projects.stm32OledCounter.description': 'OLED ekranlı STM32 tabanlı zaman kontrollü buton sayma sistemi, donanım ve yazılım geliştirme özellikli.',
    'projects.stm32OledCounter.features': [
      'Kesme tabanlı buton işleme',
      'Zamanlayıcı tabanlı sayma sistemi',
      'OLED ekran arayüzü',
      'STM32 mikrodenetleyici programlama',
      'Gerçek zamanlı gömülü sistem tasarımı'
    ],
    'projects.voiceControlledMotor.title': 'Ses Kontrollü DC Motor Sistemi',
    'projects.voiceControlledMotor.description': 'Bu proje, ses sinyallerine dayalı olarak DC motor çalıştıran klasik bir kontrol sistemidir. İlk olarak Multisim\'de tasarlanan ve simüle edilen devre, sesi yakalamak için kondansatör mikrofon kullanır. Bu zayıf sinyal daha sonra iki transistör tarafından DC motor sürmek için yeterli seviyeye yükseltilir.',
    'projects.voiceControlledMotor.features': [
      'Ses Sinyali Yükseltme',
      'Analog-Mekanik Dönüşüm: Ses sinyalini motor hareketine dönüştürür',
      'Özel PCB tasarımı ve üretimi',
      'Entegre Tasarım Süreci: Simülasyondan fiziksel ürüne tam iş akışı'
    ],
    'projects.microstripAntenna.title': '2.4 GHz Geniş Bant Mikroşerit Anten',
    'projects.microstripAntenna.description': 'CST Studio Suite kullanarak 2.4 GHz geniş bant mikroşerit anten tasarımı, simülasyon ve fiziksel üretim.',
    'projects.microstripAntenna.features': [
      'CST Studio Suite simülasyonu',
      'S-parametre optimizasyonu',
      'Radyasyon paterni analizi',
      'Geniş bant tasarım teknikleri',
      'Fiziksel anten üretimi'
    ],
    'projects.phasedArrayAntenna.title': 'Fazlı Dizi Mikroşerit Antenlerde Işın Yönlendirme (Tez)',
    'projects.phasedArrayAntenna.description': 'Lisans tezi olarak tamamlanan bu proje, ışın yönlendirme uygulamaları için fazlı dizi mikroşerit antenlerin tasarımı ve analizine odaklanır. CST Studio Suite kullanarak, proje fazlı dizilerin teorik ilkelerini ve simülasyon ortamında pratik uygulamalarını araştırır.',
    'projects.phasedArrayAntenna.features': [
      'Fazlı dizi anten tasarımı',
      'Işın yönlendirme algoritması geliştirme',
      'CST Studio Suite simülasyonu',
      'Dizi faktörü analizi',
      'Tez araştırması ve dokümantasyonu'
    ],

    // Experience Section
    'experience.title': 'Deneyim',
    'experience.subtitle': 'Her projede öğrenmeyi ve üretmeyi ön planda tutuyorum.',
    'experience.achievements': 'Önemli Deneyimler',
    'experience.dmy.company': 'DMY Elektrik Otomasyon Aydınlatma',
    'experience.dmy.position': 'Elektronik Mühendisliği Stajeri',
    'experience.dmy.period': 'Tem 2025 - Agu 2025',
    'experience.dmy.location': 'İstanbul, Türkiye',
    'experience.dmy.description': 'ARM tabanlı sensör devresinin PCB tasarım, gömülü yazılım geliştirme ve saha test süreçlerinde görev aldım. Donanım-yazılım entegrasyonunu test ederek hata ayıklama çalışmalarına katkı sağladım.',
    'experience.dmy.achievements': [
      'ARM tabanlı sensör devresinin PCB tasarım sürecinde Altium Designer kullanarak şematik çizim ve yerleşim aşamalarına aktif katkı sağladım.',
      'Gömülü C diliyle donanım-yazılım entegrasyonunu test ederek sistemin doğru çalışmasını garanti altına aldım.',
      'Sensör devresinin saha testlerinde veri toplama ve hata ayıklama süreçlerinde görev alarak ürünün doğrulama aşamasına katkıda bulundum.'
    ],
    'experience.medel.company': 'Medel Elektronik ve Mühendislik',
    'experience.medel.position': 'Elektronik Mühendisliği Stajeri',
    'experience.medel.period': 'Tem 2023 - Eyl 2023',
    'experience.medel.location': 'İstanbul, Türkiye',
    'experience.medel.description': 'Yüksek Voltaj Konvertörü (YVK) projesinde teknik dokümantasyon analizi, gömülü yazılım inceleme ve hata takibi süreçlerinde çalıştım. Ürün testlerinde mühendis ekibe destek verdim',
    'experience.medel.achievements': [
      'Yüksek Voltaj Konvertörü (YVK) projesine ait teknik dokümantasyonları inceleyerek proje gereksinimlerinin uygunluk analizini gerçekleştirdim.',
      'C diliyle yazılmış gömülü yazılım yapısını analiz ederek hata takibi ve sistem optimizasyonu çalışmalarına destek verdim.',
      'Elektronik üretim ve ürün test süreçlerinde mühendis ekiple birlikte çalışarak kalite kontrol ve fonksiyonel doğrulama adımlarına katkıda bulundum.'
    ],

    // Education Section
    'education.title': 'Eğitim',
    'education.subtitle': 'Elektronik ve haberleşme mühendisliği ve ileri teknolojilerde güçlü akademik altyapı',
    'education.degree.electronics': 'Elektronik ve Haberleşme Mühendisliği',
    'education.degree.highschool': 'Lise Mezuniyeti',
    'education.university.kocaeli': 'Kocaeli Üniversitesi',
    'education.university.habire': 'Habire Yahşi Anadolu Lisesi',
    'education.thesis.title': 'Faz Dizinli Mikroşerit Antenlerde Hüzme Tarama',
    'education.coursework.title': 'İlgili Dersler',
    'education.academicProjects.title': 'Akademik Projeler',
    'education.projects.msp430Audio.title': 'MSP430 Ses Kontrollü Disko Işık Sistemi',
    'education.projects.msp430Audio.description': 'Bir mikrodenetleyici kullanarak sesin seviyesini algılayan ve buna göre LED\'leri kontrol eden bir gömülü sistem projesi.',
    'education.projects.stm32Oled.title': 'STM32 OLED Zaman Kontrollü Buton Sayacı',
    'education.projects.stm32Oled.description': 'STM32 tabanlı, bir OLED ekran üzerinde zaman ve buton sayımı yapan bir gömülü sistem yazılımı',
    'education.projects.phasedArray.title': 'Fazlı Dizi Mikroşerit Antenlerde Işın Yönlendirme',
    'education.projects.phasedArray.description': 'Birden fazla anten elemanının faz farklarını kullanarak elektromanyetik ışını belirli bir yöne yönlendirme üzerine bir tez çalışması.',
    'education.projects.dcPowerSupply.title': 'DC Güç Kaynağı',
    'education.projects.dcPowerSupply.description': 'Ayarlanabilir bir DC güç kaynağı devresi tasarlayarak şematik ve PCB çizimi yapılması.',
    'education.projects.voiceMotor.title': 'Ses Kontrollü DC Motor Sistemi',
    'education.projects.voiceMotor.description': 'Ses sinyallerine göre bir DC motorun dönüş hızını ve yönünü kontrol eden klasik bir kontrol sistemi',

    // Certificates Section
    'certificates.title': 'Sertifikalar',
    'certificates.subtitle': 'Sürekli öğrenim ve ileri teknolojilerde mesleki gelişim',
    'certificates.viewDetails': 'Detayları Görüntüle',
    'certificates.verify': 'Doğrula',
    'certificates.download': 'Dosyayı İndir',
    'certificates.issued': 'Verilme Tarihi',
    'certificates.credentialId': 'Kimlik Numarası',
    'certificates.underwater.title': 'Su Altı Sistemleri Tasarım Eğitimi',
    'certificates.underwater.issuer': 'Uzmanlık Eğitimi',
    'certificates.underwater.description': 'Su altı araçlarının tasarımı ve mühendisliğine odaklanan kapsamlı bir eğitim. Bu eğitimde, tasarım kriterleri, sistem bileşenleri, çevresel faktörler ve operasyonel gereksinimler gibi konulara dikkat edilerek su altı sistemlerinin nasıl geliştirileceği üzerine bilgi edindim.',
    'certificates.career.title': 'Kariyer ve Yetkinlik Buluşmaları',
    'certificates.career.issuer': 'Savunma Sanayi Akademi',
    'certificates.career.description': 'Savunma Sanayi Başkanlığı\'nın düzenlediği \'Milli Yetkinlik Hamlesi\' kapsamında gerçekleştirilen \'Kariyer ve Yetkinlik Buluşmaları-2\' etkinliğine katılım.',
    'certificates.thesis.title': 'Bitirme Tezi',
    'certificates.thesis.issuer': 'Kocaeli Üniversitesi',
    'certificates.thesis.description': 'Faz dizinli mikroşerit antenlerde hüzme yönlendirme üzerine yapılan ve ileri simülasyon araçlarının kullanıldığı lisans tez projemin tamamlanması',

    // Contact Section
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Yenilikçi elektronik projelerde işbirliği yapmaya hazır mısınız? Bir sonraki büyük fikrinizi tartışalım.',
    'contact.info': 'İletişim Bilgileri',
    'contact.connect': 'Benimle Bağlantı Kurun',
    'contact.collaborate': 'İşbirliği Yapalım',
    'contact.collaborateText': 'Elektronik ve gömülü sistemler alanındaki bilgi ve deneyimlerimi yeni projelerde paylaşmaya ve geliştirmeye her zaman açığım. PCB tasarımı, gömülü yazılım ve RF mühendisliği konularında fikir alışverişi yapmaktan ve birlikte yenilikçi çözümler üretmekten memnuniyet duyarım. Eğer projenizi hayata geçirmek için iş birliği arıyorsanız, katkı sunmaya hazırım.',
    'contact.sendMessage': 'Bana Mesaj Gönderin',
    'contact.fullName': 'Ad Soyad',
    'contact.email': 'E-posta Adresi',
    'contact.subject': 'Konu',
    'contact.message': 'Mesaj',
    'contact.messagePlaceholder': 'Proje gereksinimleriniz, zaman çizelgeniz ve karşılaştığınız belirli teknik zorluklar hakkında bana bilgi verin...',
    'contact.send': 'Mesaj Gönder',
    'contact.submitting': 'Gönderiliyor...',
    'contact.success': 'Mesajınız başarıyla gönderildi!',
    'contact.nameRequired': 'Lütfen adınızı girin.',
    'contact.emailInvalid': 'Lütfen geçerli bir e-posta adresi girin.',
    'contact.subjectRequired': 'Lütfen bir konu girin.',
    'contact.messageRequired': 'Lütfen mesajınızı girin.',
    'contact.recaptchaRequired': 'reCAPTCHA doğrulaması gerekli.',
    'contact.networkError': 'Bir ağ hatası oluştu. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.',
    'contact.generalError': 'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.',

    // Footer
    'footer.madeWith': 've son teknoloji ile yapıldı.',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.specializations': 'Uzmanlık Alanları',
    'footer.scrollToTop': 'Yukarı çık',

    // Common
    'common.phone': 'Telefon',
    'common.location': 'Konum',
    'common.current': 'Mevcut',
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
    'hero.description': 'Experienced in antenna systems, RF circuits, PCB design, microstrip and phased array antenna design, and embedded systems development with microcontrollers like STM32 and MSP430.',
    'hero.viewProjects': 'View My Projects',
    'hero.getInTouch': 'Get in Touch',
    'hero.downloadCV': 'Download CV',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Turning ideas into innovative electronic solutions',
    'about.mainTitle': 'Overview',
    'about.description1': "My education in Electronics and Communications Engineering provided me with a strong foundation, graduating as a well-equipped engineer from Kocaeli University. I have comprehensive knowledge in antenna systems, RF circuits, embedded systems, and PCB design.",
    'about.description2': 'During my studies, I worked on antenna simulations using CST Studio Suite and participated in embedded systems projects with microcontrollers such as STM32 and MSP430.',
    'about.description3': "Additionally, I completed numerous practical projects covering PCB design and fabrication, digital control systems, and complex number representation applications using MATLAB. My projects range from DC power supply design to advanced phased array antenna steering systems. I am passionate about turning theoretical knowledge into practical applications and continuously enhancing my skills in the field of electronics engineering.",
    'about.stats.projects': 'Projects Completed',
    'about.stats.graduate': 'Graduate Year',
    'about.stats.technologies': 'Technologies Used',
    'about.stats.gpa': 'GPA',

    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Comprehensive expertise across hardware design, embedded systems, and RF engineering',
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
    'projects.dcPowerSupply.description': 'Design and implementation of a regulated DC power supply based on the LM317 adjustable regulator. The project included schematic design, circuit simulation, and 2-layer PCB fabrication. While the regulator\'s built-in protection features ensured safe operation, the external design focused on efficiency and stable output.',
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
    'projects.complexNumberApp.description': 'This project is a MATLAB Application that performs real-time conversions between rectangular and polar coordinates of complex numbers. Designed with user-friendly Matlab App Designer, it features interactive sliders and a dynamic plotting area for instant visualization of complex number vectors.',
    'projects.complexNumberApp.features': [
      'Real-time rectangular-polar conversion',
      'Interactive graphical visualization',
      'User-friendly MATLAB GUI',
      'Mathematical computation engine',
      'Educational interface design'
    ],
    'projects.msp430DiscoLights.title': 'MSP430 Voice-Controlled Disco Light System',
    'projects.msp430DiscoLights.description': 'This embedded system uses an MSP430 microcontroller to control LEDs based on sound intensity. The project includes hardware design in Altium Designer and firmware development in C. The system processes analog audio signals through the MSP430\'s ADC to create real-time, responsive sound-to-light effects.',
    'projects.msp430DiscoLights.features': [
      'Real-time audio signal processing',
      'ADC for sound level detection',
      'Custom PCB Design: Compact, custom-fabricated circuit board',
      'Embedded C programming'
    ],
    'projects.stm32OledCounter.title': 'STM32 OLED Time-Controlled Button Counter',
    'projects.stm32OledCounter.description': 'STM32-based time-controlled button counting system with OLED display, featuring hardware and software development.',
    'projects.stm32OledCounter.features': [
      'Interrupt-based button handling',
      'Timer-based counting system',
      'OLED display interface',
      'STM32 microcontroller programming',
      'Real-time embedded system design'
    ],
    'projects.voiceControlledMotor.title': 'Voice-Controlled DC Motor System',
    'projects.voiceControlledMotor.description': 'This project is a classic control system that operates a DC motor based on voice signals. Initially designed and simulated in Multisim, the circuit uses a condenser microphone to capture sound. This weak signal is then amplified by two transistors to sufficient levels to drive the DC motor.',
    'projects.voiceControlledMotor.features': [
      'Audio Signal Amplification',
      'Analog-to-Mechanical Conversion: Converts audio signals to motor movement',
      'Custom PCB design and fabrication',
      'Integrated Design Process: Complete workflow from simulation to physical product'
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
    'projects.phasedArrayAntenna.description': 'Completed as an undergraduate thesis, this project focuses on the design and analysis of phased array microstrip antennas for beam steering applications. Using CST Studio Suite, the project explores the theoretical principles of phased arrays and their practical implementation in simulation environments.',
    'projects.phasedArrayAntenna.features': [
      'Phased array antenna design',
      'Beam steering algorithm development',
      'CST Studio Suite simulation',
      'Array factor analysis',
      'Thesis research and documentation'
    ],

    // Experience Section
    'experience.title': 'Experience',
    'experience.subtitle': 'Prioritizing learning and production in every project.',
    'experience.achievements': 'Key Experiences',
    'experience.dmy.company': 'DMY Electric Automation Lighting',
    'experience.dmy.position': 'Electronics Engineering Intern',
    'experience.dmy.period': 'Jul 2025 - Aug 2025',
    'experience.dmy.location': 'Istanbul, Turkey',
    'experience.dmy.description': 'I worked on PCB design, embedded software development, and field testing processes for ARM-based sensor circuits. I contributed to debugging efforts by testing hardware-software integration.',
    'experience.dmy.achievements': [
      'Actively contributed to the schematic drawing and layout phases of ARM-based sensor circuit PCB design process using Altium Designer.',
      'Tested hardware-software integration with embedded C language to ensure proper system operation.',
      'Participated in data collection and debugging processes during field testing of sensor circuits, contributing to the product validation phase.'
    ],
    'experience.medel.company': 'Medel Electronics and Engineering',
    'experience.medel.position': 'Electronics Engineering Intern',
    'experience.medel.period': 'Jul 2023 - Sep 2023',
    'experience.medel.location': 'Istanbul, Turkey',
    'experience.medel.description': 'I worked on technical documentation analysis, embedded software review, and error tracking processes in the High Voltage Converter (HVC) project. I supported the engineering team in product testing.',
    'experience.medel.achievements': [
      'Performed compliance analysis of project requirements by examining technical documentation related to the High Voltage Converter (HVC) project.',
      'Supported error tracking and system optimization efforts by analyzing embedded software structure written in C language.',
      'Contributed to quality control and functional verification steps by working with the engineering team in electronic production and product testing processes.'
    ],

    // Education Section
    'education.title': 'Education',
    'education.subtitle': 'Strong academic foundation in electronics and communications engineering and advanced technologies',
    'education.degree.electronics': 'Electronics and Communications Engineering',
    'education.degree.highschool': 'High School Graduation',
    'education.university.kocaeli': 'Kocaeli University',
    'education.university.habire': 'Habire Yahşi Anatolian High School',
    'education.thesis.title': 'Beam Scanning in Phased Array Microstrip Antennas',
    'education.coursework.title': 'Relevant Coursework',
    'education.academicProjects.title': 'Academic Projects',
    'education.projects.msp430Audio.title': 'MSP430 Voice-Controlled Disco Light System',
    'education.projects.msp430Audio.description': 'An embedded system project that detects sound levels using a microcontroller and controls LEDs accordingly.',
    'education.projects.stm32Oled.title': 'STM32 OLED Time-Controlled Button Counter',
    'education.projects.stm32Oled.description': 'An embedded system software based on STM32 that performs time and button counting on an OLED display',
    'education.projects.phasedArray.title': 'Beam Steering in Phased Array Microstrip Antennas',
    'education.projects.phasedArray.description': 'A thesis study on directing electromagnetic beams in a specific direction using phase differences of multiple antenna elements.',
    'education.projects.dcPowerSupply.title': 'DC Power Supply',
    'education.projects.dcPowerSupply.description': 'Designing an adjustable DC power supply circuit and creating schematic and PCB drawings.',
    'education.projects.voiceMotor.title': 'Voice-Controlled DC Motor System',
    'education.projects.voiceMotor.description': 'A classic control system that controls the rotation speed and direction of a DC motor according to voice signals',

    // Certificates Section
    'certificates.title': 'Certificates',
    'certificates.subtitle': 'Continuous learning and professional development in advanced technologies',
    'certificates.viewDetails': 'View Details',
    'certificates.verify': 'Verify',
    'certificates.download': 'Download Certificate',
    'certificates.issued': 'Issued',
    'certificates.credentialId': 'Credential ID',
    'certificates.underwater.title': 'Underwater Systems Design Training',
    'certificates.underwater.issuer': 'Specialized Training',
    'certificates.underwater.description': 'A comprehensive training focused on the design and engineering of underwater vehicles. In this training, I gained knowledge on how to develop underwater systems by paying attention to topics such as design criteria, system components, environmental factors, and operational requirements.',
    'certificates.career.title': 'Career and Competency Meetings',
    'certificates.career.issuer': 'Defense Industry Academy',
    'certificates.career.description': 'Participation in the \'Career and Competency Meetings-2\' event held within the scope of the \'National Competency Initiative\' organized by the Presidency of Defense Industries.',
    'certificates.thesis.title': 'Graduation Thesis',
    'certificates.thesis.issuer': 'Kocaeli University',
    'certificates.thesis.description': 'Completion of my undergraduate thesis project on beam steering in phased array microstrip antennas using advanced simulation tools',

    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to collaborate on innovative electronics projects? Let\'s discuss your next big idea.',
    'contact.info': 'Contact Information',
    'contact.connect': 'Connect With Me',
    'contact.collaborate': 'Let\'s Collaborate',
    'contact.collaborateText': 'I’m always open to sharing my knowledge and experience in electronics and embedded systems through new projects. I’d be glad to exchange ideas and create innovative solutions together in areas such as PCB design, embedded software, and RF engineering. If you’re looking for collaboration to bring your project to life, I’m ready to contribute.',
    'contact.sendMessage': 'Send Me a Message',
    'contact.fullName': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project requirements, timeline, and any specific technical challenges you\'re facing...',
    'contact.send': 'Send Message',
    'contact.submitting': 'Submitting...',
    'contact.success': 'Your message has been sent successfully!',
    'contact.nameRequired': 'Please enter your name.',
    'contact.emailInvalid': 'Please enter a valid email address.',
    'contact.subjectRequired': 'Please enter a subject.',
    'contact.messageRequired': 'Please enter your message.',
    'contact.recaptchaRequired': 'reCAPTCHA verification is required.',
    'contact.networkError': 'A network error occurred. Please check your connection and try again.',
    'contact.generalError': 'Something went wrong. Please try again later.',

    // Footer
    'footer.madeWith': 'and cutting-edge technology.',
    'footer.quickLinks': 'Quick Links',
    'footer.specializations': 'Specializations',
    'footer.scrollToTop': 'Scroll to top',

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
