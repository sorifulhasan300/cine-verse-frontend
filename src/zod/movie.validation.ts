import z from "zod";

export const movieValidationSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long"),

  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),
  releaseYear: z
    .string()
    .transform((val) => {
      // If already an ISO string, return as is
      if (val.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?Z?$/)) {
        return val;
      }

      // Parse MM/DD/YYYY HH:MM AM/PM format
      const match = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s+(AM|PM)$/);
      if (!match) {
        throw new Error("Invalid date format. Expected MM/DD/YYYY HH:MM AM/PM or ISO string");
      }

      const [, month, day, year, hour, minute, ampm] = match;
      let hour24 = parseInt(hour);
      if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
      if (ampm === 'AM' && hour24 === 12) hour24 = 0;

      const date = new Date(
        parseInt(year),
        parseInt(month) - 1, // JS months are 0-based
        parseInt(day),
        hour24,
        parseInt(minute)
      );

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return date.toISOString();
    }),
  director: z.string({ message: "Director name is required" }),
  cast: z.string().optional(),
  videoUrl: z.string().url("Invalid video URL"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  pricing: z.enum(["FREE", "PREMIUM"], {
    message: "Pricing must be either 'FREE' or 'PREMIUM'",
  }),
  categoryIds: z.array(z.string(), "At least one category is required").min(1),
});
