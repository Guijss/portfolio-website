import './contact.scss';
import FifteenSlide from '../games/fifteenSlide/FifteenSlide';
import Mines from '../games/mines/Mines';

const Contact = () => {
  return (
    <div className="contact">
      <div className="game">
        <FifteenSlide />
      </div>
      <div className="form">
        <form>
          <input type="text" required placeholder="Your Name" />
          <input type="email" required placeholder="Your Email" />
          <textarea rows={8} placeholder="Message" />
          <button>Send</button>
        </form>
      </div>
      <div className="game">
        <Mines />
      </div>
    </div>
  );
};

export default Contact;
