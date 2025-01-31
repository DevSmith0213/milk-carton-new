import { useRef, useState, useEffect } from "react";

export const Lastvideo = ({ sheet, ...props }) => {
  const canvasRef = useRef();
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (currentFrame > 185 && sheet.sequence.position > 15) {
      document.querySelector(".last-video-link").style.pointerEvents = "auto";
    } else {
      document.querySelector(".last-video-link").style.pointerEvents = "none";
    }
  }, [currentFrame]);

  useEffect(() => {
    const preloadImages = () => {
      const imageArray = [];
      for (let i = 0; i <= 374; i++) {
        const img = new Image();

        img.src = `images/seq_0_${i}.jpg`;

        img.crossOrigin = "anonymous";
        imageArray.push(img);
      }
      setImages(imageArray);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawFrame = (frameIndex) => {
      if (canvas && ctx && images.length > 0) {
        const img = images[frameIndex];

        if (img.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const x = (canvas.width - img.width) / 2;
          const y = (canvas.height - img.height) / 2;

          if (window.innerWidth < 550) {
            ctx.drawImage(
              img,
              x + 190,
              y + 40,
              img.width * 0.8,
              window.innerWidth > 550 ? img.height : img.height * 0.86
            );
          } else {
            ctx.drawImage(img, x, y, img.width, img.height);
          }
        }
      }
    };

    const animate = () => {
      if (currentFrame >= 1) {
        drawFrame(currentFrame);
      }

      const nextFrame = Math.floor(props.newsheet.value.value) % 376;
      setCurrentFrame(nextFrame);
      animationFrameId = requestAnimationFrame(animate);
    };

    if (images.length > 0) {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [currentFrame, images]);

  return (
    <>
      <div className="images-canvas-link-wrapper">
        <a
          href="https://calcium.calciumco.com/"
          target="_blank"
          className="last-video-link"
        ></a>
      </div>

      <canvas ref={canvasRef} className="images-canvas"></canvas>
    </>
  );
};
