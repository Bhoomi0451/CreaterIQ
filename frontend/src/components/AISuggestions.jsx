import React from "react";

const suggestions = [
  {
    icon: "💡",
    title: "Improve your content hooks",
    description:
      "Your first 3 seconds need stronger engagement."
  },
  {
    icon: "🚀",
    title: "Post at peak audience time",
    description:
      "Best engagement detected between 6 PM - 9 PM."
  },
  {
    icon: "🎯",
    title: "Focus on short-form videos",
    description:
      "Short videos are getting better reach."
  }
];


const AISuggestions = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-5">
        AI Suggestions
      </h2>


      <div className="grid md:grid-cols-3 gap-5">

        {suggestions.map((item, index) => (

          <div
            key={index}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >

            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};


export default AISuggestions;