import { client } from 'libs/client'
import type { Post } from 'types/blog'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { Box, Container, Divider, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Header } from 'components/Header'
import { DateTime } from 'components/DateTime'
import { MarkdownTemplate } from 'components/MarkdownTemplate'

type Props = {
  post: Post
}

export default function Article({ post }: Props) {
  return (
    <Box>
      <Header />
      <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
        <Stack spacing="8">
          <Heading as="h1" fontSize="4xl" lineHeight={1.6}>
            {post.title}
          </Heading>
        </Stack>
        <Divider margin="8" />
        {/* 記事本文 */}
        <MarkdownTemplate source={post.text} />
      </Container>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList<Post>({ endpoint: 'post', queries: { fields: 'id' } })
  const totalCount = data.totalCount
  const allData = await client.getList<Post>({ endpoint: 'post', queries: { limit: totalCount } })
  const paths = allData.contents.map((contnent) => `/post/${contnent.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  if (!params) throw new Error('Error Slug Not Found')
  const slug = params.slug
  const data = await client.getListDetail<Post>({ endpoint: 'post', contentId: slug })
  return {
    props: {
      post: data,
    },
  }
}
