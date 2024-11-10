"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import defaultStadium from "../../../assets/svg/seat/jamsil_default.svg";
import redStadium from "../../../assets/svg/seat/jamsil_red.svg";
import orangeStadium from "../../../assets/svg/seat/jamsil_orange.svg";
import navyStadium from "../../../assets/svg/seat/jamsil_navy.svg";
import blueStadium from "../../../assets/svg/seat/jamsil_blue.svg";
import tableStadium from "../../../assets/svg/seat/jamsil_table.svg";
import premiumStadium from "../../../assets/svg/seat/jamsil_premium.svg";
import greenStadium from "../../../assets/svg/seat/jamsil_green.svg";
import excitingStadium from "../../../assets/svg/seat/jamsil_exciting.svg";

// 좌석별 색상 매핑
const colorMap: { [key: string]: StaticImageData } = {
  "#DC032A": redStadium,
  "#E16900": orangeStadium,
  "#242953": navyStadium,
  "#4699F2": blueStadium,
  "#7C0065": tableStadium,
  "#185DDD": premiumStadium,
  "#339600": greenStadium,
  "#6D6D6D": excitingStadium,
};

// HEX 색상을 RGB로 변환
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const isColorClose = (
  r: number,
  g: number,
  b: number,
  targetColor: { r: number; g: number; b: number },
  tolerance = 50
) => {
  return (
    Math.abs(r - targetColor.r) <= tolerance &&
    Math.abs(g - targetColor.g) <= tolerance &&
    Math.abs(b - targetColor.b) <= tolerance
  );
};

const JamsilSeat = () => {
  const [seatImage, setSeatImage] = useState<StaticImageData>(defaultStadium);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const loadImageToCanvas = useCallback(() => {
    const image: HTMLImageElement = document.createElement("img");
    image.src = seatImage.src;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const scale = window.devicePixelRatio || 1;

        const canvasWidth = 376;
        const canvasHeight = 356;
        canvas.width = canvasWidth * scale;
        canvas.height = canvasHeight * scale;
        
        canvas.style.width = "100%";
        canvas.style.height = "auto";

        if (ctx) {
          ctx.scale(scale, scale);
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          setIsImageLoaded(true);
        }
      }
    };
  }, [seatImage]);

  useEffect(() => {
    loadImageToCanvas();
  }, [loadImageToCanvas]);

  useEffect(() => {
    // 캔버스 외부를 클릭했을 때 기본 이미지로 되돌리는 핸들러
    const handleOutsideClick = (event: MouseEvent) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
        setSeatImage(defaultStadium);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scale = window.devicePixelRatio || 1;
        const pixelData = ctx.getImageData(x * scale, y * scale, 1, 1).data;
        const [r, g, b] = [pixelData[0], pixelData[1], pixelData[2]];

        // 클릭한 색상에 따라 해당 좌석 이미지로 변경
        let matchedImage = defaultStadium;
        Object.keys(colorMap).forEach((hex) => {
          const targetColor = hexToRgb(hex);
          if (isColorClose(r, g, b, targetColor)) {
            matchedImage = colorMap[hex];
          }
        });
        setSeatImage(matchedImage);
      }
    }
  };

  return (
    <div className="flex justify-center mt-6" onClick={() => setSeatImage(defaultStadium)}>
      <canvas
        ref={canvasRef}
        className="w-full max-w-[376px] mx-auto"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default JamsilSeat;
