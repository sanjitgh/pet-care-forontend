import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../ThemeProvaider/ThemeProvaider";

const SkeletonGrid = () => {
  const skeletons = [250, 40, 10, 10, 50];
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {theme === "dark" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              {skeletons.map((height, j) => (
                <Skeleton
                  key={j}
                  baseColor="#0D1323"
                  highlightColor="#161e33"
                  height={height}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              {skeletons.map((height, j) => (
                <Skeleton
                  key={j}
                  baseColor="#ebebeb"
                  highlightColor="#f5f5f5"
                  height={height}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SkeletonGrid;
