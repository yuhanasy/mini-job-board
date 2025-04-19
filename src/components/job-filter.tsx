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
};

const JobFilter = ({ locations, jobTypes }: Props) => {
  return (
    <div className="relative mb-8 flex gap-12 h-40 hover:h-56 transition-all ease-in-out">
      <div className="relative max-h-56 overflow-y-scroll">
        <h4 className="font-medium mb-1">Locations</h4>
        <ul className="flex flex-col gap-1">
          {locations?.map(
            (item) =>
              item.location && (
                <li
                  key={item.location}
                  className="text-muted-foreground hover:text-foreground transition-colors ease-in cursor-pointer"
                >
                  <Link href={`?location=${encodeURIComponent(item.location)}`}>
                    {item.location}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="relative max-h-40 overflow-y-scroll">
        <h4 className="font-medium mb-1">Type</h4>
        <ul className="flex flex-col gap-1">
          {jobTypes?.map((type) => (
            <li
              key={type.id}
              className="text-muted-foreground hover:text-foreground transition-colors ease-in cursor-pointer"
            >
              <Link href={`?type=${encodeURIComponent(type.id)}`}>
                {type.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobFilter;
