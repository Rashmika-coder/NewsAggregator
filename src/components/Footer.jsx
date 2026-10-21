function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-copyright">
          © 2026 Aladdin365 (Threadline) | All rights reserved
        </div>

        <nav className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms and Conditions</a>
        </nav>

        <button
          type="button"
          className="home-screen-button"
          onClick={() => {
            if (window.deferredPrompt) {
              window.deferredPrompt.prompt();
            } else {
              alert(
                "Use your browser menu to install or add this website to your home screen."
              );
            }
          }}
        >
          📱 Add to Home Screen
        </button>
      </div>

      <div className="footer-disclaimer">
        Content sourced from external RSS feeds. Aladdin365 serves as an
        aggregator and is not the original publisher.
      </div>
    </footer>
  );
}

export default Footer;