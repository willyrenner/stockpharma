import { useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { CLIENT_ID, REDIRECT_URI, SUAP_URL, SCOPE } from "../settings";
import { SuapClient } from "../client";

const Welcome = () => {
  const { auth } = usePage().props; 
  const suapClient = new SuapClient(SUAP_URL, CLIENT_ID, REDIRECT_URI, SCOPE);

  useEffect(() => {
    if (auth?.user) {
      window.location.href = route("dashboard");
    }
  }, [auth]);

  const handleSuapLogin = () => {
    suapClient.login();
  };

  return (
    <>
      <Head title="StockPharma - Controle de Medicamentos" />
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              StockPharma
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Seja Bem-Vindo</p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href={route("login")}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Entrar
            </Link>
            <Link
              href={route("register")}
              className="w-full px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-md text-center hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrar-se
            </Link>
            <a
              onClick={handleSuapLogin}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md text-center cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Fazer Login Suap
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
