import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSlider from "./NavigationSlider";

const MediaVideo = ({ video }) => {
    const iframeRef = useRef();
  
    useEffect(() => {
      console.log("ifram");
      const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }, [video]);
  
    return (
      <Box sx={{ height: "max-content" }}>
        <iframe
          key={video.key}
          src={tmdbConfigs.youtubePath(video.key)}
          ref={iframeRef}
          width="100%"
          title={video.id}
          style={{ border: 0 }}
        ></iframe>
      </Box>
    );
  };
  
  const MediaVideosSlide = ({ videos }) => {
    console.log({ videos });
    return (
      <NavigationSlider>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        ))}
      </NavigationSlider>
    );
  };

export default MediaVideosSlide
