import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { Apartment } from "@/types";

function CardIcons({
  address,
  size,
}: {
  address: Apartment["address"];
  size: number;
}) {
  const { city, phoneNumber } = address;
  return (
    <div className="apartment-card__icon-container">
      <div className="apartment-card__icon">
        <MapPinIcon height={25} width={25} />
        <p className="apartment-card__icon-text">{city}</p>
      </div>
      <div className="apartment-card__icon">
        <BuildingOfficeIcon height={25} width={25} />
        <p className="apartment-card__icon-text tracking-wide">
          {size}m<sup className="font-extrabold self-start text-xs">3</sup>
        </p>
      </div>
      <div className="apartment-card__icon">
        <PhoneIcon height={25} width={25} />
        <p className="apartment-card__icon-text">{phoneNumber.slice(0, 13)}</p>
      </div>
    </div>
  );
}

export default CardIcons;
