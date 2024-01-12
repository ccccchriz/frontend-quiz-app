interface TopicButtonProps {
  data: {
    title: string;
    icon: string;
  };
  setId: React.MouseEventHandler;
}

export default function TopicButton({ data, setId }: TopicButtonProps) {
  return (
    <button
      type="button"
      onClick={setId}
      className="w-full flex items-center gap-4 p-3 bg-neutral-100 dark:bg-neutral-500 rounded-[0.75rem] transition-bg duration-300 active:bg-neutral-500 active:text-neutral-100 dark:active:bg-neutral-200 dark:active:text-neutral-500"
    >
      <img src={data.icon} alt="" className="size-10" />
      <span className="text-mb-1.125">{data.title}</span>
    </button>
  );
}
