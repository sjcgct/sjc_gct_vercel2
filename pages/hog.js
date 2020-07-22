import Head from 'next/head'
import Hogtile from '../components/hogTile-hogpage'
import Layout from '../components/Layout'

const hogPage = () => {
  return (
    <Layout>
      <Head>
        <title>Student Council - GCT</title>
      </Head>
      <div className='HoGPosts row'>
        <Hogtile />
        <Hogtile />
        <Hogtile />
        <Hogtile />
      </div>
    </Layout>
  )
}

export default hogPage