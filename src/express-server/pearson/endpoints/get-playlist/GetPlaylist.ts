import dotenv from 'dotenv';
import axios from 'axios';
import BaseEndpointHandler from '../../../common/base-endpoint/BaseEndpointHandler';
import S3 from '../../../common/aws/S3';

export default class GetPlaylist extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    //return this.getHardcodedResponse();
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

  getHardcodedResponse(): any {
    return {
      items: [
        {
          videoId: 'fJ9rUzIMcZQ',
          title: 'Queen – Bohemian Rhapsody (Official Video Remastered)',
          thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/default.jpg',
        },
        {
          videoId: 'j440-D5JhjI',
          title: 'Queen - Greatest Hits (2) [1 hour 20 minutes long]',
          thumbnail: 'https://i.ytimg.com/vi/j440-D5JhjI/default.jpg',
        },
        {
          videoId: 'HgzGwKwLmgM',
          title: 'Queen - Don&#39;t Stop Me Now (Official Video)',
          thumbnail: 'https://i.ytimg.com/vi/HgzGwKwLmgM/default.jpg',
        },
        {
          videoId: '-tJYN-eG1zk',
          title: 'Queen - We Will Rock You (Official Video)',
          thumbnail: 'https://i.ytimg.com/vi/-tJYN-eG1zk/default.jpg',
        },
        {
          videoId: 'kijpcUv-b8M',
          title: 'Queen - Somebody To Love (Official Video)',
          thumbnail: 'https://i.ytimg.com/vi/kijpcUv-b8M/default.jpg',
        },
        {
          videoId: 'xFrGuyw1V8s',
          title: 'ABBA - Dancing Queen (Official Music Video)',
          thumbnail: 'https://i.ytimg.com/vi/xFrGuyw1V8s/default.jpg',
        },
        {
          videoId: 'XEjLoHdbVeE',
          title: 'ABBA - Gimme! Gimme! Gimme! (A Man After Midnight)',
          thumbnail: 'https://i.ytimg.com/vi/XEjLoHdbVeE/default.jpg',
        },
        {
          videoId: 'unfzfe8f9NI',
          title: 'ABBA - Mamma Mia (Official Music Video)',
          thumbnail: 'https://i.ytimg.com/vi/unfzfe8f9NI/default.jpg',
        },
        {
          videoId: 'p4QqMKe3rwY',
          title: 'ABBA - Chiquitita (Official Music Video)',
          thumbnail: 'https://i.ytimg.com/vi/p4QqMKe3rwY/default.jpg',
        },
        {
          videoId: 'ETxmCCsMoD0',
          title: 'ABBA - Money, Money, Money (Official Music Video)',
          thumbnail: 'https://i.ytimg.com/vi/ETxmCCsMoD0/default.jpg',
        },
        {
          videoId: '0gF2yrIVmQU',
          title: 'Bee Gees Greatest Hits 2024   Pop Music Mix   Top 10 Hits Of All Time',
          thumbnail: 'https://i.ytimg.com/vi/0gF2yrIVmQU/default.jpg',
        },
        {
          videoId: 'XpqqjU7u5Yc',
          title: 'Bee Gees - How Deep Is Your Love (Official Video)',
          thumbnail: 'https://i.ytimg.com/vi/XpqqjU7u5Yc/default.jpg',
        },
        {
          videoId: 'fNFzfwLM72c',
          title: 'Bee Gees - Stayin&#39; Alive (Official Music Video)',
          thumbnail: 'https://i.ytimg.com/vi/fNFzfwLM72c/default.jpg',
        },
        {
          videoId: 'FuoWykVNwyI',
          title: 'Bee Gees - Massachusetts (One For All Tour Live In Australia 1989)',
          thumbnail: 'https://i.ytimg.com/vi/FuoWykVNwyI/default.jpg',
        },
        {
          videoId: 'i6iBAuwBODA',
          title: 'Bee Gees - Too Much Heaven',
          thumbnail: 'https://i.ytimg.com/vi/i6iBAuwBODA/default.jpg',
        },
      ],
    };
  }
}
