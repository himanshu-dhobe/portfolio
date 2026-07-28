import {
  Code2,
  Database,
  Cloud,
  Server,
  Network,
  Brain,
} from "lucide-react";

const techStacks = [
  {
    icon: Code2,
    category: "Frontend",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    icon: Server,
    category: "Backend",
    technologies: ["Node.js", "NestJS", "Express.js", "REST APIs"],
  },
  {
    icon: Database,
    category: "Database",
    technologies: ["PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    icon: Cloud,
    category: "Cloud & DevOps",
    technologies: ["AWS", "Docker", "Git", "GitHub"],
  },
  {
    icon: Network,
    category: "Networking",
    technologies: ["TCP/IP", "DNS", "HTTP", "Linux"],
  },
  {
    icon: Brain,
    category: "AI & GenAI",
    technologies: ["OpenAI", "LLMs", "Prompt Engineering", "LangChain"],
  },
];

export const Testimonials = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Technical Skills
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Technologies I
            <span className="font-serif italic font-normal text-white">
              {" "}
              work with.
            </span>
          </h2>

          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A growing toolkit of technologies that I use to build scalable,
            modern, and high-performance applications.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack, idx) => (
            <div
              key={idx}
              className="glass rounded-3xl p-8 glow-border animate-fade-in hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <stack.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-5">
                {stack.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {stack.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-4 py-2 rounded-full bg-surface border border-border/50 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};