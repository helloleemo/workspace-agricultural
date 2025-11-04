import { wordingContent } from '@/configs/wording';
import { isEven } from '@/utils/isEven';
import Image from 'next/image';
import { ComponentType, Fragment, SVGProps } from 'react';
import { Intro } from './Intro';
import { CalendarIcon, PackageIcon, TruckIcon } from '../icon';

export const IntroSection = () => {
  return (
    <>
      <div className="grid col-2">
        <Intro
          title={wordingContent.indexPage.introSection.title}
          description={wordingContent.indexPage.introSection.description}
        />
        {/* Features */}
        {wordingContent.indexPage.featureSection.map((feature, idx) => {
          console.log(feature, idx);
          return (
            <Fragment key={idx}>
              {isEven(idx) ? (
                <>
                  <div className=" h-[50vh] w-full">
                    <Image
                      className=" object-cover w-full h-full "
                      src={feature.img}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className=" flex flex-col justify-center items-center px-20 w-full bg-neutral-100">
                    <p className="text-2xl text-center font-bold">{feature.title}</p>
                    <p className="text-center pt-2 text-neutral-500">{feature.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className=" flex flex-col justify-center items-center px-20 w-full bg-neutral-100">
                    <p className="text-2xl text-center font-bold">{feature.title}</p>
                    <p className="text-center pt-2 text-neutral-500">{feature.description}</p>
                  </div>
                  <div className=" h-[50vh] w-full">
                    <Image
                      className="object-cover w-full h-full"
                      src={feature.img}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                </>
              )}
            </Fragment>
          );
        })}
        {/* Intro */}
        <Intro
          title={wordingContent.indexPage.introSection2.title}
          description={wordingContent.indexPage.introSection2.description}
        />
        {/* Process */}
        <div className="flex justify-center items-center col-span-2 px-20 border py-28 bg-neutral-100">
          {wordingContent.indexPage.processes.map((process, idx: number) => {
            const Icon = process.icon as ComponentType<SVGProps<SVGSVGElement>>;

            return (
              <div
                className="relative flex flex-col items-center border  py-4 px-2 w-[380px]"
                key={idx}
              >
                <Icon className="w-18 h-18 text-primary" />
                <p className="text-xl pt-10">{process.title}</p>
                <p className="text-center pt-2 text-neutral-500">{process.description}</p>
                {idx !== wordingContent.indexPage.processes.length - 1 && (
                  <div className="h-[5px] bg-primary w-1/2 top-1/4 left-1/2 translate-x-1/2 rounded-full absolute"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
