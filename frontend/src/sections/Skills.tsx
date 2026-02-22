import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';
import { SkillsOrbs } from '../components/three/SkillsOrbs';

const categoryColors: Record<string, string> = {
  Frontend: 'hover:bg-primary hover:text-white hover:border-primary',
  Backend: 'hover:bg-accent-green hover:text-white hover:border-accent-green',
  Database: 'hover:bg-accent-pink hover:text-white hover:border-accent-pink',
  Tools: 'hover:bg-primary-dark hover:text-white hover:border-primary-dark',
};

const categoryLabels: Record<string, string> = {
  Frontend: 'bg-primary-light text-primary',
  Backend: 'bg-accent-green-light text-accent-green',
  Database: 'bg-accent-pink-light text-accent-pink',
  Tools: 'bg-blue-50 text-primary-dark',
};

export function Skills() {
  const { skills } = siteConfig;

  return (
    <section id="skills" className="section-padding bg-primary-light relative overflow-hidden">
      <SkillsOrbs />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white text-primary text-sm font-semibold rounded-full mb-4 shadow-blue">
            Tech Stack
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-text-primary">
            {skills.heading}
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    categoryLabels[category.title] || 'bg-primary-light text-primary'
                  }`}
                >
                  {category.title}
                </span>
                <span className="text-xs text-text-muted">
                  {category.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className={`inline-flex items-center px-3.5 py-1.5 bg-white border border-border rounded-lg text-sm font-medium text-text-primary cursor-default transition-all duration-300 ${
                      categoryColors[category.title] || 'hover:bg-primary hover:text-white'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
