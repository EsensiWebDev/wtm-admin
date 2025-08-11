"use client";

import { HotelInfoProps } from "@/app/(dashboard)/hotel-listing/create/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export function HotelInfoUpload({
  name,
  location,
  rating,
  isPromoted,
  promoText,
  price,
  description,
  facilities,
  nearby,
}: HotelInfoProps) {
  const [hotelName, setHotelName] = useState(name);
  const [hotelLocation, setHotelLocation] = useState(location);
  const [hotelRating, setHotelRating] = useState<number>(rating);
  const [hotelDescription, setHotelDescription] = useState(description);
  const [hotelNearby, setHotelNearby] = useState<
    { name: string; distance: string }[]
  >([...nearby]);
  const [hotelFacilities, setHotelFacilities] = useState<string[]>([
    ...facilities,
  ]);
  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const isActive = starValue <= hotelRating;
              return (
                <button
                  key={starValue}
                  type="button"
                  aria-label={`Set rating to ${starValue}`}
                  onClick={() => setHotelRating(starValue)}
                  className={`text-xl transition-colors ${
                    isActive ? "text-yellow-500" : "text-muted-foreground"
                  }`}
                >
                  ★
                </button>
              );
            })}
          </div>
          <Input
            id="hotel-name"
            placeholder="Enter hotel name"
            value={hotelName}
            className="bg-gray-200"
            onChange={(e) => setHotelName(e.target.value)}
          />
          <Input
            id="hotel-location"
            placeholder="Enter location"
            value={hotelLocation}
            className="bg-gray-200"
            onChange={(e) => setHotelLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1"></div>
        <div className="flex flex-col items-end justify-end gap-1">
          <p className="text-muted-foreground text-sm">Start from</p>
          <p className="text-xl font-bold">
            Rp {Number(0).toLocaleString("id-ID")}
          </p>
          <p className="text-muted-foreground text-sm">per room, per night</p>
        </div>
      </div>
      {/* Editable hotel details */}
      <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {/* Description */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Description & Benefit</h2>
          <Textarea
            className="h-full bg-gray-200"
            placeholder="Insert Hotel Description here"
            value={hotelDescription}
            onChange={(e) => setHotelDescription(e.target.value)}
          />
        </div>

        {/* Near Us */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Near Us</h2>
          <div className="space-y-3">
            {hotelNearby.map((place, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>
                  <MapPin size={16} />
                </div>
                <Input
                  className="bg-gray-200"
                  placeholder="Location Name"
                  value={place.name}
                  onChange={(e) => {
                    const next = [...hotelNearby];
                    next[index] = { ...next[index], name: e.target.value };
                    setHotelNearby(next);
                  }}
                />
                <div>
                  <Input
                    className="flex-1 bg-gray-200"
                    placeholder="Radius"
                    value={place.distance}
                    onChange={(e) => {
                      const next = [...hotelNearby];
                      next[index] = {
                        ...next[index],
                        distance: e.target.value,
                      };
                      setHotelNearby(next);
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  aria-label={`Remove near place ${index + 1}`}
                  onClick={() =>
                    setHotelNearby(hotelNearby.filter((_, i) => i !== index))
                  }
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                type="button"
                className="inline-flex items-center gap-2"
                onClick={() =>
                  setHotelNearby([...hotelNearby, { name: "", distance: "" }])
                }
              >
                <PlusCircle className="size-4" /> Add List
              </Button>
            </div>
          </div>
        </div>

        {/* Main Facilities */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Main Facilities</h2>
          <div className="space-y-3">
            {hotelFacilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  className="bg-gray-200"
                  placeholder="Insert Hotel Facilities"
                  value={facility}
                  onChange={(e) => {
                    const next = [...hotelFacilities];
                    next[index] = e.target.value;
                    setHotelFacilities(next);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  aria-label={`Remove facility ${index + 1}`}
                  onClick={() =>
                    setHotelFacilities(
                      hotelFacilities.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setHotelFacilities([...hotelFacilities, ""])}
              >
                <PlusCircle className="size-4" /> Add List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
