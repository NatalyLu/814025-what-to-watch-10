import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {State, AppDispatch} from '../types/state';

// Чтобы не переопределять типы в случае изменения хранилища,
// передадим в качестве типов значения AppDispatch и State соответственно
// TypedUseSelectorHook из документации к redux

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
