interface MainLayoutProps {
  children: React.ReactNode;
  title?: {
    image: string;
    name: string;
  };
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <main className="font-primary">
        <h1 className="sr-only">Quiz</h1>
        <header className="dark:bg-neutral-500 flex justify-between px-6 py-4">
          {title ? (
            <div className="flex items-center gap-4">
              <img src={title.image} className="size-10" />
              <h2 className="text-body-s text-neutral-600 font-medium">
                {title.name}
              </h2>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex items-center gap-2 after:bg-[url(/images/icon-moon-dark.svg)] dark:after:bg-[url(/images/icon-moon-light.svg)] after:size-6 after:bg-center after:bg-contain before:bg-[url(/images/icon-sun-dark.svg)] dark:before:bg-[url(/images/icon-sun-light.svg)] before:size-6 before:bg-center before:bg-contain">
            <input
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
