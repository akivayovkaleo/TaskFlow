// src/lib/schemas.ts
import { z } from 'zod';

// Schema for the Sign Up form
export const signUpSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/[a-zA-Z]/, { message: "A senha deve conter pelo menos uma letra." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^a-zA-Z0-9]/, { message: "A senha deve conter pelo menos um caractere especial." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], // path of error
});

// Schema for the Sign In form
export const signInSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

// Type inference for the forms
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;

// Subtask schema for validation
export const subtaskSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
});

// Main task schema including subtasks and priority
export const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["baixa", "média", "alta"]).optional(),
  subtasks: z.array(subtaskSchema).optional(),
});

export type TTaskSchema = z.infer<typeof taskSchema>;
