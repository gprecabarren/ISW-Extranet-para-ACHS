import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Porfavor ingrese dirección de correo válido",
  }),
  password: z.string().min(6, {
    message: "Contreseña debe tener al menos 6 caracteres",
  }),
});

//register
export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, {
        message: "Nombre de usuario debe tener al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Porfavor ingrese dirección de correo válido",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
