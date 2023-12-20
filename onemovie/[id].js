import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Spin, Alert, Descriptions, Typography } from 'antd';

const { Title, Text } = Typography;

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const OneMovie = () => {
  const router = useRouter();
  const { id } = router.query;
  const apiUrl = `http://www.omdbapi.com/?apikey=f3f0f57b&i=${id}`;
  const { data, error } = useSWR(id ? apiUrl : null, fetcher);

  if (!id) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detalhes do Filme</h1>
      {error && <Alert message="Falha na requisição" type="error" />}
      {!data && <Spin tip="Carregando..." />}
      {data && (
        <div>
          <img src={data.Poster} alt={`${data.Title} Poster`} style={{ maxWidth: '100%' }} />
          <Title level={2}>{data.Title}</Title>
          <Descriptions>
            <Descriptions.Item label="Ano">{data.Year}</Descriptions.Item>
            <Descriptions.Item label="Tipo">{data.Type}</Descriptions.Item>
            <Descriptions.Item label="Lançamento">{data.Released}</Descriptions.Item>
            <Descriptions.Item label="Gênero">{data.Genre}</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: '20px' }}>
            <Text strong>Enredo:</Text>
            <p>{data.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneMovie;
