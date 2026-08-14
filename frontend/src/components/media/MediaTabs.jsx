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
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">

      {/* Tabs */}
      <div className="mb-7 flex w-full border-b border-zinc-800 sm:mb-10">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={`
              relative
              flex-1
              px-2
              py-3
              text-sm
              font-medium
              transition-all
              duration-200
              sm:flex-none
              sm:px-6
              sm:py-4
              sm:text-base
              lg:text-lg

              ${
                selectedTab === tab.id
                  ? "text-red-500"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {tab.label}

            {selectedTab === tab.id && (
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-full
                  rounded-full
                  bg-red-600
                  sm:h-[3px]
                "
              />
            )}
          </button>
        ))}

      </div>

      {/* Content */}
      <div className="min-w-0">
        {renderContent()}
      </div>

    </section>
  );
}

export default MediaTabs;