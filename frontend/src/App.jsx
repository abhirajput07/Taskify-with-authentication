import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Toaster />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
