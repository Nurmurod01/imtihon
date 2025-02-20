import { Bedroom, Dining, Living } from "@/images";
import Image from "next/image";

const categories = [
  {
    name: "Dining",
    img: Dining,
  },
  {
    name: "Living",
    img: Living,
  },
  {
    name: "Bedroom",
    img: Bedroom,
  },
];

export default function BrowseRange() {
  return (
    <section className=" py-24">
      <div className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse The Range</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((room) => (
            <div
              key={room.name}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={room.img}
                alt={`${room.name} room`}
                fill
                className="object-cover transition-transform "
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-0 w-full text-center">
                <h3 className="text-xl font-semibold text-white">
                  {room.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
