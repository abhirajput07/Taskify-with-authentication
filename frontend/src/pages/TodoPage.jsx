import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../server";
import { getCookieData, handleLogout } from "../utils/helperFunction.js";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);

  const cookie = getCookieData(document.cookie);
  const name = (cookie?.name).split(" ")[0];
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${cookie?.authToken}`,
        },
      });
      setTodos(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoText({ ...todoText, [name]: value });
  };

  const handleCreateTodo = async () => {
    try {
      const { data } = await axios.post(`${serverUrl}/todos`, todoText, {
        headers: {
          Authorization: `Bearer ${cookie?.authToken}`,
        },
      });

      toast.success("Todo added successfully");
      setTodos((prev) => [...prev, data]);
      setTodoText({ title: "", description: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${serverUrl}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie?.authToken}`,
        },
      });

      toast.success("Todo deleted successfully");
      fetchTodos();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete todo");
    }
  };

  const handleEditClick = (todo) => {
    setCurrentEditId(todo._id);
    setEditTodo({ title: todo.title, description: todo.description });
    setShowModal(true);
  };

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`${serverUrl}/todos/${currentEditId}`, editTodo, {
        headers: {
          Authorization: `Bearer ${cookie?.authToken}`,
        },
      });

      toast.success("Todo updated successfully");
      fetchTodos();
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await axios.patch(
        `${serverUrl}/todos/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${cookie?.authToken}` },
        }
      );
      toast.success("Todo updated!");
      fetchTodos();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogoutUser = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <div className={`min-h-screen  w-full py-5 px-4 relative `}>
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl ">
          <div className="flex justify-between items-center text-2xl sm:text-4xl font-bold mb-5 text-blue-600">
            <h1 className="flex flex-col ">
              Taskify <span className="sm:text-lg text-sm">Add your task</span>
            </h1>
            <div
              className="capitalize flex flex-col items-end  justify-end text-end
            "
              onClick={handleLogoutUser}
            >
              {name}
              <span className="sm:text-lg text-sm cursor-pointer hover:underline">
                Logout
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 mb-5">
            <input
              type="text"
              name="title"
              placeholder="Todo Title"
              className="border border-gray-300 rounded-xl p-3 sm:p-4 w-full outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base"
              value={todoText.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Todo Description"
              className="border border-gray-300 rounded-xl p-3 sm:p-4 w-full outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base"
              value={todoText.description}
              onChange={handleChange}
              rows={2}
            ></textarea>
            <button
              onClick={handleCreateTodo}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
            >
              Add Todo
            </button>
          </div>
          {showModal && (
            <>
              <div className="fixed inset-0 bg-white opacity-60 backdrop-blur-xl z-40"></div>
              <div className="absolute inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">
                    Edit Todo
                  </h2>

                  <div className="flex flex-col gap-4 mb-6">
                    <input
                      type="text"
                      name="title"
                      placeholder="Todo Title"
                      className="border rounded-lg p-3 w-full outline-none"
                      value={editTodo.title}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, title: e.target.value })
                      }
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Todo Description"
                      className="border rounded-lg p-3 w-full outline-none"
                      value={editTodo.description}
                      onChange={(e) =>
                        setEditTodo({
                          ...editTodo,
                          description: e.target.value,
                        })
                      }
                    ></textarea>

                    <div className="flex justify-end gap-4">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleUpdateTodo}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {todos.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No todos found.</p>
          ) : (
            <ul className="space-y-4 sm:space-y-6 overflow-y-auto h-50 w-full">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-white border border-gray-200 shadow-lg p-4 sm:p-5 rounded-2xl flex justify-between items-start hover:shadow-2xl gap-5 transition-all"
                >
                  <div
                    className={`w-[75%] sm:w-[85%] capitalize line-clamp-2  ${
                      todo.isCompleted
                        ? "line-through text-gray-300"
                        : "text-gray-800 "
                    }`}
                  >
                    <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2  line-clamp-1">
                      {todo.title}
                    </h3>
                    <p className="line-clamp-1  text-sm">{todo.description}</p>
                  </div>
                  <div className="flex  gap-2 sm:gap-3 items-end">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleToggleComplete(todo._id)}
                    >
                      <FaCheckCircle size={20} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(todo)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
