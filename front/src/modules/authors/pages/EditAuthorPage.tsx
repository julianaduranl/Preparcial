"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthorForm from "../ui/AuthorForm";
import { useAuthors } from "../hooks/AuthorsContext";
import { AuthorsApi } from "../services/authorService";
import { Author } from "../types/authors";

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateAuthor } = useAuthors();
  const [initial, setInitial] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AuthorsApi.get(Number(id))
      .then(setInitial)
      .catch(e => setError(e.message ?? "Error cargando autor"));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!initial) return <p>Cargando…</p>;

  async function onSubmit(data: any) {
    await updateAuthor(Number(id), data);
    router.push("/authors");
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Editar autor</h2>
      <AuthorForm
        defaultValues={{
          name: initial.name,
          description: initial.description,
          image: initial.image,
          birthDate: initial.birthDate,
        }}
        onSubmit={onSubmit}
        submitText="Guardar cambios"
      />
    </div>
  );
}
