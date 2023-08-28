let API_KEY = "AIzaSyD8435AxpJXYTQcRWGkkQwbzsAdWMXzod8";
let Video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  Video_http +
    new URLSearchParams({
      key: API_KEY,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 1,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    //   console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: API_KEY,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      video_data.channelIcon = data.items[0].snippet.thumbnails.default.url;
    //   console.log(video_data);
    makeVideoCard(video_data);
    });
};

const makeVideoCard=(data)=>{
    
}
