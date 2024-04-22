"use client";
import axios from "axios";
import React from "react";

export const Search = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://serpapi.com/search.json?q=McDonald's&location=Austin,+Texas,+United+States&google_domain=google.com&hl=en&gl=us"
      );
      console.log(response);
      return response;
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
