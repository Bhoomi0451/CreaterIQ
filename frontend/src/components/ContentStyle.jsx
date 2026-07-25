import React from "react";

const styles = [
  "🎨 Visual Storytelling",
  "🎤 Educational Content",
  "🔥 Trend Focused",
];


const ContentStyle = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Content Style 🎨
      </h2>


      <div className="flex flex-wrap gap-3">

        {styles.map((style, index) => (
          <span
            key={index}
            className="bg-purple-100 px-4 py-2 rounded-full"
          >
            {style}
          </span>
        ))}

      </div>

    </div>
  );
};

export default ContentStyle;