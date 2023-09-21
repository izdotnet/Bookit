import React, { FormEvent, Fragment } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SignInFormProps } from "@/types";
import { register } from "@/utils/Fetchers/Users";

export default function RegisterForm({
  isOpen,
  closeModal,
  setCurrentForm,
}: SignInFormProps) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const firstName = formData.get("first_name")?.toString();
    const lastName = formData.get("last_name")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm_password")?.toString();

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await register(email, firstName, lastName, password);
    console.log(response);

    if (response) {
      alert("Account created successfully");
      closeModal();
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
                      Register a new account
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                      <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="first_name"
                              name="first_name"
                              type="first_name"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="last_name"
                              name="last_name"
                              type="last_name"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
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

                        <div>
                          <label
                            htmlFor="confirm_password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Confirm Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="confirm_password"
                              name="confirm_password"
                              type="password"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Register
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
                      <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                          onClick={() => setCurrentForm("signin")}
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                          Log In here
                        </button>
                      </p>
                    </div>
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
