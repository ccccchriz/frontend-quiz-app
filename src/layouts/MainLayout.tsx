import { useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: {
    icon?: string;
    title?: string;
  };
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const toDarkMode = () => {
    setIsDarkMode(() => true);
    const root = document.getElementById("root")!;
    root.classList.add("dark");
    localStorage.setItem("darkMode", "dark");
  };

  const toLightMode = () => {
    setIsDarkMode(() => false);
    const root = document.getElementById("root")!;
    root.classList.remove("dark");
    localStorage.setItem("darkMode", "light");
  };

  const checkDarkMode = () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode && darkMode == "dark") return true;
    else if (darkMode && darkMode == "light") return false;
    else if (window.matchMedia("(prefers-color-scheme: light)").matches)
      return false;
    return true;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(checkDarkMode());

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center font-primary text-neutral-600 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-600 transition-bg duration-300">
        <h1 className="sr-only">Quiz</h1>
        <header className="flex w-full justify-between px-6 py-4 tablet:px-16 tablet:py-12 desktop:max-w-[72.5rem]">
          {title ? (
            <div className="flex items-center gap-4">
              <img src={title.icon} alt="" className="size-10 tablet:size-14" />
              <h2 className="text-mb-1.125 tablet:text-heading-s font-medium">
                {title.title}
              </h2>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex items-center gap-2 after:bg-[url(/images/icon-moon-dark.svg)] dark:after:bg-[url(/images/icon-moon-light.svg)] after:size-6 after:bg-center after:bg-contain before:bg-[url(/images/icon-sun-dark.svg)] dark:before:bg-[url(/images/icon-sun-light.svg)] before:size-6 before:bg-center before:bg-contain">
            <input
              onChange={isDarkMode ? toLightMode : toDarkMode}
              checked={isDarkMode}
              type="checkbox"
              role="switch"
              aria-label="enable dark mode"
              className="flex items-center appearance-none rounded-full p-1 w-12 bg-accent-purple before:ml-0 checked:before:ml-5 before:size-5 before:bg-neutral-100 before:rounded-full before:transition-[margin-left] duration-300 "
            ></input>
          </div>
        </header>
        {children}
      </main>
    </>
  );
}
