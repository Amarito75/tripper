"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const cities = [
  { label: "Paris", value: "PAR" },
  { label: "New York", value: "NYC" },
  { label: "London", value: "LON" },
  { label: "Tokyo", value: "TYO" },
  { label: "Dubai", value: "DXB" },
  { label: "Los Angeles", value: "LAX" },
  { label: "Sydney", value: "SYD" },
  { label: "Singapore", value: "SIN" },
  { label: "Beijing", value: "BJS" },
  { label: "Moscow", value: "MOW" },
  { label: "Istanbul", value: "IST" },
  { label: "Rio de Janeiro", value: "RIO" },
  { label: "Rome", value: "ROM" },
  { label: "Toronto", value: "YTO" },
  { label: "Cairo", value: "CAI" },
  { label: "Mumbai", value: "BOM" },
  { label: "Bangkok", value: "BKK" },
  { label: "Berlin", value: "BER" },
  { label: "Mexico City", value: "MEX" },
  { label: "Madrid", value: "MAD" },
];

interface City {
  label: string;
  value: string;
}

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Combobox({
  value,
  onChange,
  onSelect,
  onInputChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onChange(newValue);
    onSelect(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? cities.find((city) => city.value === value)?.label
            : "Select a city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." onInput={onInputChange} />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city: City) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={() => handleSelect(city.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === city.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
