import { ReactElement } from 'react';
import Terminal_ from '@components/Terminal/Terminal';
import Layout from '@components/Layout';
export default function Terminal(): ReactElement<any, any> {
  return (

    <Layout MT={false}><Terminal_ /></Layout>
  )
}