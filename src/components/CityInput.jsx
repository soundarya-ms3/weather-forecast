import { useContext, useRef } from "react";
import AppContext from "../provider/appContext";
import { getCityName } from "../services/weatherService";
import geoCoords from "../utils/geoCoords";

function CityInput() {
  const input = useRef();
  const {
    app: { isDark },
    dispatchApp,
  } = useContext(AppContext);
  let time;
  return (
    <div className="input-group">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        ref={input}
        style={isDark ? { background: "#232b39", color: "#fff" } : null}
        placeholder="Search for places ..."
        onInput={(e) => {
          const value = e.target.value;
          clearTimeout(time);
          time = setTimeout(() => {
            dispatchApp({ type: "CITY", payload: value });
          }, 500);
        }}
      />
    </div>
  );
}

export default CityInput;
