import Image from "next/image";
import AboutHero from "@/components/AboutHero";
import AboutContent from "@/components/AboutContent";
import AboutBackground from "@/components/AboutBackground";
import AboutTeam from "@/components/AboutTeam";

export default function About() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <AboutHero />

        <AboutContent />

        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <Image
            src="/Apartments/3.jpg"
            alt=""
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
            width={2832}
            height={1416}
          />
        </div>

        <AboutBackground />

        <AboutTeam />
      </main>
    </div>
  );
}
