if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — set it in .env.local"
  );
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";
