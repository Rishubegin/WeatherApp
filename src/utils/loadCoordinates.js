import Papa from "papaparse";

let coordinates = [];

export async function loadCoordinates() {
  if (coordinates.length > 0) return coordinates;

  const response = await fetch("/worldcities.csv");
  const text = await response.text();

  const result = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  coordinates = result.data;
  return coordinates;
}

export async function getRandomLocation() {
  const data = await loadCoordinates();

  return data[Math.floor(Math.random() * data.length)];
}