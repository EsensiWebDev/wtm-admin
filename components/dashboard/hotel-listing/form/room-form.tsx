"use client";

import { Button } from "@/components/ui/button";
import { RoomCardInput } from "../create/room-card-input";

const RoomForm = () => {
  const addNewRoom = () => {};
  const removeRoom = (roomId: string) => {};
  const updateRoom = (roomId: string, updatedRoom: any) => {};

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Room Configuration</h2>
      </div>

      <div className="space-y-6">
        <RoomCardInput
          onUpdate={(updatedRoom) => updateRoom("test", updatedRoom)}
          onRemove={removeRoom}
        />
      </div>

      <div className="flex items-center justify-end">
        <Button
          type="button"
          onClick={addNewRoom}
          className="inline-flex items-center gap-2"
        >
          Save Changes
        </Button>
      </div>
    </section>
  );
};

export default RoomForm;
