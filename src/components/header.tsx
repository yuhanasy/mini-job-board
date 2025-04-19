import Link from "next/link";
import PostJobDialog from "./post-job-dialog";
import { fetchUser } from "@/services/auth-services";
import { headers } from "next/headers";
import HeaderActions from "./header-actions";

const Header = async () => {
  const { user } = await fetchUser();
  const header = (await headers()).get("origin");

  console.log(header);

  return (
    <div className="w-full flex justify-between max-w-5xl px-5 py-4">
      <Link href="/">
        <div className="text-2xl font-bold hover:opacity-75">
          Mini Job Board
        </div>
      </Link>

      {user ? <HeaderActions email={user.email} /> : <PostJobDialog />}
    </div>
  );
};

export default Header;
