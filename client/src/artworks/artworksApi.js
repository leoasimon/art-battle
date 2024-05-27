import axios from "axios";

const baseApiUrl = "https://api.artic.edu/api/v1/artworks";
const baseImageUrl = "https://www.artic.edu/iiif/2/";

// TODO: try this query
// https://api.artic.edu/api/v1/artworks/search?q=monet

export const fetchArtistWork = async (artistId) => {
  const response = await axios({
    method: "post",
    url: `${baseApiUrl}/search`,
    headers: {},
    data: {
      query: {
        term: {
          artist_id: artistId,
        },
      },
    },
  });

  const artworkPs = response.data.data.map((artwork) => {
    return axios.get(artwork.api_link);
  });

  const artworkResponses = await Promise.all(artworkPs);

  const artworks = artworkResponses.map((response) => {
    return {
      ...response.data.data,
      image_url: `${baseImageUrl}${response.data.data.image_id}/full/843,/0/default.jpg`,
    };
  });

  return artworks;
};
