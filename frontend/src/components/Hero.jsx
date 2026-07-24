function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6">
      <h1 className="text-6xl font-bold mb-6">
        CreatorIQ
      </h1>

      <p className="text-xl max-w-2xl mb-8">
        AI-powered platform to analyze your content, predict virality,
        and discover brand collaborations.
      </p>

      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  );
}

export default Hero;