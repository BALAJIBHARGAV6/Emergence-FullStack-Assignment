import { motion } from 'framer-motion';
import { Monitor, Server, Brain, MapPin, GraduationCap, Target, Languages } from 'lucide-react';
import { siteConfig } from '../config/site';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Brain,
};

const factIconMap: Record<string, React.ElementType> = {
  Location: MapPin,
  Education: GraduationCap,
  Focus: Target,
  Languages,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            About Me
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-text-primary">
            {about.heading}
          </h2>
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-text-secondary text-base leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Quick Facts */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {about.quickFacts.map((fact) => {
                const FactIcon = factIconMap[fact.label] || Target;
                return (
                  <div key={fact.label} className="flex items-start gap-3">
                    <div className="p-2 bg-primary-light rounded-lg shrink-0">
                      <FactIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider">
                        {fact.label}
                      </div>
                      <div className="text-sm font-semibold text-text-primary">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {about.features.map((feature, i) => {
            const FeatureIcon = iconMap[feature.icon] || Monitor;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, shadow: 'var(--tw-shadow-blue-lg)' }}
                className="glass-card p-6 text-center group hover:shadow-blue-lg transition-all duration-300"
              >
                <div className="inline-flex p-3 bg-primary-light rounded-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <FeatureIcon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
