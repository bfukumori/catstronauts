import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { Layout, ModuleDetail, QueryResult } from '../components';
import { useParams } from 'react-router-dom';

const GET_MODULE_AND_TRACK_PARENT = gql(`
query GetModuleAndTrackParent($trackId: ID!, $moduleId: ID!) {
  track(id: $trackId) {
    title
    id
    modules {
      title
      id
      length
    }
  }
  module(id: $moduleId) {
    videoUrl
    title
    content
    id
  }
}
`);

const Module = () => {
  const { trackId = '', moduleId = '' } = useParams();
  const { loading, error, data } = useQuery(GET_MODULE_AND_TRACK_PARENT, {
    variables: { trackId, moduleId },
  });
  return (
    <QueryResult error={error} loading={loading} data={data}>
      <ModuleDetail module={data?.module} track={data?.track} />
    </QueryResult>
  );
};

export default Module;
