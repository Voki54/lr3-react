import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./account/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import Cart from "./pages/Cart";
import PrivateRoute from "./account/PrivateRoute";
import { ProductList } from "./components/ProductList";
import { Layout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// import { ProductList } from "./components/ProductList";

// export const App = () => {


//   return (
//     <div>
//       <h1>Магазин</h1>
//       <ProductList />
//     </div>
//   );

// };

// export default App;
