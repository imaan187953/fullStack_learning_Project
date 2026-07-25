import { useEffect, useState } from "react";

function MediaTabs({
  overview,
  reviews,
  ratings,
  activeTab,
  onTabChange,
}) {
  const [selectedTab, setSelectedTab] = useState(
    activeTab || "overview"
  );

  useEffect(() => {
    if (activeTab) {
      setSelectedTab(activeTab);
    }
  }, [activeTab]);

  const changeTab = (tab) => {
    setSelectedTab(tab);

    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "reviews",
      label: "Reviews",
    },
    {
      id: "ratings",
      label: "Ratings",
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "reviews":
        return reviews;

      case "ratings":
        return ratings;

      default:
        return overview;
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">

      <div className="mb-10 flex flex-wrap border-b border-zinc-800">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={`relative px-6 py-4 text-lg font-medium transition-all duration-300

            ${
              selectedTab === tab.id
                ? "text-red-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}

            {selectedTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-red-600" />
            )}

          </button>
        ))}

      </div>

      {renderContent()}

    </section>
  );
}

export default MediaTabs;