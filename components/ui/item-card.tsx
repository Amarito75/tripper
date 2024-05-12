import React from "react";

interface ItemCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const ItemCard = ({ title, text, icon }: ItemCardProps) => {
  return (
    <div className="flex items-start space-x-2">
      {icon}
      <div className="flex-col">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-200 text-xs">{text}</p>
      </div>
    </div>
  );
};

export default ItemCard;
