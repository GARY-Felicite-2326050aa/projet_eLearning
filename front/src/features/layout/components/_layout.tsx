import { Outlet } from 'react-router-dom'
import Header from "./Header";
import Main from "./Main";

export default function RootLayout() {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}