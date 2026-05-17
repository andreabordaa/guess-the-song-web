export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  items: { total: number } | null;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

export interface GameRound {
  correctTrack: SpotifyTrack;
  options: SpotifyTrack[];
  previewUrl: string;
}

export interface GameState {
  playlist: SpotifyPlaylist | null;
  rounds: GameRound[];
  currentRound: number;
  score: number;
  answers: ("correct" | "wrong" | null)[];
  status: "idle" | "playing" | "answered" | "finished";
}

export interface UserScore {
  userId: string;
  playlistName: string;
  score: number;
  totalRounds: number;
  playedAt: Date;
}
