// src/components/AIResponse.js

import React, { useEffect, useState } from 'react';

const AIResponse = ({ text }) => {
  const words = text.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200); // Adjust the timing for how fast words appear

      return () => clearTimeout(timer);
    }
  }, [currentIndex, words.length]);

  return (
    <span>
      {words.slice(0, currentIndex).join(' ')}
    </span>
  );
};

export default AIResponse;
