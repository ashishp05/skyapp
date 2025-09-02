
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "@/components/Home/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import ShopByTag from "@/components/Home/ShopByTag";
import BestProducts from "@/components/Product/BestProducts";
import PromoBanner from "@/components/Home/PromoBanner";
export default function Home() {
  return (
    <div className={styles.page} >
      <HeroSection/>
      <ShopByTag/>
      <BestProducts tag={"laptop"} />
      <BestProducts tag={"computer"} />
      <AboutSection/>
      <PromoBanner/>
      
    </div>
  );
}
