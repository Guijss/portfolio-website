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
        <div
          className="img-container"
          style={{ transform: `translateX(${project.imgDir * 35}%)` }}
        ></div>
        <div
          className="text-container"
          style={{
            transform: `translate(${-project.imgDir * 60}%, ${
              -project.imgDir * 10
            }%)`,
          }}
        >
          <div className="text">{project.text}</div>
          <a href={project.url} target="_blank" rel="noreferrer">
            <div className="demo-button">Check it out!</div>
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
