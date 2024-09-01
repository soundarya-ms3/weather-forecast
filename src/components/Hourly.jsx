import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import AppContext from "../provider/appContext";
import Temperature from "./Temperature";
import Card from "./Card";
import Loader from "./Loader";

function Hourly() {
  const {
    app: { weather, unit },
  } = useContext(AppContext);
  if (!weather) {
    return <Loader />;
  }
  const date = new Date(weather?.dt * 1000);
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });
  const dayFormatter = Intl.DateTimeFormat([], {
    weekday: "long",
  });
  return (
    <div>
      <Swiper
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide key={Math.random().toString()}>
          <Card className="forecast-card">
            <div>
              <div className="forecast-day">
                {dayFormatter.format(date)},{" "}
                <span>{formatter.format(date)}</span>
              </div>
              <img
                src={`/weather_icons/${weather.weather[0].icon}.png`}
                alt=""
                width={100}
              />
              <div className="forecast-description">
                {weather.weather[0].description}
              </div>
              <div className="minmax-temp">
                <Temperature temperature={weather.main.temp} />°
              </div>
            </div>
            <div className="more-info">
              <p className="">
                {"Real Feel"}:{" "}
                <span>
                  {weather.main.feels_like}°{unit}
                </span>
              </p>
              <p className="">
                {"Humidity"}: <span>{weather.main.humidity}%</span>
              </p>
              <p className="">
                {"Cloud Cover"}: <span>{weather.clouds.all}%</span>
              </p>
              <p className="">
                {"Min Temp"}:{" "}
                <span>
                  {weather.main.temp_min}°{unit}
                </span>
              </p>
              <p className="">
                {"Max Temp"}:{" "}
                <span>
                  {weather.main.temp_max}°{unit}
                </span>
              </p>
            </div>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Hourly;
