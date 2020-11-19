import axios from "axios";
const KEY = "AIzaSyCgdrFE1qx575YLhA_QU4fimGShYQeEUBY";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
