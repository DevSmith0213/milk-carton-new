"use client";
import { memo, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Loader,
  ScrollControls,
  Environment,
  Plane,
  SoftShadows,
  useGLTF,
  useProgress,
  useScroll,
  Lightformer,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { getProject } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { useEffect, useState, useMemo } from "react";
import { editable } from "@theatre/r3f";
import flyThroughState from "./Animation.json";
import flyThroughStateMobile from "./Mobile-animation.json";
import {
  EffectComposer,
  HueSaturation,
  Vignette,
  BrightnessContrast,
} from "@react-three/postprocessing";
import "./App.css";
import * as THREE from "three";
import gsap from "gsap";
import { Interface } from "./Interface";
import { Lastvideo } from "./Lastvideo";

// Preload 3D model

useGLTF.preload("export.glb");

export default function App() {
  const { progress } = useProgress();
  
  const sheet = useMemo(
    () =>
      getProject("Fly Through", {
        state:
          window.innerWidth > 600 ? flyThroughState : flyThroughStateMobile,
      }).sheet("Scene"),
    []
  );
  const myObject = useMemo(
    () => sheet.object("My Object", { value: 100 }, { reconfigure: true }),
    [sheet]
  );
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [maxspeed, setmaxspeed] =  useState(0.08);
  const [defrotation, setDefrotation] = useState([0, 0, 0]);
  const [activeMenu, setActiveMenu] = useState(1); // State to track the active menu
  const isManualSelectionRef = useRef(false); // To track manual selection
  const handleMenuClick = (menuNumber) => {
    isManualSelectionRef.current = true; // Mark as manual selection
    setActiveMenu(menuNumber);

    // Reset the flag after a delay to allow scrolling updates again
    setTimeout(() => {
      isManualSelectionRef.current = false;
    }, 1000);
  };
  useEffect(() => {
    document
      .querySelectorAll(".milkbox-points-container img")
      .forEach((el, i) => {
        el.addEventListener("click", () => {
          setmaxspeed(10);
          console.log(`after click  : ${maxspeed}`)

          setTimeout(() => {
            setmaxspeed(0.08);
            console.log(`after time out : ${maxspeed}`)
          }, 3000);
        });
      });

    document.querySelectorAll(".menu-buttons a").forEach((el, i) => {
      el.addEventListener("click", () => {
        setmaxspeed(10);

        setTimeout(() => {
          setmaxspeed(0.08);
        }, 3000);
      });
    });
  }, []);
  // console.log(defrotation)

  useEffect(() => {
    if (progress === 100) {
      // Animate to initial position on load complete
      gsap.to(sheet.sequence, {
        position: 1.4,
        duration: 2.6,
        delay: 1,
        onComplete: () => setInitialLoadComplete(true),
      });
    }
  }, [progress, sheet.sequence]);

  return (
    <>
      <Interface
        handleMenuClick={handleMenuClick}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        defrotation={defrotation}
        setDefrotation={setDefrotation}
      />
      <Lastvideo newsheet={myObject} />
       <CanvasContainer
        sheet={sheet}
        maxspeed={maxspeed}
        initialLoadComplete={initialLoadComplete}
        isManualSelectionRef={isManualSelectionRef}
        setActiveMenu={setActiveMenu}
        defrotation={defrotation}
        setDefrotation={setDefrotation}
      />
      <Loader />
    </>
  );
}

const CanvasContainer = memo(
  ({
    sheet,
    maxspeed,
    initialLoadComplete,
    isManualSelectionRef,
    setActiveMenu,
    defrotation,
    setDefrotation,
  }) => {
    return (
      <Canvas
        className="my-canvas"
        sRGBEncoding
        shadows
        gl={{ logarithmicDepthBuffer: true, preserveDrawingBuffer: true }}
      >
        <ScrollControls
          maxSpeed={maxspeed}
          pages={15}
          damping={0.12
          }
            htmlStyle={{ display: "none" }} // Hide scrollbar
          enabled={initialLoadComplete}
        >
          <SheetProvider sheet={sheet}>
            <Suspense fallback={null}>
              <Scene
                isManualSelectionRef={isManualSelectionRef}
                setActiveMenu={setActiveMenu}
                defrotation={defrotation}
                setDefrotation={setDefrotation}
                initialLoadComplete={initialLoadComplete}
              />
            </Suspense>
          </SheetProvider>
        </ScrollControls>

        <Environment resolution={512}>
          <Lightformer
            form="circle"
            color="white"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            color="white"
            intensity={0.1}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </Environment>

        <EffectComposer disableNormalPass multisampling={3}>
          <BrightnessContrast brightness={-0.2} contrast={-0.22} />
          <HueSaturation hue={0} saturation={0.15} />
          <Vignette eskil={false} offset={0.006} darkness={0.425} />
        </EffectComposer>
      </Canvas>
    );
  }
);

function Scene({
  activeMenu,
  isManualSelectionRef,
  setActiveMenu,
  initialLoadComplete,
  setDefrotation,
  defrotation,
}) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { nodes, materials } = useGLTF("export.glb");
  const { scene } = useThree();
  const texture = useTexture("bg-image.png");
  const mainVideo = useVideoTexture("video_prev.mp4");
  mainVideo.flipY = false;
  // console.log("Scene props:", { initialLoadComplete, setDefrotation, defrotation });
  const [rotationReset, setRotationReset] = useState(false); // State to track rotation reset
  const Video = useMemo(
    () =>
      sheet.object("Video2", {
        opacity: { value: 0.5, step: 0.1 },
        duration: { value: 0, step: 0.1 },
      }),
    [sheet]
  );
  // useEffect(() => {
  //   if (scroll.offset > 0.09018224573780129 && !rotationReset) {
  //     // Set rotationReset to true once the sequence starts
  //     setRotationReset(true);
  //   }
  // }, [sheet.sequence.position, rotationReset]);
  useEffect(() => {
    // Set up scene background and materials
    texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;
    materials["arrow-material"].color = new THREE.Color("black");
    materials["video-texture"].map = mainVideo;
  
    
    // Optimize material settings
    Object.values(materials).forEach((material) => {
      if (material.map) {
        material.map.anisotropy = 10;
      }
      material.envMapIntensity = 1;
      material.needsUpdate = true;
    });

    // Set shadow properties for all nodes
    Object.values(nodes).forEach((node) => {
      node.receiveShadow = false;
      node.castShadow = true;
    });
  }, [scene]);
  // console.log(defrotation)
  useEffect(() => {
    // Update opacity of images-canvas based on Video object values
    Video.onValuesChange((values) => {
      document.querySelector(".images-canvas").style.opacity =
        values.opacity.value;
    });
  }, [Video]);
  // console.log(sheet.sequence.position)

  useFrame(() => {
    // if (rotationReset) {
    //   // Reset the rotation to [0, 0, 0] when scroll starts
    //   // You can apply this to any object you need to reset
    //   setTimeout(() => {

    //   }, 6000);
    //   setDefrotation([0, 0, 0]);
    // }

    if (sheet.sequence.position) {
      // updateActiveMenu(
      //   sheet.sequence.position,
      //   setActiveMenu,
      //   isManualSelectionRef
      // );
    }

    // console.log(scroll.offset)
    if (initialLoadComplete) {
      const sequenceLength = 22.5;
      sheet.sequence.position = scroll.offset * sequenceLength + 1.4;
      // Update arrow positions based on sequence position
      if (sheet.sequence.position < 7) {
        nodes["arrow"].position.x = 0.72;
        nodes["arrow2"].position.x = 0.72;
        nodes["arrow3"].position.x = 0.72;
        // nodes["arrow4"].position.x = 0.72;
        nodes["arrow5"].position.x = 0.72;
        nodes["arrow6"].position.x = 0.72;
        nodes["arrow7"].position.x = 0.72;
        nodes["arrow8"].position.x = 0.72;
      }
      if (sheet.sequence.position > 7.05) {
        nodes["arrow"].position.x = 0.75;
        setTimeout(() => {
          nodes["arrow2"].position.x = 0.75;
        }, 200);
        setTimeout(() => {
          nodes["arrow3"].position.x = 0.75;
        }, 350);
        // setTimeout(() => {
        //   nodes["arrow4"].position.x = 0.75;
        // }, 500);
        setTimeout(() => {
          nodes["arrow5"].position.x = 0.75;
        }, 650);
        setTimeout(() => {
          nodes["arrow6"].position.x = 0.75;
        }, 800);
        setTimeout(() => {
          nodes["arrow7"].position.x = 0.75;
        }, 950);
        setTimeout(() => {
          nodes["arrow8"].position.x = 0.75;
        }, 1100);
      }

      // Update milkbox logo states based on sequence position
      updateMilkboxLogoStates(sheet.sequence.position);
    }
  });

  const handleMouseOver = (e) => {
    document.body.style.cursor = "pointer";
    animateScale(e.object, 0.073);
  };

  const handleMouseLeave = (e) => {
    document.body.style.cursor = "default";
    animateScale(e.object, 0.066);
  };

  const animateScale = (object, scale) => {
    gsap.to(object.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.6,
    });
  };

  return (
    <>
      <ambientLight intensity={1.2} />
      <editable.directionalLight
        theatreKey="Light"
        position={[-10, 15, 15]}
        intensity={3.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <SoftShadows size={50} samples={6} />

      <editable.group theatreKey="My group">
        <group rotation={defrotation}>
          <primitive object={nodes.Scene} />
          <primitive
            object={nodes.linkdin}
            onPointerOver={handleMouseOver}
            onPointerLeave={handleMouseLeave}
            onClick={() =>
              window.open("https://www.linkedin.com/company/calcium-company/")
            }
          />
          <primitive
            object={nodes.insta}
            onPointerOver={handleMouseOver}
            onPointerLeave={handleMouseLeave}
            // onClick={() =>
            //   window.open("https://www.instagram.com/calciumandcompany/")
            // }
          />
          <primitive
            object={nodes.work}
            onPointerOver={handleMouseOver}
            onPointerLeave={handleMouseLeave}
            // onClick={() => window.open("https://calciumco.com/careers/")}
          />

          <editable.group theatreKey="Cap">
            <primitive object={nodes.Cap001} />
          </editable.group>
        </group>
      </editable.group>

      <Plane rotation={[-Math.PI * 0.5, 0, 0]} args={[100, 100]} receiveShadow>
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </Plane>
      {/* <OrbitControls/> */}
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.01}
        far={500}
      />
    </>
  );
}

