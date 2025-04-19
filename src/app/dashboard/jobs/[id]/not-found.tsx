import NotFound from "@/components/not-found";

export default function NotFoundPage() {
  return (
    <NotFound
      message="Could not find requested job"
      redirectTo="/dashboard/jobs"
      redirectToText="Return to Job List"
    />
  );
}
