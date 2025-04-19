"use client";

import { Input } from "@/components/ui/input";
import TextEditor from "@/components/text-editor";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJobAction } from "@/server/job-actions";
import { useActionState } from "react";

type Props = {
  locations:
    | {
        location: string | null;
      }[]
    | null;
  jobTypes:
    | {
        id: string;
        name: string;
      }[]
    | null;
};

const JobFormField = ({ locations, jobTypes }: Props) => {
  const [state, formAction, pending] = useActionState(createJobAction, {});

  console.log({ state });
  console.log({ pending });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="bg-neutral-100 p-4 rounded-2xl">
        <h2>Job details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="What's the job?"
              disabled={pending}
              required
              className="bg-white"
            />
          </div>
          <div>
            <label htmlFor="company_name">Company Name</label>
            <Input
              id="company_name"
              name="company_name"
              placeholder="What's your company called?"
              disabled={pending}
              required
              className="bg-white"
            />
          </div>
          <div>
            <label htmlFor="job_type_id">Type</label>
            <Select name="job_type_id" disabled={pending}>
              <SelectTrigger id="job_type_id" className="w-full bg-white">
                <SelectValue placeholder="Select the job's type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <Select name="location" disabled={pending}>
              <SelectTrigger id="location" className="w-full bg-white">
                <SelectValue placeholder="Where candidate should work from?" />
              </SelectTrigger>
              <SelectContent>
                {locations?.map((location) => (
                  <SelectItem
                    key={location.location}
                    value={location.location || ""}
                  >
                    {location.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 p-4 rounded-2xl">
        <h2>Job Description</h2>
        <div className="mt-4">
          <TextEditor />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
};

export default JobFormField;
