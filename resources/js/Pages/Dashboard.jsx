import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const Dashboard = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    StockPharma
                </h2>
            }
        >
            <Head title="Painel de Controle" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1>StockPharma</h1>
                            <p>Selecione uma opção:</p>
                            <div className="dashboard-buttons">
                                {/* Usando <Link> do Inertia para navegação */}
                                <Link
                                    href={route('cadastrarremedios')}
                                    className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Cadastrar Remédio
                                </Link>
                                <Link
                                    href={route('relatorioPedidos')}
                                    className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Relatório de Pedidos
                                </Link>
                                <Link
                                    href={route('remediosEstoque')}
                                    className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Remédios em Estoque
                                </Link>
                                <Link
                                    href={route('removerRemedio')}
                                    className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Remover Remédio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
