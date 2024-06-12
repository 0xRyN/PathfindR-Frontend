const API_URL = import.meta.env.VITE_API_URL as string;

/*
 * This class provides an interface to the Upload API.
 * Use this class to upload files to the API.
 */
export default class UploadAPI {
  /**
   * Uploads a file to the API.
   * @param file - The file to upload.
   * @returns A promise that resolves to the added Upload object, or undefined if the addition failed.
   */
  public static async uploadFile(file: File): Promise<boolean> {
    const formData = new FormData();
    formData.append("file", file);

    let response = await fetch(API_URL + "/files/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return false;
    }

    return true;
  }

  /**
   * Builds a network from the uploaded files. Call after uploading both a network and a schedule file.
   * @param name - The name of the network to build.
   * @returns A promise that resolves to true if the network was built successfully, or false otherwise.
   */
  public static async buildNetwork(name: string): Promise<boolean> {
    const response = await fetch(API_URL + "/networks", {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return false;
    }

    return true;
  }
}
