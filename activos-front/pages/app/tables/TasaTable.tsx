import { PageBreadcrumb } from "@/components";
import useToggle from "@/hooks/useToggle";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { TActivo, TasaActivoTable } from "./TasaActivoTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Api, Config, ConfigColumns } from "datatables.net-bs5";
import { FaEdit, FaEye, FaQrcode, FaSearch, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { callback } from "node_modules/chart.js/dist/helpers/helpers.core";
import { GivService } from "@/common/api/client";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context";
import QrReader from "@/components/QrReader";
import {
  GetListadoEstadoActivos,
  GetVerDetalleAF,
  GetVerDetalleGIV,
  GetVerDetalleTransporte,
} from '@/common/api'

const Container = ({ isprob } = { isprob: false }) => {
  const { isOpen, show, toggle } = useToggle();
  const [selectedGiv, setSelectedGiV] = useState<GetVerDetalleGIV>();
  const [selectedGivAF, setSelectedGiVAF] = useState<GetVerDetalleAF>();
  const [selectedGivTrans, setSelectedGiVTrans] = useState<GetVerDetalleTransporte>();
  const { user } = useAuthContext();
  const [estados, setEstados] = useState<GetListadoEstadoActivos[]>([]);
  const { register, getValues, setValue } = useForm({
    defaultValues: {
      CodigoActivo: "",
      PlacaActivo: "",
      EstadoActivo: undefined,
    }
  });
  const clickRow = useCallback(() => {
    show();
  }, [show]);
  const [table, setTable] = useState<Api>();
  const tableready = useCallback((tb: Api) => {
    setTable(tb);
  }, []);
  const dtconfig = useMemo<Config>(
    () => ({
      paging: true,
      // searching: true,
      pagingType: "simple_numbers",
      ajax: (_, callback) => {
        let finalData: any[] = [];
        const idUsuario = user?.id || 0;
        const { CodigoActivo, EstadoActivo, PlacaActivo } = getValues();
        GivService.listarActivosInventarios(idUsuario, CodigoActivo || undefined, PlacaActivo || undefined, EstadoActivo || undefined)
        .then((data) => {
          finalData = data.data;
        })
        .finally(() => {
          callback({ data: finalData });
        })
      },
      columns: [
        {
          title: "Centro",
          data: "noM_CENTRO",
        },
        {
          title: "Placa",
          data: "noM_PLACA",
        },
        {
          title: "Código AF",
          data: "coD_AF",
        },
        {
          title: "Acción",
          data: "id",
          className: "all",
          render: (d, ty) => {
            if (ty !== "display") {
              return d;
            }
            const linkb = document.createElement("a");
            linkb.innerHTML = "<i class='fa fa-eye'></i>";
            linkb.className = "btn btn-link";
            const container = document.createElement("div");
            container.className = "btn-group btn-group-sm";
            linkb.onclick = async () => {
              const [giv, af, gt] = await Promise.all([
                GivService.verDetalleGIV(d),
                GivService.verDetalleAF(d),
                GivService.verDetalleTransporte(d),
              ]);
              setSelectedGiV(giv.data);
              setSelectedGiVAF(af.data);
              setSelectedGiVTrans(gt.data);
              show();
            };
            container.append(linkb);
            return container;
          },
        },
      ],
    }),
    [show]
  );

  const onSearch = async () => {
    const idUsuario = user?.id || 0;
    let { CodigoActivo, EstadoActivo, PlacaActivo } = getValues();
    // Update table
    table?.ajax.reload();
  }

  useEffect(() => {
    const getEstados = async () => {
      const data = await GivService.listarEstadoActivos();
      setEstados(data.data);
    }
    getEstados();
  }, [])

  return (
    <Card className="card-primary">
      <CardBody>
        <Row>
          <Col>
            <FormGroup as={Row} className="mb-1">
              <FormLabel column xs={3}>
                Código AF
              </FormLabel>
              <Col xs={9}>
                <FormControl {...register('CodigoActivo')}></FormControl>
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-1">
              <FormLabel column xs={3}>
                Placa AF
              </FormLabel>
              <Col xs={9}>
                <FormControl {...register('PlacaActivo')}></FormControl>
              </Col>
            </FormGroup>
            <Row className="mb-1">
              <Col xs={3}>
                <span>Estado: </span>
              </Col>
              <Col xs={9}>
                <select
                  className="form-select form-select-border-color"
                  aria-label="Default select example"
                  {...register('EstadoActivo')}
                >
                  <option value="">-Seleccione-</option>
                  {estados.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.deS_ESTADO_ACTIVO}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <QrReader
              btnClassName="btn btn-info"
              onScan={(codes) => {
                setValue("CodigoActivo", codes?.[0]?.rawValue);
              }}
            />
            {" "}
            <Button variant="success" onClick={onSearch}>
              <FaSearch />
              Buscar
            </Button>
          </Col>
        </Row>
        <Row>
          <TasaActivoTable overridecfg={dtconfig} ready={tableready}></TasaActivoTable>
        </Row>
        <div className="d-flex justify-content-center">
          <div className="btn-group">
            {!isprob && (
              <Link to="/pages/forms/formgiv" className="btn btn-success">
                <FaEdit /> Crear GIV
              </Link>
            )}

            <Link to="/pages/forms/formdespachar" className="btn btn-info">
              <FaTruck /> Programar traslado
            </Link>

            {!isprob && (
              <Link to="/pages/forms/tracking" className="btn btn-warning">
                <FaEye /> Ver tracking
              </Link>
            )}
          </div>
        </div>
        <Modal
          className="fade"
          show={isOpen}
          onHide={toggle}
          id="exampleModalSmall"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <ModalHeader closeButton>
            <ModalTitle>Detalle</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Tabs>
              {!!selectedGiv?.id_Activo && (
                <Tab title="Datos GIV" eventKey="dtTrack">
                  <div style={{ fontSize: "14px" }} className="mb-3 mt-2">
                    <p className="mb-0">
                      <strong>Puerto: </strong> 
                      <span>{selectedGiv?.deS_PUERTO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Motivo de traslado: </strong>{" "}
                      <span>{selectedGiv?.fK_CT_MOTIVO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Centro origen: </strong>
                      <span>{selectedGiv?.fK_CENTRO_DESTINO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Centro destino: </strong>
                      <span>{selectedGiv?.fK_CENTRO_DESTINO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Emplazamiento destino: </strong>
                      <span>{selectedGiv?.fK_EMPLAZAMIENTO_DESTINO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Autoriza traslado: </strong> 
                      <span>{selectedGiv?.fK_USUARIO_AUTORIZADOR || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Asunto: </strong>{" "}
                      <span>{selectedGiv?.deS_ASUNTO || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Nro. items: </strong> 
                      <span>{selectedGiv?.nuM_ITEMS || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>RUC de proveedor: </strong>
                      <span>{selectedGiv?.noM_RUC || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Nombre de proveedor: </strong>
                      <span>{selectedGiv?.id_Proveedor || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Dirección de proveedor: </strong>{" "}
                      <span>{selectedGiv?.noM_DIRECCION || "-"}</span>
                    </p>
                  </div>
                </Tab>
              )}
              <Tab title="Datos AF" eventKey="dtAF">
                <div style={{ fontSize: "14px" }} className="mb-3 mt-1">
                  <p className="mb-0">
                    <strong>Id activo: </strong>
                    <span>{selectedGivAF?.id_Activo}</span>
                  </p>
                  <p className="mb-0">
                    <strong>Código activo: </strong>
                    <span>{selectedGivAF?.coD_AF}</span>
                  </p>
                  <p className="mb-0">
                    <strong>Descripción activo: </strong>
                    <span>{selectedGivAF?.deS_AF}</span>
                  </p>
                  <p className="mb-0">
                    <strong>Placa: </strong>
                    <span>{selectedGivAF?.noM_PLACA}</span>
                  </p>
                </div>
              </Tab>
              {!!selectedGivTrans?.id_Activo && (
                <Tab title="Datos del Transporte" eventKey="dtTrans">
                  <div style={{ fontSize: "14px" }} className="mb-3 mt-1">
                    <p className="mb-0">
                      <strong>RUC transportista: </strong>
                      <span>{selectedGivTrans?.noM_RUC || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Nombre transportista: </strong>
                      <span>{selectedGivTrans?.noM_TRANSPORTISTA || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Brevete: </strong>
                      <span>{selectedGivTrans?.noM_BREVETE || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Marca: </strong>
                      <span>{selectedGivTrans?.noM_MARCA || "-"}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Placa: </strong>
                      <span>{selectedGivTrans?.noM_PLACA || "-"}</span>
                    </p>
                  </div>
                </Tab>
              )}
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};
const TasaTable = ({ isprob } = { isprob: false }) => {
  return (
    <>
      <PageBreadcrumb title="Inventario" subName="Tables" />
      <Container isprob={isprob} />
    </>
  );
};

export default TasaTable;
