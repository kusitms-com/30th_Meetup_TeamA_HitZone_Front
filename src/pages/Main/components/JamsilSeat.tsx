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

        canvas.width = 376 * scale;
        canvas.height = 356 * scale;
        canvas.style.width = "376px";
        canvas.style.height = "356px";

        if (ctx) {
          ctx.scale(scale, scale);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width / scale, canvas.height / scale);
          setIsImageLoaded(true);
        }
      }
    };
  }, [seatImage]);

  useEffect(() => {
    loadImageToCanvas();
  }, [loadImageToCanvas]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
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
    <div className="relative flex justify-center mt-6">
      <canvas
        ref={canvasRef}
        className="max-w-[376px] max-h-[356px]"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default JamsilSeat;
