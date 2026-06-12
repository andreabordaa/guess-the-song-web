# Guess the Song 🎵

A web-based music guessing game where you test your knowledge of your own Spotify playlists. Listen to a 5-second clip and guess the song from four options — how well do you really know your music?

> ⚠️ **This app is currently in development and not yet available to the public.** Spotify integration is limited to approved users only during this phase.

## About

Guess the Song is a full-stack web application built as the web version of an existing Android app. It uses the Spotify Web API to fetch your playlists and streams short audio previews for you to guess.

## Features

- Spotify OAuth authentication
- Browse and select from your own Spotify playlists
- 10 rounds of 5-second audio previews per game
- Multiple choice answers with correct/wrong feedback
- Score tracking per game session
- Results screen with round-by-round breakdown

## Built With

- [Next.js 14](https://nextjs.org) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — playlist and track data
- [spotify-preview-finder](https://www.npmjs.com/package/spotify-preview-finder) — audio preview URLs
- [Vercel](https://vercel.com) — deployment

## Live Demo

[https://guess-the-song-webapp.vercel.app](https://guess-the-song-webapp.vercel.app)

> Note: The app is currently in **Spotify development mode**. Only pre-approved Spotify accounts can log in. If you'd like access, please reach out.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/andreabordaa/guess-the-song-app
cd guess-the-song
npm install
```

Create a `.env.local` file in the root with the following variables:

- SPOTIFY_CLIENT_ID=
- SPOTIFY_CLIENT_SECRET=
- SPOTIFY_REDIRECT_URI=
- NEXTAUTH_SECRET==
- NEXT_PUBLIC_APP_URL=

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Status

🚧 Active development — core gameplay is functional, user accounts and leaderboard coming soon.

## Related

- [Android version](https://github.com/andreabordaa/guess-the-song-app) — the original mobile app this web version is based on
