export default function HeroSection() {
  return (
    <div
      className="w-full max-w-[1440px] flex flex-col px-4 md:px-6 lg:px-8"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
      }}
    >
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          width={1440}
          height={600}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover rounded-lg"
        >
          <source src="/images/curious.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 rounded-lg" />
        <div className="absolute left-4 md:left-12 lg:left-24 xl:left-36 top-1/2 transform -translate-y-1/2 text-white z-10 w-[90%] md:w-2/3 lg:w-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 font-semibold">
            If you know, you know.
          </h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">
            Explain topics through engaging conversations with a curious 12-year-old to help you master subjects through teaching.
          </p>
        </div>
      </div>
    </div>
  );
}