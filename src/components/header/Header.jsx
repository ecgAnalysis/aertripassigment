function Header() {
  return (
    <header>
      <div className="header">
        <div className="css-logo css-logo-white">
          <div className="css-logo-group" data-jqr-go="/home">
            <div className="logo-container">
              <img
                src="./public/images/aertip-vertical-logo-white.svg"
                className="css-logo-icon"
                alt="Logo Icon"
              />
              <img
                src="./public/images/aertrip-name-vertical-white.svg"
                className="css-logo-text"
                alt="Logo Text"
              />
            </div>
          </div>
        </div>
        <div className="navBar">
          <ul>
            <li className="js-flight-search flight-tab active">Flight</li>
            <li className="hotel-tab">Hotel</li>

            <li className="visa" id="visa">
              Visa
            </li>
            <li className="aiTrip" id="aiTrip">
              Holidays
            </li>
          </ul>
        </div>
        <div className="headerRightBar">
          <div className="registerSignIn js-register-signin">LOGIN</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
