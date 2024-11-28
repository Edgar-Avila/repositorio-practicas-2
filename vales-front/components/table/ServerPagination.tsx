import clsx from 'clsx'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export type PageSize = {
	text: string
	value: number
}

type PaginationProps = {
	pageSize: number
	activePage: number
  setActivePage: (activePage: number) => void
	setPageSize: (pageSize: number) => void
	total: number
	sizePerPageList?: PageSize[]
}

const ServerPagination = ({
  activePage,
  setActivePage,
	setPageSize,
	sizePerPageList = [
		{ text: '10', value: 10 },
		{ text: '20', value: 20 },
		{ text: '50', value: 50 },
		{ text: '100', value: 100 },
	],
	pageSize,
	total,
}: PaginationProps) => {
	const pageCount = Math.ceil(total / pageSize)
	/**
	 * get filter pages
	 */
	const filterPages = useCallback(
		(visiblePages: number[]) => {
			return visiblePages.filter((page: number) => page <= pageCount)
		},
		[pageCount]
	)

	/**
	 * handle visible pages
	 */
	const getVisiblePages = useCallback(
		(page: number, total: number) => {
			if (total < 7) {
				return filterPages([1, 2, 3, 4, 5, 6])
			} else {
				if (page % 5 >= 0 && page > 4 && page + 2 < total) {
					return [1, page - 1, page, page + 1, total]
				} else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
					return [1, total - 3, total - 2, total - 1, total]
				} else {
					return [1, 2, 3, 4, 5, total]
				}
			}
		},
		[filterPages]
	)

	/**
	 * handle page change
	 * @param page - current page
	 * @returns
	 */
	const changePage = (page: number) => {
		if (page === activePage) {
			return
		}

		const visiblePages = getVisiblePages(page, pageCount)
		setVisiblePages(filterPages(visiblePages))

    setActivePage(page)
	}

	useEffect(() => {
		const visiblePages = getVisiblePages(0, pageCount)
		setVisiblePages(visiblePages)
	}, [pageCount, getVisiblePages])

	const [visiblePages, setVisiblePages] = useState<number[]>(
		getVisiblePages(0, pageCount)
	)

	return (
		<div className="d-lg-flex align-items-center text-center pb-1">
			{sizePerPageList.length > 0 && (
				<div className="d-inline-block me-3">
					<label className="me-1">Mostrar:</label>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value))
						}}
						className="form-select d-inline-block w-auto">
						{(sizePerPageList || []).map((pageSize, idx) => {
							return (
								<option key={idx.toString()} value={pageSize.value}>
									{pageSize.text}
								</option>
							)
						})}
					</select>
				</div>
			)}

			<span className="me-3">
				Página{' '}
				<strong>
					{activePage} de {pageCount}
				</strong>{' '}
			</span>

			<span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
				<label>Ir a página: </label>
				<input
					type="number"
					value={activePage}
					min="1"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const page = e.target.value ? Number(e.target.value) : 1
						setActivePage(page)
					}}
					className="form-control w-25 ms-1 d-inline-block"
				/>
			</span>

			<ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
				<li
					key="prevpage"
					className={clsx('page-item', 'paginate_button', 'previous', {
						disabled: activePage === 1,
					})}
					onClick={() => {
						if (activePage === 1) return
						changePage(activePage - 1)
					}}>
					<Link to="" className="page-link">
						<FiChevronLeft />
					</Link>
				</li>
				{(visiblePages || []).map((page, index, array) => {
					return array[index - 1] + 1 < page ? (
						<Fragment key={page.toString()}>
							<li className="page-item disabled d-none d-xl-inline-block">
								<Link to="" className="page-link">
									...
								</Link>
							</li>
							<li
								className={clsx('page-item', 'd-none', 'd-xl-inline-block', {
									active: activePage === page,
								})}
								onClick={() => changePage(page)}>
								<Link to="" className="page-link">
									{page}
								</Link>
							</li>
						</Fragment>
					) : (
						<li
							key={page.toString()}
							className={clsx('page-item', 'd-none', 'd-xl-inline-block', {
								active: activePage === page,
							})}
							onClick={() => changePage(page)}>
							<Link to="" className="page-link">
								{page}
							</Link>
						</li>
					)
				})}
				<li
					key="nextpage"
					className={clsx('page-item', 'paginate_button', 'next', {
						disabled: activePage === pageCount,
					})}
					onClick={() => {
						if (activePage === pageCount) return
						changePage(activePage + 1)
					}}>
					<Link to="" className="page-link">
						<FiChevronRight />
					</Link>
				</li>
			</ul>
		</div>
	)
}

export { ServerPagination }
