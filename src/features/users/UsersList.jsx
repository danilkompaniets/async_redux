
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  console.log(users)

  const renderedUsers = users.map((user) => (
    <div key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </div>
  ));
  return <div className="w-full text-2xl items-center justify-center flex flex-col">{renderedUsers}</div>;
};

export default UsersList;
