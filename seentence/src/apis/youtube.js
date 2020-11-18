import axios from "axios";
const KEY = "AIzaSyCkYSrBwsdAF2PoJvHi8XdD8tKhnz-4Gb4";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
