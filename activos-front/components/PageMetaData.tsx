import { Helmet } from "react-helmet";

const PageMetaData = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title} | TASA Trazabilidad</title>
    </Helmet>
  );
};

export default PageMetaData;
