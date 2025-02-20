import { Guarantee, Quality, Shipping, Support } from "@/images";
import Image from "next/image";
import React from "react";

export default function Top() {
  return (
    <div className="grid grid-cols-4 py-24 px-16 w-full justify-center items-center  bg-[#FAF3EA]">
      <div className="flex gap-3 justify-center">
        <Image src={Quality} width={60} height={60} alt="Sifat" />
        <div>
          <h1 className="font-semibold text-3xl">High Quality</h1>
          <p className="text-xl text-[#898989] ">Crafted from top materials</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <Image src={Guarantee} width={60} height={60} alt="Sifat" />
        <div>
          <h1 className="font-semibold text-3xl">Warranty Protection</h1>
          <p className="text-xl text-[#898989] ">Over 2 years</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <Image src={Shipping} width={60} height={60} alt="Sifat" />
        <div>
          <h1 className="font-semibold text-3xl">Free Shipping</h1>
          <p className="text-xl text-[#898989] ">Order over 150 $</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <Image src={Support} width={60} height={60} alt="Sifat" />
        <div>
          <h1 className="font-semibold text-3xl">24 / 7 Support</h1>
          <p className="text-xl text-[#898989] ">Dedicated support</p>
        </div>
      </div>
    </div>
  );
}
