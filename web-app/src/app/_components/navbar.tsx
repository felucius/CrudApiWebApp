"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const nav = [
    { name: "Dashboard", href: "/#", current: true },
    { name: "User", href: "/user", current: false },
    { name: "Bank account", href: "/bank-account", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800/50 backdrop-blur">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon aria-hidden className="h-6 w-6" />
                  ) : (
                    <Bars3Icon aria-hidden className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo + desktop nav */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Image
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {nav.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={
                          item.current
                            ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right actions */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=facearea&facepad=2&auto=format"
                        alt=""
                        className="h-8 w-8 rounded-full bg-gray-800 ring-1 ring-white/10"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 ring-1 ring-white/10 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-300 ${
                              active ? "bg-white/5" : ""
                            }`}
                          >
                            Your profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-300 ${
                              active ? "bg-white/5" : ""
                            }`}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-gray-300 ${
                              active ? "bg-white/5" : ""
                            }`}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {nav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={
                    item.current
                      ? "block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white"
                      : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
