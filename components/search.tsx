import axios from "axios";
import React from "react";

export const Search = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://serpapi.com/search.json?q=coffee&location=Paris&google_domain=google.com&hl=en&gl=us`
      );
      console.log(response);
      console.log(response.data);
      console.log(response.headers);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <button className="" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};
