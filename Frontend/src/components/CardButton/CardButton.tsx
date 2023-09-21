import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

function CardButton({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="apartment-card__btn-container">
      <Button handleClick={() => setIsOpen(true)} style="apartment-card__btn">
        View more
        <ArrowRightOnRectangleIcon height={20} width={20} className="ml-2" />
      </Button>
    </div>
  );
}

export default CardButton;
