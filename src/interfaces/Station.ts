import GPSCoords from "../model/GPS/GPSCoords";

export default interface Station {
  id: number;
  name: string;
  location: GPSCoords;
}
