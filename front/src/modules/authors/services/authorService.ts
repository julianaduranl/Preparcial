// Update the import path if necessary, or create the http module at the specified location.
import { http } from "../../../shared/services/http";
import { Author } from "../types/authors";


export const AuthorsApi = {
  list: () => http<Author[]>("/api/authors"),
  create: (data: Omit<Author,"id">) =>
    http<Author>("/api/authors", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Omit<Author,"id">) =>
    http<Author>(`/api/authors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: number) =>
    http<void>(`/api/authors/${id}`, { method: "DELETE" }),
  get: (id: number) => http<Author>(`/api/authors/${id}`),
};
