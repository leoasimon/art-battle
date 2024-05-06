import { useEffect, useState } from "react";

const totalPages = 6801;

const baseImageUrl = "https://www.artic.edu/iiif/2/";
const baseApiUrl = "https://api.artic.edu/api/v1/artworks/";

const useRandomArtworks = () => {
  const [status, setStatus] = useState("idle");
  const [imageUrls, setImageUrls] = useState([]);
  const [artworksData, setArtworksData] = useState([]);

  useEffect(() => {
    setStatus("loading");

    const randomPageNb1 = Math.floor(Math.random() * totalPages);
    const randomPageNb2 = Math.floor(Math.random() * totalPages);

    const ps = [
      fetch(`${baseApiUrl}?page=${randomPageNb1}&limit=1`),
      fetch(`${baseApiUrl}?page=${randomPageNb2}&limit=1`),
    ];

    Promise.all(ps)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((datas) => {
        setArtworksData(datas.map(d => d.data[0]));
        setImageUrls(
          datas.map(
            (data) => `
          ${baseImageUrl}${data.data[0].image_id}/full/843,/0/default.jpg
        `
          )
        );
        setStatus("idle");
      });
  }, []);

  return { status, imageUrls, artworksData };
};

export default useRandomArtworks;
