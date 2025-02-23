import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StoryImg } from "@/images";

export default function Story() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative h-64 sm:h-80 md:h-[500px]">
            <Image
              src={StoryImg}
              alt="Our story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
            <p className="text-gray-600 text-base sm:text-lg">
              At Funiro, we believe that a well-designed space has the power to
              transform daily living. Our journey began with a simple vision: to
              make high-quality, beautifully designed furniture accessible to
              everyone.
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              Founded in 2000, we've grown from a small workshop to a leading
              furniture brand, but our core values remain the same. We're
              passionate about craftsmanship, sustainability, and creating
              pieces that will be cherished for generations.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button className="bg-[#B88E2F] hover:bg-[#B88E2F]/90">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
