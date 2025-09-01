import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";
export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container" style={{"marginTop" : "120px"}}> <CartProvider>{children}</CartProvider></main>
         <Footer/>
      </body>
    </html>
  );
}
