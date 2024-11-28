import { Usuario } from "@/common/api";
import { UserService } from "@/common/api/client";
import { PageBreadcrumb } from "@/components";
import { getAuthUser, useAuthContext } from "@/context";
import { TileLayer, Marker, Popup } from "leaflet";
import { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "react-bootstrap";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MapContainer } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { ModalConfirm } from "../helpers/ModalConfirm";
import { useToggle } from "@/hooks";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Perfil: React.FC<Props> = () => {
  const sessionUser = getAuthUser();
  const { removeSession } = useAuthContext();
  const [user, setUser] = useState<Usuario>();
  const { isOpen, toggle } = useToggle();
  const navigate = useNavigate();

  const logout = () => {
    removeSession();
    navigate("/auth/login");
  };

  useEffect(() => {
    if (!sessionUser) return;
    const getUser = async () => {
      const res = await UserService.getUsuario(`${sessionUser.id}`);
      setUser(res.data);
    };

    getUser();
  }, []);

  return (
    <>
      <PageBreadcrumb title="Perfil" subName="Perfil" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="dastone-profile">
                <Row>
                  <Col sm={4} className="align-self-center mb-3 mb-lg-0">
                    <div className="dastone-profile-main">
                      <div className="dastone-profile-main-pic">
                        <FaUserCircle className="text-muted" size={80} />
                      </div>
                      <div className="dastone-profile_user-detail">
                        <h5 className="dastone-user-name">{user?.nombre}</h5>
                        <p className="mb-0 dastone-user-name-post">
                          {sessionUser?.rolNombre}
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col sm={4} className="ms-auto align-self-center">
                    <ul className="list-unstyled personal-detail mb-0">
                      <li className="">
                        <i className="ti ti-package me-2 text-secondary font-16 align-middle"></i>{" "}
                        <b> Código trabajador </b> :{" "}
                        {user?.codigoTrabajador || "No registrado"}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-mobile text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Celular </b> :{" "}
                        {user?.numeroCelular || "No registrado"}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-car text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Puesto </b> : {user?.puesto || "No registrado"}
                      </li>
                    </ul>
                  </Col>

                  <Col sm={4} className="ms-auto align-self-center">
                    <ul className="list-unstyled personal-detail mb-0">
                      <li className="mt-2">
                        <i className="ti ti-email text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Correo </b> : {user?.correo || "No registrado"}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-world text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Área </b> : {user?.area}
                      </li>
                      <li className="mt-2">
                        <i className="ti ti-package text-secondary font-16 align-middle me-2"></i>{" "}
                        <b> Código SAP </b> :{" "}
                        {user?.coD_ID_SAP || "No registrado"}
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={toggle}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>
      <ModalConfirm
        isOpen={isOpen}
        alert_message="¿Está seguro de que desea cerrar sesión?"
        toggle={toggle}
        title={'Cerrar sesión'}
        confirm={logout}
      />
    </>
  );
};

export default Perfil;
