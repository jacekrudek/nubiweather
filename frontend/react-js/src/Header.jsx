import nubisoftLogo from "./assets/nubisoft.svg";

import "./styles/header.css";

function Header() {
  return (
    <div className="header-container">
      <a href="https://nubisoft.io/" target="_blank">
        <img src={nubisoftLogo} className="" alt="Nubisoft logo" />
      </a>
      <h1>NubiWeather</h1>
    </div>
  );
}

export default Header;
