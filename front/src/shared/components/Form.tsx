import styles from './Form.module.css';

export type FormProps = {
    children?: React.ReactNode
}

export default function Form(
    {
        children
    }: FormProps
) {
    return (
        <div className={styles.form}>
            {children}
        </div>
    )
}