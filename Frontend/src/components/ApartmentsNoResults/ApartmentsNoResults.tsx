import React from "react";

function ApartmentsNoResults() {
  return (
    <div className="home__error-container">
      <h2 className="text-black text-xl font-bold">No results to show</h2>
      <p>Choose a start date, end date, and select a location.</p>
    </div>
  );
}

export default ApartmentsNoResults;
