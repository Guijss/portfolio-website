import './contact.scss';
import { useRef, useState } from 'react';
import FifteenSlide from '../games/fifteenSlide/FifteenSlide';
import Mines from '../games/mines/Mines';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_omlbnq7', 'template_py7qpxq', formRef.current, {
        publicKey: 'Vx03e1LXTNMWbiP83',
      })
      .then(
        () => {
          setSuccess(true);
        },
        (error) => {
          setError(true);
        }
      );
  };
  return (
    <div className="contact">
      <div className="game">
        <FifteenSlide />
      </div>
      <div className="form">
        <form ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            required
            placeholder="Your Name"
            name="from_name"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            name="from_email"
          />
          <textarea rows={8} placeholder="Message" name="message" />
          <input className="btn" type="submit" value="Send" />
          {error && 'Error'}
          {success && 'Message Sent'}
        </form>
      </div>
      <div className="game">
        <Mines />
      </div>
      <a
        className="foot-note"
        href="https://github.com/Guijss/portfolio-website"
        target="_blank"
        rel="noreferrer"
      >
        <div>Designed and coded by Gui Silva.</div>
      </a>
    </div>
  );
};

export default Contact;
