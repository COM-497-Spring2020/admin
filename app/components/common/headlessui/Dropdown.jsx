import { logout } from "@/app/actions";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";

const Dropdown = ({ btnIcon, items }) => {
  return (
    <Menu>
      <MenuButton>{btnIcon}</MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className={`z-20 bg-white shadow rounded p-2 mt-3`}
        >
          <div className="flex items-center gap-x-5 p-2 border-b">
            <p className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
              A
            </p>
            <div>
              <p className="text-lg">Admin</p>
              <div className="flex items-center gap-2">
                <p className="opacity-80 text-sm font-medium break-all">
                  {process.env.ADMIN_EMAIL}
                </p>
              </div>
            </div>
          </div>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <MenuItem>
                  {item.name === "Logout" ? (
                    <p
                      onClick={() => logout()}
                      className="cursor-pointer flex items-center gap-3 hover:text-primary transition p-2"
                    >
                      {item.icon}
                      {item.name}
                    </p>
                  ) : (
                    <Link
                      href={item.href}
                      className={`cursor-pointer flex items-center gap-3 hover:text-primary transition p-2 border-b`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </MenuItem>
              </div>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
