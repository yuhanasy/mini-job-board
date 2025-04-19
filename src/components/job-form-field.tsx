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
import { createJobAction, CreateJobActionState } from "@/server/job-actions";
import { useActionState } from "react";
import { JobInputType } from "@/entity/job";
import Link from "next/link";

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
  defaultValue?: JobInputType;
  action: (
    prevState: CreateJobActionState,
    formData: FormData
  ) => Promise<CreateJobActionState>;
};

const JobFormField = ({ defaultValue, locations, jobTypes, action }: Props) => {
  const [state, formAction, pending] = useActionState(createJobAction, {});

  console.log(state);
  console.log(pending);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      {defaultValue?.id ? (
        <input name="id" defaultValue={defaultValue.id} hidden />
      ) : null}

      <div className="bg-neutral-100 p-4 rounded-2xl">
        <h2>Job details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="What's the job?"
              defaultValue={defaultValue?.title}
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
              defaultValue={defaultValue?.company_name}
              disabled={pending}
              required
              className="bg-white"
            />
          </div>
          <div>
            <label htmlFor="job_type_id">Type</label>
            <Select
              name="job_type_id"
              disabled={pending}
              defaultValue={defaultValue?.job_type_id}
            >
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
            <Select
              name="location"
              disabled={pending}
              defaultValue={defaultValue?.location}
            >
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
          <TextEditor defaultValue={defaultValue?.description} />
        </div>
      </div>

      <div className="flex justify-between">
        <Button asChild variant="outline" disabled={pending}>
          <Link href="/dashboard/jobs">Cancel</Link>
        </Button>
        <SubmitButton disabled={pending}>Save</SubmitButton>
      </div>
    </form>
  );
};

export default JobFormField;
