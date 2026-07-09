// parse_itineraries.js
// ES module version of the itinerary duplicate analysis script.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const baseDir = path.resolve('src/content');

function collectFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function loadItinerary(file) {
  const content = fs.readFileSync(file, 'utf8');
  const { data } = matter(content);
  if (Array.isArray(data.itinerary)) {
    return data.itinerary.map((day) => ({
      day: day.day,
      title: (day.title || '').trim(),
      body: (day.body || '').trim(),
      accommodation: (day.accommodation || '').trim(),
      meals: (day.meals || '').trim(),
    }));
  }
  return null;
}

function hashItinerary(itin) {
  return JSON.stringify(itin);
}

function main() {
  const files = collectFiles(baseDir);
  const itineraries = [];
  for (const f of files) {
    const itin = loadItinerary(f);
    if (itin) itineraries.push({ file: f, days: itin });
  }
  const total = itineraries.length;
  const fullMap = {};
  for (const { file, days } of itineraries) {
    const key = hashItinerary(days);
    if (!fullMap[key]) fullMap[key] = [];
    fullMap[key].push(file);
  }
  const duplicateFull = Object.values(fullMap).filter((arr) => arr.length > 1);
  const dayMap = {};
  for (const { file, days } of itineraries) {
    for (const d of days) {
      const key = `${d.day}|${d.title}|${d.body}|${d.accommodation}|${d.meals}`;
      if (!dayMap[key]) dayMap[key] = [];
      dayMap[key].push(file);
    }
  }
  const duplicateDays = Object.entries(dayMap).filter(([, arr]) => arr.length > 1);
  const accMap = {};
  for (const { file, days } of itineraries) {
    for (const d of days) {
      const key = `${d.day}|${d.accommodation}`;
      if (!accMap[key]) accMap[key] = [];
      accMap[key].push(file);
    }
  }
  const duplicateAccom = Object.entries(accMap).filter(([, arr]) => arr.length > 1);

  const report = {
    totalItineraries: total,
    identicalFullItineraries: duplicateFull.map((arr) => ({ count: arr.length, files: arr })),
    duplicateDayObjects: duplicateDays.map(([key, arr]) => ({ key, count: arr.length, files: arr })),
    duplicateAccommodations: duplicateAccom.map(([key, arr]) => ({ key, count: arr.length, files: arr })),
  };
  console.log(JSON.stringify(report, null, 2));
}

main();
