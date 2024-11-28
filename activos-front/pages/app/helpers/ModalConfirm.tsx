import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useCallback } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  toggle: () => void;
  confirm?: () => void;
  decline?: () => void;
  title: string;
  alert_message: string;
  yestext?: string;
  notext?: string;
  className?: string;
  backdropClassName?: string;
};

export const ModalConfirm = (props: ConfirmModalProps) => {
  const {
    isOpen,
    toggle,
    confirm,
    decline,
    title,
    alert_message,
    yestext,
    notext,
  } = props;
  const cfr = useCallback(() => {
    toggle();
    confirm?.();
  }, [confirm, toggle]);
  const cancel = useCallback(() => {
    toggle();
    decline?.();
  }, [decline, toggle]);
  return (
    <Modal size={"sm"} show={isOpen} onHide={toggle} className={props.className} backdropClassName={props.backdropClassName}>
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{alert_message}</ModalBody>
      <ModalFooter>
        <Button onClick={cfr} variant={"secondary"}>
          {yestext ?? "SI"}
        </Button>
        <Button onClick={cancel} variant={"danger"}>
          {notext ?? "NO"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
