import LightsOut from '../games/lightsOut/LightsOut';
import './about.scss';

const About = () => {
  return (
    <div className="about">
      <div className="wrapper">
        <div className="about-text">
          <div className="text">
            Hello! My name is Gui Silva and I enjoy making stuff for the
            internet. I'm a React front-end developer with a background in
            mechanical engineering.
            <br />
            <br />
            I was first introduced to coding back in 2015 with . Proficient in
            HTML, CSS, and JavaScript, I enjoy staying at the forefront of
            front-end technologies.
            <br />
            <br />
            When not coding, you'll find me strumming the strings of my guitar,
            weaving creativity into my daily life. Let's embark on this digital
            adventure together, where engineering meets elegance.
          </div>
        </div>
        <div className="game">
          <LightsOut />
        </div>
      </div>
    </div>
  );
};

export default About;
