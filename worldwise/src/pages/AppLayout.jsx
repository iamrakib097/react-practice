import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";
import { useAuth } from "../contexts/FakeAuthContext";
function AppLayout() {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      {user ? <User /> : null}
    </div>
  );
}

export default AppLayout;
