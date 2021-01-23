import create from 'zustand';

const useProfileStore = create(set => ({
	profile: undefined,

	setProfile: profile => set({ profile }),
	clearProfile: () => set({ profile: undefined }),
}));

export default useProfileStore;
