import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSlider from "./NavigationSlider";

const BackdropSlide = ({ backdrops }) => {
    return (
        <NavigationSlider>
            {backdrops.splice(0, 10).map((item, index) => (
                <SwiperSlide key={index}>
                    <Box sx={{ paddingTop: "60%", backgroundPosition: "top", backgroundSize: "cover", backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`}}>

                    </Box>
                </SwiperSlide>
            ))}
        </NavigationSlider>
    )
}

export default BackdropSlide
