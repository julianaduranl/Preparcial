"use client";
import Link from "next/link";
import { useAuthors } from "../hooks/AuthorsContext";
import AuthorCard from "./AuthorCard";

export default function AuthorsGrid() {
  const { authors, loading, error, deleteAuthor } = useAuthors();

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;
  if (authors.length === 0)
    return (
      <div className="space-y-4">
        <p>No hay autores aún.</p>
        <Link className="inline-block px-3 py-1 rounded bg-green-600 text-white" href="/authors/crear">Crear autor</Link>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Autores</h2>
        <Link className="px-3 py-1 rounded bg-green-600 text-white" href="/authors/crear">Crear autor</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {authors.map(a => (
          <AuthorCard key={a.id} author={a} onDelete={deleteAuthor} />
        ))}
      </div>
    </div>
  );
}
