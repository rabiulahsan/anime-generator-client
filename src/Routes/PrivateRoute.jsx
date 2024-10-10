/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid gap-x-20 gap-y-16 grid-cols-1 lg:grid-cols-3 px-[10%]  ">
        {/* <SkeletonCard number={16}></SkeletonCard>; */}
        <p>loading...</p>
      </div>
      // setLoading(false);
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export default PrivateRoute;
