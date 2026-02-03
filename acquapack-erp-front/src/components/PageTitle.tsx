interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="text-2xl md:text-3xl font-bold break-words">{title}</h1>;
};

export default PageTitle;

