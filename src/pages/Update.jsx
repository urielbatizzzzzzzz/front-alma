import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function Update() {
  const { updateUser, user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (user) {
      setValue("nombre", user.nombre);
      setValue("apellido", user.apellido);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(user?.idalumnos, data);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Actualizar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2">Ingrese el nuevo nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            {...register("nombre", { required: true })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
              errors.nombre ? "border-red-500" : ""
            }`}
          />
          {errors.nombre && (
            <span className="text-red-500">El nombre es obligatorio.</span>
          )}

          <label className="block mb-2">Ingrese el nuevo apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            {...register("apellido", { required: true })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
              errors.apellido ? "border-red-500" : ""
            }`}
          />
          {errors.apellido && (
            <span className="text-red-500">El apellido es obligatorio.</span>
          )}

          <select
            {...register("aprobado")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="aprobado">Aprobado</option>
            <option value="desaprobado">Reprobado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}
