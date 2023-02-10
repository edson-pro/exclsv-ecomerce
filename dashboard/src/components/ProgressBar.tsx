import React from "react";

export default function ProgressBar() {
  return (
    <div className="w-full m-auto">
      <div className="progress-bar h-1 bg-green-200 w-full overflow-hidden">
        <div className="progress-bar-value w-full h-full bg-primary " />
      </div>
    </div>
  );
}
