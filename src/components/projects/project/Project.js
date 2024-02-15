import './project.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Project = ({ projectInfo, index }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  return (
    <motion.div
      className="project"
      style={{ marginTop: `calc(${projectInfo.marginMultiplier} * 20%)` }}
      initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: index * 0.5 + 0.5,
        },
      }}
    >
      <motion.div
        className="text-box"
        style={{
          translate: `${projectInfo.textX} calc(${projectInfo.marginMultiplier} * -125%)`,
        }}
        initial={
          hasAnimated
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: projectInfo.marginMultiplier * -100 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: index * 0.5 + 0.5,
          },
        }}
        onAnimationComplete={() => {
          setHasAnimated(true);
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
        fugiat quae expedita tempore nesciunt commodi iure quo culpa eius sint
        ab ratione, distinctio vitae eligendi deleniti saepe sapiente rem eum
        exercitationem neque molestias. Alias excepturi quia rerum quod omnis
        corrupti harum vitae mollitia illum, quisquam consequuntur ad aliquam,
        corporis eaque.
      </motion.div>
    </motion.div>
  );
};

export default Project;
