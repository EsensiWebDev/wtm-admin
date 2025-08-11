"use client";

import {
  HotelDetail,
  ImageFile,
} from "@/app/(dashboard)/hotel-listing/create/types";
import { ImageUpload } from "@/components/dashboard/hotel-listing/create/image-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HotelInfoUpload } from "./info-upload";
import { RoomCardInput } from "./room-card-input";

interface CreateHotelFormProps {
  hotel: HotelDetail;
}

export function CreateHotelForm({ hotel }: CreateHotelFormProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImagesChange = (newImages: ImageFile[]) => {
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add images
      images.forEach((image, index) => {
        formData.append(`images`, image.file);
        if (image.isMain) {
          formData.append("mainImageIndex", index.toString());
        }
      });

      // Add other form data here when you implement the other sections
      // formData.append('name', hotelName);
      // formData.append('description', description);
      // etc.

      // Simulate API call
      console.log("Submitting form with:", {
        images: images.map((img) => ({
          name: img.file.name,
          isMain: img.isMain,
        })),
        formData: Object.fromEntries(formData.entries()),
      });

      // TODO: Replace with actual API call
      // const response = await fetch('/api/hotels', {
      //   method: 'POST',
      //   body: formData
      // });

      alert("Hotel created successfully!");
    } catch (error) {
      console.error("Error creating hotel:", error);
      alert("Error creating hotel. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Upload Image Section */}
      <section className="space-y-6">
        <ImageUpload
          onImagesChange={handleImagesChange}
          maxImages={10}
          maxSizeMB={5}
        />
      </section>

      {/* Info Section */}
      <section>
        <HotelInfoUpload
          name={hotel.name}
          location={hotel.location}
          rating={hotel.rating}
          isPromoted={hotel.isPromoted}
          promoText={hotel.promoText}
          price={hotel.price}
          description={hotel.description}
          facilities={hotel.facilities}
          nearby={hotel.nearby}
        />
      </section>

      {/* Room Card Section */}
      <section className="space-y-8">
        {hotel.rooms.map((room, i) => (
          <div key={i}>
            <RoomCardInput {...room} />
          </div>
        ))}
      </section>

      {/* Submit Button */}
      <section className="flex justify-end space-x-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || images.length === 0}>
          {isSubmitting ? "Creating..." : "Create Hotel"}
        </Button>
      </section>
    </form>
  );
}
