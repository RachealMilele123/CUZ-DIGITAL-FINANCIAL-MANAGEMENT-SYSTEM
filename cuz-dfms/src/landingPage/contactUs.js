import React from "react";
import "./../landingPage/contactUs.css";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

import { useForm } from "@mantine/form";

export function ContactUs() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-left">
          <h1>Contact Us</h1>
          <p>
            Have a question or need assistance with your banking services? Our
            team is here to help you anytime.
          </p>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-right">
          <h3>Visit us</h3>
          <p>
            Plot 45 Cairo Road
            <br />
            Lusaka, Zambia
          </p>

          <h3>Call or Email</h3>
          <p>
            +260973108950
            <br />
            kwizelasamson@gmail.com
          </p>

          <div className="social-icons">
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
