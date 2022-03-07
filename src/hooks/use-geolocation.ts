import { useEffect, useState } from 'react';

interface Coordinates {
  readonly lat: number;
  readonly lon: number;
}

interface Location {
  readonly isLoaded: boolean;
  readonly coordinates?: Coordinates;
  readonly error?: {
    code: number;
    message: string;
  };
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    isLoaded: false,
  });

  const onSuccess = (geolocation: GeolocationPosition) => {
    const { latitude, longitude } = geolocation.coords;

    setLocation({
      isLoaded: true,
      coordinates: {
        lat: latitude,
        lon: longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      isLoaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation({
        isLoaded: true,
        error: {
          code: 0,
          message: 'Geolocation is not supported',
        },
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
