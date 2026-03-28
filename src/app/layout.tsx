import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Providers from '@/lib/Providers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from '@/config';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadingIndicatorProperties } from '@/utils/constant';
import './globals.css';
import GlobalAuthHandler from '@/components/auth/GlobalAuthHandler';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="max-image-preview:large, NOODP, NOYDIR" />
      </head>
      <body className="font-outfit dark:bg-gray-900">
        <NextTopLoader {...loadingIndicatorProperties} />
        <GoogleOAuthProvider clientId={config.googleClientId ?? ''}>
          <Providers>
            <GlobalAuthHandler />
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Providers>
          <ToastContainer className="z-999999" />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
