import { memo, VFC, useState, useCallback, useEffect } from "react";
import { Box, Heading, Flex, Stack, Button, Divider } from "@chakra-ui/react"
import { useHistory} from "react-router-dom"

import { Question } from "../../types/api/Question"
import { useMessage } from "../../hooks/useMessage"

type Props = {
  questions: Question[]
  score: number
}

export const Answers: VFC<Props> = memo((props) => {
  const { questions, score } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickStaticPages = useCallback(() => history.push("/"), [history]);

  useEffect(() => {
    showMessage({ title: `お疲れ様でした！${questions.length}問中${score}問正解です!`, status: "success", duration: 6000 });
  }, [showMessage, questions.length, score]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="3xl" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          解答画面
        </Heading>
        <Divider my={1} />
        <Stack spacing={10} py={10} px={10}>
          <Heading as="h2" size="md" textAlign="center">
            問題{currentIndex + 1}
          </Heading>
          <p>{questions[currentIndex].question}</p>
          <Heading as="h2" size="md" textAlign="center">
            解答{currentIndex + 1}
          </Heading>
          <p>{questions[currentIndex].comment}</p>
          {currentIndex === 2 ? (
            <Button onClick={onClickStaticPages}>ホーム画面へ戻る</Button>
          ) : (
            <Button onClick={() => setCurrentIndex(currentIndex + 1)}>次の解答へ</Button>
          )}
        </Stack>
      </Box>
    </Flex>
  )
})