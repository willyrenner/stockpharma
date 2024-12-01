import { Head, Link } from '@inertiajs/react';

const Welcome = () => {
    return (
        <>
            <Head title="StockPharma - Controle de Medicamentos" />
            <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 flex items-center justify-center">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            StockPharma
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Seja Bem-Vindo
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Link
                            href={route('login')}
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Entrar
                        </Link>
                        <Link
                            href={route('register')}
                            className="w-full px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-md text-center hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Registrar-se
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
