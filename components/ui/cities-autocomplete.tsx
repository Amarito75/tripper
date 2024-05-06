import React, { useState, useEffect } from "react";
import Downshift from "downshift";

interface City {
  value: string;
  label: string;
}

interface CitiesAutocompleteProps {
  value: string;
}

const cities: City[] = [
  {
    value: "PAR",
    label: "Paris",
  },
  {
    value: "NYC",
    label: "New York",
  },
  {
    value: "LON",
    label: "London",
  },
  {
    value: "TYO",
    label: "Tokyo",
  },
  {
    value: "DXB",
    label: "Dubai",
  },
  {
    value: "LAX",
    label: "Los Angeles",
  },
  {
    value: "SYD",
    label: "Sydney",
  },
  {
    value: "SIN",
    label: "Singapore",
  },
  {
    value: "BJS",
    label: "Beijing",
  },
  {
    value: "MOW",
    label: "Moscow",
  },
  {
    value: "IST",
    label: "Istanbul",
  },
  {
    value: "RIO",
    label: "Rio de Janeiro",
  },
  {
    value: "ROM",
    label: "Rome",
  },
  {
    value: "YTO",
    label: "Toronto",
  },
  {
    value: "CAI",
    label: "Cairo",
  },
  {
    value: "BOM",
    label: "Mumbai",
  },
  {
    value: "BKK",
    label: "Bangkok",
  },
  {
    value: "BER",
    label: "Berlin",
  },
  {
    value: "MEX",
    label: "Mexico City",
  },
  {
    value: "MAD",
    label: "Madrid",
  },
];

const CitiesAutocomplete: React.FC<CitiesAutocompleteProps> = ({ value }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [suggestions, setSuggestions] = useState<City[]>(cities);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setSuggestions(
      cities.filter((city) =>
        city.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Downshift
      inputValue={inputValue}
      onChange={(selection) => setInputValue(selection || "")}
    >
      {({
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
      }) => (
        <div>
          <input {...getInputProps({ placeholder: "Search cities..." })} />
          <ul {...getMenuProps()}>
            {isOpen &&
              suggestions.map((item, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  key={`${item.value}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default CitiesAutocomplete;
