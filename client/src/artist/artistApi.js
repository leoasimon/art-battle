const baseApi = "https://api.artic.edu/api/v1/artists";

export const fetchArtist = async (artistId) => {
  const response = await fetch(`${baseApi}/${artistId}`);
  const data = await response.json();
  return data.data;
};
