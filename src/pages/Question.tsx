import { FormEvent, useEffect, useRef, useState } from "react";

interface QuestionProps {
  data?: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export default function Question({ data }: QuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

  const handleSubmit = (e: FormEvent) => {
    liveArea.current!.innerText = "";
    e.preventDefault();
    const inputs = form.current!.querySelectorAll("input");
    form.current!.querySelector("button")?.classList.add("hidden");
    (form.current!.querySelector("button") as HTMLButtonElement).disabled =
      true;
    nextQuestion.current?.classList.remove("hidden");
    nextQuestion.current?.focus();
    inputs.forEach((el, index) => {
      const isCurrentCorrect =
        index ==
        data![currentQuestion].options.indexOf(data![currentQuestion].answer);
      if (el.checked) {
        if (isCurrentCorrect) {
          el.parentElement!.classList.add("right-answer");
          liveArea.current!.innerText = "You selected the correct answer";
        } else {
          el.parentElement!.classList.add("wrong-answer");
          liveArea.current!.innerText = `You selected the wrong answer. The correct answer is ${
            data![currentQuestion].answer
          }`;
        }
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
    inputs.forEach((el) => {
      el.parentElement!.classList.remove("right-answer");
      el.parentElement!.classList.remove("wrong-answer");
      el.removeAttribute("aria-label");
    });
    form.current!.querySelector("button")?.classList.remove("hidden");
    (form.current!.querySelector("button") as HTMLButtonElement).disabled =
      false;
    nextQuestion.current?.classList.add("hidden");
    setCurrentQuestion((value) => value + 1);
  };

  return (
    <div className="grid px-6 py-8 gap-4">
      <h3 className=" text-neutral-400 text-mb-0.875 italic">
        Question {currentQuestion + 1} out of {data!.length}
      </h3>
      <form action="" className="grid gap-3" ref={form} onSubmit={handleSubmit}>
        <fieldset className="grid gap-3">
          <legend className="text-mb-1.25 font-medium" aria-live="polite">
            {data![currentQuestion].question}
          </legend>
          <progress
            aria-hidden={true}
            className="w-full appearance-none bg-neutral-100 rounded-full mt-6 mb-10 p-1 [&::-webkit-progress-value]:bg-accent-purple [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-neutral-100 [&::-webkit-progress-bar]:rounded-full dark:[&::-webkit-progress-bar]:bg-neutral-500 dark:bg-neutral-500"
            value={currentQuestion}
            max={data!.length}
          ></progress>
          {data![currentQuestion].options.map((el, index) => (
            <label
              key={index}
              htmlFor={`${index}`}
              className="group bg-neutral-100 dark:bg-neutral-500 flex items-center gap-2 p-3 rounded-[0.75rem] text-mb-1.125 font-medium border-4 border-neutral-100 dark:border-neutral-500 active:border-4 has-[:checked]:!border-accent-purple cursor-pointer"
            >
              <div
                className="shrink-0 grid place-items-center size-10 bg-neutral-200 rounded-[0.5rem] group-hover:text-accent-purple  group-hover:bg-accent-purple group-hover:bg-opacity-10 transition-all group-has-[:checked]:bg-accent-purple group-has-[:checked]:text-neutral-100 dark:text-neutral-400"
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
          className="bg-accent-purple text-neutral-100 text-mb-1.125 font-medium p-6 rounded-[0.75rem]"
        >
          Submit Answer
        </button>
      </form>
      <div className="sr-only" aria-live="assertive" ref={liveArea}></div>
      <button
        ref={nextQuestion}
        onClick={handleNextQuestion}
        type="button"
        className="bg-accent-purple text-neutral-100 text-mb-1.125 font-medium p-6 rounded-[0.75rem] hidden -mt-1"
      >
        Next Question
      </button>
    </div>
  );
}
