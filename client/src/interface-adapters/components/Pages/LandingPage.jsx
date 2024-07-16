import "./landing-page.css";

export const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <div className="nav__logo">Lockify</div>
          <ul className="nav__menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="header__content">
          <h1>Welcome to Lockify</h1>
          <p>Your ultimate solution to secure and manage your passwords.</p>
          <a href="#features" className="btn">
            Learn More
          </a>
        </div>
      </header>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="features__container">
          <div className="feature">
            <h3>Secure Encryption</h3>
            <p>
              We use state-of-the-art encryption to keep your passwords safe and
              secure.
            </p>
          </div>
          <div className="feature">
            <h3>Easy Access</h3>
            <p>Access your passwords from any device, anytime, anywhere.</p>
          </div>
          <div className="feature">
            <h3>Auto-fill Forms</h3>
            <p>
              Save time by automatically filling in login forms with a single
              click.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works__steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Create an account and set up your master password.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Store all your passwords in one secure place.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Access and manage your passwords with ease.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need support, feel free to contact us.
        </p>
        <form className="contact__form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Lockify. All rights reserved.</p>
      </footer>
    </div>
  );
};
