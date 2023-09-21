import React from "react";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import { IsraelCities } from "@/utils/constants";
import { ArrowDownCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

function ApartmentsCatalogue() {
  return (
    <section>
      <div className="home__text-container">
        <h1 className="text-extrabold text-4xl">Apartments Catalogue</h1>
        <p className="mt-3 -mb-6 font-medium text-gray-500">
          Enter start and end dates below to find an apartment{" "}
          <ArrowDownCircleIcon className="inline-block w-5 h-5" />
        </p>
      </div>
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <MapPinIcon height={25} width={25} />
          <CustomFilter title="city" options={IsraelCities} />
        </div>
      </div>
    </section>
  );
}

export default ApartmentsCatalogue;
