import { SidebarProvider } from '@/context/SidebarContext';
import { Instrument_Serif, Inter } from 'next/font/google';
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
import localFont from 'next/font/local';

const generalFont = localFont({
  src: [
    {
      path: '../fonts/GeneralSans-Light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GeneralSans-Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../fonts/GeneralSans-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/GeneralSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-general',
  display: 'swap',
});
const Helvetica = localFont({
  src: [
    {
      path: '../fonts/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../fonts/HelveticaNeueLight.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});
const Instrument = localFont({
  src: [
    {
      path: '../fonts/instrumentserif-italic.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/instrumentserif-regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-instrument',
  display: 'swap',
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${generalFont.variable} ${Instrument.variable} ${Helvetica.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="max-image-preview:large, NOODP, NOYDIR" />
      </head>
      <body className="font-general dark:bg-gray-900">
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
