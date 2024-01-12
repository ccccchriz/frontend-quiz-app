import { useEffect, useState } from "react";
import TopicButton from "../components/TopicButton";

const data = [
  { title: "HTML", icon: "/images/icon-html.svg" },
  { title: "HTML", icon: "/images/icon-html.svg" },
  { title: "HTML", icon: "/images/icon-html.svg" },
  { title: "HTML", icon: "/images/icon-html.svg" },
];

export default function Start() {
  const [id, setId] = useState(-1);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="grid px-6 py-8 gap-4">
      <h2 className="text-mb-2.5 tablet:text-heading-l">
        Welcome to the <strong>Frontend Quiz!</strong>
      </h2>
      <p className="text-mb-0.875 tablet:text-body-s from-neutral-200 mb-6">
        Pick a subject to get started.
      </p>
      <div className="grid gap-3">
        {data.map((el, index) => (
          <TopicButton data={el} setId={() => setId(index)} key={index} />
        ))}
      </div>
    </div>
  );
}
