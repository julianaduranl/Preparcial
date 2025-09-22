"use client";
import { useRouter } from "next/navigation";
import AuthorForm from "../ui/AuthorForm";
import { useAuthors } from "../hooks/AuthorsContext";

export default function NewAuthorPage() {
  const { createAuthor } = useAuthors();
  const router = useRouter();

  async function onSubmit(data: any) {
    await createAuthor(data);
    router.push("/authors");
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Crear autor</h2>
      <AuthorForm onSubmit={onSubmit} submitText="Crear"/>
    </div>
  );
}
