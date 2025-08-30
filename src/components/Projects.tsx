
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Github, ExternalLink, Zap, Brain, Rocket, Cpu, Database, Cloud, Code, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  achievements: string[];
}

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: "Scalable Chatbot Framework",
      description: "Designed and implemented a scalable chatbot framework using DAG architecture and LangChain agents with Voyager + ReACT prompting. This project improved conversation flow accuracy by 30% and reduced support workload significantly.",
      tech: ["LangChain", "DAG", "ReACT", "Voyager", "Python", "AWS"],
      github: "https://github.com/aravindc19/chatbot-framework",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      achievements: ["30% accuracy improvement", "Scalable DAG architecture", "LangChain integration"]
    },
    {
      title: "LLM-Powered Customer Support Automation",
      description: "Fine-tuned Large Language Models using PEFT and LoRA techniques to automate customer support workflows, leading to 8% improvement in KPIs such as resolution time and CSAT scores.",
      tech: ["LLMs", "PEFT", "LoRA", "Hugging Face", "BERT", "GPT"],
      github: "https://github.com/aravindc19/llm-support",
      icon: <Zap className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      achievements: ["8% KPI improvement", "PEFT & LoRA fine-tuning", "Automated workflows"]
    },
    {
      title: "NLP Pipeline Optimization",
      description: "Leveraged Hugging Face Transformers to develop and optimize NLP pipelines for text classification, summarization, and sentiment analysis tasks, achieving 99.95% system uptime.",
      tech: ["Hugging Face", "BERT", "ALBERT", "CLIP", "BART", "NLP"],
      github: "https://github.com/aravindc19/nlp-pipeline",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
      achievements: ["99.95% uptime", "Multi-task NLP", "Transformer optimization"]
    },
    {
      title: "Machine Learning Model Deployment",
      description: "Built end-to-end ML model deployment pipeline with automated testing, monitoring, and scaling capabilities. Implemented A/B testing framework for model performance comparison.",
      tech: ["MLOps", "Docker", "Kubernetes", "TensorFlow", "Monitoring", "A/B Testing"],
      github: "https://github.com/aravindc19/ml-deployment",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      achievements: ["Automated deployment", "A/B testing", "Real-time monitoring"]
    },
    {
      title: "Data Pipeline Architecture",
      description: "Designed and implemented scalable data pipelines for real-time processing of large-scale datasets. Built ETL processes with fault tolerance and data quality validation.",
      tech: ["Apache Kafka", "Spark", "Airflow", "PostgreSQL", "Redis", "Docker"],
      github: "https://github.com/aravindc19/data-pipeline",
      icon: <Database className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-500",
      achievements: ["Real-time processing", "Fault tolerance", "Data validation"]
    },
    {
      title: "Cloud-Native AI Infrastructure",
      description: "Architected cloud-native AI infrastructure on AWS with auto-scaling, load balancing, and cost optimization. Implemented serverless functions for ML inference.",
      tech: ["AWS", "Lambda", "SageMaker", "CloudFormation", "API Gateway", "S3"],
      github: "https://github.com/aravindc19/cloud-ai",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
      achievements: ["Auto-scaling", "Cost optimization", "Serverless ML"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                AI/ML Projects
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent AI/ML projects that demonstrate my expertise in building intelligent systems and scalable solutions.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                {/* Project Header with Icon */}
                <div className={`p-6 ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="text-white">
                      {project.icon}
                    </div>
                    <div className="text-white/80 text-sm font-medium">
                      AI/ML
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${project.gradient}`}></div>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline" 
                        className="bg-slate-800/50 border-slate-600 text-gray-300 hover:bg-slate-700/50 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group bg-slate-800/50 border-slate-600 text-gray-300 hover:bg-slate-700/50 hover:border-purple-500 transition-all duration-300"
                      >
                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Code
                      </Button>
                    </a>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <Button 
                          size="sm" 
                          className={`${project.gradient} text-white hover:scale-105 transition-transform duration-300`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>

                {/* Hover Effects */}
                <div className={`absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white border-0 rounded-full px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              <TrendingUp className="w-6 h-6 mr-3" />
              View More Projects
            </Button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
    </section>
  );
};

export default Projects;
