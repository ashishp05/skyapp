import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container" style={{ marginTop: "120px" }}>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster />
          </CartProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
