import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/Login/LoginPage";
import ForgotPasswordPage from "./features/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./features/ResetPassword/ResetPasswordPage";
import CreatePasswordPage from "./features/CreatePassword/CreatePasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./features/Dashboard/DashboardPage";
import EmployeeListPage from "./features/EmployeeList/EmployeeListPage";
import CreateUserPage from "./features/EmployeeList/CreateUserPage";
import EditUserPage from "./features/EmployeeList/EditUserPage";
import ProductListPage from "./features/ProductList/ProductListPage";
import CreateProductPage from "./features/ProductList/CreateProductPage";
import EditProductPage from "./features/ProductList/EditProductPage";
import GalleryPage from "./features/Gallery/GalleryPage";
import UploadImagePage from "./features/Gallery/UploadImagePage";
import EditImagePage from "./features/Gallery/EditImagePage";
import InventoryPage from "./features/ProductList/InventoryPage";
import SalePage from "./features/Sale/SalePage";
import PurchasePage from "./features/Purchase/PurchasePage";
import IncomingProductPage from "./features/IncomingProduct/IncomingProductPage";
import CreateIncomingProductPage from "./features/IncomingProduct/CreateIncomingProductPage";
import EditIncomingProductPage from "./features/IncomingProduct/EditIncomingProductPage";
import OutgoingProductPage from "./features/OutgoingProduct/OutgoingProductPage";
import CreateOutgoingProductPage from "./features/OutgoingProduct/CreateOutgoingProductPage";
import EditOutgoingProductPage from "./features/OutgoingProduct/EditOutgoingProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />\
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/createPassword/:createPasswordToken"
          element={<CreatePasswordPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employeeList" element={<EmployeeListPage />} />
          <Route path="/createUser" element={<CreateUserPage />} />
          <Route path="/editUser/:id" element={<EditUserPage />} />
          <Route path="/productList" element={<ProductListPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
          <Route path="editProduct/:id" element={<EditProductPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/uploadImage" element={<UploadImagePage />} />
          <Route path="/editImage/:id" element={<EditImagePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/incomingProduct" element={<IncomingProductPage />} />
          <Route
            path="/createIncomingProduct"
            element={<CreateIncomingProductPage />}
          />
          <Route
            path="/editIncomingProduct/:id"
            element={<EditIncomingProductPage />}
          />
          <Route path="/outgoingProduct" element={<OutgoingProductPage />} />
          <Route
            path="/createOutgoingProduct"
            element={<CreateOutgoingProductPage />}
          />
          <Route
            path="/editOutgoingProduct/:id"
            element={<EditOutgoingProductPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
