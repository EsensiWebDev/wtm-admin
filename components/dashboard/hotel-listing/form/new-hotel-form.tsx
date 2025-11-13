"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useCallback, useTransition } from "react";
import { createHotelNew } from "@/app/(dashboard)/hotel-listing/actions";
import { ImageUpload, ImageFile } from "../create/image-upload";
import { StarRating } from "@/components/ui/star-rating";
import {
  IconBrandInstagramFilled,
  IconBrandTiktokFilled,
  IconWorld,
} from "@tabler/icons-react";

// Define the Zod schema according to specifications
export const createHotelFormSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  photos: z
    .array(z.instanceof(File))
    .max(10, "Maximum 10 images allowed")
    .refine(
      (files) => files.every((file) => file.size <= 2 * 1024 * 1024),
      "Each image must be less than 2MB"
    ),
  sub_district: z.string().min(1, "Sub district is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  email: z.string().email("Please enter a valid email address"),
  description: z.string().optional(),
  rating: z.number().int().optional(),
  nearby_places: z
    .array(
      z.object({
        distance: z.number().int(),
        name: z.string().min(1, "Place name is required"),
      })
    )
    .optional(),
  facilities: z.array(z.string()).optional(),
  social_medias: z.array(
    z.object({
      link: z.string().min(1, "Link is required"),
      platform: z.string().min(1, "Platform is required"),
    })
  ),
});

export type CreateHotelFormValues = z.infer<typeof createHotelFormSchema>;

const NewHotelForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateHotelFormValues>({
    resolver: zodResolver(createHotelFormSchema),
    defaultValues: {
      name: "",
      photos: [],
      sub_district: "",
      district: "",
      province: "",
      email: "",
      description: "",
      rating: 0,
      nearby_places: [],
      facilities: [],
      social_medias: [],
    },
  });

  // Handle image uploads from ImageUpload component
  const handleImageChange = useCallback(
    (newImages: ImageFile[]) => {
      // Extract File objects for form validation
      const files = newImages
        .filter((img) => img.file) // Only include newly uploaded files, not existing ones
        .map((img) => img.file) as File[];
      form.setValue("photos", files);
    },
    [form]
  );

  // Handle form submission
  const onSubmit = useCallback(
    async (data: CreateHotelFormValues) => {
      startTransition(async () => {
        // Prepare FormData object
        const formData = new FormData();

        formData.append("name", data.name);
        data.photos.forEach((photo) => {
          formData.append("photos", photo);
        });
        formData.append("sub_district", data.sub_district);
        formData.append("district", data.district);
        formData.append("province", data.province);
        formData.append("email", data.email);
        if (data.description) formData.append("description", data.description);
        if (data.rating) formData.append("rating", String(data.rating));
        formData.append("nearby_places", JSON.stringify(data.nearby_places));
        formData.append("facilities", JSON.stringify(data.facilities));
        formData.append("social_medias", JSON.stringify(data.social_medias));

        toast.promise(createHotelNew(formData), {
          loading: "Creating hotel...",
          success: ({ message }) => {
            form.reset();
            return message || `Hotel created successfully!`;
          },
          error: "An unexpected error occurred. Please try again.",
        });
      });
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{"Upload Hotel Images"}</h2>
            <p className="text-sm text-muted-foreground">
              Edit existing images or upload new ones. Existing images are
              marked with a blue badge.
            </p>
          </div>
          <ImageUpload
            onImagesChange={handleImageChange}
            maxImages={10}
            maxSizeMB={2}
          />
        </section>

        <section>
          <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Rating and Basic Info */}
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Rating</FormLabel> */}
                    <FormControl>
                      <StarRating
                        value={field.value || 0}
                        onChange={(value) => field.onChange(value)}
                        maxStars={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Hotel Name*</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Enter hotel name"
                        className="bg-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="sub_district"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Sub District*</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter sub district"
                          className="bg-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>District*</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter district"
                          className="bg-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Province*</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter province"
                          className="bg-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Hotel Details */}
          <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold">Description & Benefit</h2>
              <Textarea
                className="h-full bg-gray-200"
                placeholder="Insert Hotel Description here"
                //   value={hotelDescription}
                //   onChange={(e) => setHotelDescription(e.target.value)}
              />

              {/* Social Media and Website Links */}
              <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-md font-semibold">
                  Social Media & Website
                </h3>
                <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-full p-1">
                    <IconBrandInstagramFilled className="h-5 w-5 text-white" />
                  </div>
                  <Input
                    placeholder="Instagram Link"
                    //   value={hotelInstagram}
                    className="bg-gray-200"
                    //   onChange={(e) => setHotelInstagram(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-full p-1">
                    <IconBrandTiktokFilled className="h-5 w-5 text-white" />
                  </div>
                  <Input
                    placeholder="TikTok Link"
                    //   value={hotelTiktok}
                    className="bg-gray-200"
                    //   onChange={(e) => setHotelTiktok(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary rounded-full p-1">
                    <IconWorld className="h-5 w-5 text-white" />
                  </div>
                  <Input
                    placeholder="Website Link"
                    //   value={hotelWebsite}
                    className="bg-gray-200"
                    //   onChange={(e) => setHotelWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold">Near Us</h2>
              {/* <div className="space-y-3">
                  {hotelNearby.map((place, index) => (
                    <NearbyPlaceItem
                      key={index}
                      place={place}
                      index={index}
                      onUpdate={handleNearbyUpdate}
                      onRemove={handleNearbyRemove}
                    />
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="inline-flex items-center gap-2"
                      onClick={handleNearbyAdd}
                    >
                      <PlusCircle className="size-4" /> Add List
                    </Button>
                  </div>
                </div> */}
            </div>

            {/* Facilities */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold">Main Facilities</h2>
              {/* <div className="space-y-3">
                  {hotelFacilities.map((facility, index) => (
                    <FacilityItem
                      key={index}
                      facility={facility}
                      index={index}
                      onUpdate={handleFacilityUpdate}
                      onRemove={handleFacilityRemove}
                    />
                  ))}
                  <div className="flex justify-end">
                    <Button type="button" onClick={handleFacilityAdd}>
                      <PlusCircle className="size-4" /> Add List
                    </Button>
                  </div>
                </div> */}
            </div>
          </div>
        </section>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter hotel description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Hotel"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewHotelForm;
