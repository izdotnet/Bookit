import ReservationsTable from "@/components/ReservationsTable";
import {
  getReservationsForUser,
  cancleReservation,
} from "@/utils/Fetchers/Bookings";

export default async function Reservations({
  params,
}: {
  params: { userId: string };
}) {
  const reservations = await getReservationsForUser(params.userId);

  const handleCancel = async (reservationId: string) => {
    "use server";
    await cancleReservation(reservationId);
    return {
      redirect: {
        destination: `/reservations/${params.userId}`,
        permanent: false,
      },
    };
  };

  return (
    <div>
      <ReservationsTable
        reservations={reservations}
        cancleReservation={handleCancel}
      />
    </div>
  );
}
