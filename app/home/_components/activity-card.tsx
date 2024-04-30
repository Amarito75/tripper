import React from "react";

interface ActivityCardProps {
  name: string;
  description: string;
  image: string;
  priceAmount: string;
  priceCurrencyCode: string;
}

const ActivityCard = ({
  name,
  description,
  image,
  priceAmount,
  priceCurrencyCode,
}: ActivityCardProps) => {
  return <div>ActivityCard</div>;
};

export default ActivityCard;
