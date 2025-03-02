import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../ThemeProvaider/ThemeProvaider";

const SkeletonGrid = () => {
  const skeletons = [250, 40, 10, 10, 50];
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            {skeletons.map((height, j) => (
              <Skeleton
                key={j}
                baseColor={theme === "dark" ? "#0D1323" : "#E2E8F0"}
                highlightColor={theme === "dark" ? "#161e33" : "#CBD5E1"}
                height={height}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonGrid;
