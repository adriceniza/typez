import Layout from '@components/Layout'
import ModalTerminal from '@components/Terminal/modalTerminal'
import Test_ from '@components/Test_'
import { useEffect, useState } from 'react'


export default function TypeTest() {
    const [modalShow, setModalShow] = useState(false)

    return (
        <><Layout>
            <ModalTerminal setModalShow={(x: boolean) => { setModalShow(x) }} />
            <Test_ modalShow={modalShow} />
        </Layout>

        </>
    )
}
