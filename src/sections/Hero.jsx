import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiDocker,
} from "react-icons/si";

const skills = [
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "AWS",
  "Git",
  "GitHub",
  "Networking",
  "AI / GenAI",
];

/* =========================================================
   TECH LOGOS
========================================================= */

const techNodes = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    position: { x: 50, y: 13 },
    value: 92,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    position: { x: 22, y: 29 },
    value: 90,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    position: { x: 78, y: 29 },
    value: 91,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    position: { x: 12, y: 52 },
    value: 85,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#68A063",
    position: { x: 88, y: 52 },
    value: 88,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    position: { x: 25, y: 76 },
    value: 86,
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    position: { x: 75, y: 76 },
    value: 80,
  },
];

/* =========================================================
   INTERACTIVE TECH ORB
========================================================= */

const TechOrb = () => {
  const orbRef = useRef(null);

  const [activeTech, setActiveTech] = useState(null);
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!orbRef.current) return;

      const rect = orbRef.current.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        setRotation({
          x: (0.5 - y) * 10,
          y: (x - 0.5) * 12,
        });
      }
    };

    const handleMouseLeave = () => {
      setRotation({
        x: 0,
        y: 0,
      });
    };

    const element = orbRef.current;

    element?.addEventListener("mousemove", handleMouseMove);
    element?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element?.removeEventListener("mousemove", handleMouseMove);
      element?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="relative w-full aspect-square overflow-hidden rounded-2xl"
      style={{
        perspective: "1200px",
      }}
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(32,178,166,0.16), transparent 55%)",
        }}
      />

      {/* Small background particles */}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, index) => (
          <span
            key={index}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-pulse"
            style={{
              left: `${10 + ((index * 37) % 80)}%`,
              top: `${8 + ((index * 53) % 82)}%`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: `${2 + (index % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* =================================================
          3D SCENE
      ================================================= */}

      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
          `,
          transformStyle: "preserve-3d",
        }}
      >

        {/* =================================================
            ORBIT RINGS
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[70%]
            aspect-square
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-primary/25
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[84%]
            h-[48%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-[50%]
            border
            border-cyan-400/20
            rotate-[25deg]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[84%]
            h-[48%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-[50%]
            border
            border-primary/15
            -rotate-[25deg]
          "
        />

        {/* =================================================
            CONNECTION LINES
        ================================================= */}

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
        >
          {techNodes.map((tech) => (
            <line
              key={tech.name}
              x1="50"
              y1="50"
              x2={tech.position.x}
              y2={tech.position.y}
              stroke={tech.color}
              strokeWidth={
                activeTech === tech.name
                  ? "0.35"
                  : "0.12"
              }
              opacity={
                activeTech === tech.name
                  ? "0.65"
                  : "0.18"
              }
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* =================================================
            CENTER CORE
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[38%]
            aspect-square
          "
        >

          {/* Outer glow */}

          <div
            className="
              absolute
              -inset-8
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "radial-gradient(circle, rgba(32,178,166,.35), transparent 65%)",
            }}
          />

          {/* Rotating ring */}

          <div
            className="
              absolute
              inset-0
              rounded-full
              border
              border-primary/50
              animate-spin
            "
            style={{
              animationDuration: "14s",
            }}
          />

          {/* Second ring */}

          <div
            className="
              absolute
              inset-3
              rounded-full
              border
              border-dashed
              border-cyan-400/25
              animate-spin
            "
            style={{
              animationDuration: "20s",
              animationDirection: "reverse",
            }}
          />

          {/* Core */}

          <div
            className="
              absolute
              inset-7
              rounded-full
              bg-[#061113]/95
              border
              border-primary/40
              flex
              items-center
              justify-center
              overflow-hidden
            "
            style={{
              boxShadow:
                "0 0 45px rgba(32,178,166,.25), inset 0 0 30px rgba(32,178,166,.08)",
            }}
          >

            {/* Grid */}

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(32,178,166,.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(32,178,166,.3) 1px, transparent 1px)
                `,
                backgroundSize: "10px 10px",
              }}
            />

            {/* Core content */}

            <div className="relative text-center">

        

      
              <div className="flex items-center justify-center gap-1.5 mt-3">

                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

              

              </div>

            </div>
          </div>
        </div>

        {/* =================================================
            TECH NODES
        ================================================= */}

        {techNodes.map((tech, index) => {
          const Icon = tech.icon;

          const active = activeTech === tech.name;

          return (
            <div
              key={tech.name}
              className="absolute"
              style={{
                left: `${tech.position.x}%`,
                top: `${tech.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >

              <button
                type="button"
                onMouseEnter={() =>
                  setActiveTech(tech.name)
                }
                onMouseLeave={() =>
                  setActiveTech(null)
                }
                className="relative group"
                style={{
                  animation: `tech-float ${
                    3 + (index % 3)
                  }s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >

                {/* Glow */}

                <span
                  className="absolute inset-[-12px] rounded-full blur-xl transition-all duration-300"
                  style={{
                    background: tech.color,
                    opacity: active ? 0.45 : 0.08,
                  }}
                />

                {/* Logo */}

                <span
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    md:w-14
                    md:h-14
                    rounded-full
                    bg-[#050b0d]/95
                    backdrop-blur-xl
                    border
                    transition-all
                    duration-300
                  "
                  style={{
                    borderColor: active
                      ? tech.color
                      : `${tech.color}55`,
                    boxShadow: active
                      ? `0 0 25px ${tech.color}80`
                      : `0 0 12px ${tech.color}15`,
                    transform: active
                      ? "scale(1.18)"
                      : "scale(1)",
                  }}
                >

                  <Icon
                    className="w-6 h-6 md:w-7 md:h-7"
                    style={{
                      color: tech.color,
                      filter: active
                        ? `drop-shadow(0 0 7px ${tech.color})`
                        : "none",
                    }}
                  />

                </span>

                {/* Tooltip */}

                <span
                  className="
                    absolute
                    left-1/2
                    top-full
                    mt-2
                    -translate-x-1/2
                    px-2.5
                    py-1
                    rounded-full
                    whitespace-nowrap
                    bg-black/90
                    border
                    text-[9px]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-200
                    pointer-events-none
                  "
                  style={{
                    borderColor: `${tech.color}50`,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </span>

              </button>
            </div>
          );
        })}

      </div>

      {/* =================================================
          TOP LABELS
      ================================================= */}

     

      <div className="absolute top-5 right-5 text-right">

        <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          System Status
        </div>

        <div className="text-sm font-semibold text-primary">
          {activeTech || "Full Stack"}
        </div>

      </div>

      {/* =================================================
          BOTTOM INFO
      ================================================= */}

      <div className="absolute bottom-5 left-5">

        <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          {activeTech
            ? `${activeTech} Focus`
            : "Stack Power"}
        </div>

        <div className="text-2xl font-bold text-primary">
          {activeTech
            ? techNodes.find(
                (t) => t.name === activeTech
              )?.value
            : 87}
          %
        </div>

      </div>

      <div className="absolute bottom-5 right-5">

        <div className="px-3 py-1.5 rounded-full bg-black/30 border border-white/5 text-[8px] text-muted-foreground">
          Move • Hover
        </div>

      </div>

    </div>
  );
};

/* =========================================================
   HERO
========================================================= */

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Floating Green Dots */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${(index * 17) % 100}%`,
              top: `${(index * 29) % 100}%`,
              animation: `slow-drift ${
                15 + (index % 10)
              }s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div className="space-y-8">

            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                Full Stack Developer • Cloud & Networking Enthusiast
              </span>
            </div>

            <div className="space-y-4">

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">

                <span className="text-primary glow-text">
                  Himanshu Dhobe
                </span>

                <br />

                Building Modern

                <br />

                <span className="font-serif italic font-normal text-white">
                  Digital Solutions.
                </span>

              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                I'm a Computer Science graduate passionate about building modern
                web applications and exploring Cloud Computing, Networking,
                DevOps, and AI. I enjoy creating scalable applications using
                React, Next.js, NestJS, Node.js, PostgreSQL, MongoDB, and modern
                development tools.
              </p>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">

              <Button size="lg">
                Contact Me
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <AnimatedBorderButton>
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </AnimatedBorderButton>

            </div>

            {/* Social */}

            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">

              <span className="text-sm text-muted-foreground">
                Follow me:
              </span>

              {[
                {
                  icon: Github,
                  href: "https://github.com/YOUR_GITHUB_USERNAME",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/YOUR_LINKEDIN_USERNAME",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}

            </div>
          </div>

          {/* RIGHT */}

          <div className="relative animate-fade-in animation-delay-300">

            <div className="relative max-w-md mx-auto">

              {/* Glow */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-3xl
                  bg-gradient-to-br
                  from-primary/30
                  via-transparent
                  to-primary/10
                  blur-3xl
                  animate-pulse
                "
              />

              <div
                className="
                  relative
                  glass
                  rounded-3xl
                  p-2
                  glow-border
                "
              >

                <TechOrb />

                {/* Availability */}

                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">

                  <div className="flex items-center gap-3">

                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                    <span className="text-sm font-medium">
                      Open to Opportunities
                    </span>

                  </div>

                </div>

                {/* Projects */}

                

              </div>
            </div>
          </div>

        </div>

        {/* Skills */}

        <div className="mt-20 animate-fade-in animation-delay-600">

          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>

          <div className="relative overflow-hidden">

            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />

            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee">

              {[...skills, ...skills].map(
                (skill, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-8 py-4"
                  >
                    <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                      {skill}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">

        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >

          <span className="text-xs uppercase tracking-wider">
            Scroll
          </span>

          <ChevronDown className="w-6 h-6 animate-bounce" />

        </a>

      </div>

    </section>
  );
};