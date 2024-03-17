import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
export default function Register() {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await registerUser(data);
    window.location.reload();
  });

  return (
    <div className="p-8 bg-gray-100 rounded-lg  shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Registro de reprobados de Almita</h1>
      <label className="block mb-2">
        Ingrese el nombre
      </label>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          name="nombre"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
        <label className="block mb-2">
        Ingrese el apellido
      </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("apellido", { required: true })}
        />
        {errors.apellido && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
        <select
            {...register("aprobado")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="aprobado">Aprobado</option>
            <option value="desaprobado">Reprobado</option>
          </select>
        <button
          type="submit"
          className=" text-center mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
