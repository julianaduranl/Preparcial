"use client";
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Author } from "../types/authors"
import { AuthorsApi } from "../services/authorService"
import { createContext } from "react";

type Ctx = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createAuthor: (a: Omit<Author,"id">) => Promise<Author>;
  updateAuthor: (id: number, a: Omit<Author,"id">) => Promise<Author>;
  deleteAuthor: (id: number) => Promise<void>;
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
};

const AuthorsContext = createContext<Ctx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setAuthors(await AuthorsApi.list());
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Error cargando autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const createAuthor = async (a: Omit<Author,"id">) => {
    const created = await AuthorsApi.create(a);
    setAuthors(prev => [created, ...prev]);
    return created;
  };
  const updateAuthor = async (id: number, a: Omit<Author,"id">) => {
    const updated = await AuthorsApi.update(id, a);
    setAuthors(prev => prev.map(x => x.id === id ? updated : x));
    return updated;
  };
  const deleteAuthor = async (id: number) => {
    setAuthors(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AuthorsContext.Provider value={{ authors, loading, error, refresh, createAuthor, updateAuthor, deleteAuthor, setAuthors }}>
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  const ctx = useContext(AuthorsContext);
  if (!ctx) throw new Error("error");
  return ctx;
}
