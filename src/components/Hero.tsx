import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Brain, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GradientLayer {
  gradient: CanvasGradient;
  alpha: number;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: 'exploding' | 'floating';
  explosionTarget: { x: number; y: number };
  gradients?: GradientLayer[];
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);
  const isVisible = useRef(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Performance monitoring
  const performanceConfig = useMemo(() => ({
    maxParticles: window.innerWidth < 768 ? 50 : window.innerWidth < 1200 ? 100 : 150,
    targetFPS: 60,
    adaptiveQuality: true,
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }), []);

  // Pre-create gradients to avoid recreation every frame
  const createParticleGradients = useCallback((ctx: CanvasRenderingContext2D, size: number): GradientLayer[] => {
    const gradients: GradientLayer[] = [];
    const glowLayers = [
      { size: size * 8, alpha: 0.03, color: '#6969b3' },
      { size: size * 5, alpha: 0.08, color: '#98c1d9' },
      { size: size * 3, alpha: 0.15, color: '#b8e0f5' },
      { size: size * 1.8, alpha: 0.3, color: '#ffffff' }
    ];
    
    glowLayers.forEach(layer => {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layer.size);
      gradient.addColorStop(0, layer.color);
      gradient.addColorStop(1, 'transparent');
      gradients.push({ gradient, alpha: layer.alpha, size: layer.size });
    });
    
    return gradients;
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('mousemove', updateMousePosition);

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Optimize particle count based on device capabilities
      const particleCount = window.innerWidth < 768 ? 50 : window.innerWidth < 1200 ? 100 : 150;

      for (let i = 0; i < particleCount; i++) {
        // Randomly distribute particles across the canvas
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        const particle: Particle = {
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1.5 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.5,
          phase: 'floating',
          explosionTarget: { x: centerX, y: centerY }
        };

        // Pre-create gradients for this particle
        particle.gradients = createParticleGradients(ctx, particle.size);
        
        particles.current.push(particle);
      }
    };

    // Animation loop
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime.current;
      
      // Cap at 60 FPS for smooth animation
      if (deltaTime < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime.current = currentTime;
      timeRef.current += deltaTime * 0.001; // Convert to seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Floating phase with mouse repulsion
        const mouse = mouseRef.current;
        
        // Calculate distance to mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120;
        
        if (distance < repelRadius && distance > 0) {
          // Calculate gentle repulsion force with smooth falloff
          const force = Math.pow((repelRadius - distance) / repelRadius, 3);
          const repelStrength = 0.8;
          
          // Apply smooth repulsion force
          particle.vx += (dx / distance) * force * repelStrength;
          particle.vy += (dy / distance) * force * repelStrength;
        }
        
        // Add very gentle floating motion using unique particle seeds
        const floatSeedX = particle.baseX * 0.001;
        const floatSeedY = particle.baseY * 0.001;
        const floatX = Math.sin(timeRef.current * 0.2 + floatSeedX) * 0.005;
        const floatY = Math.cos(timeRef.current * 0.15 + floatSeedY) * 0.004;
        
        // Apply tiny floating forces
        particle.vx += floatX;
        particle.vy += floatY;
        
        // Apply gentle damping to gradually slow particles
        particle.vx *= 0.997;
        particle.vy *= 0.997;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Screen wrapping instead of bouncing
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Draw particle with optimized rendering
        ctx.save();
        
        const baseAlpha = particle.opacity;
        
        // Use pre-created gradients if available
        if (particle.gradients) {
          // Draw glow layers with pre-created gradients
          particle.gradients.forEach(({ gradient, alpha, size }) => {
            ctx.globalAlpha = baseAlpha * alpha;
            ctx.translate(particle.x, particle.y);
            ctx.fillStyle = gradient;
            ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.translate(-particle.x, -particle.y);
          });
        }
        
        // Draw core
        ctx.globalAlpha = baseAlpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Simplified star rays
        ctx.globalAlpha = baseAlpha * 0.6;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        
        const rayLength = particle.size * 3;
        ctx.beginPath();
        // Vertical ray
        ctx.moveTo(particle.x, particle.y - rayLength);
        ctx.lineTo(particle.x, particle.y + rayLength);
        // Horizontal ray
        ctx.moveTo(particle.x - rayLength, particle.y);
        ctx.lineTo(particle.x + rayLength, particle.y);
        ctx.stroke();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateMousePosition, createParticleGradients]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Floating Icons with Crazy Animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce animation-delay-1000">
          <Brain className="w-12 h-12 text-purple-400 opacity-60 animate-pulse" />
        </div>
        <div className="absolute top-32 right-32 animate-bounce animation-delay-2000">
          <Zap className="w-10 h-10 text-blue-400 opacity-60 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce animation-delay-3000">
          <Rocket className="w-14 h-14 text-pink-400 opacity-60 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce animation-delay-1000">
          <Sparkles className="w-8 h-8 text-yellow-400 opacity-60 animate-pulse" />
        </div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Animated Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Aravind Babu
            </span>
            <br />
            <span className="text-white">
              Somepalli
            </span>
          </h1>
          
          {/* Animated Subtitle */}
          <div className="relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-4 animate-fade-in-up">
              AI / Machine Learning Engineer
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Animated Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Specializing in Large Language Models, Deep Learning, and scalable ML infrastructure. 
          Building intelligent systems that transform how we interact with technology.
        </p>

        {/* Animated Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg font-semibold hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50"
            onMouseEnter={() => setIsHovered(true)}
          >
            <span className="mr-2">Explore My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-full px-8 py-6 text-lg font-semibold hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-slate-900/50"
          >
            <span className="mr-2">Download Resume</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:text-pink-400 transition-colors duration-300">
              5+
            </div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
              50+
            </div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2 group-hover:text-purple-400 transition-colors duration-300">
              99%
            </div>
            <div className="text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Mouse Trail Effect */}
      {isHovered && (
        <div 
          className="fixed w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 animate-ping"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: 'all 0.1s ease-out'
          }}
        />
      )}

      {/* Custom CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes gradient-x {
            0%, 100% { background-size: 200% 200%; background-position: left center; }
            50% { background-size: 200% 200%; background-position: right center; }
          }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
          
          .animation-delay-100 {
            animation-delay: 0.1s;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
    </section>
  );
};

export default Hero;
