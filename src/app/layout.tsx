import "./globals.css";
import { use } from "react";

import { IRootLayout } from "./types/ComponentProps";
import { UpdateSettings } from "./types/ghost-types";
import Layout from "./components/BlogLayout";
import { getNavigation } from "./api/ghost-api";

function RootLayout({ children }: IRootLayout) {
  const settings: UpdateSettings = use(getNavigation());

  return (
    <html lang="en">
      <body  className={` bg-[--bg-color] dark:bg-gray-900`}>
        <Layout setting={settings}>
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout;