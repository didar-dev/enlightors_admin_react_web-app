import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GrLogout } from "react-icons/gr";
import { login, signout } from ".././redux/Auth";
import { Navigate } from "react-router-dom";
function NavBar() {
  const Auth = useSelector((state) => state.Auth.Auth);
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center px-4 py-2">
      <div>
        <h1 className="text-2xl font-bold">Enlightors</h1>
      </div>
      <div></div>
      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex-col items-start flex">
                {Auth.name}
                <p className=" text-sm font-medium text-gray-300">
                  {Auth.role === "admin" ? (
                    <span className="text-green-500">Admin</span>
                  ) : (
                    <span className="text-blue-500">Super Admin</span>
                  )}
                </p>
              </div>
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        dispatch(signout());
                        return <Navigate to="/login" />;
                      }}
                    >
                      {active ? (
                        <GrLogout
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <GrLogout
                          className="mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
export default NavBar;
