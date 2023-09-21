"use client";

import { Apartment } from "@/types";
import { today, tomorrow } from "@/utils/constants";
import { randomizeApartmentImage } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReserveForm({
  userId,
  apartment,
  handleBooking,
}: {
  userId: string;
  apartment: Apartment;
  handleBooking: (
    startDate: Date,
    endDate: Date
  ) => Promise<{
    message: string;
  }>;
}) {
  const { push } = useRouter();
  const { size } = apartment;
  const imageData = randomizeApartmentImage(Number(size.toString()[1]));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const startDate = new Date(formData.get("check-in-date") as string);
    const endDate = new Date(formData.get("check-out-date") as string);
    const response = await handleBooking(startDate, endDate);
    if (response?.message === "Apartment reserved successfully") {
      window.alert(response.message);
      push(`/reservations/${userId}`);
    } else {
      window.alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Reserve</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={handleSubmit}
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Dates</h2>

              <div className="mt-4">
                <label
                  htmlFor="check-in-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-in
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="check-in-date"
                    name="check-in-date"
                    min={today}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="check-out-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-out
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="check-out-date"
                    name="check-out-date"
                    min={tomorrow}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              Booking summary
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Apartment</h3>
              <ul role="list" className="divide-y divide-gray-200">
                <li className="flex px-4 py-6 sm:px-6">
                  <div className="w-[100px]">
                    <Image
                      src={imageData}
                      alt={"Apartment image"}
                      className="rounded-md"
                      objectFit="cover"
                      width={250}
                      height={100}
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1 gap-3">
                        <h4 className="text-sm">
                          <div className="font-semibold tracking-wide text-gray-700 hover:text-gray-800 border p-1 rounded-sm border-b-1 border-gray-100 mb-1">
                            {apartment.name}
                          </div>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          <span className="font-semibold text-sm text-gray-500 hover:text-gray-800">
                            Description
                            <br />
                          </span>{" "}
                          {apartment.description}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          <span className="font-semibold text-sm text-gray-500 hover:text-gray-800">
                            Size
                            <br />
                          </span>{" "}
                          {apartment.size}m
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {apartment.currency}
                    {apartment.price}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {apartment.currency}
                    {(apartment.price * 0.17).toFixed(1)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {apartment.currency}
                    {(apartment.price * 1.17).toFixed(1)}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
