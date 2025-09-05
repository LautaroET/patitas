import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div
        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin
                  border-blue-500 dark:border-blue-400"
      ></div>
    </div>
  );
}

export default Loader;