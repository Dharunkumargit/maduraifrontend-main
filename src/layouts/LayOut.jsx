import React from "react";
import NavBar from "./NavBar";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { TbBuildingStore, TbReportAnalytics } from "react-icons/tb";
import { LuContact, LuLayoutDashboard } from "react-icons/lu";
import { RiDashboardLine, RiUserAddLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { NavLink, Outlet, useLocation } from "react-router";
import { Settings } from "lucide-react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineNotificationAdd } from "react-icons/md";

const LayOut = () => {
    const location = useLocation();
  const Menus = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine size={25} />,
      to: "/dashboard",
    },
    {
      title: "Bins",
      icon: <HiOutlineTrash  size={25} />,
      to: "/bins",
    },
    {
      title: "Escalation",
      icon: <MdOutlineNotificationAdd  size={25} />,
      to: "/escalation",
    },
    {
      title: "Locality",
      icon: <LuLayoutDashboard size={25} />,
      to: "/locality/zone",
      nested: [
        {
          title: "Zone",
          icon: <RiUserAddLine size={23} />,
          to: "/locality/zone",
        },
        {
          title: "Ward",
          icon: <RiUserAddLine size={23} />,
          to: "/locality/ward",
        },
    ]
    },

    {
      title: "Reports",
      icon: <TbReportAnalytics size={25} />,
      to: "/reports/zonewisereport",
      nested: [
        {
          title: "Zone-wise Report",
          
          to: "/reports/zonewisereport",
        },
        {
          title: "Ward-wise Report",
          
          to: "/reports/wardwisereport",
        },
        {
          title: "Bin-wise Report",
          
          to: "/reports/binwisereport",
        },
        {
          title: "Employee-wise Report",
          
          to: "/reports/employeewisereport",
        },
        {
          title: "Escalation Report",
          
          to: "/reports/escalationreport",
        },
    ]
    },
    {
      title: "Employee Management",
      icon: <LuContact size={25} />,
      to: "/employeemanagement",
    },

    {
      title: "Settings",
      icon: <Settings size={25} />,
      to: "/settings/users",
      nested: [
        {
          title: "User",
          icon: <RiUserAddLine size={23} />,
          to: "/settings/users",
        },
        {
          title: "Roles",
          icon: <GrGroup size={23} />,
          to: "/settings/roles",
        },
      ],
    },
  ];

  const isMenuActive = (menu) => {
    if (location.pathname.startsWith(menu.to)) {
      return true;
    }
    if (
      menu.nested &&
      menu.nested.some((item) => location.pathname.startsWith(item.to))
    ) {
      return true;
    }
    return false;
  };

  const isMenuActives = (menu) => {
      if (location.pathname.startsWith(menu.to)) {
        return true;
      }
      if (
        menu.nested &&
        menu.nested.some((item) => location.pathname.startsWith(item.to))
      ) {
        return true;
      }
      return false;
    };
  return (
    <div className=" font-roboto-flex w-full fixed h-screen ">
      <NavBar />
      <div className="flex bg-light-blue h-11/12 ">
      <div className="px-6 pb-10 bg-light-blue overflow-auto no-scrollbar ">
            <ul>
              {Menus.map((menu, index) => (
                <React.Fragment key={index}>
                  <NavLink to={menu.to}>
                    <li
                      className={`w-[84px] text-sm font-extralight flex flex-col items-center text-center p-3 my-4  rounded-xl ${
                        isMenuActive(menu)
                          ? " text-white   bg-darkest-blue "
                          : " text-light-grey border border-light-stroke "
                      }`}
                    >
                      <span>{menu.icon}</span>
                      <p>{menu.title}</p>
                    </li>
                  </NavLink>
                </React.Fragment>
              ))}
            </ul>
          </div>
          {Menus.map((menu, index) => {
          const isNestedSidebarVisible = (menuTitle, pathname) => {
            if (menuTitle === "Bins") {
              return (
                pathname.startsWith("/bins/") && pathname !== "/bins"
              );
            }

            if (menuTitle === "Escalation") {
              return pathname.startsWith("/escalation/") && pathname !== "/escalation";
            }

           

            
            // if (menuTitle === "Reports") {
            //   return pathname.startsWith("/reports/") && pathname !== "/reports";
            // }
            if (menuTitle === "Employee Management") {
                return pathname.startsWith("/employeemanagement/") && pathname !== "/employeemanagement";
              }
            return pathname.startsWith(`/${menuTitle.toLowerCase()}`);
          };

          const shouldShowSidebar =
            menu.nested &&
            isNestedSidebarVisible(menu.title, location.pathname);

          return (
            shouldShowSidebar &&
            isMenuActives(menu) && (
              <div
                key={index}
                className="mx-2.5 w-56 text-sm  my-4 rounded-lg bg-white overflow-auto no-scrollbar shadow-lg py-6 mb-10"
              >
                <ul>
                  {menu.nested.map((item, index) => (
                    <li key={index} className="mb-2">
                      <NavLink to={item.to}>
                        <div
                          className={`w-full   flex  items-center gap-2 py-3 px-4 mt-3 cursor-pointer ${
                            location.pathname.startsWith(item.to)
                              ? "bg-light-blue text-black border-r-5 border-r-darkest-blue"
                              : "text-light-grey"
                          }`}
                        >
                          <span>{item.icon}</span>
                          <p>{item.title}</p>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          );
        })}

          <div className="w-full pt-5 ml-3 overflow-auto no-scrollbar ">
            <Outlet />
          </div>
      </div>
    </div>
  );
};

export default LayOut;
