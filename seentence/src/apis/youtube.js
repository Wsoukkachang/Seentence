import axios from "axios";
import { StrictMode } from "react";
const KEY = "AIzaSyCRTkEi5GbAaSzGXDNopO4INtwfp3rCHQk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    type: "video",
    safeSearch: "moderate",
    order: "relevance",
    key: KEY,
  },
});
