import { z } from "zod";

export const examSchema = z.object({
  title: z.string({
    required_error: "Nombre requerido",
  }),
  description: z.string({
    required_error: "Documento requerido",
  }),
});
