function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌩️ Welcome to the Serverless Feedback Wall
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            A live demo showing the full power of Google Cloud's serverless stack
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">💻</div>
              <p className="text-sm md:text-base">
                Our frontend is built in <strong>React</strong>, styled beautifully with <strong>Tailwind CSS</strong>, and runs on <strong>Cloud Run</strong>, Google's fully managed serverless container platform.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">⚙️</div>
              <p className="text-sm md:text-base">
                The backend uses <strong>Node.js + Express</strong>, also on <strong>Cloud Run</strong>, and connects to <strong>Firestore</strong>, Google's serverless NoSQL database that scales globally with zero configuration.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">🐳</div>
              <p className="text-sm md:text-base">
                Both frontend and backend are containerized with <strong>Docker</strong>, built automatically using <strong>Cloud Build</strong>, and stored in <strong>Artifact Registry</strong>.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm md:text-base">
                Every feedback you post here creates a new document in <strong>Firestore</strong> — live, instantly visible — no servers, no clusters, no connections to manage.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-base md:text-lg mb-4">
              🚀 <strong>Auto-scales on load</strong>, and scales down to zero when idle — we only pay for what we use.
            </p>
            <p className="text-base md:text-lg">
              ✨ <strong>Zero ops, infinite scale, total simplicity.</strong> This is how modern applications are built.
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-2">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Live & Running
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

