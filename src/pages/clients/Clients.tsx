import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import { CreateClientForm, ClientsList } from "./views";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  {
    tabTitle: "All Clients",
    view: () => {
      return <ClientsList />;
    },
  },
  {
    tabTitle: "Create Client",
    view: () => {
      return <CreateClientForm />;
    },
  },
];

const Clients: React.FC<any> = () => {
  useEffect(() => {
    document.title = "Clients - Admin App";
  }, []);

  return (
    <>
      <div className="px-4 mt-4 float-auto">
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
                        selected ? "bg-white shadow text-primary" : "text-white"
                      )
                    }
                  >
                    {value.tabTitle}
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels className="flex w-full mt-4">
              <Tab.Panel>
                <ClientsList />
              </Tab.Panel>
              <Tab.Panel>
                <CreateClientForm />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default Clients;
