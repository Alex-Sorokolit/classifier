import React from "react";
import MaterialList from "../MaterialList/MaterialList";
import ServiceList from "../ServiceList/ServiceList";

const SearchResults = ({ results, query, variant }) => {
  if (variant === "material") {
    return (
      <div>
        {results.length > 0 && <MaterialList items={results} query={query} />}
      </div>
    );
  }
  if (variant === "service") {
    return (
      <div>
        {results.length > 0 && <ServiceList items={results} query={query} />}
      </div>
    );
  }
};

export default SearchResults;
