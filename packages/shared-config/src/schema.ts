import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().optional(),

  REDIS_URL: z.string().optional(),

  GEMINI_API_KEY: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),

  QDRANT_URL: z.string().url().optional(),

  QDRANT_API_KEY: z.string().optional(),

  FINNHUB_API_KEY: z.string().optional(),

  INNGEST_EVENT_KEY: z.string().optional(),

  INNGEST_SIGNING_KEY: z.string().optional(),

  JWT_ACCESS_SECRET: z.string().min(32).optional(),

  JWT_REFRESH_SECRET: z.string().min(32).optional(),
});

export type EnvSchema = z.infer<typeof envSchema>;