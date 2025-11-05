import { FacebookIcon, InsIcon, LineIcon } from '@/components/icon';
import { ComponentType, SVGProps } from 'react';

const iconContent: {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  webLink: string;
  mobileLink: string;
}[] = [
  {
    name: 'Facebook',
    icon: FacebookIcon,
    webLink: 'https://www.facebook.com',
    mobileLink: '',
  },
  {
    name: 'Instagram',
    icon: InsIcon,
    webLink: 'https://www.instagram.com',
    mobileLink: '',
  },
  { name: 'Line', icon: LineIcon, webLink: 'https://line.me', mobileLink: '' },
];

export const IconList = ({ title, theme }: { title: string; theme: 'light' | 'dark' }) => {
  return (
    <>
      <p className={`text-base font-semibold ${theme === 'light' ? 'text-white' : 'text-black'}`}>
        {title}
      </p>
      <ul className="flex justify-center gap-5 pt-5">
        {iconContent.map((icon, idx) => {
          const Icon = icon.icon as ComponentType<SVGProps<SVGSVGElement>>;
          return (
            <Icon
              key={`${icon.name}-${idx}`}
              className={`w-7 h-7
                ${theme === 'light' ? 'text-white' : 'text-black'}
                `}
            />
          );
        })}
      </ul>
    </>
  );
};
