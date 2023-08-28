import React from "react";

function SingleVideo({
  thumb_img,
  profile_img,
  title,
  channel_name,
  views,
  timestamps,
  video_duration,
  video_link,
  channel_link,
}) {
  return (
    <div className="col-4">
      <div className="thumbnail_img relative">
        <a href={video_link} rel="noreferrer" target="_blank">
          <img
            src={thumb_img}
            alt=""
            className="thumb-img pointer"
            style={{ width: "100%" }}
          />
        </a>
        <span className="videos_duration absolute">{video_duration}</span>
        <div className="description_option d-flex">
          <div className="profile_img">
            <a href={channel_link} target="_blank" rel="noreferrer">
              <img
                src={profile_img}
                alt="Prof-IMG"
                className="channel_image pointer"
              />
            </a>
          </div>
          <div
            className="title d-flex align-items-center justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <p style={{ width: "16ch", overflow: "hidden" }}>{title}</p>
            <span className="channelname">{channel_name}</span>
            <div className="time_description">
              <span className="views">{views}</span>
              <span className="timestamp">{timestamps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleVideo;
