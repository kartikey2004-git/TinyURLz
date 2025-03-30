import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// function for fetching user from local storage in our context api

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  // Returns the session, refreshing it if necessary.

  // The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.

  // if we dont trust local storage for some reason, if we want to fetch brand new user from database getUser() function in auth

  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

// creating of api for signing up the user

export async function signup({ name, email, password, profile_pic }) {
  // from : The bucket id to operate on Perform file operation in a bucket.

  // upload: The file path, including the file name. Should be of the format folder/subfolder/filename.png. The bucket must already exist before attempting to upload.

  // Uploads a file to an existing bucket.

  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  // Creates a new user.
  // Be aware that if a user account exists in the system you may get back an error message that attempts to hide this information from the user.

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // if we push some data to meta data of the user
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// logic for logout functionality

export async function logout() {
  // Inside a browser context, signOut() will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a "SIGNED_OUT" event.

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
