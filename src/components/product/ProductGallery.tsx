"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const galleryImages =
    images.length > 0
      ? images
      : ["/images/placeholder.jpg"];

  const [selectedImage, setSelectedImage] = useState(
    galleryImages[0]
  );

  return (
    <div className="space-y-5">

      {/* Main Image */}

      <div className="relative h-[650px] overflow-hidden rounded-3xl bg-white shadow-lg">

        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover transition duration-300 hover:scale-105"
          priority
        />

      </div>

      {/* Thumbnails */}

      <div className="flex gap-4">

        {[0, 1, 2, 3].map((index) => {

          const image =
            galleryImages[index] ??
            galleryImages[0];

          return (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative h-24 w-24 overflow-hidden rounded-xl border-2 transition
              ${
                selectedImage === image
                  ? "border-[#7B1E3A]"
                  : "border-gray-200"
              }`}
            >

              <Image
                src={image}
                alt={`${name}-${index}`}
                fill
                className="object-cover"
              />

            </button>
          );
        })}

      </div>

    </div>
  );
}