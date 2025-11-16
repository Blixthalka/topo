import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ images = [], alt = "", autoplay = true, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer.current);
  }, [images.length, autoplay, interval]);

  if (!images || images.length === 0) return null;

  const go = (i) => setIndex((i + images.length) % images.length);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-sm border">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${index * (100 / images.length)}%)`,
          }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0" style={{ width: `${100 / images.length}%` }}>
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <button
        onClick={() => go(index - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-2 py-1 rounded-full shadow-md focus:outline-none"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={() => go(index + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-2 py-1 rounded-full shadow-md focus:outline-none"
        aria-label="Next slide"
      >
        ›
      </button> */}

      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-green-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;