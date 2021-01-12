import axios from "axios";
import { StrictMode } from "react";
const KEY = "AIzaSyD0lvzRhjxlYbOgn0_k7Yq1D5kAZ3V0C-E";

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
