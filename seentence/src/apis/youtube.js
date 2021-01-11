import axios from "axios";
import { StrictMode } from "react";
const KEY = "AIzaSyCgdrFE1qx575YLhA_QU4fimGShYQeEUBY";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    type: "video",
    safeSearch: "strict",
    order: "viewCount",
    key: KEY,
  },
});
