import Image from "next/image";

export default function Home() {
  return (
    <section className="p-4">
      {/* HERO */}
      <div className="h-screen grid grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-64 font-bold tracking-widest">BLÜTE</h1>
          <p className="text-16 font-medium mt-6 uppercase tracking-widest">Bloom with us.</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Image 
            src={"/images/flowerbg.jpg"}
            alt="Flower Background"
            width={480}
            height={320}
            className="rounded-lg shadow-[rgba(246,156,214,1)_10px_10px_0px_0px]"
          />
        </div>
      </div>

      {/* CATALOGUE */}
    </section>
  );
}
