"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { InnerPlace } from "@/images";

const slides = [
  {
    id: 1,
    img: InnerPlace,
    title: "Inner Peace",
    category: "Bed Room",
  },
  {
    id: 2,
    img: InnerPlace,
    title: "Modern Comfort",
    category: "Living Room",
  },
  {
    id: 3,
    img: InnerPlace,
    title: "Minimalist Design",
    category: "Dining Room",
  },
];

export default function Explore() {
  return (
    <section className="py-24 bg-[#FCF8F3]">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="text-muted-foreground">
              Our designer already made a lot of beautiful prototype of rooms
              that inspire you
            </p>
            <Button className="bg-[#B88E2F] rounded-none hover:bg-[#B88E2F]/90">
              Explore More
            </Button>
          </div>

          {/* SWIPER */}
          <div className="relative">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper shadow-none"
              
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} >
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    height={500}
                    width={350}
                    className=" "
                  />
                  <div className="absolute bottom-4 left-4  bg-white p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">{slide.category}</h3>
                    <h3 className="font-semibold">{slide.title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
