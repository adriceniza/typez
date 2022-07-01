import { useEffect, useState } from 'react'
import styles from '@styles/SpinnerLoader.module.css'
interface ISpinnerLoader {
    loading: boolean
}
export default function SpinnerLoader({
    loading,
}: ISpinnerLoader) {
    const [isLoading, setIsLoading] = useState(loading || false)

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])


    if (isLoading) {
        return (
            <div className={styles.loader}>
                <div className={styles.spinner} />
            </div>
        )
    } else {
        return null
    }
}
