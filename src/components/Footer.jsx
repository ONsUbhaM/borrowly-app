import React from "react";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600 dark:text-teal-300">
          <text x="10" y="65" class="disney-style">
            Borrowly
          </text>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
          © {year} Borrowly. All rights reserved.
        </p>

{/* text */}
        {/* <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Blog
            </a>
          </li>
        </ul> */}
{/* logos   */}
        {/* <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
            >
              <span className="sr-only">Facebook</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul> */}

      </div>
    </footer>
  );
}

export default Footer;
