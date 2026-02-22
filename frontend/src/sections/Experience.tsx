import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { siteConfig } from '../config/site';

export function Experience() {
  const { experience } = siteConfig;

  return (
    <section id="experience" className="section-padding bg-accent-pink-light">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white text-accent-pink text-sm font-semibold rounded-full mb-4 shadow-sm">
            Journey
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-text-primary">
            Experience & Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-green to-accent-pink rounded-full hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-green to-accent-pink rounded-full md:hidden" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isWork = item.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} ml-14 md:ml-0`}>
                    <div className="glass-card p-6 inline-block text-left w-full">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            isWork
                              ? 'bg-primary-light text-primary'
                              : 'bg-accent-green-light text-accent-green'
                          }`}
                        >
                          {item.duration}
                        </span>
                        <span className={`text-xs font-medium ${isWork ? 'text-primary' : 'text-accent-green'}`}>
                          {isWork ? 'Work' : 'Education'}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-text-primary">
                        {item.role}
                      </h3>
                      <p className="text-sm text-text-secondary font-medium mb-3">
                        {item.company}
                      </p>

                      <ul className="space-y-1.5">
                        {item.achievements.map((achievement, aI) => (
                          <li
                            key={aI}
                            className="text-sm text-text-secondary flex items-start gap-2"
                          >
                            <span className="text-primary mt-1.5 shrink-0">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 z-10">
                    <div
                      className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${
                        isWork ? 'bg-primary' : 'bg-accent-green'
                      }`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
