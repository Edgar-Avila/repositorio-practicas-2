import { PageBreadcrumb } from "@/components";
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { TasaGivList } from "./TasaGivList.tsx";
import { useToggle } from "@/hooks";

import { toast } from "sonner";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Api, Config, ConfigColumns } from "datatables.net-bs5";
import { FaQrcode, FaSearch } from "react-icons/fa";
import { ModalConfirm } from "../helpers/ModalConfirm.tsx";
import { GivService } from "@/common/api/client.ts";
import { useNavigate } from "react-router-dom";
import {
  GetGIV,
  GetGivActivo,
  GetListadoUsuarioAutorizador,
  GetVerDetalleDatosAFTracking,
} from '@/common/api/index.ts'
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { getAuthUser } from "@/context";
import TasaGivModal from "../forms/TasaGivModal.tsx";
import { TOAST_ERROR_DURATION } from "@/constant/defaults.ts"
import clsx from "clsx";

type ActivoView = GetVerDetalleDatosAFTracking & {
  centro?: string;
};

const Container = () => {
  const { toggle, isOpen, hide } = useToggle();
  const { toggle: togCf, isOpen: opCf } = useToggle();
  const { toggle: toogle2, isOpen: isopen2 } = useToggle();
  const { toggle: qrToggle, isOpen: qrOpen } = useToggle();
  const [tbl, setTable] = useState<Api>();
  const [cfstate, setCfstate] = useState<number>(0);
  const navigate = useNavigate();
  const givid = useRef<number>(0);
  const [selectedGiv, setSelectedGiv] = useState<GetGIV>();
  const [centros, setCentros] = useState<any[]>([]);
  const [autorizadores, setAutorizadores] = useState<
    GetListadoUsuarioAutorizador[]
  >([]);
  const { register, getValues, trigger, formState: { errors } } = useForm({
    mode: "onChange",
  });

  const clicktable = async (id: number) => {
    givid.current = id;
    const givData = await GivService.getGIVbyID(id);
    setSelectedGiv(givData.data);
    toggle();
  };
  const getTable = useCallback((tb: Api) => {
    setTable(tb);
  }, []);
  const aprobar = useCallback(async () => {
    setCfstate(1);
    togCf();
  }, [togCf]);
  const rechazar = useCallback(() => {
    setCfstate(0);
    togCf();
  }, [togCf]);

  const onEditClicked = (id: number) => {
    navigate(`/pages/forms/editargiv/${id}`);
  };

  const confirmed = useCallback(
    async (type: number) => {
      const user = getAuthUser();
      if (type === 1) {
        const rs = await GivService.apiGivAprobarGIVPost(
          givid.current,
          user?.id
        );
        //NOTA MENSAJE BE MAL TIPADO CAMBIAR SI ES NECESARIO
        toast.success(
          String(rs.data) ?? "La guia ha sido aprobada y notificada",
          {
            position: "top-right",
          }
        );
      } else {
        const rs = await GivService.apiGivRechazarGIVPost(
          givid.current,
          user?.id
        );
        toast.error("La guia ha sido rechazada", { position: "top-right", duration: TOAST_ERROR_DURATION });
      }
      tbl?.ajax.reload(undefined, false);
      hide();
      /*  */
    },
    [hide, toogle2,tbl]
  );
  useEffect(() => {
    const getCentros = async () => {
      try {
        const data = await GivService.listarCentrosTraslado();
        setCentros(data.data);
      } catch {}
    };
    const getAutorizadores = async () => {
      try {
        const data = await GivService.listarUsuarioAutorizador();
        setAutorizadores(data.data);
      } catch (e) {}
    };

    Promise.all([getCentros(), getAutorizadores()]);
  }, []);
  const columnsactivo = useMemo<ConfigColumns[]>(() => {
    return [
      {
        title: "",
        data: null,
        defaultContent: "",
      },
      {
        title: "",
        data: null,
        render: () => {
          const check = document.createElement("input");
          check.type = "checkbox";
          return check;
        },
      },
      {
        title: "Centro",
        data: "centro",
      },
      {
        title: "Placa",
        data: "placa",
      },
      {
        title: "Código AF",
        data: "codigoaf",
      },
      {
        title: "Denominación",
        data: "desc",
      },
      {
        title: "Marca",
        data: "marca",
      },
      {
        title: "Serie",
        data: "serie",
      },
      {
        title: "Estado",
        data: "estado",
      },
      {
        title: "",
        data: null,
        className: "all",
        render: (data, type) => {
          if (type !== "display") {
            return data.id;
          }
          return "<a href='#'>Ver Imagen</a>";
        },
      },
    ];
  }, []);

  const selectTab = useCallback(
    (eventKey: string | null) => {
      if (eventKey === "items") {
        setTimeout(() => {
          tbl?.responsive.recalc();
        }, 200);
      }
    },
    [tbl]
  );
  const cfg = useMemo<Config>(
    () => ({
      searching: false,
      ajax: (_, callback) => {
        const { centroOrigen, supervidor, numeroGuia } = getValues();
        const co = centroOrigen || undefined;
        const su = supervidor || undefined;
        const nu = numeroGuia || undefined;
        GivService.getLiberarGIV(co, su, nu).then((data) => {
          callback({ data: data.data });
        })
        .catch((_e) => {
          callback({ data: [] });
        })
      },
    }),
    []
  );
  const onSearch = async () => {
    const ok = await trigger()
    if(!ok) {
      toast.error("Verifique los campos");
      return;
    }
    tbl?.ajax.reload();
  };

  const verGivQR = () => {
    qrToggle();
  };

  return (
    <Card className="card-primary">
      <CardBody>
        <Row>
          <Col>
            <Row className="mb-1">
              <Col md="6">
                <label className="form-label mb-lg-0 text-end">
                  Centro origen:
                </label>
              </Col>
              <Col md="6">
                <select
                  className="form-select form-select-border-color"
                  aria-label="Default select example"
                  style={{ width: "100%" }}
                  {...register("centroOrigen")}
                >
                  <option value={""}>-Seleccione-</option>
                  {centros.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.noM_CENTRO_TRASLADO}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col md="6">
                <label className="form-label mb-lg-0 text-end">
                  Supervisor:
                </label>
              </Col>
              <Col md="6">
                <select
                  className="form-select form-select-border-color"
                  defaultValue={""}
                  aria-label="Default select example"
                  style={{ width: "100%" }}
                  {...register("supervidor")}
                >
                  <option value={""}>-Seleccione-</option>
                  {autorizadores.map((c) => (
                    <option key={c.idUsuario} value={c.idUsuario}>
                      {c.noM_NOMBRE}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col md="6">
                <label className="form-label mb-lg-0 text-end">
                  Número de guía
                </label>
              </Col>
              <Col md="6">
                <input
                  type="text"
                  className={clsx("form-control", errors.numeroGuia && "is-invalid")}
                  {...register("numeroGuia", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    }
                  })}
                />
                {errors.numeroGuia && (
                  <p className="text-danger">
                    {errors.numeroGuia?.message as string}
                  </p>
                )}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <Button variant="success" onClick={onSearch}>
                  <FaSearch /> Buscar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <TasaGivList
            config={cfg}
            tablecallback={getTable}
            aprobClick={(id) => clicktable(id)}
            editClick={onEditClicked}
            hideView
          />
        </Row>
        <TasaGivModal
          giv={selectedGiv}
          isOpen={isOpen}
          toggle={toggle}
          title={"Aprobación GIV"}
          footer={
            <>
              <Button variant="info" onClick={() => verGivQR()}>
                <FaQrcode /> Ver QR
              </Button>
              <Button variant="success" onClick={aprobar}>
                Aprobar
              </Button>
              <Button variant="danger" onClick={rechazar}>
                Rechazar
              </Button>
            </>
          }
        />
        <Modal show={qrOpen} onHide={qrToggle}>
          <ModalHeader closeButton>
            <ModalTitle>QR GIV</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={selectedGiv?.iD_GIV?.toString() ?? ""}
              viewBox={`0 0 256 256`}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={qrToggle}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
        <ModalConfirm
          confirm={() => {
            confirmed(cfstate);
          }}
          isOpen={opCf}
          toggle={togCf}
          title="Confirmar"
          className="modal-level-2"
          backdropClassName="modal-level-2-backdrop"
          alert_message={
            "¿Está seguro de " +
            (cfstate === 1 ? "aprobar" : "rechazar") +
            " GIV?"
          }
        ></ModalConfirm>
        {/* <Modal show={isopen2} onHide={toogle2}>
          <ModalHeader closeButton>
            <ModalTitle>Motivo de rechazo</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <FormControl as={"textarea"}></FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={rechazar}>
              Rechazar
            </Button>
            <Button variant="secondary" onClick={toogle2}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal> */}
      </CardBody>
    </Card>
  );
};

const TasaLiberarGIV = () => {
  return (
    <>
      <PageBreadcrumb title="Liberar GIV" subName="Forms" />
      <Container />
    </>
  );
};

export default TasaLiberarGIV;
