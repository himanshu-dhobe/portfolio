import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building responsive and scalable web applications using modern frontend and backend technologies.",
  },
  {
    icon: Rocket,
    title: "Cloud & DevOps",
    description:
      "Learning AWS, Docker, deployment, and cloud technologies to build reliable applications.",
  },
  {
    icon: Users,
    title: "Problem Solving",
    description:
      "Applying logical thinking and programming skills to solve real-world challenges through software.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Exploring AI, Networking, and emerging technologies while constantly improving my technical skills.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Building scalable solutions,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one project at a time.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I'm Himanshu Dhobe, a Computer Science graduate passionate about
                Full Stack Development and continuously expanding my knowledge
                in Cloud Computing, Networking, and Artificial Intelligence.
              </p>

              <p>
                I enjoy building modern web applications using React, Next.js,
                Node.js, NestJS, PostgreSQL, MongoDB, Docker, and AWS while
                focusing on writing clean, scalable, and maintainable code.
              </p>

              <p>
                My goal is to become a versatile Software Engineer capable of
                designing, developing, and deploying reliable applications
                while continuously learning new technologies and solving
                real-world problems.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "Keep learning, keep building, and create technology that makes
                a meaningful impact."
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};