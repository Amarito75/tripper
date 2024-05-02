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

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
            : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
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
