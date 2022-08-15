import { Box, Flex, Container, Heading, useColorMode, useColorModeValue, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const Header: FC = () => {
  //カラーモードを切り替える
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW="container.lg">
        <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
          <NextLink href="/" passHref>
            <Heading as="h1" fontSize="2xl" cursor="pointer" color={useColorModeValue('gray.600', 'white')}>
              nukko blog
            </Heading>
          </NextLink>
          <Button size="lg" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
