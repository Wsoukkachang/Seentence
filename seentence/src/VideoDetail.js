import React from "react";
import "./Video.css";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>You need to search something.</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);

  return (
    <div>
      <div className="video__embed">
        <iframe
          className="video__player"
          src={videoSrc}
          allowFullScreen
          title="Video player"
        />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
