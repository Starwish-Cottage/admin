import React, { useCallback } from "react";

type CreateStep = "idle" | "uploaded" | "processed" | "ready";
type CreateMaterialStore = {
  currStep: CreateStep;
  uploadedImageUrls: string[];
  processedImageUrls: string[];
};

interface CreateMaterialProps {
  currStep: CreateStep;
  uploadedImageUrls: string[];
  processedImageUrls: string[];
  setCurrStep: (currStep: CreateStep) => void;
  setUploadImageUrls: (urls: string[]) => void;
  setProcessedImageUrls: (urls: string[]) => void;
  clearContext: () => void; // use this to clear the context when upload completed
}

const CreateMaterialContext = React.createContext<CreateMaterialProps>({
  currStep: "idle",
  uploadedImageUrls: [],
  processedImageUrls: [],
  setCurrStep: () => {},
  setProcessedImageUrls: () => {},
  setUploadImageUrls: () => {},
  clearContext: () => {},
});

const initialState: CreateMaterialStore = {
  currStep: "idle",
  uploadedImageUrls: [],
  processedImageUrls: [],
};

const CreateMaterialProvider = ({ children }: { children: React.ReactNode }) => {
  const [createMaterialStore, setCreateMaterialStore] =
    React.useState<CreateMaterialStore>(initialState);

  const handleSetCurrStep = useCallback((currStep: CreateStep) => {
    setCreateMaterialStore((prev) => ({ ...prev, currStep }));
  }, []);

  const handleSetUploadedImageUrls = useCallback((urls: string[]) => {
    setCreateMaterialStore((prev) => ({ ...prev, uploadedImageUrls: urls }));
  }, []);

  const handleSetProcessedImageUrls = useCallback((urls: string[]) => {
    setCreateMaterialStore((prev) => ({ ...prev, processedImageUrls: urls }));
  }, []);

  const handleClearContext = () => {
    setCreateMaterialStore(initialState);
  };

  return (
    <CreateMaterialContext.Provider
      value={{
        currStep: createMaterialStore.currStep,
        uploadedImageUrls: createMaterialStore.uploadedImageUrls,
        processedImageUrls: createMaterialStore.processedImageUrls,
        setCurrStep: handleSetCurrStep,
        setUploadImageUrls: handleSetUploadedImageUrls,
        setProcessedImageUrls: handleSetProcessedImageUrls,
        clearContext: handleClearContext,
      }}
    >
      {children}
    </CreateMaterialContext.Provider>
  );
};

export default CreateMaterialProvider;
export { CreateMaterialContext };
