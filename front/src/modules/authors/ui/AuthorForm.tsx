"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "../schema/authorSchema";

type Props = {
  defaultValues?: Partial<AuthorFormData>;
  onSubmit: (data: AuthorFormData) => Promise<void> | void;
  submitText?: string;
};

export default function AuthorForm({ defaultValues, onSubmit, submitText="Guardar" }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AuthorFormData>({
      resolver: zodResolver(authorSchema),
      defaultValues: {
        name: "",
        description: "",
        image: "",
        birthDate: "",
        ...defaultValues,
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Nombre</label>
        <input className="w-full border rounded p-2" {...register("name")} placeholder="Gabriel García Márquez"/>
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Descripción</label>
        <textarea className="w-full border rounded p-2" rows={3} {...register("description")} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Imagen (URL)</label>
        <input className="w-full border rounded p-2" {...register("image")} placeholder="https://..."/>
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Fecha de nacimiento</label>
        <input type="date" className="w-full border rounded p-2" {...register("birthDate")} />
        {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate.message}</p>}
      </div>

      <button disabled={isSubmitting} className="px-4 py-2 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100">
        {isSubmitting ? "Enviando…" : submitText}
      </button>
    </form>
  );
}
