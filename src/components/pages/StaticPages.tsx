import { memo, VFC, useCallback } from "react";
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import { useHistory} from "react-router-dom"

export const StaticPages: VFC = memo(() => {
  const history = useHistory();
  
  const onClickQuestions = useCallback(() => history.push("/questions"), [history]);

  return (
    <Flex
      height="100vh"
      backgroundImage="url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      backgroundPosition="center"
      color="white"
      justify="center"
      align="center"
    >
      <Box color="white" textAlign="center" pb="full">
        <Heading as="h1" size="md" pb="full">
          会計は役に立つスキルです！
        </Heading>
        <Text>このアプリは会計の基礎的な問題を出題します。</Text>
        <Text>全問正解目指して頑張っていきましょう！！</Text>
        <Button backgroundColor="navy" color="white" onClick={onClickQuestions}>問題へ！</Button>
      </Box>
    </Flex>
  )
})