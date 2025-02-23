import { Guarantee, Quality, Shipping, Support } from "@/images";
import Image from "next/image";
import React from "react";

export default function Top() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-12 sm:py-16 lg:py-24 px-6 sm:px-12 lg:px-16 w-full justify-center items-center bg-[#FAF3EA]">
      {[
        {
          img: Quality,
          title: "High Quality",
          desc: "Crafted from top materials",
        },
        { img: Guarantee, title: "Warranty Protection", desc: "Over 2 years" },
        { img: Shipping, title: "Free Shipping", desc: "Order over 150 $" },
        { img: Support, title: "24 / 7 Support", desc: "Dedicated support" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex gap-3 sm:gap-4 justify-center items-center"
        >
          <Image
            src={item.img}
            width={50}
            height={50}
            alt={item.title}
            className="w-12 sm:w-14"
          />
          <div>
            <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-[#898989]">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
