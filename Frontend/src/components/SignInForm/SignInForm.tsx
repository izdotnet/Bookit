"use client";

import React, { FormEvent, Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SignInFormProps } from "@/types";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms";
import axios, { AxiosError } from "axios";

export default function SignInForm({
  isOpen,
  closeModal,
  setCurrentForm,
}: SignInFormProps) {
  const [user, setUser] = useAtom(userAtom);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      window.alert("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (data.message === "Authenticated") {
        const user = await axios.get("/api/auth/me");
        setUser(user.data);
        closeModal();
      }
    } catch (e) {
      const error = e as AxiosError;
      window.alert(error.message);
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    type="button"
                    onClick={closeModal}
                  >
                    <XMarkIcon
                      height={15}
                      width={15}
                      className="object-contain"
                    />
                  </button>
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image
                      className="mx-auto"
                      src="/logo.png"
                      alt="Logo"
                      height={100}
                      width={150}
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Sign in to your account
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                      <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-3 block text-sm leading-6 text-gray-900"
                          >
                            Remember me
                          </label>
                        </div> */}

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>

                      <div>
                        <div className="relative mt-10">
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          ></div>
                          <div className="relative flex justify-center text-sm font-medium leading-6"></div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                      Not a member?{" "}
                      <button
                        onClick={() => setCurrentForm("register")}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Register here
                      </button>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
