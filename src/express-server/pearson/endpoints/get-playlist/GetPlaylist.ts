import dotenv from 'dotenv';
import axios from 'axios';
import BaseEndpointHandler from '../../../common/base-endpoint/BaseEndpointHandler';
import S3 from '../../../common/aws/S3';

export default class GetPlaylist extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    dotenv.config();
    const fileContent = await this.getS3File();
    const { artist } = fileContent;
    //{"artist":["Queen","ABBA","Bee Gees"]}
    return this.getVideosOfArtists(artist);
  }

  async getS3File(): Promise<any> {
    const config = {
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.PEAROSN_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.PEAROSN_S3_SECRET_KEY as string,
      },
    };
    const s3 = new S3(config);
    return s3.getS3AsJson('pearson-backend-exercise', 'toSearch.json');
  }

  async getVideosOfArtists(artists: string[]): Promise<any> {
    let items: string[] = [];
    for (const artist of artists) {
      const artistItems = await this.getArtistItems(artist);
      items = [...items, ...artistItems];
    }
    return { items };
  }

  async getArtistItems(artist: string): Promise<any> {
    const res = await this.search(artist);
    const { items } = res;
    return items.map((item: any) => {
      return { videoId: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.default.url };
    });
  }

  async search(query: string): Promise<any> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
      },
    });
    return res.data;
  }
}
