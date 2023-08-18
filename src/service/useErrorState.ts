import { create } from 'zustand';
import { ErrorEntity } from '../model/ErrorEntity';

interface ErrorState {
    error: ErrorEntity | undefined;
    setError: (error: ErrorEntity | undefined) => void;
}

const useErrorStore = create<ErrorState>((set) => ({
    error: undefined,
    setError: (error) => set({ error }),
}));

export default useErrorStore;