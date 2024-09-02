// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const { createNewCity, isLoading } = useCities();
  const navigator = useNavigate();
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      async function fetchCity() {
        if (!lat || !lng) return;

        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch location data. Please try again.");
          }

          const data = await res.json();

          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else."
            );
          }

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCity();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    await createNewCity(newCity);
    navigator("/app/cities");
  }

  if (!lat && !lng) return <Message message={"Click somewhere on the map 🗺"} />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"} onClick={handleSubmit}>
          <span>Add</span>
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
