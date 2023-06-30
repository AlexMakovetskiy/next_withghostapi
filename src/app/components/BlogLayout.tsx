"use client"

import { ThemeProvider } from 'next-themes';

import { IBlogLayout } from '../types/PageProps';
import Header from './Header';
import Footer from './Footer';

function Layout({ setting, children }: IBlogLayout) {
    return (
        <ThemeProvider attribute="class">
            <Header setting={setting} />
                {children}
            <Footer setting={setting} />
        </ThemeProvider>
    )
}

export default Layout;