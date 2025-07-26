import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Home, Instagram, Mail } from 'lucide-react';
import FloatingIcons from "./components/FloatingIcons";

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  aspectRatio: '16:9' | '9:16';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, title, aspectRatio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(title === "Showreel" ? false : true);
  const [showControls, setShowControls] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlayPause = () => {
    const video = document.getElementById(title) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
        setShowOverlay(true);
      } else {
        video.play();
        setShowOverlay(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById(title) as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const aspectRatioClass = aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16]';

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-lg bg-gray-900 ${aspectRatioClass}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        id={title}
        className="w-full h-full object-cover"
        poster={poster}
        muted={isMuted}
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
      
      {/* Play/Pause Overlay */}
      <div 
  className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-500 ${
    isPlaying ? 'opacity-0' : 'opacity-100'
  }`}
  onClick={handlePlayPause}
>
  <button className="p-4 rounded-full glass-button">
    {isPlaying ? (
      <Pause className="w-8 h-8 text-white" />
    ) : (
      <Play className="w-8 h-8 text-white ml-1" />
    )}
  </button>
</div>


      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium text-sm text-glow-white">{title}</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
            <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200">
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/aamir.naqvii/', '_blank');
  };

  return (
    <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
     <div className="relative rounded-full px-3 md:px-9 py-2 shadow-lg text-white backdrop-blur-lg border border-white/10 hover:shadow-full transition-all duration-300 overflow-hidden">

  {/* Background gradient with opacity */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0e006b] via-[#130029] to-[#00020d] opacity-20 rounded-full -z-10"></div>
        <div className="flex items-center space-x-2 md:space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'home' 
                ? 'bg-blue-600 text-white text-glow-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10 text-glow-gray'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline text-glow-white">Home</span>
          </button>
          
          <button
            onClick={() => scrollToSection('videos')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'videos' 
                ? 'bg-blue-600 text-white text-glow-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10 text-glow-gray'
            }`}
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline text-glow-white">Videos</span>
          </button>
          
          <button
            onClick={openInstagram}
            className="flex items-center space-x-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-glow-gray"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline text-glow-white">Instagram</span>
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'contact' 
                ? 'bg-blue-600 text-white text-glow-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10 text-glow-gray'
            }`}
          >
            <Mail className="w-6 h-6" />
            <span className="text-sm font-medium hidden sm:inline text-glow-white">Contact</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const landscapeVideos = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Commercial Project"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Music Video"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Documentary"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Short Film"
    }
  ];

  const portraitVideos = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Social Media Ad"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      poster: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Instagram Reel"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      poster: "https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "TikTok Video"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      poster: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Mobile Story"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <FloatingNavbar /> 
      
      {/* Hero Section */}
   <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] text-white">
      {/* Sophisticated Grid Background */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a]"></div>
        
        {/* Grid Pattern SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Small main grid pattern with wave effect */}
            <pattern id="sophisticatedGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <path d="M 0 0 L 40 0" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.8" fill="none">
                <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" begin="0s"/>
              </path>
              <path d="M 0 40 L 40 40" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.8" fill="none">
                <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" begin="1s"/>
              </path>
              {/* Vertical lines */}
              <path d="M 0 0 L 0 40" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.8" fill="none">
                <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" begin="2s"/>
              </path>
              <path d="M 40 0 L 40 40" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.8" fill="none">
                <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" begin="3s"/>
              </path>
              {/* Corner dots */}
              <circle cx="0" cy="0" r="1" fill="rgba(59, 130, 246, 0.5)">
                <animate attributeName="r" values="0.5;1.5;0.5" dur="3s" repeatCount="indefinite" begin="0s"/>
                <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="0s"/>
              </circle>
              <circle cx="40" cy="0" r="1" fill="rgba(59, 130, 246, 0.5)">
                <animate attributeName="r" values="0.5;1.5;0.5" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
              <circle cx="0" cy="40" r="1" fill="rgba(59, 130, 246, 0.5)">
                <animate attributeName="r" values="0.5;1.5;0.5" dur="3s" repeatCount="indefinite" begin="1s"/>
                <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="1s"/>
              </circle>
              <circle cx="40" cy="40" r="1" fill="rgba(59, 130, 246, 0.5)">
                <animate attributeName="r" values="0.5;1.5;0.5" dur="3s" repeatCount="indefinite" begin="1.5s"/>
                <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="1.5s"/>
              </circle>
            </pattern>
            
            {/* Fine grid overlay */}
            <pattern id="fineGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 0 M 0 0 L 0 10" stroke="rgba(99, 179, 237, 0.06)" strokeWidth="0.3" fill="none">
                <animate attributeName="stroke-opacity" values="0.02;0.08;0.02" dur="6s" repeatCount="indefinite"/>
              </path>
            </pattern>
            
            {/* Wave effect pattern */}
            <pattern id="waveGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 0 40 Q 20 20 40 40 T 80 40" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" fill="none">
                <animate attributeName="d" values="M 0 40 Q 20 20 40 40 T 80 40;M 0 40 Q 20 60 40 40 T 80 40;M 0 40 Q 20 20 40 40 T 80 40" dur="8s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.1;0.25;0.1" dur="8s" repeatCount="indefinite"/>
              </path>
              <path d="M 40 0 Q 60 20 80 0" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.8" fill="none">
                <animate attributeName="d" values="M 40 0 Q 60 20 80 0;M 40 0 Q 60 -10 80 0;M 40 0 Q 60 20 80 0" dur="6s" repeatCount="indefinite" begin="2s"/>
                <animate attributeName="stroke-opacity" values="0.05;0.15;0.05" dur="6s" repeatCount="indefinite" begin="2s"/>
              </path>
            </pattern>
            
            {/* Deep blue blur filter */}
            <filter id="deepBlueBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feColorMatrix in="blur" type="matrix" 
                values="0.1 0.3 0.9 0 0
                        0.05 0.2 0.7 0 0
                        0.0 0.1 0.8 0 0
                        0 0 0 0.6 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Grid glow effect */}
            <filter id="gridGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" 
                values="0.2 0.4 1.0 0 0
                        0.1 0.3 0.8 0 0
                        0.0 0.2 0.9 0 0
                        0 0 0 0.7 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Wave glow effect */}
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" 
                values="0.3 0.2 1.0 0 0
                        0.2 0.1 0.8 0 0
                        0.1 0.0 0.9 0 0
                        0 0 0 0.5 0"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Apply grid patterns with blur effects */}
          <rect width="100%" height="100%" fill="url(#fineGrid)" opacity="0.4"/>
          <rect width="100%" height="100%" fill="url(#sophisticatedGrid)" filter="url(#gridGlow)"/>
          <rect width="100%" height="100%" fill="url(#waveGrid)" filter="url(#waveGlow)" opacity="0.6"/>
        </svg>
        
        {/* Deep blue blur overlay behind content */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/15 to-purple-900/10 backdrop-blur-[1px]"></div>
        
        {/* Additional depth layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-950/5 to-transparent"></div>
      </div>
      <FloatingIcons />
        {/* Floating Glow Orbs */}
        <div className="absolute top-1/4 left-[90%] w-96 h-96 bg-[#32008a]/60 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1 right-[90%] w-96 h-96 bg-[#00098a]/70 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/7 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0088ff]/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="container mx-auto px-8 py-20">
          <div className="relative z-10">
            {/* Hero Content */}
            <div className="text-center mb-8 md:mb-15">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aamir Naqvi
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4 text-glow-gray">
                Crafting compelling visual stories through the art of editing
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8 md:mb-16 px-4">
                <button 
                  onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto text-glow-white"
                >
                  View Work
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 border border-gray-400 hover:border-white rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto text-glow-white"
                >
                  Contact Me
                </button>
              </div>
            </div>
            
            {/* Showreel */}
            <div className="max-w-4xl mx-auto">
              <div className="relative z-10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-[#0e006b]/20 via-[#130029]/20 to-[#00020d]/20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white px-10 text-glow-white">Showreel</h2>
                <VideoPlayer
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  poster="https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  title="Showreel"ZZ
                  aspectRatio="16:9"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16:9 Portfolio Section */}
      <section id="videos" className="py-12 md:py-20 px-4 md:px-8 relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#010017] to-[#000000]"> 
        {/* Hero Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29]/80 via-[#302b63]/60 to-[#24243e]/80"></div>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="portfolioGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              </pattern>
              <filter id="portfolioGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#portfolioGrid)" filter="url(#portfolioGlow)"/>
          </svg>
        </div>
        
        {/* Floating Glow Orbs */}
        <div className="absolute top-1/4 left-[85%] w-64 h-64 bg-[#32008a]/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[85%] w-64 h-64 bg-[#00098a]/50 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-[#0e006b]/20 via-[#130029]/20 to-[#00020d]/20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-4 text-glow-blue">
                Cinematic Projects
              </h2>
              <p className="text-gray-300 text-center mb-0 max-w-2xl mx-auto px-4 text-glow-gray">
                Wide-format content including commercials, music videos, and documentaries
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {landscapeVideos.map((video, index) => (
                <VideoPlayer
                  key={index}
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  aspectRatio="16:9"
                />
              ))}
            </div>
            </div>
          </div>
      </section>

      {/* 9:16 Portfolio Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#010017] to-[#000000]">
        {/* Hero Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29]/80 via-[#302b63]/60 to-[#24243e]/80"></div>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mobileGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
              </pattern>
              <filter id="mobileGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobileGrid)" filter="url(#mobileGlow)"/>
          </svg>
        </div>
        
        {/* Floating Glow Orbs */}
        <div className="absolute top-1/3 right-[85%] w-64 h-64 bg-[#8a0032]/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-[85%] w-64 h-64 bg-[#8a5f00]/50 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-[#0e006b]/20 via-[#130029]/20 to-[#00020d]/20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-4 text-glow-purple">
                Social Media Content
              </h2>
              <p className="text-gray-300 text-center mb-0 max-w-2xl mx-auto px-4 text-glow-gray">
                Vertical content optimized for mobile platforms and social media
              </p>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
              {portraitVideos.map((video, index) => (
                <VideoPlayer
                  key={index}
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  aspectRatio="9:16"
                />
              ))}
            </div>
            </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
        {/* Contact Section Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contactGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1"/>
              </pattern>
              <filter id="contactGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#contactGrid)" filter="url(#contactGlow)"/>
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white px-4 text-glow-white">Let's Create Something Amazing</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 px-4 text-glow-gray">
              Ready to bring your vision to life? Get in touch to discuss your next project.
            </p>
            <button className="px-8 sm:px-12 py-3 md:py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 mx-4 text-glow">
              Start a Project
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 md:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="text-sm md:text-base text-glow-gray">&copy; 2024 Video Editor Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;