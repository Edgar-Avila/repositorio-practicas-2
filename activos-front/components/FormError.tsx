interface Props extends React.HTMLAttributes<HTMLDivElement> { 
  msg?: string;
}

const FormError: React.FC<Props> = ({ msg }) => {
  if(!msg) return null;
  return (
    <div className="text-danger">
      {msg}
    </div>
  );
};

export default FormError;