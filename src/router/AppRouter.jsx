import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    // const authSatuts = 'not-authenticated'; // 'authenticated'  //  'not-authenticated'

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <>
            <Routes>
                {
                    // (authSatuts === 'not-authenticated')
                    (status === 'not-authenticated')
                        ? (
                            <>
                                <Route path='auth/*' element={<LoginPage />} />
                                <Route path='/*' element={<Navigate to={'auth/login'} />} />
                            </>
                        )
                        : (
                            <>
                                <Route path='/' element={<CalendarPage />} />
                                <Route path='/*' element={<Navigate to={'/'} />} />
                            </>
                        )
                }




            </Routes>
        </>
    );
}