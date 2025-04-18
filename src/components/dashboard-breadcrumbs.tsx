"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

const DashboardBreadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          return (
            <>
              <BreadcrumbItem key={path} className="capitalize">
                {index === paths.length - 1 ? (
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{path}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumbs;
