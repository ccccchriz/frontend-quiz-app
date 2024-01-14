import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";
import Question from "./pages/Question";

interface importData {
  quizzes: {
    title: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  }[];
}
function App() {
  const [id, setId] = useState(-1);
  const [data, setData] = useState<importData>();

  useEffect(() => {
    fetch("/data.json")
      .then((data) => data.json())
      .then((json) => setData(json));
  }, []);

  if (data == undefined)
    return (
      <MainLayout>
        <h2>Loading data</h2>
      </MainLayout>
    );

  if (id == -1)
    return (
      <>
        <MainLayout>
          <Start
            setId={setId}
            data={
              data &&
              data.quizzes.map((el) => {
                return { title: el.title, icon: el.icon };
              })
            }
          />
        </MainLayout>
      </>
    );
  else
    return (
      <MainLayout
        title={{ title: data?.quizzes[id].title, icon: data?.quizzes[id].icon }}
      >
        <Question
          title={{
            title: data?.quizzes[id].title,
            icon: data?.quizzes[id].icon,
          }}
          data={data!.quizzes[id].questions}
          setId={setId}
        />
      </MainLayout>
    );
}

export default App;
