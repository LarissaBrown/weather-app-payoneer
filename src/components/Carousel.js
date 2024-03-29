import React, { useEffect } from "react";
import CarouselSlideItem from "./CarouselSlideItem";
// import { connect } from "react-redux";
// import { getItemsByVisibilityFilter , getItems} from "../redux/reducers/selectors";
// import { VISIBILITY_FILTERS } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { getPlayers, fetchFiveDayData } from "../redux/actions";

const Carousel = () => {
  const _localItems = useSelector((state) => state._localItems);
  const fiveDayData = useSelector((state) => state.fiveDayData);
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const slideWidth = 30;

  useEffect(() => {
    return function (dispatch) {
      fetchFiveDayData(weather);

      getPlayers(fiveDayData);
    };
  }, [fiveDayData, weather, dispatch]);

  console.log("_localItems", _localItems);

  const length = _localItems.length;
  _localItems.push(..._localItems);

  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const createLocalItem = (pos, i) => {
    let idx = i;
    console.log("idxPLAYER", _localItems[idx]);
    const localItem = {
      styles: {
        transform: `translateX(${pos * slideWidth}rem)`,
      },
      player: _localItems[idx].player,
    };

    switch (pos) {
      case length - 1:
      case length + 1:
        localItem.styles = { ...localItem.styles, filter: "grayscale(1)" };
        break;
      case length:
        break;
      default:
        localItem.styles = { ...localItem.styles, opacity: 1 };
        break;
    }

    return localItem;
  };

  const keys = Array.from(Array(_localItems.length).keys());

  const [localItems, setlocalItems] = React.useState(keys);
  const [isTicking, setIsTicking] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const bigLength = localItems.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setlocalItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setlocalItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  const handleDotClick = (i, localItems) => {
    if (i === activeIdx - 1) {
      return;
    }
    if (i === localItems.length - 1) {
      return;
    } else if (i < activeIdx) prevClick(activeIdx - i);
    else if (i > activeIdx) nextClick(i - activeIdx);
  };

  React.useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  React.useEffect(() => {
    setActiveIdx((length - (localItems[0] % length)) % length) // prettier-ignore
  }, [localItems, length]);

  console.log("activeIdx", activeIdx);
  console.log("localItems[0]", localItems[0]);
  console.log("length-1", length - 1);

  return (
    <div className="carousel__wrap">
      <button
        className={
          activeIdx !== localItems[0]
            ? "carousel__btn carousel__btn--prev"
            : "hidden-arrow--next"
        }
        style={{ left: "30%" }}
        onClick={() => prevClick()}
      >
        <i className="carousel__btn-arrow carousel__btn-arrow--left" />
      </button>
      <button
        className={
          activeIdx !== length - 1
            ? "carousel__btn carousel__btn--next"
            : "hidden-arrow--next"
        }
        style={{ right: "30%" }}
        onClick={() => nextClick()}
      >
        <i className="carousel__btn-arrow carousel__btn-arrow--right" />
      </button>
      <div className="carousel__inner">
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {localItems.map((pos, i) => (
              <CarouselSlideItem
                key={i}
                item={createLocalItem(pos, i, activeIdx)}
                idx={i}
              />
            ))}
          </ul>
        </div>

        <div className="carousel__dots">
          {localItems.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={(() => handleDotClick(i), localItems)}
              className={i === activeIdx ? "dot active" : "dot"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
