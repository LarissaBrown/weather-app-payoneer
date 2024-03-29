import React, { useEffect } from "react";
import spin from "./spin.svg";
import WeatherInfo from "./WeatherInfo";
// import Bargraph from "../components/Bargraph";
import Carousel from "../components/Carousel";
import Grid from "@material-ui/core/Grid";
// import { connect } from "react-redux";
// import { get_LocalItemsByVisibilityFilter , get_LocalItems} from "../redux/reducers/selectors";
// import { VISIBILITY_FILTERS } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { fetchFiveDayData, loadWeather } from "../redux/actions";

export default function Loading() {
  const weather = useSelector((state) => state.weather);
  const isLoaded = useSelector((state) => state.isLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    // weather === {} ? dispatch(loadWeather(isLoaded))
    // :
    // dispatch(fetchFiveDayData(weather))

    // weather !== {} && dispatch(fetchFiveDayData(weather))
   

  
  }, [weather, isLoaded, dispatch]);

  return (
    <>
      {!isLoaded ? (
        <Grid>
          <p style={{ color: "white", fontSize: "7vw" }}>Weather App</p>
          <img src={spin} alt="spin" className="App-spin" />
          <p style={{ color: "white", fontSize: "4vw" }}>Loading ...</p>
        </Grid>
      ) : (
        <Grid
          container
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Grid container style={{ position: "relative", height: "auto" }}>
            {console.log("loadedWeatherData")}
            <WeatherInfo />
          </Grid>

          <Carousel />

          <Grid
            container
            style={{ position: "relative", height: "100px" }}
          ></Grid>
          <Grid container style={{ position: "relative", height: "auto" }}>
            {/* <Bargraph /> */}
          </Grid>
        </Grid>
      )}
    </>
  );
}

// const weather = useSelector(state => state.weather)
// // const _localItems = useSelector(state => state._localItems)
// const loaded = useSelector(state => state.isLoaded)
// const fiveDayData = useSelector(state => state.fiveDayData)
// const eightTimes = useSelector(state => state.eightTimesData)

// const dispatch = useDispatch()

// useEffect(() => {

//     if(weather && fiveDayData){
//         dispatch(fetchWeather())
//         return
//     }

//     if(weather !== []){
//         dispatch(isLoaded())
//         dispatch(getPlayers())
//         dispatch(eightTimesData())
//         return
//     }

// }, [dispatch, fiveDayData, weather]
// )
