import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Update from "./Update";
import Register from "./Register";
import almita from "../../public/almita.jpeg";

export default function Shows() {
  const { users, onlyOne, deleteUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const deleteEvents = async (id) => {
    try {
      await deleteUser(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (component) => {
    setShowModal(true);
    onlyOne(component);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Register />
      <div className="rounded-lg px-20 py-4 overflow-hidden border border-gray-300">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="py-2 px-2">Nombre</th>
              <th className="py-2 px-2">Apellido</th>
              <th className="py-2 px-2">Calificación</th>
              <th className="py-2 px-2">Actualizar</th>
              <th className="py-2 px-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((show, index) => (
                <tr key={index} className="border-b border-gray-200 text-base">
                  <td className="py-2 px-2">{show?.nombre}</td>
                  <td className="py-2 px-2">{show?.apellido}</td>
                  <td className="py-2 px-2">{show?.aprobado}</td>
                  <td className="py-2 px-2">
                    <button
                      className="bg-green-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => openModal(show?.idalumnos)}
                    >
                      Actualizar
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteEvents(show?.idalumnos)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 px-6 text-center">
                  No hay datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div className="relative">
              <div
                className="bg-white rounded-lg p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 -mt-8 -mr-8 p-2 rounded-full bg-white text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Update />
              </div>
            </div>
          </div>
        )}
        <img
          src={almita}
          alt="Almita"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
    </>
  );
}
