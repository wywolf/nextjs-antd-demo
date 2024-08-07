import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from './store/provider';
import ProLayoutComp from '../components/ProLayoutComp'; // 根据实际路径导入
import '../styles/variables.less'; // 如果你有其他全局样式文件

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ProLayoutComp>{children}</ProLayoutComp>
        </ReduxProvider>
      </body>
    </html>
  );
}
