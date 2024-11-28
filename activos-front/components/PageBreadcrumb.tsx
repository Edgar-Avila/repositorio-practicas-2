import { Button, Col, Row } from 'react-bootstrap'
import { PageMetaData } from ".";
import { Link, useNavigate } from 'react-router-dom'

import { FiCalendar, FiDownload } from "react-icons/fi";

interface PageTitleProps {
  subName: string;
  title: string;
}

const PageBreadcrumb = ({ title, subName }: PageTitleProps) => {
  const router = useNavigate(); // next/router

  function handleGoBack() {
    // 💡 Verify if previous page exists before using router.back
    const hasPreviousPage = window.history.length > 1;

    if (hasPreviousPage) {
      router(-1);
    } else {
      // fallback to a meaningful route.
      router('/menumain')
    }
  }
  return (
    <>
      <PageMetaData title={title} />
      <Row className="row">
        <Col sm={12}>
          <div className="page-title-box">
            <Row>
              <Col>
                <h4 className="page-title">{title}</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Trazabilidad</Link>
                  </li>
                  <li className="breadcrumb-item active">{subName}</li>
                </ol>
              </Col>
              <div className="col-auto align-self-center d-flex gap-1">
                <Button onClick={handleGoBack} className="btn btn-sm btn-primary">
                  <i
                    className="fas fa-arrow-left me-2 align-self-center icon-xs" />
                </Button>
              </div>

            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PageBreadcrumb;
