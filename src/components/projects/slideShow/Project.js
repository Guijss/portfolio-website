import { useState, useRef, useEffect } from 'react';

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
        <div className="img-container"></div>
        <div className="text-container">
          <div className="text"></div>
          <div className="technologies">
            {project.techs.map((e) => (
              <span>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
