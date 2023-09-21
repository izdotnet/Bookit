"use client";

import React from "react";
import Image from "next/image";
import { ApartmentProps } from "@/types";
import ApartmentDetails from "../ApartmentDetails";
import { randomizeApartmentImage } from "@/utils/helpers";
import CardIcons from "../CardIcons";
import CardButton from "../CardButton";
import Link from "next/link";

function Card({ data }: ApartmentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { id, name, price, currency, address, size } = data;
  const imageData = randomizeApartmentImage(Number(size.toString()[1]));

  return (
    <div className="apartment-card group">
      <div className="apartment-card__content">
        <h2 className="apartment-card__content-title">{name}</h2>
      </div>

      <p className="apartment-card__price">
        <span className="apartment-card__price-currency">{currency}</span>
        {price.toFixed(2)}
        <span className="apartment-card__price-night">/Night</span>
      </p>
      <div className="apartment-card__image">
        <Image
          src={imageData}
          alt={name}
          width={250}
          height={250}
          className="rounded-xl border-2 border-gray-200 mx-auto"
        />
      </div>
      <section className="relative flex w-full mt-2">
        <CardIcons address={address} size={size} />
        <CardButton setIsOpen={setIsOpen} />
      </section>
      <ApartmentDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        data={data}
        image={imageData}
      />
    </div>
  );
}

export default Card;
