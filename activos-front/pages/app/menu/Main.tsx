import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import logoSM from "@/assets/images/logo-sm.png";
import { MenuItemType, MOBILE_MENU_ITEMS } from "@/common/menu";
import { UserService } from "@/common/api/client.ts";
import { useEffect, useState } from "react";
import { getMenuItems, getMobileMenuItems } from "@/common/helpers";

const MenuMain = () => {
  const [items, setItems] = useState<MenuItemType[]>();

  useEffect(() => {
    getMobileMenuItems()
    .then((menuItems) => setItems(menuItems))
  }, []);

  return (
    <>
      <Row>
        <Col lg={12} className="ps-0 pe-0">
          <ListGroup>
            <ListGroupItem as={"li"} className="bg-primary d-flex">
              {" "}
              <img
                alt="Logo"
                className="light"
                src={logoSM}
                style={{ height: "40px", width: "40px" }}
              />
              &nbsp;<h2 className="text-white">Trazabilidad</h2>
            </ListGroupItem>
            {(items || []).map((t) => {
              const Icon = t.icon;
              return (
                <ListGroupItem
                  as="li"
                  key={t.key}
                  className="bg-primary d-flex justify-content-between align-items-center"
                >
                  <Link className="text-white" to={t.url ?? "#"}>
                    {Icon && (
                      <span>
                        <Icon size={18} className="me-2" />
                      </span>
                    )}
                    {t.label}
                  </Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default MenuMain;
