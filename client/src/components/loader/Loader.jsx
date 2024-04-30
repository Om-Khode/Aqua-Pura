import React from "react";
import Logo from "../../assets/images/loader/drop.png";
import { Image } from "@chakra-ui/react";
import styles from "../../styles/loader.module.css";

export default function Loader() {
  return (
    <div>
      <div className={`${styles.loader}`}>
        <Image src={Logo} className={`${styles.logo}`} />
      </div>
    </div>
  );
}
