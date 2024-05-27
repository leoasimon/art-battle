import { useEffect, useState } from "react";
import { fetchArtwork } from "./artworksApi";
import { Link, useParams } from "react-router-dom";

function ArtworkPage() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    fetchArtwork(id).then((data) => {
      setStatus("idle");
      setArtwork(data);
    });
  }, [id]);

  return (
    <div className="p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "idle" && artwork && (
        <div>
          <Link to={`/artist/${artwork.artist_id}`}>
            <h1 className="mb-2 text-xl font-bold">{artwork.artist_title}</h1>
          </Link>
          <span className="italic">{artwork.title}</span>
          <img src={artwork.image_url} alt={artwork.title} className="mt-4" />
          {artwork.description && (
            <div
              dangerouslySetInnerHTML={{ __html: artwork.description }}
              className="mt-4 text-sm"
            ></div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArtworkPage;
