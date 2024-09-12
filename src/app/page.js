"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Code, Globe, Layers, Server, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react';
import "/node_modules/flag-icons/css/flag-icons.min.css";


// Language context
const LanguageContext = createContext();

const translations = {
  en: {
    nav: { services: "Services", projects: "Projects", contact: "Contact" },
    hero: { welcome: "Welcome to RyveWeb", subtitle: "Professional web and branding solutions", cta: "Get in Touch" },
    services: { title: "Our Services", rebranding: "Rebranding Services", rebrandingDesc: "Logo design, flyers, and merchandise creation available", discount: "10% off when combined with a website project!" },
    projects: { title: "Our Projects", all: "All", website: "Website", rebranding: "Rebranding" },
    contact: { 
      title: "Contact Us", 
      name: "Name", 
      email: "Email", 
      message: "Message", 
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred. Please try again."
    },
    footer: { rights: "All rights reserved." }
  },
  fr: {
    nav: { services: "Services", projects: "Projets", contact: "Contact" },
    hero: { welcome: "Bienvenue chez RyveWeb", subtitle: "Solutions professionnelles de web design et branding", cta: "Contactez-nous" },
    services: { title: "Nos Services", rebranding: "Services de rebranding", rebrandingDesc: "Création de logo, flyers et merchandise disponible", discount: "10% de réduction en combinaison avec un projet de website !" },
    projects: { title: "Nos Projets", all: "Tous", website: "Website", rebranding: "Rebranding" },
    contact: { 
      title: "Contactez-nous", 
      name: "Nom", 
      email: "Email", 
      message: "Message", 
      send: "Envoyer",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Une erreur s'est produite. Veuillez réessayer."
    },
    footer: { rights: "Tous droits réservés." }
  }
};

const services = [
  {
    title: { en: "Static Website", fr: "Site Web Statique" },
    price: { en: "Starting at 500€", fr: "À partir de 500€" },
    features: {
      en: [
        "Single page design",
        "Responsive layout",
        "Basic SEO optimization",
        "Contact form integration",
        "2 rounds of revisions",
        "6 months of support for issues"
      ],
      fr: [
        "Design d'une seule page",
        "Mise en page responsive",
        "Optimisation SEO de base",
        "Intégration d'un formulaire de contact",
        "2 cycles de révisions",
        "6 mois de support pour les problèmes"
      ]
    },
    icon: <Code className="w-6 h-6" />
  },
  {
    title: { en: "WordPress Website", fr: "Site Web WordPress" },
    price: { en: "Starting at 750€", fr: "À partir de 750€" },
    features: {
      en: [
        "Custom WordPress theme",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "Content Management System",
        "2 rounds of revisions",
        "6 months of support for issues"
      ],
      fr: [
        "Thème WordPress personnalisé",
        "Design responsive",
        "Optimisation SEO de base",
        "Intégration d'un formulaire de contact",
        "Système de gestion de contenu",
        "2 cycles de révisions",
        "6 mois de support pour les problèmes"
      ]
    },
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: { en: "Multi-page Website", fr: "Site Web Multi-pages" },
    price: { en: "500€ + 250€/page", fr: "500€ + 250€/page" },
    features: {
      en: [
        "Multiple page React website",
        "Responsive design",
        "Advanced SEO optimization",
        "Custom functionality",
        "2 rounds of revisions",
        "6 months of support for issues"
      ],
      fr: [
        "Site web React multi-pages",
        "Design responsive",
        "Optimisation SEO avancée",
        "Fonctionnalités personnalisées",
        "2 cycles de révisions",
        "6 mois de support pour les problèmes"
      ]
    },
    icon: <Layers className="w-6 h-6" />
  },
  {
    title: { en: "Hosting", fr: "Hébergement" },
    price: { en: "10€/month", fr: "10€/mois" },
    features: {
      en: [
        "Managed hosting solution",
        "Regular backups",
        "SSL certificate",
        "24/7 monitoring",
        "Note: VPS access not included in this offer"
      ],
      fr: [
        "Solution d'hébergement gérée",
        "Sauvegardes régulières",
        "Certificat SSL",
        "Surveillance 24/7",
        "Note : L'accès VPS n'est pas inclus dans cette offre"
      ]
    },
    icon: <Server className="w-6 h-6" />
  }
];

const projects = [
  { 
    id: 1, 
    title: { en: "RyveWeb Logo Design", fr: "Design du Logo RyveWeb" },
    category: { en: "Rebranding", fr: "Rebranding" },
    images: ["/assets/logo/logo-full.png"]
  },
  { 
    id: 2, 
    title: { en: "Tert.io Website", fr: "Site Web Tert.io" },
    category: { en: "Website", fr: "Website" },
    images: ["assets/images/tertio-mockup.png", "assets/images/tertio-mockup_2.png"]
  },
  // { 
  //   id: 3, 
  //   title: { en: "E-commerce Platform", fr: "Plateforme E-commerce" },
  //   category: { en: "Website", fr: "Website" },
  //   images: ["/api/placeholder/400/300?text=E-commerce+1", "/api/placeholder/400/300?text=E-commerce+2", "/api/placeholder/400/300?text=E-commerce+3"]
  // },
  // { 
  //   id: 4, 
  //   title: { en: "Tech Startup Branding", fr: "Image de Marque Startup Tech" },
  //   category: { en: "Rebranding", fr: "Rebranding" },
  //   images: ["/api/placeholder/400/300?text=Tech+Startup+1", "/api/placeholder/400/300?text=Tech+Startup+2", "/api/placeholder/400/300?text=Tech+Startup+3"]
  // },
];

