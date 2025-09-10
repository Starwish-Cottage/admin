import { useFileDragAndDrop } from "@/hooks/useFileDragAndDrop";
import { useContext, useEffect } from "react";
import { CreateMaterialContext, type CreateStep } from "@/context/CreateMaterialContext";
import UploadUI from "./UploadUI";
import DisplayImagesUI from "./DisplayImageUI";

type DashboardFileProcessingProps = {
  onError: (errorMessage: string) => void;
};

const DashboardFileProcessing = ({ onError }: DashboardFileProcessingProps) => {
  const { status, divRef, inputRef, error, imageUrls } = useFileDragAndDrop();
  const { currStep, setCurrStep, uploadedImageUrls, setUploadImageUrls } =
    useContext(CreateMaterialContext);

  console.log("uploaded images: ", uploadedImageUrls);

  useEffect(() => {
    if (status === "completed") {
      setCurrStep("uploaded");
      setUploadImageUrls(imageUrls);
    }
  }, [status, setUploadImageUrls, setCurrStep, imageUrls]);

  const getStepUi = (currStep: CreateStep) => {
    switch (currStep) {
      case "uploaded":
        return <DisplayImagesUI imageUrls={uploadedImageUrls} />;
      default:
        return (
          <UploadUI
            status={status}
            error={error}
            inputRef={inputRef}
            divRef={divRef}
            onError={onError}
          />
        );
    }
  };

  return getStepUi(currStep);
};

export default DashboardFileProcessing;
