import Link from 'next/link';
import useSWR from 'swr';
import { useState } from 'react';
import { Button, Spin, Alert, Card, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Movies3() {
  const [url, setUrl] = useState('');
  const { data, error } = useSWR(url, theFetcher);

  const onClickHandler = (e) => {
    e.preventDefault();
    if (url === '') setUrl('http://www.omdbapi.com/?apikey=f3f0f57b&s=bagdad');
    else setUrl('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <TheLink url={url} handler={onClickHandler} />
      <TheMovies data={error ? { error: 'Erro na pesquisa' } : data ? data : { Search: '' }} show={url !== ''} />
    </div>
  );
}

async function theFetcher(url) {
  if (url === null || url === '') return { Search: '' };
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export function TheMovies({ data, show }) {
  if (!show) return <div></div>;

  if (data.error) return <Alert message="Falha na requisição" type="error" />;

  if (data.Search === '') return <Spin tip="Carregando..." />;

  return (
    <div>
      {data.Search.map((m, index) => (
        <MovieCard key={index} movie={m} />
      ))}
    </div>
  );
}

export function TheLink({ url, handler }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button type="primary" onClick={handler}>
        {url === '' ? 'Mostrar' : 'Ocultar'}
      </Button>
    </div>
  );
}

export function MovieCard({ movie }) {
    return (
      <Card
        style={{ marginBottom: '20px' }}
        title={<Title level={4}>{movie.Title}</Title>}
        extra={<Link href={`/onemovie/${movie.imdbID}`}>Detalhes</Link>}
      >
        <img src={movie.Poster} alt={`${movie.Title} Poster`} style={{ maxWidth: '100%' }} />
        <Text>{movie.Year}</Text>
      </Card>
    );
  }
