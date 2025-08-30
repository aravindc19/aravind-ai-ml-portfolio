
import React from 'react';
import { Terminal, Code, Database, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Skills = () => {
  const skills = [
    { 
      category: "Programming Languages", 
      items: ["Python", "R", "Java", "SQL", "MATLAB"],
      icon: <Code className="w-6 h-6" />
    },
    { 
      category: "Machine Learning & AI", 
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "LLMs", "Deep Learning"],
      icon: <Terminal className="w-6 h-6" />
    },
    { 
      category: "Cloud & Infrastructure", 
      items: ["AWS (SageMaker, EC2, Lambda)", "GCP (BigQuery, Composer)", "Azure", "Docker", "CI/CD"],
      icon: <Database className="w-6 h-6" />
    },
    { 
      category: "Data Engineering", 
      items: ["Apache Spark", "Databricks", "Snowflake", "MongoDB", "PostgreSQL", "ETL Pipelines"],
      icon: <Settings className="w-6 h-6" />
    }
  ];
  return (
    <section id="skills" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {["Skills", "&", "Technologies"].map((word, index) => (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                <span className="hover:text-foreground hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] hover:scale-105 transition-all duration-300 cursor-default inline-block">
                  {word}
                </span>
              </React.Fragment>
            ))}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {["My", "technical", "arsenal", "for", "building", "modern", "applications."].map((word, index) => (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                <span className="hover:text-foreground hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] hover:scale-105 transition-all duration-300 cursor-default inline-block">
                  {word}
                </span>
              </React.Fragment>
            ))}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-foreground group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,1)] group-hover:scale-110 transition-all duration-300">
                  {skillGroup.category}
                </h3>
              </div>
              <div className="space-y-3">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_16px_rgba(255,255,255,1.2)] transition-all duration-300 cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
