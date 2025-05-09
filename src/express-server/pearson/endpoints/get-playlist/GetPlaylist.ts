import BaseEndpointHandler from '../../../common/base-endpoint/BaseEndpointHandler';
import S3 from '../../../common/aws/S3';
import { search } from '../../../common/google/youtube';

export default class GetPlaylist extends BaseEndpointHandler {
  async getResponseContent(): Promise<any> {
    //return this.getHardcodedResponse();
    const fileContent = await this.getS3File();
    const { artist } = fileContent;
    //{"artist":["Queen","ABBA","Bee Gees"]}
    return this.getVideosOfArtists(artist);
    //return this.searchAbbaVideos();
  }

  // buildYoutubeSearchUrl(query: string, maxResults = 10): string {
  //   const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  //   const params = new URLSearchParams({
  //     part: 'snippet',
  //     maxResults: maxResults.toString(),
  //     q: query,
  //     type: 'video',
  //     key: process.env.YOUTUBE_API_KEY as string,
  //   });

  //   return `${baseUrl}?${params.toString()}`;
  // }

  // //function from gemini AI
  // async searchAbbaVideos(): Promise<any> {
  //   const query = 'ABBA videos';
  //   const url = this.buildYoutubeSearchUrl(query);
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();

  //     if (data.items) {
  //       const videoItems = data.items.map((item: any) => ({
  //         videoId: item.id.videoId,
  //         title: item.snippet.title,
  //         thumbnail: item.snippet.thumbnails.default.url,
  //         channelTitle: item.snippet.channelTitle,
  //         description: item.snippet.description,
  //       }));
  //       return videoItems;
  //     } else {
  //       console.log('No videos found');
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error('Error fetching YouTube videos:', error);
  //     return []; // Return an empty array in case of an error.
  //   }
  // }

  async getS3File(): Promise<any> {
    const config = {
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.PEAROSN_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.PEAROSN_S3_SECRET_KEY as string,
      },
    };
    const s3 = new S3(config);
    return s3.getAsJsonObject('pearson-backend-exercise', 'toSearch.json');
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
    const res = await search(artist);
    const { items } = res;
    return items.map((item: any) => {
      return { videoId: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.default.url };
    });
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
