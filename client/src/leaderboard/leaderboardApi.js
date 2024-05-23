const baseApiUrl = "https://api.artic.edu/api/v1/artworks/";

export const fetchLeaderboard = async (page = 1) => {
  const response = await fetch(
    `${process.env.REACT_APP_SCORING_API_URL}/leaderboard?page=${page}`
  );

  const result = await response.json();
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
