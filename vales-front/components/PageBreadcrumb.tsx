import { Col, Row } from 'react-bootstrap'
import { PageMetaData } from '.'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

interface PageTitleProps {
	subName: string
	title: string
	backLink?: string
}

const PageBreadcrumb = ({ title, subName, backLink }: PageTitleProps) => {
	return (
		<>
			<PageMetaData title={title} />
			<Row className="row">
				<Col sm={12} className='d-flex justify-content-between align-items-center'>
					<div className="page-title-box">
						<Row>
							<Col>
								<h4 className="page-title">{title}</h4>
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="#">Inicio</Link>
									</li>
									<li className="breadcrumb-item active">{subName}</li>
								</ol>
							</Col>
						</Row>
					</div>
					{backLink && (
						<div>
							<Link to={backLink} className="btn btn-primary btn-sm d-flex align-items-center gap-1">
							 	<FaArrowLeft />
								<span>Volver</span>
							</Link>
						</div>
					)}
				</Col>
			</Row>
		</>
	)
}

export default PageBreadcrumb
