import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllCates, storeNewCate } from '../../libs/api/category'
import API, { getAuthHeader } from '../../libs/api/api'
import { toast } from 'react-toastify'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineTag } from 'react-icons/ai'

const AdminCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const fetchCategories = async () => {
        try {
            const data = await getAllCates();
            setCategories(data);
        } catch (error) {
            toast.error("Lỗi khi tải thể loại");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const generateSlug = (text: string) => {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/([^0-9a-z-\s])/g, '')
            .replace(/(\s+)/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    const handleOpenModal = (cate: any = null) => {
        if (cate) {
            setEditData(cate);
            setName(cate.cate);
            setSlug(cate.slug);
        } else {
            setEditData(null);
            setName('');
            setSlug('');
        }
        setIsModalOpen(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authHeader = getAuthHeader();
            if (editData) {
                await API.patch(`/category/${editData._id}`, { cate: name, slug }, authHeader);
                toast.success("Cập nhật thành công");
            } else {
                await storeNewCate({ cate: name, slug });
                toast.success("Thêm mới thành công");
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa thể loại này?")) return;
        try {
            const authHeader = getAuthHeader();
            await API.delete(`/category/${id}`, authHeader);
            toast.success("Xóa thành công");
            fetchCategories();
        } catch (error) {
            toast.error("Lỗi khi xóa");
        }
    }

    if (loading) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center">
                    <AiOutlineTag className="mr-3 text-pink-500" /> Quản lý thể loại
                </h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <AiOutlinePlus className="mr-2" /> Thêm thể loại
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase">Tên thể loại</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase">Slug</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {categories.map((cate) => (
                            <tr key={cate._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-800">{cate.cate}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{cate.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleOpenModal(cate)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(cate._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-in">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">
                            {editData ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Tên thể loại</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (!editData) setSlug(generateSlug(e.target.value));
                                    }}
                                    placeholder="VD: Tiên Hiệp"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Slug</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="tien-hiep"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    {editData ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

AdminCategories.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminCategories
