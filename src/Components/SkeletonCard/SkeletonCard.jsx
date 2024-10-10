/* eslint-disable react/prop-types */
// for skeleton style
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = ({ number }) => {
  const skeletonElements = [];
  for (let i = 0; i < number; i++) {
    skeletonElements.push(
      <div key={i}>
        <div className="my-7">
          <Skeleton
            height={300}
            baseColor="#2c2c2c" // Dark base color
            highlightColor="#444" // Slightly lighter to emphasize the flowing effect
            duration={1.5} // Adjusts speed of the flow effect
          ></Skeleton>
        </div>
        <div className="">
          <Skeleton
            count={2}
            style={{ marginBottom: "12px" }}
            baseColor="#2c2c2c" // Dark base color
            highlightColor="#444" // Slightly lighter to emphasize the flowing effect
            duration={0.5} // Adjusts speed of the flow effect
          ></Skeleton>
        </div>
      </div>
    );
  }

  return <>{skeletonElements}</>;
};

export default SkeletonCard;
