import { memo, useEffect, useState, VFC } from "react";
import { Flex, Box, Heading, Divider, Stack, Button } from "@chakra-ui/react"

import { useQuestions } from "../../hooks/useQuestions";
import { useMessage } from "../../hooks/useMessage";
import { Answers } from "./Answers"

export const Questions: VFC = memo(() => {
  const { getQuestions, questions } = useQuestions();
  const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
  const [ score, setScore ] = useState<number>(0);
  const [ finished, setFinished ] = useState<boolean>(false);
  const { showMessage } = useMessage();

  const handleQuestion = (userAnswer: boolean, correctAnswer: boolean) => {
    if(userAnswer === correctAnswer){
      showMessage({title: "正解しました！", status: "success", duration: 800})
      // setScore関数の直前stateを参照する
      setScore(prevScore => prevScore + 1)
    }else{
      showMessage({title: "不正解です", status: "error", duration: 800});
    }

    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion);
    }else{
      setFinished(true)
    }
  }

  useEffect(() => getQuestions(), []);

  return (
    <>
      {finished ? (
        <Answers questions={questions} score={score} />
        ) : (
          <Flex align="center" justify="center" height="100vh">
            {questions.length > 0  && (
              <Box bg="white" w="sm" p={4} borderRadius="3xl" shadow="md">
                <Heading as="h1" size="lg" textAlign="center">
                  {questions.length}択クイズ
                </Heading>
                <Divider my={1} />
                <Stack spacing={10} py={10} px={8}>
                  <Heading as="h2" size="md" textAlign="center">
                    問題{currentQuestion + 1}
                  </Heading>
                  <p>{questions[currentQuestion].question}</p>
                  {/* パラメータを渡す関数の呼び出しでアロー関数を使うことにより、レンダリングの際に呼ばれないようにしている。すなわち、アロー関数で記載することにより、ボタンをクリックした際に関数が呼ばれる。 */}
                  <Button onClick={() => handleQuestion(true, questions[currentQuestion].answer)}>はい</Button>
                  <Button onClick={() => handleQuestion(false, questions[currentQuestion].answer)}>いいえ</Button>
                </Stack>
              </Box>
            )}
          </Flex> 
        )}
    </>
  )
});