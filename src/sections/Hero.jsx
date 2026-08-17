import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

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
    position: [0, 1.9, 0.1],
    value: 92,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#68A063",
    position: [1.85, 0.65, 0.1],
    value: 88,
  },
 
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    position: [-1.15, -1.65, 0.1],
    value: 86,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    position: [-1.85, 0.65, 0.1],
    value: 85,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    position: [-0.85, 1.65, 0.1],
    value: 90,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    position: [0.9, 1.65, 0.1],
    value: 91,
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    position: [2.0, -0.8, 0.1],
    value: 80,
  },
];

/* =========================================================
   TECH LOGO NODE
========================================================= */

const TechNode = ({
  tech,
  index,
  activeTech,
  setActiveTech,
}) => {
  const groupRef = useRef();

  const Icon = tech.icon;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y =
      tech.position[1] +
      Math.sin(time * 1.2 + index) * 0.07;

    groupRef.current.position.x =
      tech.position[0] +
      Math.cos(time * 0.8 + index) * 0.025;

    groupRef.current.rotation.z =
      Math.sin(time + index) * 0.04;
  });

  const isActive = activeTech === tech.name;

  return (
    <group
      ref={groupRef}
      position={tech.position}
      onPointerOver={(e) => {
        e.stopPropagation();

        setActiveTech(tech.name);

        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setActiveTech(null);

        document.body.style.cursor = "default";
      }}
    >
      {/* Outer glow */}
      <mesh scale={isActive ? 1.35 : 1}>
        <sphereGeometry args={[0.32, 32, 32]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={isActive ? 0.18 : 0.07}
        />
      </mesh>

      {/* Glass logo container */}
      <mesh scale={isActive ? 1.18 : 1}>
        <circleGeometry args={[0.27, 48]} />

        <meshBasicMaterial
          color="#071313"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Logo */}
      <Html
        center
        distanceFactor={5}
        style={{
          pointerEvents: "none",
          transition: "all 0.25s ease",
          transform: `scale(${isActive ? 1.25 : 1})`,
        }}
      >
        <div
          style={{
            width: isActive ? "54px" : "46px",
            height: isActive ? "54px" : "46px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5, 15, 15, 0.9)",
            border: `1px solid ${tech.color}`,
            boxShadow: isActive
              ? `0 0 25px ${tech.color}, inset 0 0 15px ${tech.color}40`
              : `0 0 10px ${tech.color}30`,
          }}
        >
          <Icon
            size={isActive ? 28 : 23}
            color={tech.color}
          />
        </div>
      </Html>

      {/* Connection line toward core */}
      <ConnectionLine
        position={tech.position}
        color={tech.color}
        active={isActive}
      />

      {/* Hover label */}
      {isActive && (
        <Html
          position={[0, -0.55, 0]}
          center
          distanceFactor={5}
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "5px 10px",
              borderRadius: "999px",
              background: "rgba(5, 15, 15, 0.9)",
              border: `1px solid ${tech.color}60`,
              color: "#fff",
              fontSize: "11px",
              whiteSpace: "nowrap",
              boxShadow: `0 0 15px ${tech.color}30`,
            }}
          >
            {tech.name}
          </div>
        </Html>
      )}
    </group>
  );
};

/* =========================================================
   CONNECTION LINE
========================================================= */

const ConnectionLine = ({ position, color, active }) => {
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(
      -position[0] * 0.68,
      -position[1] * 0.68,
      0
    ),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(
    points
  );

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={active ? 0.65 : 0.18}
      />
    </line>
  );
};

/* =========================================================
   ORB
========================================================= */

