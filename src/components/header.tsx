import Link from "next/link";
import PostJobDialog from "./post-job-dialog";

const Header = () => {
  return (
    <div className="w-full flex justify-between max-w-5xl px-5 py-4">
      <Link href="/">
        <div className="text-2xl font-bold hover:opacity-75">
          Mini Job Board
        </div>
      </Link>

      <PostJobDialog />
    </div>
  );
};

export default Header;
