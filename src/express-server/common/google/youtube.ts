import axios from 'axios';

export async function search(query: string): Promise<any> {
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
