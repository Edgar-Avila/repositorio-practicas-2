import { Button, Modal, ModalProps } from "react-bootstrap";

interface Props extends ModalProps {
  title: string;
  message: string;
  onConfirm?: () => void;
}

export const ConfirmModal: React.FC<Props> = ({
  title,
  message,
  onConfirm,
  onHide,
  ...props
}) => {
  return (
    <Modal onHide={onHide} {...props}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

