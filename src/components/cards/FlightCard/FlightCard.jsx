import { memo, useMemo } from "react";
import styles from "./FlightCard.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function FlightCard({ data }) {
  const getFlightDuration = (seconds) => {
    // Convert seconds to hours and minutes
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Return the formatted duration string
    return `${hours}h ${minutes}m`;
  };

  const flightDuration = useMemo(
    () => getFlightDuration(data?.flightDuration),
    [data?.flightDuration]
  );

  const getAirlineLogo = useMemo(() => {
    switch (data?.airline) {
      case "UK":
        return "./public/images/Vistara-Image.png";
      case "AI":
        return "./public/images/air india.png";
      case "6E":
        return "./public/images/indigo.png";
      default:
        return "./public/images/air india.png";
    }
  }, [data?.airline]);

  const getAirlineName = useMemo(() => {
    switch (data?.airline) {
      case "UK":
        return "Vistara";
      case "AI":
        return "Air India";
      case "6E":
        return "Indigo";
      default:
        return "Air India";
    }
  }, [data?.airline]);
  return (
    <div className={styles.flightCard}>
      <div className={styles.cardContent}>
        <div className={styles.airline}>
          <div className={styles.airlineLogo}>
            <div className={styles.logoBox}>
              <img
                className={styles.flight_image}
                src={getAirlineLogo}
                height="20"
                width={30}
                alt={data.airline}
              />{" "}
            </div>
            <span className={styles.air_line_name}>{getAirlineName}</span>
          </div>
        </div>

        <div className={styles.flightInfo}>
          <div className={styles.timeContainer}>
            <div className={styles.time}>{data?.departureTime}</div>
            <div className={styles.airport}>{data?.from}</div>
          </div>

          <div className={styles.duration}>
            <div className={styles.durationLine}>
              <span className={styles.dot}></span>
              <div className={styles.line}></div>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.durationText}>{flightDuration}</div>
          </div>

          <div className={styles.timeContainer}>
            <div className={styles.time}>{data?.arrivalTime}</div>
            <div className={styles.airport}>{data?.to}</div>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <div className={styles.price}>₹{data?.fare}</div>
            <button className={styles.viewFares}>View Fares</button>
            <div className="more">
              <MoreVertIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FlightCard);
