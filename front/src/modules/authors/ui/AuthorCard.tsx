"use client";
import Image from "next/image";
import Link from "next/link";
import { Author } from "../types/authors"

export default function AuthorCard({ author, onDelete }: { author: Author; onDelete: (id:number)=>void }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <Image src={author.image} alt={author.name} width={640} height={360} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{author.name}</h3>
        <p className="text-sm text-gray-600">{author.description}</p>
        <div className="flex gap-2 pt-2">
          <Link href={`/authors/${author.id}/edit`} className="px-18 py-1 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100">Editar</Link>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={()=>onDelete(author.id)} className="px-16 py-1 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100">Eliminar</button>
        </div>
      </div>
    </div>
  );
}
