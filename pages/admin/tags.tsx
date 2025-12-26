import { ReactElement, useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllTags, createTag, updateTag, deleteTag } from '../../libs/api/tagAPI'
import { toast } from 'react-toastify'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineTag, AiOutlineClose } from 'react-icons/ai'

const AdminTags = () => {
    const [tags, setTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchTags = useCallback(async () => {
        try {
            const data = await getAllTags();
            setTags(data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách tag");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    const handleOpenModal = (tag: any = null) => {
        if (tag) {
            setEditData(tag);
            setName(tag.name);
            setDescription(tag.description || '');
        } else {
            setEditData(null);
            setName('');
            setDescription('');
        }
        setIsModalOpen(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editData) {
                await updateTag(editData._id, { name, description });
                toast.success("Cập nhật tag thành công");
            } else {
                await createTag({ name, description });
                toast.success("Thêm mới tag thành công");
            }
            setIsModalOpen(false);
            fetchTags();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Có lỗi xảy ra");
        }
    }

    const handleDelete = async (id: string, tagName: string) => {
        if (!confirm(`Bạn có chắc muốn xóa tag "${tagName}"?`)) return;
        try {
            await deleteTag(id);
            toast.success("Xóa tag thành công");
            fetchTags();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi xóa tag");
        }
    }

    if (loading) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
                    <AiOutlineTag className="mr-3 text-indigo-500" /> Quản lý Tags
                </h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                >
                    <AiOutlinePlus className="mr-2" /> Thêm Tag mới
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Tên Tag</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Slug</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Mô tả</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {tags.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-400">Chưa có tag nào</td>
                            </tr>
                        ) : tags.map((tag) => (
                            <tr key={tag._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                                    <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded text-xs font-bold border border-indigo-100 dark:border-indigo-800/50">
                                        {tag.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-sm">{tag.slug}</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm italic">{tag.description || 'Không có mô tả'}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleOpenModal(tag)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tag._id, tag.name)}
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                {editData ? 'Chỉnh sửa Tag' : 'Thêm Tag mới'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Tên Tag</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="VD: Tu Tiên, Hệ Thống..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Mô tả (Không bắt buộc)</label>
                                <textarea 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all resize-none"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Mô tả ngắn về tag này..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
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

AdminTags.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminTags
