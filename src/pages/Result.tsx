interface ResultProps {
  score: number;
  setId: Function;
  title: {
    title: string;
    icon: string;
  };
}

export default function Result({ score, setId, title }: ResultProps) {
  return (
    <div className="grid place-items-center p-8 gap-3 tablet:gap-8 desktop:max-w-[72.5rem]">
      <h3 className="grid text-mb-2.5 tablet:text-heading-l mb-7 w-full">
        Quiz completed <strong className="font-medium">You scored...</strong>
      </h3>
      <div className="grid gap-4 place-items-center p-8 bg-neutral-100 dark:bg-neutral-500 w-full rounded-xl">
        <p className="flex items-center gap-4 tablet:gap-6 tablet:mb-6">
          <img src={title.icon} alt="" className="size-10 tablet:size-14" />
          <span className="text-mb-1.125 tablet:text-heading-s font-medium">
            {title.title}
          </span>
        </p>
        <p className="grid place-items-center gap-4 text-mb-1.125 tablet:text-body-m">
          <strong className="text-mb-5.5 tablet:text-display">{score}</strong>
          out of 10
        </p>
      </div>
      <button
        type="button"
        onClick={() => setId(-1)}
        className="bg-accent-purple text-neutral-100 text-mb-1.125 tablet:text-heading-s font-medium p-6 tablet:p-8 rounded-xl w-full"
      >
        Play Again
      </button>
    </div>
  );
}
