import { useFileDragAndDrop } from "@/hooks/useFileDragAndDrop";
import { useContext, useEffect } from "react";
import { CreateMaterialContext } from "@/context/CreateMaterialContext";
import UploadUI from "./UploadUI";

type DashboardFileProcessingProps = {
  onError: (errorMessage: string) => void;
};

const DashboardFileProcessing = ({ onError }: DashboardFileProcessingProps) => {
  const { status, divRef, inputRef, error, imageUrls } = useFileDragAndDrop();
  const { setCurrStep, setUploadImageUrls } = useContext(CreateMaterialContext);

  useEffect(() => {
    if (status === "completed") {
      setCurrStep("uploaded");
      setUploadImageUrls(imageUrls);
    }
  }, [status, setUploadImageUrls, setCurrStep, imageUrls]);

  return (
    <UploadUI
      status={status}
      error={error}
      inputRef={inputRef}
      divRef={divRef}
      onError={onError}
    />
  );
};

export default DashboardFileProcessing;
