import { PageBreadcrumb } from "@/components";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle,
  Row, Tab, Tabs,
} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { TasaGivList } from "./TasaGivList";
import { FaQrcode, FaSearch } from "react-icons/fa";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Api, Config, ConfigColumns } from "datatables.net-bs5";
import { useToggle } from "@/hooks";
import TasaRecepGiv from "@/pages/app/forms/TasaRecepGiv.tsx";
import TasaEntregaGiv from "@/pages/app/forms/TasaEntregaGIV.tsx";
import { GivService } from "@/common/api/client.ts";
import {
  GetCentrosResponse,
  GetGIV,
  GetPuertosResponse,
  GivApi,
} from '@/common/api'
import QrReader from "@/components/QrReader";
import { set, useForm } from "react-hook-form";
import TasaGivModal from "../forms/TasaGivModal";
import { getAuthUser } from "@/context";
import { toast } from "sonner";

const LayoutTable = () => {
  const { toggle, isOpen, hide } = useToggle();
  const { toggle: toggle2, isOpen: isOpen2 } = useToggle();
  const [sended, setSend] = useState<string>("0");
  const table = useRef<Api>();
  const [puertos, setPuertos] = useState<GetPuertosResponse[]>([]);
  const {toggle: toogleView, isOpen: isOpenView}=useToggle()
  const [centros, setCentros] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<object>({});
  const [selectedGiv, setSelectedGiv] = useState<GetGIV>();
  const [selectedControlId, setSelectedControlId] = useState<number>(0);
  const sendnref = useRef<string>("0");
  const click = useCallback( async (_id:number, controlId: number) => {
    const {data} = await GivService.getGIVActivosbyID(controlId)
    setSelectedGiv(data);
    toogleView()
  }, []);
  const { register, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {
      IdUsuario: "",
      IdPuerto: "",
      IdCentro: "",
      IdGIV: "",
      IsEntrega: true,
    },
  });

  const changeCount = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSend(() => ev.target.value);
    sendnref.current = ev.target.value;
    setValue("IsEntrega", sendnref.current === "0");
    reload();
  };

  const sendClick = useCallback(
    async (_id: number, controlId: number) => {
      setSelectedControlId(controlId);
      const {data}=await GivService.getGIVActivosbyID(controlId)
      setSelectedGiv(data);
      toggle2();
    },
    [toggle2]
  );
  const recClick = useCallback(
    async (_id: number, controlId: number) => {
      setSelectedControlId(controlId);
      const {data}=await GivService.getGIVActivosbyID(controlId)
      setSelectedGiv(data);
      toggle();
    },
    [toggle]
  );
  const cfg = useMemo<Config>(() => {
    return {
      ajax: (_, callback) => {
        const { IdGIV, IdCentro, IdPuerto, IsEntrega } = getValues();
        const user = getAuthUser()
        GivService.getRecepcionActivos(
          Number(user?.id) || undefined,
          Number(IdPuerto) || undefined,
          Number(IdCentro) || undefined,
          Number(IdGIV) || undefined,
          IsEntrega
        )
          .then(({ data }) => {
            callback({ data });
            if(sendnref.current === "0") {
              document.querySelectorAll(".btn-entrega").forEach((btn) => {
                btn.classList.remove("d-none");
              });
              document.querySelectorAll(".btn-recepcion").forEach((btn) => {
                btn.classList.add("d-none");
              });
            }
            else {
              document.querySelectorAll(".btn-recepcion").forEach((btn) => {
                btn.classList.remove("d-none");
              });

              document.querySelectorAll(".btn-entrega").forEach((btn) => {
                btn.classList.add("d-none");
              });
            }
          })
          .catch(() => {
            callback({ data: [] });
          });
      },
    };
  }, []);

  useEffect(() => {
    const getPuertos = async () => {
      const data = await GivService.getPuertos();
      setPuertos(data.data);
    };
    const getCentros = async () => {
      const data = await GivService.listarCentrosTraslado();
      setCentros(data.data);
    };

    Promise.all([getPuertos(), getCentros()]);
  }, []);

  const modifySearch = (name: string, value: string) => {
    setSearchData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onModifySearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    modifySearch(ev.target.name, ev.target.value);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const reload = async () => {
    const ok = await trigger();
    if (!ok) {
      toast.error("Error en los campos");
      return;
    }
    table.current?.ajax.reload(undefined, false);
  };
  return (
    <Card className="card-primary">
      <CardBody>
        <Row className="mt-3">
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormCheck
                value={0}
                checked={sended === "0"}
                onChange={changeCount}
                inline
                type="radio"
                label="Entregar"
                name="entrec"
              ></FormCheck>
              <FormCheck
                value={1}
                checked={sended === "1"}
                onChange={changeCount}
                inline
                type="radio"
                label="Recibir"
                name="entrec"
              ></FormCheck>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormSelect
              className="mb-2"
              aria-placeholder="Seleccionar puerto"
              {...register("IdPuerto")}
            >
              <option>Seleccionar puerto</option>
              {puertos.map((p,i) => (
                <option key={i} value={p.id}>{p.nomPuerto}</option>
              ))}
            </FormSelect>
            <FormSelect
              className="mb-2"
              aria-placeholder="Seleccionar centro"
              {...register("IdCentro")}
            >
              <option>Seleccionar centro</option>
              {centros.map((c,i) => (
                <option key={i} value={c.id}>{c.noM_CENTRO_TRASLADO}</option>
              ))}
            </FormSelect>
            <FormControl
              className="mb-2"
              type="search"
              placeholder="Buscar por GIV"
              isInvalid={!!errors.IdGIV}
              {...register("IdGIV", {
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Solo se permiten números",
                },
                maxLength: {
                  value: 10,
                  message: "Máximo 10 caracteres"
                },
              })}
            ></FormControl>
            <p className="invalid-feedback">
              {errors.IdGIV?.message}
            </p>
            {/* <FormControl
              className="mb-2"
              type="search"
              placeholder="Buscar por ST"
              {...register("st")}
            ></FormControl>
            <FormControl
              className="mb-2"
              type="search"
              placeholder="Buscar por Numero de activo"
              {...register("numactivo")}
            ></FormControl>
            <FormControl
              className="mb-2"
              type="search"
              placeholder="Buscar por GR"
              {...register("gr")}
            ></FormControl>*/}
          </Col>
        </Row>
        <Row>
          <Col>
            <QrReader
              btnClassName="btn btn-info"
              onScan={(codes) => {
                setValue("IdGIV", codes?.[0]?.rawValue);
              }}
            />{" "}
            <Button onClick={reload} variant={"success"}>
              <FaSearch />
              Buscar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <TasaGivList
              tablecallback={(tbl) => {
                table.current = tbl;
              }}
              config={cfg}
              sendClick={sendClick}
              receiveClick={recClick}
              viewIdControlClick={click}
            />
          </Col>
        </Row>
        {/*<Row className="mt-2 justify-content-end">
          <Col className="col-3">
            <Link to="/pages/forms/recepgiv">
              <Button type="button">Siguiente</Button>
            </Link>
          </Col>
        </Row>*/}
        <TasaRecepGiv
          isOpen={isOpen}
          toggle={toggle}
          idControl={selectedControlId}
          activos={selectedGiv?.givactivo??[]}
          givId={selectedGiv?.iD_GIV??0}
          imgGeneral={selectedGiv?.imageN_GENERAL ?? ""}
          onSubmit={() => table.current?.ajax.reload()}
        />
        <TasaEntregaGiv
          isOpen={isOpen2}
          givId={selectedGiv?.iD_GIV??0}
          activos={selectedGiv?.givactivo??[]}
          toggle={toggle2}
          idControl={selectedControlId}
          imgGeneral={selectedGiv?.imageN_GENERAL ?? ""}
          onSubmit={() => table.current?.ajax.reload()}
        />
        <TasaGivModal
          isOpen={isOpenView}
          toggle={toogleView}
          title={"Ver GIV"}
          giv={selectedGiv}
          footer={
            <Button onClick={toogleView} className="btn btn-danger">
              Cerrar
            </Button>
          }
        />
      </CardBody>
    </Card>
  );
};
const TasaRecepcionGIVTable = () => {
  return (
    <>
      <PageBreadcrumb
        title="Traslado de activo"
        subName="Listas"
      ></PageBreadcrumb>
      <LayoutTable />
    </>
  );
};
export default TasaRecepcionGIVTable;
