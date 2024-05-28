import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArtist } from "./artistApi";
import { fetchArtistWork } from "../artworks/artworksApi";

function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistWorks, setArtistWorks] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const getArtistWork = async () => {
      setStatus("loading");
      const data = await fetchArtistWork(artist.title);
      setArtistWorks(data);
      setStatus("idle");
    };

    if (artist) {
      getArtistWork();
    }
  }, [artist]);

  useEffect(() => {
    const getArtist = async () => {
      setStatus("loading");
      const data = await fetchArtist(id);
      setArtist(data);
      setStatus("idle");
    };

    getArtist();
  }, [id]);

  return (
    <div className="p-4 text-black">
      {status === "loading" && <p>Loading...</p>}
      {status === "idle" && artist && (
        <div>
          <h1 className="text-xl font-bold">{artist.title}</h1>
          <span>
            {artist.birth_date}
            {artist.death_date ? `- ${artist.death_date}` : ""}
          </span>
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
            {artistWorks.map((work) => (
              <Link
                to={`/artworks/${work.id}`}
                key={work.id}
                className="relative row-span-1 p-4 transition-all duration-200 bg-white group aspect-square hover:p-0"
              >
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center justify-center h-full bg-yellow bg-opacity-40">
                    <span className="p-2 text-xl font-bold text-center text-white">
                      {work.title}, {work.date_display}
                    </span>
                  </div>
                </div>
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="object-cover w-full h-full"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistPage;
