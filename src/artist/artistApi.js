const baseApi = "https://api.artic.edu/api/v1/artists";

const requiredFields = ["title", "birth_date", "death_date"];

export const fetchArtist = async (artistId) => {
  const response = await fetch(
    `${baseApi}/${artistId}?fields=${requiredFields.join(",")}`
  );
  const data = await response.json();
  return data.data;
};
