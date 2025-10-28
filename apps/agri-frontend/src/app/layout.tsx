import { IconList } from '@/components/IconList.tsx';
import { Header } from '../components/Header.tsx/Header';
import './global.css';

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
        <footer className="bg-neutral-800 flex justify-center items-center">
          <div className=" w-[320px] h-[250px]  p-10">
            <div className="pt-10 text-center">
              <IconList title="最新消息" theme="light" />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
