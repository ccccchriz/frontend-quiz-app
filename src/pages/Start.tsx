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
    <div className="grid px-6 py-8 gap-4">
      <h2 className="text-mb-2.5 tablet:text-heading-l">
        Welcome to the <strong>Frontend Quiz!</strong>
      </h2>
      <fieldset className="grid gap-3">
        <legend className="text-mb-0.875 tablet:text-body-s from-neutral-200 mb-6">
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
