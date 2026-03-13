You are operating inside the `mlsgpt` Next.js project.

Goal: Replace all conversion image placeholders with generated production images, automatically.

Steps:
1. Scan the codebase for placeholder nodes using selector/data-attribute:
   - `data-antigravity="image-placeholder"`
2. For each placeholder, read:
   - `data-placeholder-id`
   - `data-placeholder-prompt`
   - `data-placeholder-aspect`
3. For each placeholder ID, generate exactly 1 high-quality marketing image with nanobanannapro using `data-placeholder-prompt` as the base prompt.
4. Respect the requested aspect ratio from `data-placeholder-aspect`.
5. Save output files to:
   - `/Users/macmini/dev/mlsgpt/public/images/generated/<id>.webp`
6. Update this file with mappings for every generated asset:
   - `/Users/macmini/dev/mlsgpt/lib/generated-images.ts`
   Format:
   ```ts
   export const generatedImages: Record<string, string> = {
     "placeholder-id": "/images/generated/placeholder-id.webp"
   };
   ```
7. Do not change layout, spacing, copy, or CTAs.
8. Ensure images look premium and trustworthy for real-estate SaaS conversion pages.
9. Run a quick check that no placeholder remains unresolved by confirming every node with `data-antigravity="image-placeholder"` has an ID present in `generated-images.ts`.

Quality bar:
- Commercial-grade, photoreal where appropriate.
- No watermarks.
- No embedded text unless explicitly requested by prompt.
- Consistent color mood with site palette (navy, teal, warm neutral).
