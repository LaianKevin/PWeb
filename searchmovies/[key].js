// pages/searchmovies/[key].js
import useSWR from 'swr';
import { useState } from 'react';
import { Card, Typography, Button, Input } from 'antd';
import 'antd/dist/antd.css';  // Importe o estilo do Ant Design

const { Title, Text } = Typography;

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const SearchMovies = () => {
  const [key, setKey] = useState('');
  const { data, error } = useSWR(key ? `http://www.omdbapi.com/?apikey=f3f0f57b&s=${key}` : null, fetcher);

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (key.trim() !== '') {
      setKey(key.trim());
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pesquisa de Filmes</h1>
      <form onSubmit={onSearchHandler}>
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Digite o termo de pesquisa"
        />
        <Button type="primary" htmlType="submit">
          Pesquisar
        </Button>
      </form>
      {error && <div style={{ color: 'red' }}>Falha na pesquisa</div>}
      {data && (
        <div>
          {data.Search.map((m, index) => (
            <MovieCard key={index} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;

export function MovieCard({ movie }) {
  return (
    <Card style={{ marginBottom: '20px' }} title={<Title level={4}>{movie.Title}</Title>}>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} style={{ maxWidth: '100%' }} />
      <Text>{movie.Year}</Text>
    </Card>
  );
}
