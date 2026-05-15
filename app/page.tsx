export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <a
        href="/api/auth/spotify/login"
        className="bg-spotify text-black font-medium px-6 py-3 rounded-full"
      >
        Connect with Spotify
      </a>
    </main>
  );
}