const useLanguage = () => useContext(LanguageContext);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NavButton = ({ href, children }) => (
    <a 
      href={href}
      className="
        bg-white text-orange-500 
        hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white
        px-4 py-2 rounded-full 
        transition-all duration-300 ease-in-out 
        text-lg font-semibold 
        shadow-md hover:shadow-lg
        relative overflow-hidden
        group
        border border-black
      "
    >
      <span className="relative z-10">{children}</span>
      <span 
        className="
          absolute inset-0 
          bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 ease-in-out
          animate-gradient-x
        "
      ></span>
    </a>
  );

  return (
    <nav className="bg-orange-500 py-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <Image
            src="/assets/logo/logo-full.png"
            alt="RyveWeb Logo"
            width={500}
            height={10}
            className="h-40 w-auto"
          />
        </a>
        <div className="hidden md:flex space-x-5">
          <NavButton href="#services">{t.nav.services}</NavButton>
          <NavButton href="#projects">{t.nav.projects}</NavButton>
          <NavButton href="#contact">{t.nav.contact}</NavButton>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} 
            className="
              bg-white text-orange-500 
              hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white
              px-4 py-2 rounded-full 
              transition-all duration-300 ease-in-out 
              text-lg font-semibold 
              shadow-md hover:shadow-lg
              relative overflow-hidden
              group
              border border-black
            "
          >
            <span className="relative z-10">
              <span className={`fi fi-${language === 'en' ? 'fr' : 'gb'}`}></span>
            </span>
            <span 
              className="
                absolute inset-0 
                bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 ease-in-out
                animate-gradient-x
              "
            ></span>
          </button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2"
          >
            <NavButton href="#services">{t.nav.services}</NavButton>
            <NavButton href="#projects">{t.nav.projects}</NavButton>
            <NavButton href="#contact">{t.nav.contact}</NavButton>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} 
              className="block w-full text-left px-4 py-2 text-lg font-semibold bg-white text-orange-500 hover:bg-orange-100 transition duration-300"
            >
              <span className={`fi fi-${language === 'en' ? 'fr' : 'gb'} mr-2`}></span>
              {language === 'en' ? 'Français' : 'English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-600 py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.hero.welcome}
          </h1>
          <p className="text-xl mb-8 text-white opacity-90">
            {t.hero.subtitle}
          </p>
          <a 
            href="#contact" 
            className="
              bg-white text-orange-500 px-8 py-3 rounded-full 
              hover:bg-orange-100 transition duration-300 
              transform hover:-translate-y-1
              inline-block font-semibold text-lg
            "
          >
            {t.hero.cta}
          </a>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/assets/illustrations/illustration.png"
            alt="Keyboard Illustration"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const { language } = useLanguage();
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      className="bg-gradient-to-br from-yellow-300 to-orange-500 p-6 rounded-xl shadow-lg flex flex-col items-center transform transition duration-300 border-2 border-black"
    >
      <div className="bg-white p-4 rounded-full mb-6">
        {service.icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white">{service.title[language]}</h3>
      <p className="text-orange-100 text-lg mb-6 font-semibold">{service.price[language]}</p>
      <ul className="text-sm text-white space-y-2 mb-6">
        {service.features[language].map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {feature}
          </motion.li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 transition duration-300"
      >
        {language === 'en' ? 'Choose Plan' : 'Choisir ce plan'}
      </motion.button>
    </motion.div>
  );
};

const PromoBanner = ({ t }) => {
  return (
    <div className="overflow-hidden bg-orange-200 py-2 relative border-t-2 border-b-2 border-orange-500">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
        className="whitespace-nowrap"
      >
        <span className="inline-block px-4 text-orange-800 font-semibold">
          {t.services.rebranding} - {t.services.rebrandingDesc} - {t.services.discount}
        </span>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-20 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">{t.services.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const { language } = useLanguage();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border-2 border-black"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9 h-80">
        <img src={project.images[0]} alt={project.title[language]} className="object-cover w-full h-full" />
      </div>
      <div className="border-t-2 border-black p-4 ">
        <h3 className="text-xl font-semibold mb-2 text-orange-600">{project.title[language]}</h3>
        <p className="text-gray-600">{project.category[language]}</p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { language, t } = useLanguage();
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category[language] === filter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">{t.projects.title}</h2>
        <div className="flex justify-center mb-8">
          {[t.projects.all, t.projects.website, t.projects.rebranding].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`mx-2 px-4 py-2 rounded ${filter === category ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
        <div className="relative aspect-w-16 aspect-h-9">
          <img 
            src={project.images[currentImageIndex]} 
            alt={project.title[language]} 
            className="object-cover w-full h-full"
          />
          <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1">
            <ChevronLeft />
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1">
            <ChevronRight />
          </button>
        </div>
        <h3 className="text-2xl font-bold mt-4 mb-2">{project.title[language]}</h3>
        <p className="text-gray-600 mb-4">{project.category[language]}</p>
        <button onClick={onClose} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Close</button>
      </div>
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">{t.contact.title}</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-orange-600">{t.contact.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-orange-600">{t.contact.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-orange-600">{t.contact.message}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-xl"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t.contact.sending : t.contact.send}
          </button>
          {status === 'success' && <p className="mt-4 text-green-600">{t.contact.success}</p>}
          {status === 'error' && <p className="mt-4 text-red-600">{t.contact.error}</p>}
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-orange-500 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 RyveWeb. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default function Home() {
  const [language, setLanguage] = useState('fr');
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="font-sans">
        <Head>
          <title>RyveWeb - Professional Web Design and Branding Solutions</title>
          <meta name="description" content="RyveWeb offers professional web design and branding solutions" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <PromoBanner t={t} />
        <Navbar />
        <Hero />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}