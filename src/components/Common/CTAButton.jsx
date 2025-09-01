import React from "react";
import styles from "./CTAButton.module.css";
import Link from "next/link";

const CTAButton = ({ text, link="/product" }) => {
  return (
    <Link href={link} className={styles.ctaButton} >
      {text}
    </Link>
  );
};

export default CTAButton;
