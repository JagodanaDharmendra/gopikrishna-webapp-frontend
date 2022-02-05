import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Assessment } from ".";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  {
    tabTitle: "BT Assessment",
    view: () => {
      return <Assessment assessmentType="BT" />;
    },
  },
  {
    tabTitle: "ST Assessment",
    view: () => {
      return <Assessment assessmentType="ST" />;
    },
  },
  {
    tabTitle: "OT Assessment",
    view: () => {
      return <Assessment assessmentType="OT" />;
    },
  },
];

const Assessments: React.FC<any> = () => {
  useEffect(() => {
    document.title = "Assessments - Admin App";
  }, []);

  return (
    <>
      <div className="px-6 mt-4 float-auto">
        <div className="flex flex-col">
          <Tab.Group
            onChange={(index) => {
              // console.log("Changed selected tab to:", index);
            }}
          >
            <Tab.List className="flex space-x-3 w-full justify-around  p-1 bg-gray rounded-xl">
              {tabs.map((value, index) => {
                return (
                  <Tab
                    key={`${index}-${value.tabTitle}`}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium  rounded-lg",
                        selected
                          ? "bg-white shadow text-primary"
                          : "text-white",
                      )
                    }
                  >
                    {value.tabTitle}
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels className="flex w-full mt-4">
              {tabs.map((value, index) => {
                return (
                  <Tab.Panel
                    key={`${index}-${value.tabTitle}`}
                    className="flex w-full"
                  >
                    {value.view()}
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <></>
    </>
  );
};

export default Assessments;
