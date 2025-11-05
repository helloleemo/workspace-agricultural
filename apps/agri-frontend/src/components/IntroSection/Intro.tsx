interface Props {
  title: string;
  description: string;
}

export const Intro = ({ title, description }: Props) => {
  return (
    <div className="col-span-2 border mx-auto text-center py-32">
      <p className="text-2xl font-bold">{title}</p>
      <p className="w-[500px] pt-2 text-neutral-600">{description}</p>
    </div>
  );
};