// Helper functions
function updateArrowPositions(position, nodes) {
  const arrowNames = [
    "arrow",
    "arrow2",
    "arrow3",
    // "arrow4",
    "arrow5",
    "arrow6",
    "arrow7",
    "arrow8",
  ];
  const basePosition = position < 7 ? 0.72 : 0.75;

  if (position > 7.05) {
    arrowNames.forEach((name, index) => {
      setTimeout(() => {
        nodes[name].position.x = basePosition;
      }, index * 150);
    });
  } else {
    arrowNames.forEach((name) => {
      nodes[name].position.x = basePosition;
    });
  }
}

function updateMilkboxLogoStates(position) {
  const logoElements = document.querySelectorAll(
    ".milkbox-points-container img"
  );
  const setLogoState = (indices) => {
    logoElements.forEach((el, i) => {
      el.src = indices.includes(i)
        ? "milkbox-logo-hovered.png"
        : "milkbox-logo.png";
    });
  };

  if (position < 1.5) setLogoState([0]);
  else if (position < 5.8) setLogoState([0]);
  else if (position < 7.1) setLogoState([0, 1]);
  else if (position < 9.75) setLogoState([0, 1]);
  else if (position < 12.17) setLogoState([0, 1, 2]);
  else if (position < 22) setLogoState([0, 1, 2, 3]);
}

  function updateActiveMenu(position, setActiveMenu, isManualSelectionRef) {
    if (isManualSelectionRef.current) return; // Skip updating if a menu item was clicked

    switch (true) {
      case position < 5.8:
        setActiveMenu(1);
        break;

      case position >= 5.8 && position < 9.75:
        setActiveMenu(2);
        break;

      case position >= 9.75 && position < 12.22:
        setActiveMenu(3);
        break;

      case position >= 12.22:
        setActiveMenu(4);
        break;

      default:
        setActiveMenu(null); // Optional: Reset or handle unexpected positions
        break;
    }
  }