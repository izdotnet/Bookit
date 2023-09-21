import { Reservation } from "@/types";
import { reservationStatus } from "@/utils/constants";
import { CurrencyDisplay } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

function ReservationRow({
  reservation,
  cancleReservation,
}: {
  reservation: Reservation;
  cancleReservation: (reservationId: string) => void;
}) {
  const {
    id,
    createdOnUtc,
    apartmentName,
    durationStart,
    durationEnd,
    cleaningFeeAmount,
    cleaningFeeCurrency,
    totalPriceAmount,
    totalPriceCurrency,
    status,
  } = reservation;

  return (
    <div>
      <h3 className="sr-only">
        Reserved on <time dateTime={createdOnUtc}>{createdOnUtc}</time>
      </h3>

      <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-gray-900">Apartment name</dt>
            <dd className="sm:mt-1">{apartmentName}</dd>
          </div>

          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Check-in</dt>
            <dd className="sm:mt-1">
              <time dateTime={durationStart}>{durationStart.slice(0, 10)}</time>
            </dd>
          </div>

          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Check-out</dt>
            <dd className="sm:mt-1">
              <time dateTime={durationEnd}>{durationEnd.slice(0, 10)}</time>
            </dd>
          </div>
        </dl>
      </div>

      <table className="mt-4 w-full text-gray-500 sm:mt-6">
        <caption className="sr-only">Reservations</caption>
        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
          <tr>
            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
              Apartment
            </th>
            <th
              scope="col"
              className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
            >
              Cleaning fee
            </th>
            <th
              scope="col"
              className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
            >
              Total price
            </th>
            <th
              scope="col"
              className="hidden py-3 pr-8 font-normal sm:table-cell"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
          <tr>
            <td className="py-6 pr-8">
              <div className="flex items-center">
                <Image
                  src="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                  alt={apartmentName}
                  width={250}
                  height={250}
                  className="rounded-xl border-2 border-gray-200 object-contain mx-auto"
                />
                <div>
                  <div className="mt-1 sm:hidden">
                    {CurrencyDisplay(cleaningFeeAmount, cleaningFeeCurrency)}
                  </div>
                  <div className="mt-1 sm:hidden">
                    {CurrencyDisplay(totalPriceAmount, totalPriceCurrency)}
                  </div>
                  <div className="mt-1 sm:hidden">
                    {reservationStatus[Number(status) - 1]}
                  </div>
                </div>
              </div>
            </td>
            <td className="hidden py-6 pr-8 sm:table-cell">
              {CurrencyDisplay(cleaningFeeAmount, cleaningFeeCurrency)}
            </td>
            <td className="hidden py-6 pr-8 sm:table-cell">
              {CurrencyDisplay(totalPriceAmount, totalPriceCurrency)}
            </td>
            <td className="hidden py-6 pr-8 sm:table-cell">
              {reservationStatus[Number(status) - 1]}
            </td>
            <td className="hidden py-6 pr-8 sm:table-cell">
              <button
                disabled={status === "4"}
                onClick={() => cancleReservation(id)}
                className="btn btn-error text-sm text-white"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReservationRow;
