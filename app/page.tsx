"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { DynamicButton } from "@/components/DynamicButton";

export default function Home() {
  const router = useRouter();
  return (
    <section className="p-4">
      {/* HERO */}
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-64 font-bold tracking-widest">BLÜTE</h1>
          <p className="text-16 font-medium mt-6 uppercase tracking-widest">Bloom with us.</p>

          <DynamicButton 
            title="Browse Catalogue"
            onClick={() => router.push("/product")}
            className="mt-6 rounded-none text-24 font-medium text-white p-6"
          />
        </div>

        <div className="md:flex flex-col items-center justify-center hidden">
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
