import { EstadoUsuario, RolUsuario } from "./constants"

export type User = {
	id: number
	apellidoPaterno: string
	apellidoMaterno: string
	nombres: string
	dni: string
	email: string
	telefono: string
	usuario: string
	contrasena: string
	token: string
	rol: RolUsuario
	estado: EstadoUsuario
	emailVerifiedAt: string | null
	entityId: number | null
  dependencyId: number | null
	createdAt: string
	updatedAt: string
}

export type AuthContextType = {
	user: User | undefined
	isAuthenticated: boolean
	saveSession: (session: User) => void
	removeSession: () => void
}
