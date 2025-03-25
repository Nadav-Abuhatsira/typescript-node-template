import React, { useState } from 'react';
import './videos-page.css';
import '../style/button.css';
import axios from 'axios';

export default function Pearson() {
  const [videos, setVideos] = useState<any[]>([]);

  async function callPearsonApi(): Promise<any> {
    const res = await axios.get('http://localhost:5008/pearson/get-playlist');
    return res.data;
  }

  const callYoutue = async () => {
    const res = (await callPearsonApi()) as any;
    console.log(res);
    console.log('callYoutue');
    setVideos(res.items);
  };

  const playVideo = async (video: any) => {
    console.log('playVideo', video);
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  return (
    <div className="videos-page">
      <h1>Hi Pearson</h1>

      <button onClick={callYoutue} className="button-17 get-videos-button">
        Get YouTube Videos
      </button>
      <div className="videos">
        {videos.map((video: any) => (
          <div className="video-card" key={video.id} onClick={() => playVideo(video)}>
            <span className="ellipsis-text" title={video.title}>
              {video.title}
            </span>
            <img src={video.thumbnail} alt={video.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
