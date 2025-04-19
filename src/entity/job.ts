import { z } from "zod";

export const jobSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  company_name: z.string({ required_error: "Company name is required" }),
  job_type_id: z.string({ required_error: "Job type is required" }),
  location: z.string({ required_error: "Location is required" }),
  description: z.string({ required_error: "Description is required" }),
});

export type JobInputType = z.infer<typeof jobSchema>;
