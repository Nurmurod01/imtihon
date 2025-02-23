"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { Bedroom, Dining, InnerPlace } from "@/images";

const slides = [
  {
    id: 1,
    img: InnerPlace,
    title: "Inner Peace",
    category: "Bed Room",
  },
  {
    id: 2,
    img: Bedroom,
    title: "Modern Comfort",
    category: "Living Room",
  },
  {
    id: 3,
    img: Dining,
    title: "Minimalist Design",
    category: "Dining Room",
  },
];

export default function Explore() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#FCF8F3]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Our designer already made a lot of beautiful prototype of rooms
              that inspire you
            </p>
            <Button className="bg-[#B88E2F] rounded-none hover:bg-[#B88E2F]/90 px-6 py-3 text-white font-semibold transition-colors duration-300">
              Explore More
            </Button>
          </div>

          <div className="relative mt-8 md:mt-0">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Autoplay]}
              className="mySwiper"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="w-64 sm:w-72 md:w-80">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={slide.img || "/placeholder.svg"}
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-white p-3 sm:p-4 rounded-lg">
                        <h3 className="text-xs sm:text-sm text-gray-500">
                          {slide.category}
                        </h3>
                        <h3 className="font-semibold text-sm sm:text-base">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
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
