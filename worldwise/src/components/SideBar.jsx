import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { useEffect, useState } from "react";
function SideBar() {
  //   const [data, setData] = useState([]);
  //   useEffect(function () {
  //     async function fetchData() {
  //       let res = await fetch("http://localhost:8000/cities");
  //       let data = await res.json();
  //       setData(() => data);
  //     }
  //     fetchData();
  //   }, []);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default SideBar;
