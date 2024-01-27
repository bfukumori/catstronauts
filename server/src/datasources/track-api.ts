import { RESTDataSource } from '@apollo/datasource-rest';
import { AuthorModel, ModuleModel, TrackModel } from '../models';

export class TrackAPI extends RESTDataSource {
  baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';

  getTracksForHome(): Promise<TrackModel[]> {
    return this.get('tracks');
  }

  getAuthorByID(authorID: string): Promise<AuthorModel> {
    return this.get(`author/${encodeURIComponent(authorID)}`);
  }

  getTrackByID(trackID: string): Promise<TrackModel> {
    return this.get(`track/${encodeURIComponent(trackID)}`);
  }

  getTrackModules(trackID: string): Promise<ModuleModel[]> {
    return this.get(`track/${encodeURIComponent(trackID)}/modules`);
  }

  getModuleByID(moduleID: string): Promise<ModuleModel> {
    return this.get(`module/${encodeURIComponent(moduleID)}`);
  }

  incrementTrackViews(trackId: string): Promise<TrackModel> {
    return this.patch(`track/${trackId}/numberOfViews`);
  }
}
