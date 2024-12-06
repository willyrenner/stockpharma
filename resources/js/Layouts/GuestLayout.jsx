import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div >
                <Link href="/" className='flex justify-center items-center'>
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
                <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6 text-center dark:text-white">
                    Stock Pharma
                </h2>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
