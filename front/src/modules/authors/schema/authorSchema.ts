import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(2, "Min 2 caracteres"),
  description: z.string().min(10, "Describe al autor (≥10 caracteres)"),
  image: z.string().url("Debe ser una URL válida"),
  birthDate: z.string().refine(
    v => !Number.isNaN(Date.parse(v)), 
    "Fecha inválida (yyyy-mm-dd)"
  ),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
