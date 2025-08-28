
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "@/components/Home/HeroSection";
import HeroCarousel from "@/components/Home/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import AboutPage from "@/app/(public)/about/page";
import ShopByTag from "@/components/Home/ShopByTag";
import BestLaptops from "@/components/Product/BestLaptops";
export default function Home() {
  return (
    <div className={styles.page} >
      <HeroSection/>
      <AboutSection/>
      <ShopByTag/>
      <BestLaptops />
    </div>
  );
}
