import GPSCoords from "./GPSCoords";

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

/**
 * GPS utility class.
 * Rewrite and extension of the GPS backend class written by Emmanuel Bigeon in TypeScript.
 */
export default class GPS {
  /** The value of a flat angle, in degrees. */
  private static readonly FLAT_ANGLE_DEGREE: number = 180;
  /** The (approximated) earth radius in km. */
  private static readonly EARTH_RADIUS: number = 6370.0;

  /**
   * Convert a degree angle value into a radian angle one.
   *
   * @param degree the degree value
   * @return the radian value
   */
  private static degreeToRadian(degree: number): number {
    return (degree / GPS.FLAT_ANGLE_DEGREE) * Math.PI;
  }

  /**
   * Compute the flying distance between two GPS positions.
   *
   * @param position1 the first GPS position
   * @param position2 the second GPS position
   * @return the flying distance in km
   */
  public static distance(position1: GPSCoords, position2: GPSCoords): number {
    const latitude1: number = position1.latitude;
    const longitude1: number = position1.longitude;
    const latitude2: number = position2.latitude;
    const longitude2: number = position2.longitude;

    const deltaLatitude: number = GPS.degreeToRadian(latitude2 - latitude1);
    const deltaLongitude: number = GPS.degreeToRadian(longitude2 - longitude1);
    const a: number =
      Math.pow(Math.sin(deltaLatitude / 2), 2) +
      Math.cos(GPS.degreeToRadian(latitude1)) *
        Math.cos(GPS.degreeToRadian(latitude2)) *
        Math.pow(Math.sin(deltaLongitude / 2), 2);
    return GPS.EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /**
   * Compute the midpoint between two GPS positions.
   *
   * @param position1 the first GPS position
   * @param position2 the second GPS position
   * @return the GPS position of the midpoint
   */
  public static calculateMidpoint(
    position1: GPSCoords,
    position2: GPSCoords,
  ): GPSCoords {
    let lat1 = position1.latitude;
    let lon1 = position1.longitude;
    let lat2 = position2.latitude;
    let lon2 = position2.longitude;

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    let dLon = lon2 - lon1;
    let Bx = Math.cos(lat2) * Math.cos(dLon);
    let By = Math.cos(lat2) * Math.sin(dLon);
    let lat3 = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By),
    );
    let lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    lat3 = toDegrees(lat3);
    lon3 = toDegrees(lon3);

    return { latitude: lat3, longitude: lon3 };
  }
}
