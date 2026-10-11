import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import threeQuarter from "@/assets/C10-5-2.webp.asset.json";
import side from "@/assets/C10-2-2.webp.asset.json";
import nozzle from "@/assets/C10-7-2.webp.asset.json";
import topDown from "@/assets/C10-3.webp.asset.json";

const slides = [
  { src: threeQuarter.url, alt: "ABZ Innovation C10 cleaning drone, three-quarter view" },
  { src: side.url, alt: "ABZ Innovation C10 cleaning drone, side profile" },
  { src: nozzle.url, alt: "C10 spray nozzle and landing gear detail" },
  { src: topDown.url, alt: "ABZ Innovation C10 seen from above" },
];

export function SystemCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const suppressRef = useRef(false);
  const count = slides.length;

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = (next + count) % count;
    suppressRef.current = true;
    indexRef.current = target;
    setIndex(target);
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    window.setTimeout(() => { suppressRef.current = false; }, 700);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!pausedRef.current) goTo(indexRef.current + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  function onScroll() {
    const track = trackRef.current;
    if (!track || suppressRef.current) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== indexRef.current && i >= 0 && i < count) {
      indexRef.current = i;
      setIndex(i);
    }
  }

  return (
    <div
      className="system-visual system-carousel"
      onPointerEnter={() => { pausedRef.current = true; }}
      onPointerLeave={() => { pausedRef.current = false; }}
      onPointerDown={() => { pausedRef.current = true; }}
      onPointerUp={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
    >
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {slides.map((slide, i) => (
          <div className="carousel-slide" key={slide.src}>
            <img src={slide.src} alt={slide.alt} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>
      <button className="carousel-arrow carousel-prev" type="button" aria-label="Previous image" onClick={() => goTo(indexRef.current - 1)}><ChevronLeft size={18} /></button>
      <button className="carousel-arrow carousel-next" type="button" aria-label="Next image" onClick={() => goTo(indexRef.current + 1)}><ChevronRight size={18} /></button>
      <div className="carousel-dots">
        {slides.map((slide, i) => (
          <button key={slide.src} type="button" className={`carousel-dot${i === index ? " is-active" : ""}`} aria-label={`Go to image ${i + 1}`} aria-pressed={i === index} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}