const OrbCore = ({
  activeTech,
  setActiveTech,
}) => {
  const orbRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!orbRef.current) return;

    /*
      Cursor movement
    */

    const targetX = -pointer.y * 0.35;
    const targetY = pointer.x * 0.55;

    orbRef.current.rotation.x = THREE.MathUtils.lerp(
      orbRef.current.rotation.x,
      targetX,
      0.055
    );

    orbRef.current.rotation.y = THREE.MathUtils.lerp(
      orbRef.current.rotation.y,
      targetY,
      0.055
    );

    /*
      Continuous rotation
    */

    orbRef.current.rotation.z += delta * 0.08;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
      ringRef.current.rotation.y =
        pointer.x * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.16;
      ring2Ref.current.rotation.x =
        pointer.y * 0.2;
    }
  });

  return (
    <group ref={orbRef}>

      {/* Main wireframe orb */}

      <mesh>
        <icosahedronGeometry args={[1.35, 5]} />

        <meshBasicMaterial
          color="#20B2A6"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Inner sphere */}

      <mesh>
        <sphereGeometry args={[1, 64, 64]} />

        <meshStandardMaterial
          color="#061313"
          emissive="#20B2A6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner network */}

      <mesh>
        <sphereGeometry args={[1.03, 32, 32]} />

        <meshBasicMaterial
          color="#20B2A6"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Core light */}

      <pointLight
        color="#20B2A6"
        intensity={8}
        distance={6}
      />

      {/* Orbit ring */}

      <mesh
        ref={ringRef}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[1.75, 0.018, 16, 128]}
        />

        <meshBasicMaterial
          color="#20B2A6"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Second orbit */}

      <mesh
        ref={ring2Ref}
        rotation={[Math.PI / 3, 0.3, 0]}
      >
        <torusGeometry
          args={[1.55, 0.012, 16, 128]}
        />

        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Center label */}

      <Float
        speed={2}
        rotationIntensity={0.15}
        floatIntensity={0.2}
      >
        <Html
          center
          distanceFactor={5}
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#20B2A6",
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: 600,
              textShadow:
                "0 0 15px rgba(32,178,166,.8)",
            }}
          >
            FULL
            <br />
            STACK
          </div>
        </Html>
      </Float>

      {/* Tech logos */}

      {techNodes.map((tech, index) => (
        <TechNode
          key={tech.name}
          tech={tech}
          index={index}
          activeTech={activeTech}
          setActiveTech={setActiveTech}
        />
      ))}
    </group>
  );
};

/* =========================================================
   HERO
========================================================= */

export const Hero = () => {
  const [activeTech, setActiveTech] =
    useState(null);

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

      {/* Floating dots */}

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

                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/20">

                  <Canvas
                    camera={{
                      position: [0, 0, 5],
                      fov: 45,
                    }}
                    dpr={[1, 2]}
                    gl={{
                      antialias: true,
                      alpha: true,
                    }}
                  >

                    <Suspense fallback={null}>

                      <ambientLight intensity={0.3} />

                      <directionalLight
                        position={[3, 4, 5]}
                        intensity={1.5}
                      />

                      <OrbCore
                        activeTech={activeTech}
                        setActiveTech={setActiveTech}
                      />

                    </Suspense>

                  </Canvas>

                  {/* Header */}

                  <div className="absolute top-5 left-5 pointer-events-none">

                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Interactive
                    </div>

                    <div className="text-lg font-semibold text-primary">
                      Tech Core
                    </div>

                  </div>

                  {/* Interaction hint */}

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">

                    <div className="px-4 py-2 rounded-full glass text-xs text-muted-foreground whitespace-nowrap">

                      Move cursor • Hover a logo

                    </div>

                  </div>

                  {/* Active tech */}

                  <div className="absolute bottom-5 right-5 pointer-events-none">

                    <div className="text-xs text-muted-foreground">
                      {activeTech
                        ? `${activeTech} Focus`
                        : "Interactive Stack"}
                    </div>

                  </div>

                </div>

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

                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">

                  <div className="text-2xl font-bold text-primary">
                    4+
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Projects
                  </div>

                </div>

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

      {/* Scroll */}

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