import React, { useEffect, useMemo, useState } from 'react';

const defaultTestimonials = [
  { name: 'Rahul & Sneha', text: 'Found each other within two months. Great support!', avatarUrl: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Amit & Priya', text: 'Safe and transparent process. Thank you!', avatarUrl: 'https://i.pravatar.cc/120?img=32' },
  { name: 'Kunal & Neha', text: 'Guruji guidance was very helpful for our families.', avatarUrl: 'https://i.pravatar.cc/120?img=48' },
  { name: 'Sagar & Pooja', text: 'The platform is easy to use and trustworthy.', avatarUrl: 'https://i.pravatar.cc/120?img=5' },
];

const AUTO_INTERVAL_MS = 5000;

const TestimonialsCarousel = ({ items }) => {
  const slides = useMemo(() => items && items.length ? items : defaultTestimonials, [items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((t, i) => {
          const avatar = t.avatarUrl || `https://i.pravatar.cc/120?img=${(i % 70) + 1}`;
          return (
            <div key={i} className="min-w-full shrink-0 px-6 py-8">
              <div className="mx-auto max-w-2xl text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={avatar}
                    alt={`${t.name} photo`}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-purple-200"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">“{t.text}”</p>
                <div className="mt-4 font-semibold text-purple-700">{t.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow hover:bg-white"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow hover:bg-white"
        aria-label="Next"
      >
        ›
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-purple-600' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;


