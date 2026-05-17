"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GameRound, SpotifyPlaylist } from "@/types";

type AnswerStatus = "correct" | "wrong" | null;
type GameStatus = "loading" | "playing" | "answered" | "finished";

export default function GamePage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerStatus[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<GameStatus>("loading");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const PREVIEW_DURATION = 5;

  // load playlist and fetch rounds
  useEffect(() => {
    const stored = sessionStorage.getItem("selected_playlist");
    if (!stored) {
      router.push("/playlist");
      return;
    }

    const pl: SpotifyPlaylist = JSON.parse(stored);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlaylist(pl);

    async function fetchRounds() {
      try {
        const res = await fetch(`/api/game?playlistId=${pl.id}`);
        if (!res.ok) throw new Error("Failed to fetch rounds");
        const data = await res.json();
        setRounds(data);
        setAnswers(new Array(data.length).fill(null));
        setStatus("playing");
      } catch {
        setError("Could not load game. Please try again.");
      }
    }
    fetchRounds();
  }, [router]);

  // set up audio whenever round changes
  useEffect(() => {
    if (status !== "playing" || rounds.length === 0) return;

    const round = rounds[currentRound];
    if (!round?.previewUrl) return;

    // clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(round.previewUrl);
    audioRef.current = audio;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlaying(false);
    setProgress(0);

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= PREVIEW_DURATION) {
        audio.pause();
        setIsPlaying(false);
      }
      setProgress((audio.currentTime / PREVIEW_DURATION) * 100);
    });

    return () => {
      audio.pause();
    };
  }, [currentRound, rounds, status]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || status === "answered") return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // restart from beginning if clip finished
      if (audio.currentTime >= PREVIEW_DURATION) {
        audio.currentTime = 0;
        setProgress(0);
      }
      audio.play();
      setIsPlaying(true);
    }
  }

  function handleAnswer(trackId: string) {
    if (status !== "playing" || selectedId) return;

    const round = rounds[currentRound];
    const isCorrect = trackId === round.correctTrack.id;

    // stop audio
    audioRef.current?.pause();
    setIsPlaying(false);
    setSelectedId(trackId);
    setAnimating(true);

    // short animation delay then show next button
    setTimeout(() => {
      setAnimating(false);
      setStatus("answered");
    }, 600);

    const newAnswers = [...answers];
    newAnswers[currentRound] = isCorrect ? "correct" : "wrong";
    setAnswers(newAnswers);

    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentRound + 1 >= rounds.length) {
      setStatus("finished");
      return;
    }
    setCurrentRound((r) => r + 1);
    setSelectedId(null);
    setStatus("playing");
    setProgress(0);
    setIsPlaying(false);
  }

  function handleExit() {
    audioRef.current?.pause();
    router.push("/playlists");
  }

  function handlePlayAgain() {
    audioRef.current?.pause();
    sessionStorage.setItem("selected_playlist", JSON.stringify(playlist));
    window.location.reload();
  }

  // -- Loading -------------------------------------
  if (status === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-spotify border-t-transparent rounded-full animate-spin">
          <p className="text-brand-muted text-sm">loading your game...</p>
          <p className="text-brand-muted text-xs opacity-60">
            fetching audio previews, this may take a moment
          </p>
        </div>
      </main>
    );
  }

  // -- Error -------------------------------------
  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-wrong">{error}</p>
        <button
          onClick={() => router.push("/playlists")}
          className="text-teal-light underline text-sm"
        >
          go back
        </button>
      </main>
    );
  }

  // -- Results -------------------------------------
  if (status === "finished") {
    const percentage = Math.round((score / rounds.length) * 100);

    return (
      <main className="min-h-screen bg-bg-primary flex flex-col items-center px-6 py-12 gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-medium text-brand-text">game over</h1>
          <p className="text-brand-muted text-sm">{playlist?.name}</p>
        </div>

        {/* Score card */}
        <div className="bg-bg-surface border border-brand-border rounded-2xl px-16 py-8 flex flex-col items-center gap-1">
          <p className="text-brand-muted text-sm">final score</p>
          <p className="text-7xl font-medium text-spotify">{score}</p>
          <p className="text-brand-muted text-sm">out of {rounds.length}</p>
          <div className="mt-3 bg-spotify/10 border border-spotify/20 rounded-full px-4 py-1">
            <p className="text-spotify text-sm font-medium">{percentage}%</p>
          </div>
        </div>

        {/* Round breakdown */}
        <div className="w-full max-w-md flex flex-col gap-2">
          <p className="text-brand-muted text-xs uppercase tracking-wider mb-1">
            round breakdown
          </p>
          {rounds.map((round, i) => {
            const wasCorrect = answers[i] === "correct";
            return (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm ${
                  wasCorrect
                    ? "bg-spotify/8 border-spotify/20"
                    : "bg-wrong/8 border-wrong/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium ${
                      wasCorrect ? "text-spotify" : "text-wrong"
                    }`}
                  >
                    {wasCorrect ? "✓" : "✗"}
                  </span>
                  <span className="text-brand-text">
                    {round.correctTrack.name}
                  </span>
                </div>
                <span className="text-brand-muted text-xs">
                  {round.correctTrack.artists[0]?.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleExit}
            className="border border-brand-border text-brand-muted px-6 py-2.5 rounded-full text-sm hover:text-brand-text transition-colors"
          >
            choose playlist
          </button>
          <button
            onClick={handlePlayAgain}
            className="bg-spotify text-black font-medium px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            play again
          </button>
        </div>
      </main>
    );
  }

  // ── Game ─────────────────────────────────────────────────
  const round = rounds[currentRound];
  if (!round) return null;

  const waveHeights = [
    6, 14, 20, 10, 18, 8, 16, 22, 12, 20, 14, 18, 10, 16, 8, 20, 12, 18, 14, 10,
  ];
  const labels = ["A", "B", "C", "D"];

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
        <div>
          <p className="text-xs text-brand-muted">playing from</p>
          <p className="text-sm font-medium text-brand-text">
            {playlist?.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-spotify/10 border border-spotify/25 rounded-full px-4 py-1.5 text-sm text-spotify font-medium">
            score: {score} / {currentRound}
          </div>
          <button
            onClick={handleExit}
            className="border border-brand-border text-brand-muted px-4 py-1.5 rounded-lg text-sm hover:text-brand-text transition-colors"
          >
            exit
          </button>
        </div>
      </div>

      {/* Round progress dots */}
      <div className="flex justify-center gap-2 pt-6">
        {rounds.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < currentRound
                ? "bg-spotify"
                : i === currentRound
                  ? "bg-teal-light ring-2 ring-teal-light/30"
                  : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col px-6 py-6 max-w-xl mx-auto w-full gap-5">
        <p className="text-center text-brand-muted text-sm">
          round {currentRound + 1} of {rounds.length} — what song is this?
        </p>

        {/* Audio player */}
        <div className="bg-bg-surface border border-brand-border rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={status === "answered" || animating}
              className="w-12 h-12 rounded-full bg-spotify flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4l14 8-14 8V4z" />
                </svg>
              )}
            </button>

            {/* Waveform */}
            <div className="flex items-center gap-1 flex-1 h-8">
              {waveHeights.map((h, i) => {
                const filled = (i / waveHeights.length) * 100 < progress;
                return (
                  <div
                    key={i}
                    style={{ height: h }}
                    className={`w-1 rounded-sm transition-colors duration-100 ${
                      filled ? "bg-spotify" : "bg-teal-mid/40"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/6 rounded-full h-1">
            <div
              className="bg-spotify h-1 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-brand-muted">
              {((progress / 100) * PREVIEW_DURATION).toFixed(1)}s
            </span>
            <span className="text-xs text-brand-muted">
              {PREVIEW_DURATION}s
            </span>
          </div>
        </div>

        {/* Answer options */}
        <div className="flex flex-col gap-3">
          {round.options.map((track, i) => {
            const isSelected = selectedId === track.id;
            const isCorrect = track.id === round.correctTrack.id;
            const showResult = status === "answered" || animating;

            let optionStyle =
              "bg-white/4 border-brand-border text-brand-text hover:border-teal-mid cursor-pointer";

            if (showResult) {
              if (isCorrect) {
                optionStyle =
                  "bg-spotify/10 border-spotify text-spotify cursor-default";
              } else if (isSelected && !isCorrect) {
                optionStyle =
                  "bg-wrong/8 border-wrong/40 text-wrong cursor-default";
              } else {
                optionStyle =
                  "bg-white/2 border-brand-border/50 text-brand-muted cursor-default";
              }
            }

            return (
              <button
                key={track.id}
                onClick={() => handleAnswer(track.id)}
                disabled={showResult}
                className={`
                  w-full border rounded-xl px-5 py-4 text-left text-sm
                  flex items-center justify-between
                  transition-all duration-300
                  ${animating && isSelected ? "scale-95" : "scale-100"}
                  ${optionStyle}
                `}
              >
                <span>{track.name}</span>
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-300
                    ${showResult && isCorrect ? "bg-spotify/20" : ""}
                    ${showResult && isSelected && !isCorrect ? "bg-wrong/20" : ""}
                    ${!showResult ? "bg-white/6" : ""}
                  `}
                >
                  {showResult && isCorrect
                    ? "✓"
                    : showResult && isSelected && !isCorrect
                      ? "✗"
                      : labels[i]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button — appears after animation */}
        {status === "answered" && (
          <button
            onClick={handleNext}
            className="w-full bg-spotify text-black font-medium py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity animate-pulse-once"
          >
            {currentRound + 1 >= rounds.length
              ? "see results →"
              : "next round →"}
          </button>
        )}
      </div>
    </main>
  );
}
