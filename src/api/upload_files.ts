const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;

export const uploadFiles = async (files: FileList): Promise<string[]> => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  const response = await fetch(`${API_ENDPOINT}/upload`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "File upload failed");
  } else {
    return result.image_urls as string[];
  }
};
