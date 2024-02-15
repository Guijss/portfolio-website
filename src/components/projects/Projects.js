import Project from './project/Project';
import './projects.scss';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const projects = [
  { text: 'asdaefg', image: '', textX: '-20%', marginMultiplier: 1 },
  { text: 'rgfsgfd', image: '', textX: '0%', marginMultiplier: -1 },
  { text: 'srgsrgs', image: '', textX: '20%', marginMultiplier: 1 },
];

const Projects = () => {
  const ref = useRef(null);

  return (
    <div className="projects" ref={ref}>
      <motion.div className="wrapper">
        {projects.map((item, i) => (
          <Project projectInfo={item} index={i} key={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
