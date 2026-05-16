"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SpotifyPlaylist } from "@/types";
import Image from "next/image";

export default function PlaylistsPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selected, setSelected] = useState<SpotifyPlaylist | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch("/api/playlists");
        if (!res.ok) throw new Error("Falied to fetch");
        const data = await res.json();
        setPlaylists(data);
      } catch {
        setError("Could not load playlists. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const filtered = playlists.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleStart() {
    if (!selected) return;
    // store selected playlist in sessionStorage to pass to game page
    sessionStorage.setItem("selected_playlist", JSON.stringify(selected));
    router.push("/game");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-brand-muted">Loading your playlists...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-wrong">{error}</p>
        <a href="/api/auth/spotify/login" className="text-teal-light underline">
          reconnect with Spotify
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="px-8 pt-10 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-medium text-brand-text">
              choose your playlist
            </h1>
            <p className="text-sm text-brand-muted mt-1">
              pick one of your Spotify playlists to play with
            </p>
          </div>
          <a
            href="/api/auth/spotify/logout"
            className="text-sm text-brand-muted border border-brand-border px-4 py-2 rounded-lg hover:text-brand-text transition-colors"
          >
            logout
          </a>
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="search playlists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-6 bg-bg-surface border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-muted outline-none focus:border-teal-mid transition-colors"
        />
      </div>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-8">
        {filtered.map((playlist) => {
          const isSelected = selected?.id === playlist.id;
          const imageUrl = playlist.images?.[0]?.url;

          return (
            <div
              key={playlist.id}
              onClick={() => setSelected(playlist)}
              className={`
                bg-bg-surface rounded-xl overflow-hidden cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-2 border-spotify scale-[1.02]"
                    : "border border-brand-border hover:border-teal-mid"
                }
              `}
            >
              {/* Playlist art */}
              <div className="w-full aspect-square bg-teal-mid/20 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-teal-light opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                )}
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-brand-text truncate">
                  {playlist.name}
                </p>
                <p className="text-xs text-brand-muted mt-0.5">
                  {playlist.tracks.total} songs
                </p>
                {isSelected && (
                  <p className="text-xs text-spotify font-medium mt-1">
                    selected ✔︎
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-brand-muted py-12">
            no playlists found
          </p>
        )}
      </div>

      {/* Footer bar */}
      {selected && (
        <div className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-brand-border px-8 py-4 flex items-center justify-between">
          <p className="text-sm text-brand-muted">
            <span className="text-teal-light font-medium">{selected.name}</span>{" "}
            selected ・ 10 rounds
          </p>
          <button
            onClick={handleStart}
            className="bg-spotify text-black font-medium px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            start game
          </button>
        </div>
      )}
    </main>
  );
}
