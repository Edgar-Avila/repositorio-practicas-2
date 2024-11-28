
export type AuthContextType = {
	user: RUsuario | undefined
	isAuthenticated: boolean
	saveSession: (session: RUsuario) => void
	removeSession: () => void
}
