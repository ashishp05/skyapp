import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container" style={{"marginTop" : "120px"}}>{children}</main>
      </body>
    </html>
  );
}
