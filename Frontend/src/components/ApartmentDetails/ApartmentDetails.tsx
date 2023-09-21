"use client";

import { ApartmentDetailsProps, ReservationProps } from "@/types";
import React, { Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { reserveApartment } from "@/utils/Fetchers/Apartments";

function ApartmentDetails({
  isOpen,
  closeModal,
  data,
  image,
}: ApartmentDetailsProps) {
  const { id, name, description, price, currency, size, address } = data;
  const { country, city, street } = address;
  const [user] = useAtom(userAtom);
  const [reserveProps, setReserveProps] = React.useState({});
  const searchParams = useSearchParams();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    type="button"
                    onClick={closeModal}
                  >
                    <XMarkIcon
                      height={15}
                      width={15}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex flex-col flex-1 gap-3">
                    <div className="relative w-full h-40 bg-slate-100 bg-cover bg-center rounded-lg">
                      <Image
                        src={image}
                        alt="apartment image"
                        fill
                        priority
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">{name}</h2>
                    <div className="flex flex-wrap mt-3 gap-4">
                      {Object.entries({
                        name,
                        description,
                        price,
                        currency,
                        size,
                        country,
                        city,
                        street,
                      }).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-gray capitalize">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col mx-12 mt-2">
                    {user?.id && (
                      <Link
                        className="btn btn-primary text-white"
                        href={`/book/${user?.id}/${id}`}
                      >
                        Book Apartment
                      </Link>
                    )}
                    {!user?.id && (
                      <p className="self-center text-gray-400 font-semibold mt-2 text-sm">
                        You must be logged in to book an apartment
                      </p>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ApartmentDetails;
