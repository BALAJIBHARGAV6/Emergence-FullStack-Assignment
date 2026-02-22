import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/site';
import { HeroBackground } from '../components/three/HeroBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const { hero, name, social } = siteConfig;

  const typingSequence = hero.typingTexts.flatMap((text) => [text, 2000]);

  return (
    <section className="relative min-h-screen flex items-start lg:items-center overflow-hidden">
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-24 pb-12 lg:pb-0 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green-light border border-accent-green/20 rounded-full"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
              </span>
              <span className="text-sm font-medium text-accent-green">
                {hero.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <AnimatedText
              text={hero.heading}
              className="font-heading text-4xl sm:text-5xl lg:text-[80px] font-bold leading-[1.1] text-text-primary"
            />

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-2 text-xl md:text-2xl text-text-secondary"
            >
              <span className="text-primary font-mono">&gt;</span>
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-heading font-semibold text-primary"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-text-secondary text-lg max-w-lg leading-relaxed"
            >
              {hero.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                <ArrowDown size={18} />
                View My Work
              </a>
              <a href="#contact" className="btn-outline">
                <ArrowDown size={18} />
                Get In Touch
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex items-center gap-4 pt-2"
            >
              {[
                { icon: Github, href: social.github, label: 'GitHub' },
                { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
                { icon: Instagram, href: social.twitter, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-primary hover:border-primary hover:bg-primary-light transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile Area - 40% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              {/* Orbit Ring */}
              <div className="absolute inset-0 -m-6 hidden sm:block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full rounded-full border-2 border-dashed border-primary/20"
                />
              </div>

              {/* Profile Photo Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-green to-accent-pink rounded-3xl rotate-6 opacity-20" />
                <div className="relative w-full h-full bg-gradient-to-br from-primary-light to-white rounded-3xl border-4 border-primary/20 shadow-blue-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5635AQEkulc8oA5S0w/profile-framedphoto-shrink_400_400/B56ZlNbNVfKMAc-/0/1757940602512?e=1772402400&v=beta&t=ziecJWJQa0pbZ46wec5TVweJiyCG3AZJyJouFhVL04A"
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span
                    className="text-6xl md:text-7xl font-heading font-bold text-primary/30 items-center justify-center hidden"
                  >
                    {name
                      .split(' ')
                      .map((w: string) => w[0])
                      .join('')}
                  </span>
                </div>
              </div>

              {/* Floating Stats */}
              {hero.stats.map((stat, i) => {
                const positions = [
                  '-top-4 -right-8',
                  '-bottom-4 -left-8',
                  '-bottom-4 -right-4',
                ];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.2, type: 'spring' }}
                    className={`absolute ${positions[i]} glass-card px-4 py-2.5 z-10`}
                  >
                    <div className="text-lg font-heading font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
