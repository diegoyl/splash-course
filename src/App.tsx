import { useState } from 'react'

// main pages
import LandingPage from "./components/LandingPage.tsx";
import ListPage from "./components/ListPage.tsx";
import WatchPage from "./components/WatchPage.tsx";

// sub-components
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import DummyPopup from "./components/DummyPopup.tsx";
import CreateVideoPopup from "./components/CreateVideoPopup.tsx";

// types
import type { Video } from "./types.ts"; 


function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "list" | "watch">("landing");
  const [selectedVideo, setSelectedVideo] = useState<Video>({title: "",creator: "",url: "",description: "",video_id: "0",});
  const [dummyPopup, setDummyPopup] = useState<string | null>(null); // null when closed, string for message to display when open
  const [createPopup, setCreatePopup] = useState<boolean>(false);
  const [myUsername, setMyUsername] = useState<string>("Default Name");

  // Page navigation
  const goToList = () => setCurrentPage("list");
  const goToWatch = (video: Video) => {
    setSelectedVideo(video);
    setCurrentPage("watch");
  };
  const goToLanding = () => setCurrentPage("landing");
  
  // Popup functions
  const closeDummyPopup = () => setDummyPopup(null)
  const openDummyPopup = (message:string) => setDummyPopup(message)
  
  const closeCreatePopup = () => setCreatePopup(false)
  const openCreatePopup = () => setCreatePopup(true)
  
  return (
    <>
      {/* NAVBAR: hide on landing page */}
      {currentPage != "landing" ? (
        <Navbar
          onLogoClick={goToLanding}
          openDummyPopup={openDummyPopup}
          openCreatePopup={openCreatePopup}
        />
      ) : (<></>)}
      

      {/* POPUPS: hide unless triggered by a button or something */}
      {dummyPopup ? <DummyPopup message={dummyPopup} closeDummyPopup={closeDummyPopup} /> : <></>}
      {createPopup ? <CreateVideoPopup closeCreatePopup={closeCreatePopup}/> : <></>}


      {/* SHOW CURRENT PAGE */}

      {currentPage === "landing" && <LandingPage onContinue={goToList} setMyUsername={setMyUsername}/>}

      {currentPage === "list" && (
        <ListPage onSelectVideo={goToWatch} openDummyPopup={openDummyPopup} myUsername={myUsername} />
      )}

      {currentPage === "watch" && (
        <WatchPage video={selectedVideo} onBack={goToList} openDummyPopup={openDummyPopup} myUsername={myUsername}/>
      )}


      {/* FOOTER ADDS SPACE TO BOTTOM OF CONTENT PAGES */}
      {currentPage != "landing" ? (
        <Footer/>
      ) : (<></>)}
      
    </>
  )
}

export default App
