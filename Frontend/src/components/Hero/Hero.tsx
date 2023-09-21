"use client";

import React from "react";
import Image from "next/image";
import Button from "../Button";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Hero() {
  const handleScroll = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };
  return (
    <div className="bg-blue-50">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__div">
          <div className="hero__container">
            <h1 className="hero__title">Book your next apartment with us.</h1>
            <div className="hero__subtitle-container">
              <p className="hero__subtitle">
                <span className="hero__bold-span">Bookit</span> is a platform
                that allows you to book your next apartment with ease. We have a
                wide range of apartments to choose from.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  style="btn btn-primary text-white"
                  handleClick={handleScroll}
                >
                  Explore apartments <ChevronDownIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <Image
              src="/Apartments/1.jpg"
              alt=""
              className="hero__image"
              width={2970}
              height={1980}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}

export default Hero;
