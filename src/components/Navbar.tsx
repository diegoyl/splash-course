import React from "react";
import './Navbar.css'

type NavbarProps = {
  onLogoClick: () => void;
  openDummyPopup: (message:string) => void;
  openCreatePopup: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, openDummyPopup, openCreatePopup}) => {
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openDummyPopup("Searching for videos related to '"+searchText+"'")
  };

  const onProfileClick = () => { openDummyPopup("Open Profile Page") }

  return (
    <nav>
        
      <div id="logo-button" className="nav-button" onClick={onLogoClick} style={{fontWeight:"bold"}} >
        <span style={{color:"var(--color-highlight)"}}>Splash</span>
        <span style={{color:"var(--color-logo2)"}}>Course</span>
      </div>


      <div className="center-container">
        <form id="search-bar" onSubmit={handleSearchSubmit} >
            <input
            type="text"
            placeholder="What do you want to learn?"
            value={searchText}
            onChange={handleSearchChange}
            />
        </form>
      </div>


      <div id="create-video-button" className="nav-button" onClick={openCreatePopup}>
        <i className="fas fa-plus"></i>
        <i style={{fontSize:"1.62em",paddingLeft:".2em"}} className="fas fa-video"></i>
      </div>


      <div id="profile-button" className="nav-button" onClick={onProfileClick} >
        <i className="fas fa-user"></i>
      </div>

    </nav>
  );
};

export default Navbar;


