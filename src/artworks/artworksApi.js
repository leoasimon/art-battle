import axios from "axios";

import publicArtworkIds from "./publicArtworkIds";

const baseApiUrl = "https://api.artic.edu/api/v1/artworks";
const baseImageUrl = "https://www.artic.edu/iiif/2/";

const requiredFields = [
  "id",
  "title",
  "artist_title",
  "image_id",
  "artist_id",
  "date_display",
  "description",
];
const fieldsQueryString = "fields=" + requiredFields.join(",");

// TODO: try this query
// https://api.artic.edu/api/v1/artworks/search?q=monet

const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getRandomArtworkId = () => getRandomItem(publicArtworkIds);

export const fetchArtistWork = async (name) => {
  const response = await axios.get(`${baseApiUrl}/search`, {
    params: {
      query: {
        term: {
          is_public_domain: true,
        },
      },
      q: name,
      fields: "api_link",
    },
  });

  // const response = await axios.get(publicDomainArtworksApiUrl);

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

export const fetchArtwork = async (artworkId) => {
  const response = await axios.get(
    `${baseApiUrl}/${artworkId}?${fieldsQueryString}`
  );

  return {
    ...response.data.data,
    image_url: `${baseImageUrl}${response.data.data.image_id}/full/843,/0/default.jpg`,
  };
};

export const fetchRandomArtworks = async (n = 2) => {
  const ps = Array.from({ length: n }, () => {
    const randomId = getRandomArtworkId();
    return fetchArtwork(randomId);
  });

  const artworks = await Promise.all(ps);

  return artworks;
};
