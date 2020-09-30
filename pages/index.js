import Head from 'next/head'
import { getAllBlogsForHome, getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'
import React from 'react'

export default function BlogHome ({ preview, allBlogs, allHogs }) {
  const morePosts = allBlogs
  return (
    <Layout>
      <Head>
        <title>Student Journalist Gouncil - GCT</title>
      </Head>

      <h2>Blog</h2>
      {morePosts && (
        <Deck
          cards={morePosts}
          type='blog'
        />
      )}

      <br />
      <br />

      <h2>Humans of GCT</h2>

      {allHogs && (
        <Deck
          cards={allHogs}
          type='hog'
        />
      )}
    </Layout>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const blogs = await getAllBlogsForHome(' ', 6)
  const hogs = await getAllHogsForHome(' ', 6)
  var allBlogs = blogs.edges
  var allHogs = hogs.edges
  return {
    props: { preview, allBlogs, allHogs }
  }
}
