import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  PORT: z.coerce.number().default(3000),

  MONGODB_URI: z.string().min(1),

  REDIS_URL: z.string().min(1),

  GEMINI_API_KEY: z.string().min(1),

  RESEND_API_KEY: z.string().min(1),

  QDRANT_URL: z.string().url(),

  QDRANT_API_KEY: z.string().min(1),

  FINNHUB_API_KEY: z.string().min(1),

  INNGEST_EVENT_KEY: z.string().min(1),

  INNGEST_SIGNING_KEY: z.string().min(1),
});

export type EnvSchema = z.infer<typeof envSchema>;