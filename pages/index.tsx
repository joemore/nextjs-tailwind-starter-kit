import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaBolt } from "react-icons/fa";
// import { FcMultipleSmartphones } from "react-icons/fc";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";


const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Head>
        <title>NextJS, Typescript &amp; Tailwind starter kit.</title>
      </Head>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <Link href="/">
            <a
              aria-label="View"
              className="inline-block mb-5 rounded-full sm:mx-auto"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-600 text-3xl text-yellow-400">
                <FaBolt />
              </div>
            </a>
          </Link>
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            NextJS, Typescript &amp; Tailwind starter kit.
          </h2>
          <p className="text-base text-gray-700 md:text-lg sm:px-4">
            This is a starter kit using NextJS V12.0.8, Tailwind CSS (with
            aspect-ratio, forms &amp; typography) as well as @headlessui/react and
            react-icons
          </p>
  
          {/* Tailwind @headlessui Example */}
          {/* <div className="mt-10 ">
            <Switch.Group>
              <div className="flex items-center">
                <Switch.Label className="mr-4">@headlessui Example:</Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-green-500" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100`}
                >
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div> */}
  
          <hr className="w-full my-8 border-gray-300" />
        </div>
      </div>

      {/* Footer Example */}
      {/* <Footer/> */}
    </>
  );
};



export default Home;
