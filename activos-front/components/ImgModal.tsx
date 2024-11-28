import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { FaImage } from "react-icons/fa6";

type ImgModalProps = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  src: string;
  bodyMessage: string;
  className?: string;
  backdropClassName?: string;
};

export const ImgModal: React.FC<ImgModalProps> = ({
  isOpen,
  toggle,
  title,
  bodyMessage: alert_message,
  className,
  backdropClassName,
  src
}) => {
  return (
    <Modal
      size={"lg"}
      show={isOpen}
      onHide={toggle}
      className={className}
      backdropClassName={backdropClassName}
    >
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {alert_message && <div>{alert_message}</div>}
        {src && (
          <img src={src} alt="imagen" className="w-100" />
        )}
        {!src && (
          <>
            <FaImage size={150} className="text-muted" />
            <div>Sin imagen</div>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} variant={"danger"}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
