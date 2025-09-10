import { useState } from "react";
import { Checkbox, Image } from "@heroui/react";

type DisplayImageUIProps = {
  imageUrls: string[];
};

const DisplayImagesUI = ({ imageUrls }: DisplayImageUIProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  console.log(selected);
  const handleSelect = (index: number) => {
    setSelected((prev) => {
      if (prev.includes(index)) return prev.filter((val) => val != index);
      else return [...prev, index];
    });
  };
  return (
    <div className="flex gap-4 justify-center items-center">
      {imageUrls.map((url, index) => {
        return (
          <div key={url} className="relative">
            <Image
              alt={url.split("/").slice(-1)[0]}
              src={url}
              width={300}
              shadow="sm"
              className="border p-1"
              onClick={() => handleSelect(index)}
            />
            <Checkbox
              className="absolute top-3 left-3 z-10"
              isSelected={selected.includes(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayImagesUI;
