"use client";

import React, { useState } from "react";

type Option = {
  id: string;
  label: string;
  image: string;
};

type Screen =
  | {
      id: string;
      type: "intro";
      title: string;
      buttonText: string;
      emoji: string;
    }
  | {
      id: string;
      type: "choice";
      title: string;
      options: Option[];
    }
  | {
      id: string;
      type: "see-result";
      title: string;
      buttonText: string;
    }
  | {
      id: string;
      type: "result";
      finalImage: string;
    };

const screens: Screen[] = [
  {
    id: "intro",
    type: "intro",
    title: "Welcome to the Narmin's Multiple Pick Course",
    buttonText: "Click Here to start",
    emoji: "👍😎👍",
  },
  {
    id: "mood",
    type: "choice",
    title: "Pick Your Mood",
    options: [
      { id: "mood-1", label: "Scarlet Witch", image: "/images/mood-1.jpg" },
      { id: "mood-2", label: "Warrior", image: "/images/mood-2.jpg" },
      { id: "mood-3", label: "Hungry", image: "/images/mood-3.jpg" },
      { id: "mood-4", label: "Dreamy", image: "/images/mood-4.jpg" },
    ],
  },
  {
    id: "flower",
    type: "choice",
    title: "Pick Your Flower",
    options: [
      { id: "flower-1", label: "Spider Lily", image: "/images/flower-1.jpg" },
      { id: "flower-2", label: "Tulip", image: "/images/flower-2.jpg" },
      { id: "flower-3", label: "Orchid", image: "/images/flower-3.jpg" },
      { id: "flower-4", label: "Mountain Flower", image: "/images/flower-4.jpg" },
    ],
  },
  {
    id: "animal",
    type: "choice",
    title: "Pick Your Spirit Animal",
    options: [
      { id: "animal-1", label: "Polar Bear", image: "/images/animal-1.jpg" },
      { id: "animal-2", label: "Dragon", image: "/images/animal-2.jpg" },
      { id: "animal-3", label: "Bunny", image: "/images/animal-3.jpg" },
      { id: "animal-4", label: "Monkey", image: "/images/animal-4.jpg" },
    ],
  },
  {
    id: "ride",
    type: "choice",
    title: "Pick Your Ride",
    options: [
      { id: "ride-1", label: "Dune Buggy", image: "/images/ride-1.jpg" },
      { id: "ride-2", label: "Maggiolone", image: "/images/ride-2.jpg" },
      { id: "ride-3", label: "Purple Lamborghini", image: "/images/ride-3.jpg" },
      { id: "ride-4", label: "Maybach", image: "/images/ride-4.jpg" },
    ],
  },
  {
    id: "hero",
    type: "choice",
    title: "Pick Your Hero",
    options: [
      { id: "hero-1", label: "Pirate", image: "/images/hero-1.jpg" },
      { id: "hero-2", label: "Gladiator", image: "/images/hero-2.jpg" },
      { id: "hero-3", label: "Prince", image: "/images/hero-3.jpg" },
      { id: "hero-4", label: "Sorcerer", image: "/images/hero-4.jpg" },
    ],
  },
  {
    id: "see-result",
    type: "see-result",
    title: "See your Result",
    buttonText: "Click here to see your results",
  },
  {
    id: "result",
    type: "result",
    finalImage: "/images/final-photo.jpg",
  },
];

function ChoiceScreen({
  screen,
  onPick,
}: {
  screen: Extract<Screen, { type: "choice" }>;
  onPick: (groupId: string, optionId: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-serif text-white">
        {screen.title}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {screen.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onPick(screen.id, option.id)}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition duration-200 hover:scale-[1.02]"
          >
            <img
              src={option.image}
              alt={option.label}
              className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [, setChoices] = useState<Record<string, string>>({});

  const screen = screens[currentScreen];

  const goNext = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, screens.length - 1));
  };

  const handleChoice = (groupId: string, optionId: string) => {
    setChoices((prev) => ({ ...prev, [groupId]: optionId }));
    goNext();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {screen.type !== "result" && (
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
          {screen.type === "intro" && (
            <div className="text-center">
              <h1 className="mb-8 text-4xl font-serif leading-tight text-white">
                {screen.title}
              </h1>
              <button
                onClick={goNext}
                className="rounded-full border border-white/30 bg-white px-6 py-3 text-lg font-medium text-black shadow-lg transition hover:scale-105"
              >
                {screen.buttonText}
              </button>
              <div className="mt-8 text-5xl">{screen.emoji}</div>
            </div>
          )}

          {screen.type === "choice" && (
            <ChoiceScreen screen={screen} onPick={handleChoice} />
          )}

          {screen.type === "see-result" && (
            <div className="text-center">
              <h2 className="text-4xl font-serif text-white">{screen.title}</h2>
              <button
                onClick={goNext}
                className="mt-6 rounded-full border border-white/30 bg-white px-6 py-3 text-lg font-medium text-black shadow-lg transition hover:scale-105"
              >
                {screen.buttonText}
              </button>
            </div>
          )}
        </div>
      )}

      {screen.type === "result" && (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
          <img
            src={screen.finalImage}
            alt="Final result"
            className="h-screen w-full object-cover animate-[slowZoom_12s_ease-in-out_forwards]"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          <style jsx global>{`
            @keyframes slowZoom {
              0% {
                transform: scale(1);
              }
              100% {
              
                transform: scale(1.14);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}