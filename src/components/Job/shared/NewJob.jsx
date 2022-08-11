/* eslint-disable jsx-a11y/no-redundant-roles */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { AtSymbolIcon, CodeIcon, LinkIcon } from "@heroicons/react/solid";
import { axiosPost } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useNotif from "../../../hooks/useNotif";
import useHeader from "../../../hooks/useHeader";
import FormJob from "./FormJob";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewJob({
  open,
  setOpen,
  setIsNewJob,
  setOpenPublishJob,
}) {
  const cancelButtonRef = useRef(null);
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobCondition, setJobCondition] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [closedJob, setClosedJob] = useState("");

  const handleAddJob = async (e) => {
    e.preventDefault();

    if (
      !jobTitle ||
      !jobDesc ||
      !jobLocation ||
      !salary ||
      !jobType ||
      !jobCondition ||
      !jobRequirements ||
      !closedJob
    ) {
      dispatch({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please fill all the fields",
      });
      return;
    }

    try {
      const data = {
        title: jobTitle,
        description: jobDesc,
        location: jobLocation,
        salary: salary,
        jobType: jobType,
        jobCondition: jobCondition,
        requirements: jobRequirements,
        closed: closedJob,
      };
      await axiosPost("/jobs", data, headers)
        .then(() => {
          dispatch({
            type: "NOTIF_SUCCESS",
            title: "Success",
            message: "Job has been added, please publish it.",
          });
          setIsNewJob(true);
          setOpen(false);
          setJobTitle("");
          setJobDesc("");
          setJobLocation("");
          setSalary("");
          setJobType("");
          setJobCondition("");
          setJobRequirements("");
          setClosedJob("");
        })
        .catch(() => {
          dispatch({
            type: "NOTIF_ERROR",
            title: "Error",
            message: "Something went wrong",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="text-center sm:mt-5">
                  <div className="mt-2">
                    <form action="#">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.List className="flex items-center">
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                                    "px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                                  )
                                }
                              >
                                Add job description
                              </Tab>
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                                    jobTitle ||
                                      jobType ||
                                      jobCondition ||
                                      closedJob
                                      ? "text-indigo-500"
                                      : "",
                                    "ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                                  )
                                }
                              >
                                Preview
                              </Tab>

                              {/* These buttons are here simply as examples and don't actually do anything. */}
                              {selectedIndex === 0 ? (
                                <div className="ml-auto flex items-center space-x-5">
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Insert link
                                        <input
                                          accept="image/*"
                                          className="input"
                                          id="contained-button-list-file"
                                          multiple
                                          type="file"
                                          //   onChange={(e) => handleFile(e)}
                                        />
                                      </span>
                                      <label
                                        htmlFor="contained-button-list-file"
                                        className="cursor-pointer"
                                      >
                                        <LinkIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </label>
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Insert code
                                      </span>
                                      <CodeIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Mention someone
                                      </span>
                                      <AtSymbolIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </Tab.List>
                            <Tab.Panels className="mt-6">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <FormJob
                                  jobTitle={jobTitle}
                                  setJobTitle={setJobTitle}
                                  jobDesc={jobDesc}
                                  setJobDesc={setJobDesc}
                                  jobLocation={jobLocation}
                                  setJobLocation={setJobLocation}
                                  salary={salary}
                                  setSalary={setSalary}
                                  jobType={jobType}
                                  setJobType={setJobType}
                                  jobCondition={jobCondition}
                                  setJobCondition={setJobCondition}
                                  jobRequirements={jobRequirements}
                                  setJobRequirements={setJobRequirements}
                                  closedJob={closedJob}
                                  setClosedJob={setClosedJob}
                                />
                              </Tab.Panel>
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <div className="border-b">
                                  <div className="mx-px mt-px px-3 pb-4 text-sm leading-5 text-gray-800">
                                    {/* Gallery */}
                                    <section
                                      className="mt-2 pb-16"
                                      aria-labelledby="gallery-heading"
                                    >
                                      <h2
                                        id="gallery-heading"
                                        className="sr-only"
                                      >
                                        Recently viewed
                                      </h2>
                                      <div className="mt-4">
                                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                          <ul
                                            role="list"
                                            className="divide-y divide-gray-200"
                                          >
                                            <li>
                                              <div className="block hover:bg-gray-50">
                                                <div className="px-4 py-4 sm:px-6">
                                                  <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-indigo-600 truncate">
                                                      {jobTitle}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {jobType}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                      <p className="mt-2 flex items-center text-sm text-gray-500">
                                                        <LocationMarkerIcon
                                                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                          aria-hidden="true"
                                                        />
                                                        {jobType}
                                                      </p>
                                                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:ml-6">
                                                        <CalendarIcon
                                                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                          aria-hidden="true"
                                                        />
                                                        <p>
                                                          Closing on{" "}
                                                          <time
                                                            dateTime={closedJob}
                                                          >
                                                            {closedJob}
                                                          </time>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
                          </>
                        )}
                      </Tab.Group>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={(e) => handleAddJob(e)}
                >
                  Post
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
