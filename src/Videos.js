import React, { useCallback, useEffect, useState } from "react";
import "./Videos.css";
import Filter from "./Filter";
import SingleVideo from "./SingleVideo";

function Videos() {
  let API_KEY = "AIzaSyCB4i0_zPrkoPncY54husqKHEJtwUtOK2A";
  let Video_http = "https://www.googleapis.com/youtube/v3/videos?";
  let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

  //   const [videos, setVideos] = useState();
  //   let new_video;
  const [videos, setVideos] = useState([]);

  // const fetchVideoData = () => {
  //   fetch(
  //     Video_http +
  //       new URLSearchParams({
  //         key: API_KEY,
  //         part: "snippet",
  //         chart: "mostPopular",
  //         maxResults: 5,
  //         regionCode: "IN",
  //       })
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // const videoDataWithChannelIcons = data.items.map((item) => {
  //       //   return {
  //       //     ...item,
  //       //     channelIcon: "",
  //       //   };
  //       // });
  //       // setVideos(videoDataWithChannelIcons);
  //       // videoDataWithChannelIcons.forEach(getChannelIcon); // Fetch channel icons
  //       // console.log(videoDataWithChannelIcons);
  //       // setVideos(videoDataWithChannelIcons);

  //       data.items.forEach((item) => {
  //         getChannelIcon(item);
  //       });
  //       // setVideos(data);
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getChannelIcon = (video_data) => {
  //   // fetch(
  //   //   channel_http +
  //   //     new URLSearchParams({
  //   //       key: API_KEY,
  //   //       part: "snippet",
  //   //       id: video_data.snippet.channelId,
  //   //     })
  //   // )
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     const channelIcon = data.items[0]?.snippet?.thumbnails?.default?.url;
  //   //     if (channelIcon) {
  //   //       const updatedVideos = videos.map((video) => {
  //   //         if (video.id === video_data.id) {
  //   //           return { ...video, channelIcon: channelIcon };
  //   //         }
  //   //         return video;
  //   //       });
  //   //       // setVideos(updatedVideos);
  //   //     }
  //   //   });
  //   fetch(
  //     channel_http +
  //       new URLSearchParams({
  //         key: API_KEY,
  //         part: "snippet",
  //         id: video_data.snippet.channelId,
  //       })
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       video_data.channelIcon = data.items[0].snippet.thumbnails.default.url;
  //       // console.log(video_data);
  //       // makeVideoCard(video_data);
  //     });
  // };
  // useEffect(() => {
  //   const fetchDataAndStore = () => {
  //     const data = fetchVideoData();
  //     if (data) {
  //       setVideos(data);
  //     }
  //   };
  //   fetchDataAndStore();
  // }, []);
  //   useEffect(() => {
  //     fetchVideosData();
  //   }, []);
  //   let videos= fetchVideosData();

  //Reference from Chat GPT

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        Video_http +
          new URLSearchParams({
            key: API_KEY,
            part: "snippet,contentDetails",
            chart: "mostPopular",
            maxResults: 10,
            regionCode: "IN",
          })
      );
      const data = await response.json();
      console.log(data);
      return data; // Return the fetched data
    } catch (error) {
      console.log("error in fetching data: " + error);
      return null;
    }
  };

  const getChannelIcon = async (video_data) => {
    try {
      const response = await fetch(
        channel_http +
          new URLSearchParams({
            key: API_KEY,
            part: "snippet",
            id: video_data.snippet.channelId,
          })
      );
      const data = await response.json();
      const channelIcon =
        data.items[0]?.snippet?.thumbnails?.default?.url || ""; // Default to empty string if no icon available
      return { ...video_data, channelIcon }; // Return updated video data
    } catch (error) {
      console.log("error in fetching channel icon: " + error);
      return video_data; // Return original video data on error
    }
  };

  useEffect(() => {
    const fetchDataAndStore = async () => {
      const data = await fetchVideoData(); // Wait for the data to be fetched
      if (data) {
        const videosWithIcons = await Promise.all(
          data.items.map(getChannelIcon)
        ); // Fetch channel icons for all videos concurrently
        setVideos(videosWithIcons);
      }
    };
    fetchDataAndStore();
  }, []);

  function convertDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    const formattedDuration = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedDuration;
  }

  // Usage
  // const duration = "PT13M31S";
  // const formattedDuration = convertDuration(duration);

  return (
    <div className="videos">
      <Filter />
      <div className="row">
        {videos.map((video) => (
          <SingleVideo
            key={video.id}
            thumb_img={video.snippet.thumbnails.high.url}
            profile_img={video.channelIcon}
            title={video.snippet.title}
            channel_name={video.snippet.channelTitle}
            video_duration={convertDuration(video.contentDetails.duration)}
            video_link={`https://www.youtube.com/watch?v=${video.id}`}
            channel_link={`https://www.youtube.com/@${video.snippet.channelTitle
              .split(" ")
              .join("")}`}
          />
        ))}
      </div>
    </div>
  );
}
export default Videos;
