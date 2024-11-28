interface Props {
  value: number;
}

const ClientLevel: React.FC<Props> = ({ value }) => {
  if(typeof value !== 'number') {
    return null;
  }

  return (
    <span>
      {Array.from({ length: value }).map((_, index) => (
        <i className="fas fa-star text-warning" key={index}></i>
      ))}
    </span>
  );
};

export default ClientLevel;
