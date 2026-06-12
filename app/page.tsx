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
      <section className="flex flex-col items-center text-center px-6 py-45 gap-6">
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
        className="flex flex-col items-center px-6 py-40 gap-12"
      >
        <div className="flex flex-col items-center gap-8 text-center mt-20">
          <p className="text-sm text-brand-muted uppercase tracking-wider">
            how it works
          </p>
          <h2 className="text-3xl font-medium text-brand-text">
            three simple steps
          </h2>
        </div>
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 py-20 mb-12 gap-8 max-w-4xl w-full">
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
      </section>

      {/* Divider */}
      <div className="h-px bg-brand-border mx-8" />

      {/* Game Preview */}
      <section className="flex flex-col items-center px-6 py-25 mb-12">
        {/* Game preview card */}
        <div className="w-full max-w-2xl flex flex-col gap-3">
          <p className="text-xs text-brand-muted text-center py-8 uppercase tracking-wider">
            game preview
          </p>

          <div className="bg-bg-surface border border-brand-border rounded-2xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <div>
                <p className="text-xs text-brand-muted">playing from</p>
                <p className="text-sm font-medium text-brand-text">
                  best songs of the 80s 🪩
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-spotify/10 border border-spotify/25 rounded-full px-4 py-1.5 text-sm text-spotify font-medium">
                  score: 2 / 3
                </div>
                <div className="border border-brand-border text-brand-muted px-4 py-1.5 rounded-lg text-sm">
                  exit
                </div>
              </div>
            </div>

            {/* Round dots */}
            <div className="flex justify-center gap-2 pt-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 3
                      ? "bg-spotify"
                      : i === 3
                        ? "bg-teal-light ring-2 ring-teal-light/30"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">
              <p className="text-center text-brand-muted text-sm">
                round 4 of 10 — what song is this?
              </p>

              {/* Audio player */}
              <div className="bg-bg-primary border border-brand-border rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-spotify flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 ml-0.5"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4l14 8-14 8V4z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 flex-1 h-8">
                    {[
                      6, 14, 20, 10, 18, 8, 16, 22, 12, 20, 14, 18, 10, 16, 8,
                      20, 12, 18, 14, 10,
                    ].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: h }}
                        className={`w-1 rounded-sm ${
                          i < 10 ? "bg-spotify" : "bg-teal-mid/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full bg-white/6 rounded-full h-1">
                  <div
                    className="bg-spotify h-1 rounded-full"
                    style={{ width: "50%" }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-brand-muted">2.5s</span>
                  <span className="text-xs text-brand-muted">5.0s</span>
                </div>
              </div>

              {/* Answer options */}
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "A",
                    text: "Girls Just Want to Have Fun",
                    style: "bg-white/4 border-brand-border text-brand-text",
                  },
                  {
                    label: "B",
                    text: "Billie Jean",
                    style: "bg-spotify/10 border-spotify/40 text-spotify",
                  },
                  {
                    label: "C",
                    text: "Purple Rain",
                    style: "bg-wrong/8 border-wrong/30 text-wrong",
                  },
                  {
                    label: "D",
                    text: "Never Gonna Give You Up",
                    style: "bg-white/4 border-brand-border text-brand-text",
                  },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className={`w-full border rounded-xl px-5 py-4 text-sm flex items-center justify-between ${opt.style}`}
                  >
                    <span>{opt.text}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        opt.label === "B"
                          ? "bg-spotify/20 text-spotify"
                          : opt.label === "C"
                            ? "bg-wrong/20 text-wrong"
                            : "bg-white/6 text-brand-muted"
                      }`}
                    >
                      {opt.label === "B"
                        ? "✓"
                        : opt.label === "C"
                          ? "✗"
                          : opt.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium note */}
          <p className="text-sm text-brand-muted/60 text-center">
            <span className="text-spotify">✦</span> Spotify Premium required to
            play
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-bg-surface border-t border-brand-border mt-auto px-6 py-16 flex flex-col items-center gap-8 text-center">
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
