import TopicButton from "../components/TopicButton";

interface StartProps {
  data?: {
    title: string;
    icon: string;
  }[];
  setId: Function;
}

export default function Start({ setId, data }: StartProps) {
  return (
    <div className="grid desktop:grid-cols-2 px-6 tablet:px-16 py-8 gap-4 desktop:max-w-[72.5rem]">
      <h2 className="text-mb-2.5 tablet:text-heading-l">
        Welcome to the <strong>Frontend Quiz!</strong>
      </h2>
      <fieldset className="grid gap-3">
        <legend className="text-mb-0.875 tablet:text-body-s text-neutral-400 dark:text-neutral-300 mb-6">
          Pick a subject to get started.
        </legend>
        {data &&
          data.map((el, index) => (
            <TopicButton data={el} setId={() => setId(index)} key={index} />
          ))}
      </fieldset>
    </div>
  );
}
