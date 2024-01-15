import { useEffect, useRef, useState } from "react";
import Result from "./Result";

interface QuestionProps {
  data?: {
    question: string;
    options: string[];
    answer: string;
  }[];
  setId: Function;
  title: {
    title: string;
    icon: string;
  };
}

export default function Question({ data, setId, title }: QuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const firstInput = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const nextQuestion = useRef<HTMLButtonElement>(null);
  const liveArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current.focus();
      firstInput.current.checked = true;
    }
  }, [currentQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = form.current!.querySelectorAll("input");
    form.current!.querySelector("button")?.classList.add("hidden");
    (form.current!.querySelector("button") as HTMLButtonElement).disabled =
      true;
    nextQuestion.current?.classList.remove("hidden");
    nextQuestion.current?.focus();
    inputs.forEach((el, index) => {
      el.parentElement!.querySelector("div")!.classList.remove("active-radio");
      const isCurrentCorrect =
        index ==
        data![currentQuestion].options.indexOf(data![currentQuestion].answer);
      if (el.checked) {
        if (isCurrentCorrect) {
          el.parentElement!.classList.add("right-answer", "correct-answer");
          el.parentElement!.classList.add();
          liveArea.current!.innerText = "You selected the correct answer";
          setScore((value) => value + 1);
        } else {
          el.parentElement!.classList.add("wrong-answer");
          liveArea.current!.innerText = `You selected the wrong answer. The correct answer is ${
            data![currentQuestion].answer
          }`;
        }
      } else if (isCurrentCorrect && !el.checked) {
        el.parentElement!.classList.add("correct-answer");
      }
      if (isCurrentCorrect) {
        el.setAttribute(
          "aria-label",
          `right answer, ${data![currentQuestion].options[index]}`
        );
      } else {
        el.setAttribute(
          "aria-label",
          `wrong answer, ${data![currentQuestion].options[index]}`
        );
      }
    });
  };

  const handleNextQuestion = () => {
    const inputs = form.current!.querySelectorAll("input");
    liveArea.current!.innerText = "";
    inputs.forEach((el) => {
      el.parentElement!.classList.remove(
        "right-answer",
        "correct-answer",
        "wrong-answer"
      );
      el.parentElement!.querySelector("div")!.classList.add("active-radio");
      el.removeAttribute("aria-label");
    });
    form.current!.querySelector("button")?.classList.remove("hidden");
    (form.current!.querySelector("button") as HTMLButtonElement).disabled =
      false;
    nextQuestion.current?.classList.add("hidden");
    setCurrentQuestion((value) => value + 1);
  };

  if (currentQuestion == data?.length) {
    return <Result score={score} setId={setId} title={title} />;
  }

  return (
    <div className="grid px-6 py-8 gap-4 tablet:gap-8 tablet:pt-0 tablet:px-16 desktop:max-w-[72.5rem]">
      <h3 className=" text-neutral-400 text-mb-0.875 tablet:text-body-s italic">
        Question {currentQuestion + 1} out of {data!.length}
      </h3>
      <form
        action=""
        className="grid gap-3 tablet:gap-8"
        ref={form}
        onSubmit={handleSubmit}
      >
        <fieldset className="grid gap-4 tablet:gap-6 desktop:grid-cols-2 ">
          <legend
            className="float-left text-mb-1.25 tablet:text-heading-m font-medium desktop:col-[1/2] desktop:row-[1/4] desktop:mt-"
            aria-live="polite"
          >
            {data![currentQuestion].question}
          </legend>
          <progress
            aria-hidden={true}
            className="desktop:col-[1/2] desktop:row-[4/5] w-full appearance-none bg-neutral-100 rounded-full mt-6 mb-10 p-1 [&::-webkit-progress-value]:bg-accent-purple [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-neutral-100 [&::-webkit-progress-bar]:rounded-full dark:[&::-webkit-progress-bar]:bg-neutral-500 dark:bg-neutral-500 desktop:mb-0"
            value={currentQuestion}
            max={data!.length}
          ></progress>
          {data![currentQuestion].options.map((el, index) => (
            <label
              key={index}
              htmlFor={`${index}`}
              className="group bg-neutral-100 dark:bg-neutral-500 flex items-center gap-2 tablet:gap-4 p-3 rounded-xl text-mb-1.125 tablet:text-heading-s font-medium border-4 border-neutral-100 dark:border-neutral-500 active:border-4 has-[:checked]:border-accent-purple [&:has(div.active-radio)]:cursor-pointer"
            >
              <div
                className="shrink-0 grid place-items-center size-10 tablet:size-14 bg-neutral-200 rounded-lg active-radio transition-all  dark:text-neutral-400"
                aria-hidden={true}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <input
                ref={index == 0 ? firstInput : null}
                type="radio"
                id={`${index}`}
                name="answer"
                className="appearance-none"
              ></input>
              {el}
            </label>
          ))}
        </fieldset>
        <button
          type="submit"
          className="bg-accent-purple text-neutral-100 text-mb-1.125 tablet:text-heading-s font-medium p-6 tablet:p-8 rounded-xl"
        >
          Submit Answer
        </button>
      </form>
      <div className="sr-only" aria-live="assertive" ref={liveArea}></div>
      <button
        ref={nextQuestion}
        onClick={handleNextQuestion}
        type="button"
        className="bg-accent-purple text-neutral-100 text-mb-1.125 tablet:text-heading-s font-medium p-6 tablet:p-8 rounded-xl hidden "
      >
        Next Question
      </button>
    </div>
  );
}
