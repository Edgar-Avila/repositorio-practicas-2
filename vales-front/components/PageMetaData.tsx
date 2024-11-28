import { Helmet } from 'react-helmet'

const PageMetaData = ({ title }: { title: string }) => {
	return (
		<Helmet>
			<title>{title} | Sistema de vales</title>
		</Helmet>
	)
}

export default PageMetaData
