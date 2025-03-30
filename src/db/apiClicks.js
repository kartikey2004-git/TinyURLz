import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

// now we wanted to load clicks related to partcular user because that's we are going to show inside of our dashboard  page

export async function getClicksforUrls(urlIds) {
  // we want to fetch clicks for urlIds named array

  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    // The column to filter on
    // Match only rows where column is included in the values array.
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load clicks");
  }
  return data;
}

// creating api , after we found our original url, we have to store the stats for that particular user like device location etc...

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load stats");
  }
  return data;
}


const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();

    // function to get result about user device
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");

    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.log("Error recording click:", error);
  }
};