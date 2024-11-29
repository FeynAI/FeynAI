import Image from "next/image";

// Reusable card component for displaying each step in the learning process with image, title, and descriptio.
export default function StepCard({ imageSrc, altText, title, description }) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[180px] md:h-[200px] lg:h-[225px] xl:h-[250px]">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-base md:text-lg lg:text-xl font-semibold mt-4 lg:mt-6">{title}</h3>
      <p className="mt-2 lg:mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}