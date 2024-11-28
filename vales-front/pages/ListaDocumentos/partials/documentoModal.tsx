import documentoService from "@/common/services/documentoService";
import { useAuthContext } from "@/context";
import { useConfirm } from "@/context/useConfirmContext";
import { snakeToCapitalizedWords } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, ModalProps, Table } from "react-bootstrap";
import { toast } from "sonner";

interface Props extends ModalProps {
  documento: any;
  onApprove?: () => void;
  onReject?: () => void;
  onNullify?: () => void;
}

function DocumentoModal({ documento, onHide, onApprove, onReject, onNullify, ...props }: Props) {
  const { user } = useAuthContext();
  const confirm = useConfirm();

	const { mutate: approveDocumento } = useMutation({
		mutationKey: ['aprobarDocumento'],
		mutationFn: (id: string) => documentoService.approveDocumento(id),
		onError: () => {
			toast.error('Error al aprobar el documento')
		},
		onSuccess: () => {
			toast.success('Documento aprobado')
      onApprove?.();
      onHide?.();
		},
	})

	const { mutate: rejectDocumento } = useMutation({
		mutationKey: ['rechazarDocumento'],
		mutationFn: (id: string) => documentoService.rejectDocumento(id),
		onError: () => {
			toast.error('Error al rechazar el documento')
		},
		onSuccess: () => {
			toast.success('Documento rechazado')
      onReject?.()
			onHide?.()
		},
	})

  const { mutate: nullifyDocumento } = useMutation({
    mutationKey: ['anularDocumento'],
    mutationFn: (id: string) => documentoService.nullifyDocumento(id),
    onError: () => {
      toast.error('Error al anular el documento')
    },
    onSuccess: () => {
      toast.success('Documento anulado')
      onNullify?.()
      onHide?.()
    },
  });

  const onApproveClick = async (id: string) => {
    const confirmed = await confirm({
      title: 'Aprobar documento',
      message: '¿Estás seguro de aprobar este documento?',
    });
    if(!confirmed) return;
    approveDocumento(id);
  }

  const onRejectClick = async (id: string) => {
    const confirmed = await confirm({
      title: 'Rechazar documento',
      message: '¿Estás seguro de rechazar este documento?',
    });
    if(!confirmed) return;
    rejectDocumento(id);
  }

  const onNullifyClick = async (id: string) => {
    const confirmed = await confirm({
      title: 'Anular documento',
      message: '¿Estás seguro de anular este documento?',
    });
    if(!confirmed) return;
    nullifyDocumento(id);
  }

  const canApprove = user!.rol === "OPERADOR" && documento?.estado === "PENDIENTE";
  const canNullify = user!.rol === "USUARIO_DEPENDENCIA" && documento?.estado === "PENDIENTE";

  if(!documento) return null;

  return (
    <Modal size="lg" onHide={onHide} {...props}>
      <Modal.Header>
        <Modal.Title>
          <span>Documento</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p><strong>Estado:</strong> {snakeToCapitalizedWords(documento?.estado)}</p>
          <p><strong>Tipo:</strong> {snakeToCapitalizedWords(documento?.tipo)}</p>
          <p><strong>Serie:</strong> {documento?.serie}</p>
          <p><strong>Correlativo:</strong> {documento?.correlativo}</p>
        </div>
        <h5>Productos</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {documento?.lineas?.map((l: any) => (
              <tr key={l.id}>
                <td>{l?.producto?.descripcion}</td>
                <td>{l.cantidad}</td>
                <td>{l.precio}</td>
                <td>{l.cantidad * l.precio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        {canApprove && (
          <>
            <Button
              variant="primary"
              onClick={() => onApproveClick(documento?.id)}
            >
              Aprobar
            </Button>
            <Button
              variant="danger"
              onClick={() => onRejectClick(documento?.id)}
            >
              Rechazar
            </Button>
          </>
        )}
        {canNullify && (
          <Button variant="danger" onClick={() => onNullifyClick(documento?.id)}>
            Anular
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocumentoModal;
