import React from "react";

const Tag = ({ tag }) => {
  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-8">
      <p className="outline-none" contentEditable="true">{tag}</p>
    </div>
  );
};

export default Tag;
