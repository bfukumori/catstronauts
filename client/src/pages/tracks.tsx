import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { Layout, QueryResult } from '../components';
import TrackCard from '../containers/track-card';

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const TRACKS = gql(`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`);

const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome.map((item) => (
          <TrackCard key={item.id} track={item} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
