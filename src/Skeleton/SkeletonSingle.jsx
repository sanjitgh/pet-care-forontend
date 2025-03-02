import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../ThemeProvaider/ThemeProvaider";

const SkeletonSingle = () => {
    const { theme } = useContext(ThemeContext);
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0D1323]">
      <SkeletonTheme
        baseColor={theme === "dark" ? "#0D1323" : "#E2E8F0"}
        highlightColor={theme === "dark" ? "#161e33" : "#CBD5E1"}
      >
        <div className="container mx-auto max-w-6xl p-4">
          <Skeleton
            height={40}
            className="mb-4 bg-[#E2E8F0] dark:bg-[#1E293B]"
            count={1}
          />
          <Skeleton
            height={300}
            className="mb-4 bg-[#CBD5E1] dark:bg-[#334155]"
          />
          <Skeleton
            height={20}
            count={5}
            className="mb-2 bg-[#E2E8F0] dark:bg-[#1E293B]"
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonSingle;
