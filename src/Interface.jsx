import { useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const links = [
  { label: "HOME" },
  { label: "FACTS" },
  { label: "NOURISHMENT" },
  { label: "HERD" },
];

export function Interface({ zone, updateZone, isChangingZone }) {
  const ref = useRef();
  const navRef = useRef();
  const fadeOverlayRef = useRef(); // Reference for side menu fade overlay

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
      // duration: 0.1, // Smooth transition duration
      ease: "power2.out", // Smooth easing
    });
  }

  function CloseFadeOverlay() {
    // Smooth fade-out overlay for side menu
    gsap.to(fadeOverlayRef.current, {
      opacity: 0,
      // duration: 2.25, // Smooth transition duration
      ease: "power2.in", // Smooth easing for fade-out
      onComplete: () => {
        gsap.set(fadeOverlayRef.current, { display: "none" });
      },
    });
  }

  function Movetosection(value) {
    if (isChangingZone.current) return;

    // console.log("setDefrotation:", setDefrotation);

    OpenFadeOverlay(); // Open fade overlay

    Close();

    // switch (value) {
    //   case 1:
    //     document.querySelectorAll("div").forEach((el, i) => {
    //       const mysheetPosition = 1.12; // This is the current position

    //       // Calculate scroll offset
    //       const scrollOffset = (mysheetPosition - 1.4) / 22.5;

    //       // Calculate scrollTop
    //       const scrollableElement = el;
    //       const scrollableHeight =
    //         scrollableElement.scrollHeight - scrollableElement.clientHeight;
    //       const scrollTop = scrollOffset * scrollableHeight;

    //       el.scrollTop = scrollTop;
    //     });
    //     setDefrotation([0, 0, 0]); // Example rotation for section 1

    //     break;

    //   case 2:
    //     document.querySelectorAll("div").forEach((el, i) => {
    //       const mysheetPosition = 7; // This is the current position

    //       // Calculate scroll offset
    //       const scrollOffset = (mysheetPosition - 1.4) / 22.5;

    //       // Calculate scrollTop
    //       const scrollableElement = el;
    //       const scrollableHeight =
    //         scrollableElement.scrollHeight - scrollableElement.clientHeight;
    //       const scrollTop = scrollOffset * scrollableHeight;

    //       el.scrollTop = scrollTop;
    //     });

    //     setDefrotation([0, 6.3, 0]); // Example for section 2
    //     break;

    //   case 3:
    //     document.querySelectorAll("div").forEach((el, i) => {
    //       const mysheetPosition = 10; // This is the current position

    //       // Calculate scroll offset
    //       const scrollOffset = (mysheetPosition - 1.4) / 22.5;

    //       // Calculate scrollTop
    //       const scrollableElement = el;
    //       const scrollableHeight =
    //         scrollableElement.scrollHeight - scrollableElement.clientHeight;
    //       const scrollTop = scrollOffset * scrollableHeight;

    //       el.scrollTop = scrollTop;
    //     });
    //     setDefrotation([0, 6.3, 0]); // Section 3
    //     break;

    //   case 4:
    //     document.querySelectorAll("div").forEach((el, i) => {
    //       const mysheetPosition = 12.82; // This is the current position

    //       // Calculate scroll offset
    //       const scrollOffset = (mysheetPosition - 1.4) / 22.5;

    //       // Calculate scrollTop
    //       const scrollableElement = el;
    //       const scrollableHeight =
    //         scrollableElement.scrollHeight - scrollableElement.clientHeight;
    //       const scrollTop = scrollOffset * scrollableHeight;

    //       el.scrollTop = scrollTop;
    //     });

    //     setDefrotation([0, 6.3, 0]); // Section 4
    //     break;
    // }

    updateZone(value, true);

    // Close fade overlay after animations
    setTimeout(() => {
      CloseFadeOverlay();
    }, 2000); // Adjust timing as needed
  }

  return (
    <>
      <img className="scroll-down-img" src="scroll-logo.png" />
      {/*  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.9 }}
        className="milkbox-points-container"
      >
        {links.map((link, i) => (
          <div className="page-link">
            <p>{link.label}</p>
            <img
              onClick={() => Movetosection(i)}
              src="milkbox-logo.png"
              hidden={zone >= i}
            />
            <img
              onClick={() => Movetosection(i)}
              src="milkbox-logo-hovered.png"
              hidden={zone < i}
            />
          </div>
        ))}
      </motion.div>

      <div ref={fadeOverlayRef} className="menu-overlay">
        <div className="custom_div">
          <div className="c_circle"></div>
          <video
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
          ></video>
        </div>
      </div>
      <i className="menu-btn bi bi-list" onClick={() => Open()}></i>

      <div ref={ref} className="menu-overlay">
        <nav ref={navRef} className="menu-buttons">
          <button className="close-btn" onClick={() => toggleClose()}>
            ✕
          </button>
          {links.map((link, i) => (
            <a
              href="#"
              className={`menu-item page-link ${
                zone == i ? "active-menu" : ""
              } `}
              onClick={() => Movetosection(i)}
            >
              {link.label}
              <img
                // src="milkbox-logo.png"
                src={
                  zone === i ? "milkbox-logo-hovered.png" : "milkbox-logo.png"
                }
                className="icon"
              />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
