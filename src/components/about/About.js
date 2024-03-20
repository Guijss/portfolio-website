import LightsOut from '../games/lightsOut/LightsOut';
import './about.scss';

const About = () => {
  return (
    <div className="about">
      <div className="wrapper">
        <div className="about-text">
          <div className="text">
            Hello! I'm Gui Silva, and I have a passion for creating content for
            the internet. As a React front-end developer with a background in
            mechanical engineering, my journey into JavaScript began with
            creative coding using p5.js. This experience sparked my interest in
            web development, and I quickly discovered that React was the
            framework I wanted to focus on to enhance and refine my skills.
            <br />
            <br />
            Outside of coding, I enjoy spending my time either playing music or
            engaging in gaming sessions with my friends.
            <br />
            <br />
            Now that you're here, why not join in and play that game over there?
            ➡️
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
