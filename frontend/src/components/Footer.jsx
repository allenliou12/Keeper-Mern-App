const Year = new Date().getFullYear();

function Footer() {
  return (
    <footer>
      <p>
        Copyright © {Year}
      </p>
    </footer>
  );
}

export default Footer;