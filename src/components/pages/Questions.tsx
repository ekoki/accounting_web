import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Flex, Box, Heading, Divider, Stack, Button, Link} from "@chakra-ui/react"
import { useHistory} from "react-router-dom"

import { useQuestions } from "../../hooks/useQuestions";
import { useMessage } from "../../hooks/useMessage"

export const Questions: VFC = memo(() => {
  const { getQuestions, questions } = useQuestions();
  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ finished, setFinished ] = useState(false);
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickQuestions = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    getQuestions();
    history.push("/questions");
  }, [history, getQuestions]);

  const onClickStaticPages = useCallback(() => history.push("/"), [history]);

  const handleQuestion = (userAnswer: boolean, correctAnswer: boolean) => {
    if(userAnswer === correctAnswer){
      showMessage({title: "正解しました！", status: "success"})
      // setScore関数の直前stateを参照する
      setScore(prevScore => prevScore + 1)
    }else{
      showMessage({title: "不正解です", status: "error"});
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
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="3xl" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
          {questions.length}択クイズ
          </Heading>
          <Divider my={1} />
          {finished ? (
            <>
              <p>お疲れ様でした！{questions.length}問中{score}問正解です!</p>
              <Link color="orange.400" textDecoration="underline" onClick={onClickQuestions}>問題をもう一度！</Link>
              <br />
              <Link color="orange.400" textDecoration="underline" onClick={onClickStaticPages}>ホーム画面へ戻る</Link>
            </>
          ) : (
            questions.length > 0  && (
              <Stack spacing={10} py={10} px={10}>
                <Heading as="h2" size="md" textAlign="center">
                  問題{currentQuestion + 1}
                </Heading>
                <p>{questions[currentQuestion].question}</p>
                {/* パラメータを渡す関数の呼び出しでアロー関数を使うことにより、レンダリングの際に呼ばれないようにしている。すなわち、アロー関数で記載することにより、ボタンをクリックした際に関数が呼ばれる。 */}
                <Button onClick={() => handleQuestion(true, questions[currentQuestion].answer)}>はい</Button>
                <Button onClick={() => handleQuestion(false, questions[currentQuestion].answer)}>いいえ</Button>
              </Stack>
            )
          )}
        </Box>
      </Flex>
    </>
  )
});