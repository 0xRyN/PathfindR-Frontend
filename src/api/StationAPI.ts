import { z } from "zod";
import Station from "../interfaces/Station";

const API_URL = import.meta.env.VITE_API_URL as string;

export const StationSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

/**
 * Validates the provided JSON object against the StationSchema and returns a Station object if valid.
 * If the validation fails, an error is logged and undefined is returned.
 *
 * @param json The JSON object to validate.
 * @returns A Station object if the validation is successful, otherwise undefined.
 */
function validateStation(json: unknown): Station | undefined {
  try {
    const station = StationSchema.parse(json);
    return {
      id: station.id,
      name: station.name,
      location: { latitude: station.latitude, longitude: station.longitude },
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Represents a class that provides methods for interacting with station data.
 */
export default class StationAPI {
  /**
   * Retrieves all stations from the API.
   * @returns A promise that resolves to an array of Station objects.
   */
  public static async getStations(): Promise<Station[]> {
    let response: Response;
    let json: unknown[];
    try {
      response = await fetch(API_URL + "/stations");
      json = await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }

    if (!Array.isArray(json)) {
      return [];
    }
    const final = json
      .map(validateStation)
      .filter((station): station is Station => station !== undefined);

    return final;
  }

  /**
   * Retrieves a specific station from the API.
   * @param id - The ID of the station to retrieve.
   * @returns A promise that resolves to the Station object with the specified ID, or undefined if not found.
   */
  public static async getStation(id: number): Promise<Station | undefined> {
    const response = await fetch(`${API_URL}/station/${id}`);
    if (!response.ok) {
      return undefined;
    }
    const json = await response.json();
    return validateStation(json);
  }

  /**
   * Adds a new station to the API.
   * @param station - The station object to add.
   * @returns A promise that resolves to the added Station object, or undefined if the addition failed.
   */
  public static async addStation(station: Station): Promise<boolean> {
    const response = await fetch(API_URL + "/stations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(station),
    });

    return response.ok;
  }
}
