import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { UserContext } from "../App";

const UserNavigationPanel = () => {
  const {
    userAuth: { username },
  } = useContext(UserContext);
  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <div
        className="bg-white absolute right-0  rounded-lg shadow-xl
       w-60 overflow-hidden duration-200"
      >
        <Link to={"/editor"} className="flex gap-2 link md:hidden pl-8 py-4">
          <CiEdit className="text-xl" />
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">Profile</Link>
        <Link to={`/dashboard/blogs`} className="link pl-8 py-4">Dashboard</Link>
        <Link to={`/settings/edit-profile`} className="link pl-8 py-4">Settings</Link>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
