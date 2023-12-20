import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Movies({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = async () => {
        // Atualize a URL com o novo termo de pesquisa
        router.push(`/movies?searchTerm=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <div>
                <div>
                    <label htmlFor="searchTerm">Palavra-chave no Título:</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSearch}>Pesquisar</button>
                </div>
            </div>

            <div>
                {data.Search && data.Search.map((m) => (
                    <div key={m.imdbID}>
                        <img src={m.Poster} alt={`${m.Title} Poster`} />
                        <div>{m.Title} --- {m.Year}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { searchTerm } = context.query;

    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=f3f0f57b&s=${searchTerm}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                data: {},
            },
        };
    }
}
