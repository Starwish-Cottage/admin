const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;

export const uploadFiles = async (files: FileList): Promise<string[]> => {
  const formData = new FormData();
  if (files.length === 0) {
    throw new Error("No file selected");
  }
  for (const file of files) {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      throw new Error(`不支持文件类型: 所选文件中包含${file.type || "文件夹"}`);
    }
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
