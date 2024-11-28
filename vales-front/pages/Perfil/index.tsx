import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";

import { snakeToCapitalizedWords } from "@/utils";
import { formatDateStr } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import usuarioService from "../../../common/services/usuarioService";
import { useAuthContext } from "../../../context";
import ClientLevel from "../../../components/ClientLevel";

const Perfil = () => {
	const { removeSession } = useAuthContext();
	const { data: user, isLoading } = useQuery({
		queryKey: ["perfil"],
		queryFn: () => usuarioService.me(),
	})

	if(isLoading) return <div>Cargando...</div>
	if(!user) return <div>No hay datos</div>

	const data = user.data;

  return (
    <>
      <Row className="mt-4">
        <Col xs={12}>
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="dastone-profile">
                <Row>
                  <Col lg={4} className="align-self-center mb-3 mb-lg-0">
                    <div className="dastone-profile-main">
                      <div className="dastone-profile_user-detail">
                        <h5 className="dastone-user-name">
                          {data.nombres} {data.apellidoPaterno}{" "}
                          {data.apellidoMaterno} ({data.usuario})
                        </h5>
                        <p className="mb-0 dastone-user-name-post">
                          {snakeToCapitalizedWords(data.rol)}
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={4} className="ms-auto align-self-center">
                    <ul className="list-unstyled personal-detail mb-0">
                      <li className="">
                        <i className="ti ti-mobile me-2 text-secondary font-16 align-middle"></i>{" "}
                        <b> Teléfono </b> : {data.telefono}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-email text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Email </b> : {data.email}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-world text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> DNI </b> : {data.dni}
                      </li>
                    </ul>
                  </Col>
                  <Col lg={4} className="ms-auto align-self-center">
                    <ul className="list-unstyled personal-detail mb-0">
                      <li className="">
                        <i className="ti ti-package me-2 text-secondary font-16 align-middle"></i>{" "}
                        <b> Estado </b> : {snakeToCapitalizedWords(data.estado)}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-calendar text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Creado </b> : {formatDateStr(data.createdAt)}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-check-box text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Correo verificado </b> :{" "}
                        {data.emailVerifiedAt ? "Sí" : "No"}
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="danger" onClick={removeSession}>
                Cerrar sesión
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {data.rol === "CLIENTE" && (
        <Row className="mt-4">
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle>Mis puntos</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="dastone-profile">
                  <Row>
                    <Col lg={6} className="ms-auto align-self-center">
                      <ul className="list-unstyled personal-detail mb-0">
                        <li className="">
                          <i className="ti ti-money me-2 text-secondary font-16 align-middle"></i>{" "}
                          <b> Total de puntos </b> : {data.puntosCanjeados + data.puntosDisponibles}
                        </li>
                        <li className="mt-2">
                          <i className="ti ti-money text-secondary font-16 align-middle me-2"></i>{" "}
                          <b> Puntos canjeados </b> : {data.puntosCanjeados}
                        </li>
                        <li className="mt-2">
                          <i className="ti ti-money text-secondary font-16 align-middle me-2"></i>{" "}
                          <b> Puntos disponibles </b> : {data.puntosDisponibles}
                        </li>
                      </ul>
                    </Col>
                    <Col lg={6} className="ms-auto align-self-center">
                      <ul className="list-unstyled personal-detail mb-0">
                        <li className="">
                          <i className="ti ti-wallet me-2 text-secondary font-16 align-middle"></i>{" "}
                          <b> Nivel </b> :{" "}
                          <ClientLevel value={data.nivel} />
                        </li>
                        <li className="mt-2">
                          <i className="ti ti-user text-secondary font-16 align-middle me-2"></i>{" "}
                          <b> Tipo de cliente </b> : {snakeToCapitalizedWords(data.tipoCliente)}
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Perfil;
