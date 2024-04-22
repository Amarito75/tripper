import React from "react";
import { Card } from "../ui/card";

const infos = [
  {
    title: "Discover countries",
    description: "Tripper allowed you to discover easily",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Discover countries",
    description: "Tripper allowed you to discover easily",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Discover countries",
    description: "Tripper allowed you to discover easily",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const InfoSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" id="info">
      {infos.map((info, index) => (
        <Card
          key={index}
          title={info.title}
          image={info.image}
          description={info.description}
        />
      ))}
    </div>
  );
};

export default InfoSection;
