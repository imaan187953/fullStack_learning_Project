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
    onTabChange?.(tab);
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
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="mb-8 overflow-x-auto border-b border-zinc-800">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const isActive =
              selectedTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`
                  relative
                  px-5
                  py-4
                  text-sm
                  font-medium
                  transition
                  sm:px-6
                  sm:text-base

                  ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-200"
                  }
                `}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-red-500 sm:w-12" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[250px]">
        {renderContent()}
      </div>
    </section>
  );
}

export default MediaTabs;