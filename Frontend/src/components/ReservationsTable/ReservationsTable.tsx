"use client";

import { Reservation } from "@/types";
import ReservationRow from "../ReservationRow";

export default function ReservationsTable({
  reservations,
  cancleReservation,
}: {
  reservations: Reservation[];
  cancleReservation: (reservationId: string) => void;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Reservations history
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of, and manage recent reservations.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent reservations</h2>

          <div className="space-y-20">
            {reservations &&
              reservations.map((reservation) => (
                <ReservationRow
                  key={reservation.id}
                  reservation={reservation}
                  cancleReservation={cancleReservation}
                />
              ))}
            {!reservations && (
              <div className="mt-2 text-sm text-gray-500">
                No reservations found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
