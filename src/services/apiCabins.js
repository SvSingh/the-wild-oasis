import supabase, { supabaseUrl } from "./SupaBase";

async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error(error.message);
  }
  return cabins;
}

export { getCabins, DeleteCabin, createEditCabin };

async function DeleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error(error.message);
  }
}

async function createEditCabin(cabin, editId) {
  //https://ekoeeghdzutqawasjpxi.supabase.co/storage/v1/object/public/cabinImages/cabin-001.jpg`
  let hasImagePAth = false;
  if (typeof cabin.image === "string") {
    hasImagePAth = cabin.image?.startsWith(
      `${supabaseUrl}/storage/v1/object/public/cabinImages/`,
    );
  }
  const imageName = hasImagePAth
    ? ""
    : `${Math.random().toString(36).substring(2, 15)}-${cabin.image.name}`.replaceAll(
        "/",
        "",
      );
  const imagePath = hasImagePAth
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;

  let query = supabase.from("cabins");
  if (editId) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", editId);
  } else {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error(error.message);
  }

  if (!hasImagePAth) {
    const { error: errorImage } = await supabase.storage
      .from("cabinImages")
      .upload(imageName, cabin.image);
    if (errorImage) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error("Error uploading image:", errorImage);
      throw new Error(errorImage.message);
    }
  }
  return data;
}
