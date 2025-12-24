import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAdminStats } from '../../libs/api/adminAPI'
import { AiOutlineUser, AiOutlineBook } from 'react-icons/ai'

const AdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, novelCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div>Đang tải thống kê...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Tổng quan hệ thống</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4 text-2xl">
                        <AiOutlineUser />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Người dùng</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.userCount}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-4 text-2xl">
                        <AiOutlineBook />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Tổng số truyện</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.novelCount}</h3>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Các tính năng đang phát triển</h2>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 border-dashed text-center text-slate-400">
                    Sẽ có thêm các biểu đồ tăng trưởng và danh sách hoạt động mới nhất ở đây.
                </div>
            </div>
        </div>
    )
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
