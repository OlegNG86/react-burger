import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../services/reducers/index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const customUseAppDispatch = useDispatch.withTypes<AppDispatch>()
export const customUseAppSelector = useSelector.withTypes<RootState>()