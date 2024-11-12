"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import defaultStadium from "../../../assets/webp/seat/kt_default.webp";
import cheerSeat from "../../../assets/webp/seat/kt_cheer.webp";
import skySeat from "../../../assets/webp/seat/kt_sky.webp";
import skyZoneSeat from "../../../assets/webp/seat/kt_skyzone.webp";
import kidsLandSeat from "../../../assets/webp/seat/kt_kidsland.webp";
import centralSeat from "../../../assets/webp/seat/kt_central.webp";
import genieTvSeat from "../../../assets/webp/seat/kt_genietv.webp";
import yboxSeat from "../../../assets/webp/seat/kt_ybox.webp";
import alphaShoppingSeat from "../../../assets/webp/seat/kt_alphashopping.webp";
import genieZoneSeat from "../../../assets/webp/seat/kt_geniezone.webp";
import excitingSeat from "../../../assets/webp/seat/kt_exciting.webp";
import outfieldSeat from "../../../assets/webp/seat/kt_outfield.webp";
import tvingSeat from "../../../assets/webp/seat/kt_tving.webp";

// 좌석별 색상 매핑
const colorMap: { [key: string]: StaticImageData } = {
  "#B23039": cheerSeat,
  "#65C5DE": skySeat,
  "#292F46": skyZoneSeat,
  "#008FD7": kidsLandSeat,
  "#5E346E": centralSeat,
  "#599741": genieTvSeat,
  "#F5A545": yboxSeat,
  "#E95560": alphaShoppingSeat,
  "#35659E": genieZoneSeat,
  "#3EA6A5": excitingSeat,
  "#CEDA82": outfieldSeat,
  "#E3A3B1": tvingSeat,
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
  tolerance = 15
) => {
  return (
    Math.abs(r - targetColor.r) <= tolerance &&
    Math.abs(g - targetColor.g) <= tolerance &&
    Math.abs(b - targetColor.b) <= tolerance
  );
};

const KtwizSeat = () => {
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
        const scale = window.devicePixelRatio || 1; // 화면의 배율에 따라 픽셀 밀도를 조절

        const canvasWidth = 366;
        const canvasHeight = 400;
        canvas.width = canvasWidth * scale;
        canvas.height = canvasHeight * scale;

        canvas.style.width = "100%";
        canvas.style.height = "auto";

        if (ctx) {
          // 이미지 품질 설정ㄴ
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
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
        className="max-w-[366px] w-full mx-auto"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default KtwizSeat;
