import Sidebar from "@/components/Admin/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex flex-row ">
          {/* Sidebar */}
          <div style={{ width: "250px" }}>
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-grow-1 p-4 bg-light min-vh-100">
            <Toaster>

            </Toaster>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
