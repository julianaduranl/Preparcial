import { z } from "zod";

export const authorSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  birthDate: z.string().refine(
    v => !Number.isNaN(Date.parse(v)), 
    "Fecha inválida (yyyy-mm-dd)"
  ),
});

export type AuthorFormData = z.infer<typeof authorSchema>;
