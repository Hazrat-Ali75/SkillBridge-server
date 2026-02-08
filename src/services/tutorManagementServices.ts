import { AvailabilitySlot, TutorProfile } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

const updateTutorProfile = async (
  userId: string,
  profileData: TutorProfile,
) => {
    const updatedProfile = await prisma.tutorProfile.update({
      where: { userId },
      data: profileData,
    });
    return updatedProfile;
};

const addAvailabilitySlot = async ({
  tutorId,
  dayOfWeek,
  startTime,
  endTime,
}: Omit<AvailabilitySlot, "id">) => {
  const addNewSlot = await prisma.availabilitySlot.create({
    data: {
      tutorId,
      dayOfWeek,
      startTime: startTime instanceof Date ? startTime : new Date(startTime ?? ""),
      endTime: endTime instanceof Date ? endTime : new Date(endTime ?? ""),
    },
  });
  return addNewSlot;
};

const deleteAvailabilitySlot = async (slotId: string) => {
  await prisma.availabilitySlot.delete({
    where: { id: slotId },
  });
}

export const tutorManagementServices = {
  updateTutorProfile,
  addAvailabilitySlot,
  deleteAvailabilitySlot
};
