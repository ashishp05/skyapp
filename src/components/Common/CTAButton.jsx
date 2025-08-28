import React from "react";
import styles from "./CTAButton.module.css";
import Link from "next/link";

const CTAButton = ({ text, onClick }) => {
  return (
    <Link href={"/product"} className={styles.ctaButton} >
      {text}
    </Link>
  );
};

export default CTAButton;
