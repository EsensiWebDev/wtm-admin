import { HotelGallery } from "@/components/dashboard/hotel-listing/create/gallery";
import { HotelInfo } from "@/components/dashboard/hotel-listing/create/info";
import { RoomCard } from "@/components/dashboard/hotel-listing/create/room-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { fetchHotelDetail } from "./fetch";

const CreateHotelPage = async () => {
  const hotel = await fetchHotelDetail();

  return (
    <div className="space-y-8">
      <Button variant={"ghost"} asChild>
        <Link href={"/hotel-listing"}>
          <ChevronLeft />
          Back
        </Link>
      </Button>

      {/* Gallery Section */}
      <section>
        <HotelGallery images={hotel.images} />
      </section>
      {/* Info Section */}
      <section>
        <HotelInfo
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
        <Suspense fallback={<div>Loading room options...</div>}>
          {hotel.rooms.map((room, i) => (
            <div key={i}>
              <RoomCard {...room} />
            </div>
          ))}
        </Suspense>
      </section>
    </div>
  );
};

export default CreateHotelPage;
