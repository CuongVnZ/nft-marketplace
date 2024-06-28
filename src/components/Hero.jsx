import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const Hero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-4xl md:text-6xl font-semibold">
        Trade crypto and NFTs with confidence
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Buy, sell, and explore tokens and NFTs
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Get started
        </button>
      </div>
      <ShuffleGrid />

      
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/images/nft1.jpg",
  },
  {
    id: 2,
    src: "/images/nft2.avif",
  },
  {
    id: 3,
    src: "/images/nft3.webp",
  },
  {
    id: 4,
    src: "/images/nft4.webp",
  },
  {
    id: 5,
    src: "/images/nft5.jpg",
  },
  {
    id: 6,
    src: "/images/nft6.jpg",
  },
  {
    id: 7,
    src: "/images/nft7.webp",
  },
  {
    id: 8,
    src: "/images/nft8.jpg",
  },
  {
    id: 9,
    src: "/images/nft9.webp",
  },
  {
    id: 10,
    src: "/images/nft10.jpg",
  },
  {
    id: 11,
    src: "/images/nft11.png",
  },
  {
    id: 12,
    src: "/images/nft12.jpg",
  },
  {
    id: 13,
    src: "/images/nft13.png",
  },
  {
    id: 14,
    src: "/images/nft14.jpg",
  },
  {
    id: 15,
    src: "/images/nft15.jpg",
  },
  {
    id: 16,
    src: "/images/nft16.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;

