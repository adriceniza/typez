import Layout from '@components/Layout'
import React from 'react'
import Login from '../components/Login'
import ModalTerminal from '../components/Terminal/modalTerminal'

export default function login() {
    return (
        <>
            <Layout>
                <ModalTerminal />
                <Login />
            </Layout>

        </>
    )
}
