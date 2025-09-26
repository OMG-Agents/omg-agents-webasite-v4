'use client';
import { useState } from "react";
import Orb from './Orb';
import { useTranslation } from '@/contexts/TranslationContext';
import LanguageToggle from './LanguageToggle';

export default () => {
  const [state, setState] = useState(false);
  const { t } = useTranslation();

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: t('navigation.partners'), path: "javascript:void(0)" },
    { title: t('navigation.customers'), path: "javascript:void(0)" },
    { title: t('navigation.team'), path: "javascript:void(0)" },
  ];

  return (
    <>
      <nav className="relative items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          <a href="javascript:void(0)">
            <img
              src="/omg-logo-original.svg"
              width={120}
              height={50}
              alt="OMG Agents logo"
            />
          </a>
          <button
            className="text-gray-700 outline-none md:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:text-sm md:font-medium md:flex md:mt-0 ${state ? "absolute inset-x-0 px-4 border-b bg-white md:border-none md:static" : "hidden"}`}
        >
          <div className="items-center space-y-5 md:flex md:space-x-6 md:space-y-0 md:ml-12">
            {navigation.map((item, idx) => (
              <li className="text-gray-700 hover:text-indigo-600" key={idx}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </div>
          <li className="order-2 py-5 md:py-0 flex items-center gap-4">
            <LanguageToggle />
            <a
              href="javascript:void(0)"
              className="py-2 px-5 rounded-lg font-medium text-white text-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 block md:py-3 md:inline"
            >
              {t('navigation.getStarted')}
            </a>
          </li>
        </ul>
      </nav>
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto text-gray-700 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm text-indigo-600 font-medium">
              {t('hero.badge')}
            </h1>
            <h2 className="text-4xl text-gray-900 font-extrabold md:text-5xl">
              {t('hero.title')}
            </h2>
            <p>
              {t('hero.description')}
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="javascript:void(0)"
                className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow"
              >
                {t('hero.primaryButton')}
              </a>
              <a
                href="javascript:void(0)"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                {t('hero.secondaryButton')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <div style={{ width: '100%', height: '600px', position: 'relative', aspectRatio: '1/1', maxWidth: '600px', margin: '0 auto' }}>
              <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
