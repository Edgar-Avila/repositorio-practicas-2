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
  GeListadoCentrosTraslado,
  GetGIV,
  GetListadoEstadoActivos,
  GetListadoInventarioProveedor,
  GetVerDetalleAF,
  GetVerDetalleGIV,
  GetVerDetalleTransporte,
} from '@/common/api'

const Container = () => {
  const { isOpen, show, toggle } = useToggle();
  const [selectedGiv, setSelectedGiV] = useState<GetVerDetalleGIV>();
  const [selectedGivAF, setSelectedGiVAF] = useState<GetVerDetalleAF>();
  const [selectedGivTrans, setSelectedGiVTrans] = useState<GetVerDetalleTransporte>();
  const [giv, setGiv] = useState<GetGIV>();
  const { user } = useAuthContext();
  const [centros, setCentros] = useState<GeListadoCentrosTraslado[]>([]);
  const { register, getValues, setValue } = useForm({
    defaultValues: {
      CodigoActivo: "",
      CentroAsignado: "",
      PlacaActivo: "",
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
        const { CodigoActivo, CentroAsignado, PlacaActivo } = getValues();
        GivService.listadoInventarioProveedor(idUsuario, CentroAsignado || undefined, CodigoActivo || undefined, PlacaActivo || undefined)
        .then((data) => {
          finalData = data.data;
        })
        .finally(() => {
          callback({ data: finalData });
        })
      },
      columns: [
        {
          title: "GIV",
          data: "iD_GIV",
          defaultContent: "",
        },
        {
          title: "Centro",
          data: "noM_CENTRO_ORIGEN",
          defaultContent: "",
        },
        {
          title: "Placa",
          data: "noM_PLACA",
          defaultContent: "",
        },
        {
          title: "Código AF",
          data: "deS_AF",
          defaultContent: "",
        },
        {
          title: "Acción",
          data: "id",
          className: "all",
          defaultContent: "",
          render: (d, ty, row) => {
            if (ty !== "display") {
              return d;
            }
            const linkb = document.createElement("a");
            linkb.innerHTML = "<i class='fa fa-eye'></i>";
            linkb.className = "btn btn-link";
            const container = document.createElement("div");
            container.className = "btn-group btn-group-sm";
            linkb.onclick = async () => {
              const dbGiv = await GivService.getGIVbyID(row.iD_GIV);
              const af = await GivService.verDetalleAF(row.iD_ACTIVO);
              setGiv(dbGiv.data);
              setSelectedGiVAF(af.data);
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
    // Update table
    table?.ajax.reload();
  }

  useEffect(() => {
    const getCentros = async () => {
      const data = await GivService.listarCentrosTraslado();
      setCentros(data.data);
    }
    getCentros();
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
                <span>Centro: </span>
              </Col>
              <Col xs={9}>
                <select
                  className="form-select form-select-border-color"
                  aria-label="Default select example"
                  {...register('CentroAsignado')}
                >
                  <option value="">-Seleccione-</option>
                  {centros.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.noM_CENTRO_TRASLADO}
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
            <Link to="/pages/forms/formdespachar" className="btn btn-info">
              <FaTruck /> Programar Traslado
            </Link>
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
              <Tab title="Datos GIV" eventKey="dtTrack">
              <div style={{ fontSize: "14px" }} className="mb-3 mt-2">
                <p className="mb-0">
                  <p className="mb-0">
                    <strong>Motivo de traslado: </strong>{" "}
                    <span className="text-uppercase">
                      {giv?.noM_GIV_MOTIVO}
                    </span>
                  </p>
                  <strong>Puerto: </strong>
                  <span className="text-uppercase">
                    {giv?.noM_PUERTO}
                  </span>
                </p>

                <p className="mb-0">
                  <strong>Centro origen: </strong>
                  <span className="text-uppercase">
                    {giv?.noM_CENTRO_ORIGEN}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Centro destino: </strong>
                  <span className="text-uppercase">
                    {giv?.noM_CENTRO_TRASLADO}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Emplazamiento destino: </strong>
                  <span className="text-uppercase">
                    {giv?.deS_EMPLAZAMIENTO}
                  </span>
                </p>
                <p className="m-0">
                  <strong>Autoriza traslado: </strong>
                  <span className="text-uppercase">
                    {giv?.nombrE_USUARIO}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Asunto: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.deS_ASUNTO}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Nro. activos: </strong>
                  <span className="text-uppercase">
                    {giv?.givactivo?.length || 0}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>RUC proveedor: </strong>
                  <span className="text-uppercase">
                    {giv?.ruC_PROVEEDOR}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Razón social proveedor: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.nombrE_PROVEEDOR}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Dirección proveedor: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.direccioN_PROVEEDOR}
                  </span>
                </p>
              </div>
              </Tab>
              <Tab title="Datos AF" eventKey="dtAF">
                <div style={{ fontSize: "14px" }} className="mb-3 mt-1">
                  <p className="mb-0">
                    <strong>Id Activo: </strong>
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
              <Tab title="Datos del transporte" eventKey="dtTrans">
              <div style={{ fontSize: "14px" }} className="mb-3 mt-1">
                <p className="mb-0">
                  <strong>RUC transportista: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.ruC_TRANS}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Razón social: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.empresA_TRANS}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Nombre transportista: </strong>{" "}
                  <span className="text-uppercase">
                    {giv?.nombrE_TRANSPORTISTA}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Brevete transportista: </strong>
                  <span className="text-uppercase">
                    {giv?.brevetE_TRANSPORTISTA}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Marca del transporte: </strong>
                  <span className="text-uppercase">
                    {giv?.marcA_VEHICULO}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Placa del transporte: </strong>
                  <span className="text-uppercase">
                    {giv?.placA_VEHICULO}
                  </span>
                </p>
              </div>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};
const TasaInventarioProveedor = () => {
  return (
    <>
      <PageBreadcrumb title="Inventario proveedor" subName="Tables" />
      <Container />
    </>
  );
};

export default TasaInventarioProveedor;
