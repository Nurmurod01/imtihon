import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Jesica, Sarah, Smith, Wilson } from "@/images";

const team = [
  {
    name: "Jessica Brown",
    position: "CEO & Founder",
    image: Jesica,
  },
  {
    name: "John Smith",
    position: "Design Lead",
    image: Smith,
  },
  {
    name: "Sarah Johnson",
    position: "Marketing Head",
    image: Sarah,
  },
  {
    name: "Michael Wilson",
    position: "Product Manager",
    image: Wilson,
  },
];

export default function Team() {
  return (
    <section className="py-16 sm:py-20 bg-[#F9F1E7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
            Our team of dedicated professionals brings together expertise from
            various fields to deliver the best furniture solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-96 ">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  height={384}
                  width={288}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  {member.position}
                </p>
                <div className="flex justify-center gap-3 sm:gap-4">
                  <a href="#" className="text-gray-600 hover:text-[#B88E2F]">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#B88E2F]">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#B88E2F]">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
