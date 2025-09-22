"use client";
import Link from "next/link";
import { useAuthors } from "../hooks/AuthorsContext";
import AuthorCard from "./AuthorCard";

export default function AuthorsGrid() {
  const { authors, deleteAuthor } = useAuthors();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Autores</h2>
        <Link className="px-3 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100" href="/authors/crear">Crear autor</Link>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-10">
        {authors.map(a => (
          <AuthorCard key={a.id} author={a} onDelete={deleteAuthor} />
        ))}
      </div>
    </div>
  );
}
