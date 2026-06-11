import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-brand-border">
        <div className="text-2xl font-bold text-brand-text">
          guess the <span className="text-spotify">song</span>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-md text-brand-muted hover:text-brand-text transition-colors"
          >
            how it works
          </a>
          <Link
            href="/api/auth/spotify/login"
            className="text-md text-brand-text border border-brand-border px-6 py-2 rounded-full hover:border-teal-mid transition-colors"
          >
            sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-40 gap-6">
        <div className="bg-spotify/10 border border-spotify/25 text-spotify text-sm font-medium px-8 py-1.5 rounded-full">
          powered by your Spotify playlists
        </div>

        <h1 className="text-6xl font-bold text-brand-text leading-tight max-w-2xl">
          can you <span className="text-spotify">guess the song</span> in 5
          seconds?
        </h1>

        <p className="text-brand-muted text-xl max-w-lg leading-relaxed">
          Pick a playlist, listen to a clip, and race against the clock. How
          well do you really know your music?
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Link
            href="/api/auth/spotify/login"
            className="bg-spotify text-black font-medium px-6 py-3 rounded-full text-md hover:opacity-90 transition-opacity"
          >
            get started free
          </Link>
          <a
            href="#how-it-works"
            className="border border-brand-border text-brand-muted px-6 py-3 rounded-full text-md hover:text-brand-text hover:border-teal-mid transition-colors"
          >
            see how it works
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 mt-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-brand-text">5s</span>
            <span className="text-sm text-brand-muted">clip length</span>
          </div>
          <div className="w-px h-8 bg-brand-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-brand-text">10</span>
            <span className="text-sm text-brand-muted">rounds per game</span>
          </div>
          <div className="w-px h-8 bg-brand-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-brand-text">∞</span>
            <span className="text-sm text-brand-muted">playlists</span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-brand-border mx-8" />

      {/* How it works + Preview */}
      <section
        id="how-it-works"
        className="flex flex-col items-center px-6 py-16 gap-12"
      >
        <div className="flex flex-col items-center gap-2 text-center mt-20">
          <p className="text-sm text-brand-muted uppercase tracking-wider">
            how it works
          </p>
          <h2 className="text-3xl font-medium text-brand-text">
            three simple steps
          </h2>
        </div>
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 py-8 gap-8 max-w-4xl w-full">
          <div className="bg-bg-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-8 h-8 rounded-full bg-spotify/15 border border-spotify/25 flex items-center justify-center text-spotify text-sm font-medium">
              1
            </div>
            <p className="text-brand-text text-md font-medium">
              connect Spotify
            </p>
            <p className="text-brand-muted text-sm leading-relaxed">
              Log in with your Spotify Premium account to access your playlists.
            </p>
          </div>
          <div className="bg-bg-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-spotify/15 border border-spotify/25 flex items-center justify-center text-spotify text-sm font-medium">
              2
            </div>
            <p className="text-brand-text text-md font-medium">
              pick a playlist
            </p>
            <p className="text-brand-muted text-sm leading-relaxed">
              Choose any playlist you own and we&apos;ll pick 10 random songs
              from it.
            </p>
          </div>
          <div className="bg-bg-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-8 h-8 rounded-full bg-spotify/15 border border-spotify/25 flex items-center justify-center text-spotify text-sm font-medium">
              3
            </div>
            <p className="text-brand-text text-md font-medium">
              guess the song
            </p>
            <p className="text-brand-muted text-sm leading-relaxed">
              Listen to a 5 second clip and pick the right answer before time
              runs out.
            </p>
          </div>
        </div>
        {/* Game preview card */}
        <div className="w-full max-w-4xl flex flex-col mt-20 gap-3">
          <p className="text-sm text-brand-muted text-center uppercase tracking-wider py-8">
            game preview
          </p>
          <div className="bg-bg-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
            {/* Round + score */}
            <div className="flex items-center justify-between py-4">
              <div className="bg-spotify/10 border border-spotify/20 rounded-full px-3 py-1 text-sm text-spotify font-medium">
                round 3/10
              </div>
              <span className="text-sm text-brand-muted">score: 2</span>
            </div>

            {/* Mini player */}
            <div className="bg-bg-primary border border-brand-border rounded-xl px-6 py-4 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-spotify flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4l14 8-14 8V4z" />
                </svg>
              </div>
              {/* Waveform */}
              <div className="flex items-center gap-1 flex-1 h-8 ">
                {[
                  6, 14, 20, 10, 18, 8, 16, 22, 12, 20, 14, 18, 10, 16, 8, 20,
                ].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: h }}
                    className={`w-1 rounded-sm ${i < 8 ? "bg-spotify" : "bg-teal-mid/30"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-brand-muted flex-shrink-0">
                2.5s
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/6 rounded-full h-1">
              <div
                className="bg-spotify h-1 rounded-full"
                style={{ width: "50%" }}
              />
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="bg-white/4 border border-brand-border rounded-lg px-3 py-6 text-sm text-brand-text text-center">
                Bohemian Rhapsody
              </div>
              <div className="bg-spotify/10 border border-spotify/40 rounded-lg px-3 py-6 text-sm text-spotify text-center font-medium">
                Stairway to Heaven ✓
              </div>
              <div className="bg-wrong/20 border border-wrong/30 rounded-lg px-3 py-6 text-sm text-wrong text-center">
                What Makes You Beautiful
              </div>
              <div className="bg-white/4 border border-brand-border rounded-lg px-3 py-6 text-sm text-brand-text text-center">
                Billie Jean
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-bg-surface border-t border-brand-border mt-auto px-6 py-16 flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-bold text-brand-text">
          ready to test your music knowledge?
        </h2>
        <p className="text-brand-muted text-lg">
          connect your Spotify and start guessing in under a minute
        </p>
        <Link
          href="/api/auth/spotify/login"
          className="mt-2 border border-brand-border text-brand-text px-6 py-3 rounded-full text-lg font-bold hover:border-teal-mid hover:text-spotify transition-colors"
        >
          create free account
        </Link>
      </section>
    </main>
  );
}
