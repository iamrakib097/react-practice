import styles from "./CountryList.module.css"; // Adjusted the styles import
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countryList = cities.reduce((acc, city) => {
    if (!acc.some((item) => item.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <ul className={styles.countryList}>
      {countryList.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
