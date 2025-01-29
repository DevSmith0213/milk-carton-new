import { useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
export function Interface({
  activeMenu,
  setActiveMenu,
  defrotation,
  setDefrotation,
}) {
  const ref = useRef();
  const navRef = useRef();
  const fadeOverlayRef = useRef(); // Reference for side menu fade overlay
  const videoRef = useRef();

  function Open() {
    gsap.set(navRef.current, { opacity: 1 });
    gsap.set(ref.current, { display: "flex" });

    gsap.to(ref.current, { opacity: 1 });
  }

  function toggleClose() {
    const closeTl = gsap.timeline({
      onComplete: () => {
        gsap.set(ref.current, { display: "none" });
      },
    });

    closeTl.to(navRef.current, {
      opacity: 0,
      // duration: 0.2,
      ease: "none",
    });
    closeTl.to(ref.current, {
      opacity: 0,
      // duration: 0.2,
      ease: "none",
    });
  }

  function Close() {
    const closeTl = gsap.timeline({
      onComplete: () => {
        gsap.set(ref.current, { display: "none" });
      },
    });

    closeTl.to(navRef.current, {
      opacity: 0,
      // duration: 2,
      ease: "none",
    });
    closeTl.to(ref.current, {
      opacity: 0,
      // duration: 2.25,
      ease: "none",
    });
  }
  function OpenFadeOverlay() {
    // Smooth fade-in overlay for side menu
    gsap.set(fadeOverlayRef.current, { display: "flex", opacity: 0 });
    gsap.to(fadeOverlayRef.current, {
      opacity: 1,
      duration: 0.1, // Smooth transition duration
      ease: "power2.out", // Smooth easing
    });
  }

  function CloseFadeOverlay() {
    // Smooth fade-out overlay for side menu
    gsap.to(fadeOverlayRef.current, {
      opacity: 0,
      duration: 0.1, // Smooth transition duration
      ease: "power2.in", // Smooth easing for fade-out
      onComplete: () => {
        gsap.set(fadeOverlayRef.current, { display: "none" });
      },
    });
  }

  function Movetosection(value) {
    // console.log("setDefrotation:", setDefrotation);
    setActiveMenu(value);
    OpenFadeOverlay(); // Open fade overlay
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    Close();
    switch (value) {
      case 1:
        document.querySelectorAll("div").forEach((el, i) => {
          const mysheetPosition = 1.12; // This is the current position

          // Calculate scroll offset
          const scrollOffset = (mysheetPosition - 1.4) / 22.5;

          // Calculate scrollTop
          const scrollableElement = el;
          const scrollableHeight =
            scrollableElement.scrollHeight - scrollableElement.clientHeight;
          const scrollTop = scrollOffset * scrollableHeight;

          el.scrollTop = scrollTop;
        });
        setDefrotation([0, 0, 0]); // Example rotation for section 1

        break;

      case 2:
        document.querySelectorAll("div").forEach((el, i) => {
          const mysheetPosition = 7; // This is the current position

          // Calculate scroll offset
          const scrollOffset = (mysheetPosition - 1.4) / 22.5;

          // Calculate scrollTop
          const scrollableElement = el;
          const scrollableHeight =
            scrollableElement.scrollHeight - scrollableElement.clientHeight;
          const scrollTop = scrollOffset * scrollableHeight;

          el.scrollTop = scrollTop;
        });

        setDefrotation([0, 6.3, 0]); // Example for section 2
        break;

      case 3:
        document.querySelectorAll("div").forEach((el, i) => {
          const mysheetPosition = 10; // This is the current position

          // Calculate scroll offset
          const scrollOffset = (mysheetPosition - 1.4) / 22.5;

          // Calculate scrollTop
          const scrollableElement = el;
          const scrollableHeight =
            scrollableElement.scrollHeight - scrollableElement.clientHeight;
          const scrollTop = scrollOffset * scrollableHeight;

          el.scrollTop = scrollTop;
        });
        setDefrotation([0, 6.3, 0]); // Section 3
        break;

      case 4:
        document.querySelectorAll("div").forEach((el, i) => {
          const mysheetPosition = 12.82; // This is the current position

          // Calculate scroll offset
          const scrollOffset = (mysheetPosition - 1.4) / 22.5;

          // Calculate scrollTop
          const scrollableElement = el;
          const scrollableHeight =
            scrollableElement.scrollHeight - scrollableElement.clientHeight;
          const scrollTop = scrollOffset * scrollableHeight;

          el.scrollTop = scrollTop;
        });

        setDefrotation([0, 6.3, 0]); // Section 4
        break;
    }
    // Close fade overlay after animations
    setTimeout(() => {
      CloseFadeOverlay();
    }, 2000); // Adjust timing as needed
  }

  return (
    <>
      <div className="btm-scroll">
        <img className="scroll-down-img" src="scroll.png" />
        <h1>SOFTLY</h1>
        <h1>SCROLL</h1>
      </div>
      {/*  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.8, duration: 0.9 }}
        className="milkbox-points-container"
      >
        <div>
          <p>Home</p>
          <img onClick={() => Movetosection(1)} src="milkbox-logo.png" />
        </div>
        <div>
          <p>Facts</p>
          <img onClick={() => Movetosection(2)} src="milkbox-logo.png" />
        </div>
        <div>
          <p>Nourishment</p>
          <img onClick={() => Movetosection(3)} src="milkbox-logo.png" />
        </div>
        <div>
          <p>Herd</p>
          <img onClick={() => Movetosection(4)} src="milkbox-logo.png" />
        </div>
      </motion.div>
      <div ref={fadeOverlayRef} className="menu-overlay">
        <div className="custom_div">
          <div className="c_circle"></div>
          <video
            ref={videoRef}
            style={{
              opacity: "1",
              position: "relative",
              pointerEvents: "all",
              borderRadius: "100%",
              width: "150px",
              height: "150px",
            }}
            src="/MILK_LOADING_ANIMATION_TRANSP.mov"
            playsInline
            muted
            loop
            autoPlay
            onLoadedData={(e) => {
              e.target.currentTime = 0;
            }}
          ></video>
        </div>
      </div>
      <i className="menu-btn bi bi-list" onClick={() => Open()}></i>

      <div ref={ref} className="menu-overlay">
        <nav ref={navRef} className="menu-buttons">
          <button className="close-btn" onClick={() => toggleClose()}>
            ✕
          </button>
          <a
            href="#"
            className={`menu-item ${activeMenu == 1 ? "active-menu" : ""} `}
            onClick={() => Movetosection(1)}
          >
            HOME
            <img
              // src="milkbox-logo.png"
              src={
                activeMenu === 1
                  ? "milkbox-logo-hovered.png"
                  : "milkbox-logo.png"
              }
              className="icon"
            />
          </a>
          <a
            href="#"
            className={`menu-item ${activeMenu == 2 ? "active-menu" : ""} `}
            onClick={() => Movetosection(2)}
          >
            FACTS
            <img
              // src="milkbox-logo.png"
              src={
                activeMenu === 2
                  ? "milkbox-logo-hovered.png"
                  : "milkbox-logo.png"
              }
              className="icon"
            />
          </a>
          <a
            href="#"
            className={`menu-item ${activeMenu == 3 ? "active-menu" : ""}`}
            onClick={() => Movetosection(3)}
          >
            NOURISHMENT
            <img
              // src="milkbox-logo.png"
              src={
                activeMenu === 3
                  ? "milkbox-logo-hovered.png"
                  : "milkbox-logo.png"
              }
              className="icon"
            />
          </a>
          <a
            href="#"
            className={`menu-item ${activeMenu == 4 ? "active-menu" : ""} `}
            onClick={() => Movetosection(4)}
          >
            THE HERD
            <img
              // src="milkbox-logo.png"
              src={
                activeMenu === 4
                  ? "milkbox-logo-hovered.png"
                  : "milkbox-logo.png"
              }
              className="icon"
            />
          </a>
        </nav>
      </div>
    </>
  );
}
