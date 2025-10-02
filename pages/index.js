import { useState } from "react";
import EnvelopeOpening from "../components/EnvelopeOpening";
import Card3D from "../components/Card3D";
import Confetti from "../components/Confetti";
import Album from "../components/Album";
import DateDisplay from "../components/DateDisplay";
import EventTimeline from "../components/EventTimeline";
import { Howl } from "howler";

export default function Home() {
  const [stage, setStage] = useState("envelope"); // "envelope", "card", "main"
  const [confettiDone, setConfettiDone] = useState(false);

  const handleEnvelopeOpened = () => {
    setStage("card");
    // Play music
    new Howl({ src: ["/music.mp3"], volume: 0.65, loop: true }).play();
    setTimeout(() => {
      new Howl({ src: ["/confetti.mp3"], volume: 1 }).play();
      setConfettiDone(true);
    }, 800); // Confetti after letter reveal
  };

  const handleCardOpened = () => setStage("main");

  return (
    <>
      {stage === "envelope" && <EnvelopeOpening onOpened={handleEnvelopeOpened} />}
      {stage === "card" && (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-400">
          <Card3D opened={true} onOpen={handleCardOpened} />
          {confettiDone && <Confetti />}
          <button
            className="mt-8 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl shadow-lg text-lg animate-bounce"
            onClick={handleCardOpened}
          >
            Open Album & Timeline
          </button>
        </div>
      )}
      {stage === "main" && (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-400 flex flex-col items-center">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-xl text-center">Happy Birthday Rajendra Regmi!</h1>
          <DateDisplay date={new Date()} />
          <EventTimeline />
          <Album />
          <footer className="mt-8 text-white opacity-80 text-center">
            <p>Made with ❤️ for Rajendra Regmi — {new Date().getFullYear()}</p>
          </footer>
        </div>
      )}
    </>
  );
}