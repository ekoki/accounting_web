import { memo, VFC } from "react";
import { Box, Flex, Heading } from '@chakra-ui/react'

export const Page404: VFC = memo(() => {
  return (
    <Flex
    height="100vh"
    backgroundImage="url('https://images.unsplash.com/photo-1494675006433-9e9428eba6c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')"
    backgroundPosition="center"
    color="white"
    justify="center"
    align="center"
  >
    <Box color="white" textAlign="left" pb="full">
      <Heading as="h1" size="lg">
        Oops...
        <br />
        404 Pages Not Found
      </Heading>
    </Box>
  </Flex>
  )
})