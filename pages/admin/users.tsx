import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllUsers } from '../../libs/api/adminAPI'
import { UserFind } from '../../interface/_User'

const AdminUsers = () => {
    const [users, setUsers] = useState<UserFind[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <div>Đang tải danh sách người dùng...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Quản lý người dùng</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Username</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Vai trò</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-500 text-sm font-mono">{user._id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{user.username}</td>
                                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4">Sửa</button>
                                    <button className="text-red-600 hover:text-red-800 font-medium text-sm">Khóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

AdminUsers.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminUsers
