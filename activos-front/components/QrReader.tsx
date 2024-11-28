import { useToggle } from "@/hooks";
import { IScannerProps, Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { FaQrcode } from "react-icons/fa";
import { SelectInput } from "./Form";
import { set } from "react-hook-form";
import { toast } from "sonner";
import { TOAST_ERROR_DURATION } from "@/constant/defaults.ts"

interface Props extends IScannerProps {
  btnClassName?: string;
}

const QrReader: React.FC<Props> = ({ btnClassName, onScan, ...props }) => {
  const { isOpen, toggle } = useToggle();
  const devices = useDevices();
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  return (
    <>
      <Button onClick={toggle} className={btnClassName}>
        <FaQrcode /> Leer QR
      </Button>
      <Modal
        show={isOpen}
        backdrop
        className="modal-level-2"
        backdropClassName="modal-level-2-backdrop"
      >
        <ModalHeader>
          <ModalTitle>Leer QR</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Scanner
            constraints={{ deviceId }}
            onScan={(data) => {
              onScan(data);
              toggle();
            }}
            onError={() => {
              toast.error("Error al leer el código QR, intenta de nuevo",{duration:TOAST_ERROR_DURATION});
              setDeviceId(undefined);
              toggle();
            }}
            {...props}
          />
          <select
            className="form-select mt-2"
            onChange={(e) => setDeviceId(e.currentTarget.value)}
          >
            <option>Seleccione cámara</option>
            {devices?.length && devices?.length > 0 && devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QrReader;
