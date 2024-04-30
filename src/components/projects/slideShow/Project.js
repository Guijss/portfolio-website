import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Project = ({ project }) => {
  const titleRef = useRef();

  const [sizes, setSizes] = useState({ title: { w: 0, h: 0 } });

  useEffect(() => {
    const handleResize = () => {
      const s = {
        title: {
          w: titleRef.current.clientWidth,
          h: titleRef.current.clientHeight,
        },
      };
      setSizes(s);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="project-container">
      <div
        className="title"
        ref={titleRef}
        style={{ fontSize: `${sizes.title.h - 10}px` }}
      >
        {project.title}
      </div>
      <div className="info">
        <div
          className="img-container"
          style={{ transform: `translateX(${project.imgDir * 35}%)` }}
        >
          <a
            className="a-tag"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={project.img} alt=""></img>
          </a>
        </div>
        <div
          className="text-container"
          style={{
            transform: `translate(${-project.imgDir * 60}%, ${
              -project.imgDir * 0
            }px)`,
          }}
        >
          <div className="text">{project.text}</div>
          <a
            className="a-tag"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <motion.div
              className="demo-button"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              Check it out!
            </motion.div>
          </a>
          <div className="technologies">
            {project.techs.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
