import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
}

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
}

const Layout = ({ children }: Props): JSX.Element => (
    <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{
            x: { type: "spring" },

        }}>
        {children}
    </motion.main>
)

export default Layout