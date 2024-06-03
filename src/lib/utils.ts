import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const weatherLocationString = ({
  name,
  country,
  lat,
  lon,
}: {
  name?: string;
  country?: string;
  lat: number;
  lon: number;
}) => {
  return `${name && country ? (`${name}, ${country}`) : `Lat: ${lat.toFixed(3)}, Lng: ${lon.toFixed(3)}`}`
};

export const locationString = ({
  name,
  country,
  lat,
  lon,
}: {
  name?: string;
  country?: string;
  lat: number;
  lon: number;
}) => {
  return (name && country) ? `${name}, ${country}` : `Lat: ${lat}, Lng: ${lon}`;
};
