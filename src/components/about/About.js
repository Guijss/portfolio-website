import FifteenSlide from '../games/fifteenSlide/FifteenSlide';
import LightsOut from '../games/lightsOut/LightsOut';
import Mines from '../games/mines/Mines';
import './about.scss';

const About = () => {
  return (
    <div className="about">
      <LightsOut />
      <FifteenSlide />
      <Mines />
    </div>
  );
};

export default About;
