import ReserveForm from "@/components/ReserveForm";
import { getApartment, reserveApartment } from "@/utils/Fetchers/Apartments";
import { dateToSplitString, getNextDay, getToday } from "@/utils/helpers";

export default async function Book({
  params,
}: {
  params: { userId: string; apartmentId: string };
}) {
  const userId = params.userId;
  const apartment = await getApartment(params.apartmentId);

  const handleBooking = async (startDate: Date, endDate: Date) => {
    "use server";
    const formattedStart = dateToSplitString(startDate);
    const formattedEnd = dateToSplitString(endDate);
    const apartmentId = params.apartmentId;
    const reservationProps = {
      apartmentId,
      userId,
      startDate: formattedStart,
      endDate: formattedEnd,
    };
    const response = await reserveApartment(reservationProps);
    console.log(response);
    if (response?.status === 200) {
      return { message: "Apartment reserved successfully" };
    } else {
      return { message: "Something went wrong" };
    }
  };

  return (
    <div>
      <ReserveForm
        userId={userId}
        apartment={apartment}
        handleBooking={handleBooking}
      />
    </div>
  );
}
