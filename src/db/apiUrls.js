import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  // fetch urls and clicks api

  // The columns to retrieve, separated by commas. Columns can be renamed when returned with customName:columnName
  // Perform a SELECT query on the table or view.

  // from which table we have to fetch

  // The column to filter on
  // Match only rows where column is equal to value.
  // To check if the value of column is NULL, you should use .is() instead.

  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;

  // now we wanted to load clicks related to partcular user because that's we are going to show inside of our dashboard  page
}

// api for deleting URL

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete Url");
  }
  return data;
}

// api for creating URL

export async function CreateUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  //toString : Specifies a radix for converting numeric values to strings. This value is only used for numbers.
  // Returns a string representation of an object.

  // subString : The zero-based index number indicating the beginning of the substring.

  // Returns the substring at the specified location within a String object.

  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  // select , so that we returns as well because we want to see data that's have been actually created

  if (error) {
    console.log(error.message);
    throw new Error("Error creating short URL");
  }
  return data;
}

// create an api when we hit the endpoint of id of short url/custom-url , it well fetch url from long database and we can re-direct to it

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Error creating short link");
  }
  return data;
}

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Short URL not found");
  }
  return data;
}
