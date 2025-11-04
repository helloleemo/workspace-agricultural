import { IconList } from '../IconList.tsx'

export const Footer = () => {
  return (
        <footer className="bg-neutral-800 flex justify-center items-center">
          <div className=" w-[320px] h-[250px]  p-10">
            <div className="pt-10 text-center">
              <IconList title="最新消息" theme="light" />
            </div>
          </div>
        </footer>
  )
}
