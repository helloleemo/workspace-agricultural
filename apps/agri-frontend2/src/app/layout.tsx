import { Header } from '../components/Header.tsx/Header';
import './global.css';
import { Footer } from '@/components/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
          <Footer/>
      </body>
    </html>
  );
}
