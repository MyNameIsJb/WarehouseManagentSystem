import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/Login/LoginPage";
import ForgotPasswordPage from "./features/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./features/ResetPassword/ResetPasswordPage";
import CreatePasswordPage from "./features/CreatePassword/CreatePasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
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
import AdminMenu from "./components/AdminMenu";
import StockReplenishmentPage from "./features/StockReplenishment/StockReplenishmentPage";
import DailyAttendancePage from "./features/DailyAttendance/DailyAttendancePage";
import ReturnedItemPage from "./features/ReturnedItem/ReturnedItemPage";
import BarcodeGeneratorPage from "./features/BarcodeGenerator/BarcodeGeneratorPage";
import EmployeeMenu from "./components/EmployeeMenu";
import ClientMenu from "./components/ClientMenu";
import StoreInventoryPage from "./features/StoreInventory/StoreInventoryPage";
import StoreIncomingProductPage from "./features/StoreIncomingProduct/StoreIncomingProductPage";
import EditStorePricePage from "./features/StoreInventory/EditStorePricePage";
import CreateSalePage from "./features/Sale/CreateSalePage";
import EditSalePage from "./features/Sale/EditSalePage";
import OrderProductPage from "./features/StockReplenishment/OrderProductPage";
import EditOrderProductPage from "./features/StockReplenishment/EditOrderProductPage";
import CreateReturnedItemPage from "./features/ReturnedItem/CreateReturnedItemPage";
import EditReturnedItemPage from "./features/ReturnedItem/EditReturnedItemPage";
import ProfilePage from "./features/Profile/ProfilePage";

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
          <Route element={<AdminMenu />}>
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
            <Route
              path="/stockReplenishment"
              element={<StockReplenishmentPage />}
            />
            <Route path="/dailyAttendance" element={<DailyAttendancePage />} />
            <Route path="/returnedItems" element={<ReturnedItemPage />} />
          </Route>
          <Route element={<EmployeeMenu />}>
            <Route
              path="/barcodeGenerator"
              element={<BarcodeGeneratorPage />}
            />
            <Route path="/viewInventory" element={<InventoryPage />} />
            <Route
              path="/viewIncomingProduct"
              element={<IncomingProductPage />}
            />
            <Route
              path="/viewOutgoingProduct"
              element={<OutgoingProductPage />}
            />
            <Route
              path="/viewStockReplenishment"
              element={<StockReplenishmentPage />}
            />
            <Route path="/viewReturnedItems" element={<ReturnedItemPage />} />
          </Route>
          <Route element={<ClientMenu />}>
            <Route path="/storeInventory" element={<StoreInventoryPage />} />
            <Route
              path="/storeIncomingProduct"
              element={<StoreIncomingProductPage />}
            />
            <Route
              path="/editStorePrice/:id"
              element={<EditStorePricePage />}
            />
            <Route path="/storeSales" element={<SalePage />} />
            <Route path="/createSale" element={<CreateSalePage />} />
            <Route path="/editSale/:id" element={<EditSalePage />} />
            <Route
              path="/storeOrderProduct"
              element={<StockReplenishmentPage />}
            />
            <Route path="/orderProduct" element={<OrderProductPage />} />
            <Route
              path="/editOrderProduct/:id"
              element={<EditOrderProductPage />}
            />
            <Route path="/storeReturnedItem" element={<ReturnedItemPage />} />
            <Route
              path="/createReturnedItem"
              element={<CreateReturnedItemPage />}
            />
            <Route
              path="/editRurnedItem/:id"
              element={<EditReturnedItemPage />}
            />
          </Route>
          <Route path="/viewGallery" element={<GalleryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
