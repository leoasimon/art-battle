const baseApiUrl = "https://api.artic.edu/api/v1/artworks/";

export const fetchLeaderboard = async (page = 1) => {
  const result = await fetch(
    "/.netlify/functions/get-leaderboard?page=" + page
  ).then((response) => response.json());

  const { nPages, data } = result;

  const ps = data.map((entry) => {
    return fetch(`${baseApiUrl}${entry.artwork_id}`)
      .then((response) => response.json())
      .then((data) => {
        return {
          ...entry,
          artwork: data.data,
        };
      });
  });

  const artworks = await Promise.all(ps);

  return { artworks, nPages };
};
