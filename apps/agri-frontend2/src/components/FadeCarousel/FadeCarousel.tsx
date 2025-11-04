'use client';
import { webWordingConfigs } from '@/configs/webWording';
import React, { useState } from 'react';
import Slider from 'react-slick';

export const FadeCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const appendDots = (dots: React.ReactNode) => {
    return <ul className="flex gap-5 marker:hidden">{dots}</ul>;
  };

  const customPaging = (i: number) => {
    return i === activeSlide ? (
      <button className="flex h-1 w-28 rounded-full bg-white/50"></button>
    ) : (
      <button className="flex h-1 w-28 rounded-full bg-white/30"></button>
    );
  };

  const beforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    dots: true,
    dotsClass:
      'w-[300px] flex gap-5 absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10',
    appendDots: appendDots,
    customPaging: customPaging,
    beforeChange: beforeChange,
    arrows: false,
  };

  const carouselImg = webWordingConfigs.indexPage.FadeCarouselImg;

  return (
    <div className="slider-container">
      <Slider {...settings} className="shadow-none">
        {carouselImg.map((img, idx) => {
          return (
            <div key={idx}>
              <div className="h-[80vh] w-full">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 left-0 h-[80vh] w-full bg-neutral-800/50"></div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
