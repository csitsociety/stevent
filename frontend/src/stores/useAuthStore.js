import create from 'zustand';

const useAuthStore = create(set => ({
	isAuthenticated: false,
	username: null,

	login: username => set({ isAuthenticated: true, username }),
	logout: () => set({ isAuthenticated: false, username: null }),
}));

export default useAuthStore;
