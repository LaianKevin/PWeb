import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Movies2() {
  const router = useRouter();
  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=f3f0f57b&s=bagdad`,
    fetcher
  );

  if (error) return <div>falha na requisição...</div>;

  if (!data) return <div>carregando...</div>;

  const handleMovieClick = (imdbID) => {
    router.push(`/movie/${imdbID}`);
  };

  return (
    <div>
      {data.Search.map((m) => (
        <div key={m.imdbID} onClick={() => handleMovieClick(m.imdbID)}>
          <img src={m.Poster} alt={`${m.Title} Poster`} />
          <div>
            {m.Title} --- {m.Year}
          </div>
        </div>
      ))}
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
