"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import SignInForm from "../SignInForm";
import RegisterForm from "../RegisterForm";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms";
import axios from "axios";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentForm, setCurrentForm] = React.useState("signin");
  const [user, setUser] = useAtom(userAtom);

  const currentPath = usePathname();

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentForm("signin");
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <Disclosure as="nav" className="navbar__container">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={"/"}>
                    <Image
                      className="block lg:hidden"
                      src="/logo.png"
                      alt="Bookit"
                      height={50}
                      width={100}
                    />
                  </Link>
                  <Link href={"/"}>
                    <Image
                      className="hidden lg:block"
                      src="/logo.png"
                      alt="Your Company"
                      height={50}
                      width={100}
                    />
                  </Link>
                </div>
              </div>
              <div className="flex px-2 lg:px-0">
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <Link
                    href="/"
                    className={`navbar__paths ${
                      currentPath === "/"
                        ? "border-primary text-gray-900"
                        : "border-transparent text-gray-500"
                    }`}
                  >
                    Home
                  </Link>
                  {user && (
                    <Link
                      href={`/reservations/${user.id}`}
                      className={`navbar__paths ${
                        currentPath === `/reservations/${user.id}`
                          ? "border-primary text-gray-900"
                          : "border-transparent text-gray-500"
                      }`}
                    >
                      Reservations
                    </Link>
                  )}
                  <Link
                    href="/about"
                    className={`navbar__paths ${
                      currentPath === "/about"
                        ? "border-primary text-gray-900"
                        : "border-transparent text-gray-500"
                    }`}
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          width={32}
                          height={32}
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Button
                    style="btn btn-primary btn-outline text-white h-8 w-25 mx-2"
                    handleClick={() => setIsOpen(true)}
                  >
                    Log in
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as={Link}
                href="/"
                className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 ${
                  currentPath === "/"
                    ? "text-gray-900 border-primary"
                    : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/about"
                className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 ${
                  currentPath === "/about"
                    ? "text-gray-900 border-primary"
                    : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                About
              </Disclosure.Button>
            </div>

            <div className="border-t border-gray-200 pb-3 pt-4">
              {user && (
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </div>
              )}
              {user && (
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              )}
              {!user && (
                <Disclosure.Button
                  as="button"
                  onClick={() => setIsOpen(true)}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Log in
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>

          {/* Modals */}
          {currentForm === "signin" ? (
            <SignInForm
              isOpen={isOpen}
              closeModal={handleCloseModal}
              setCurrentForm={setCurrentForm}
            />
          ) : (
            <RegisterForm
              isOpen={isOpen}
              closeModal={handleCloseModal}
              setCurrentForm={setCurrentForm}
            />
          )}
        </>
      )}
    </Disclosure>
  );
}
