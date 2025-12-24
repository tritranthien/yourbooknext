import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllAuthors, storeNewAuthor, updateAuthor, deleteAuthor } from '../../libs/api/authorAPI'
import { toast } from 'react-toastify'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineUser, AiOutlineClose, AiOutlineWarning, AiOutlineBook } from 'react-icons/ai'

const AdminAuthors = () => {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Create/Edit Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [des, setDes] = useState('');

    // Delete Confirmation Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState<any>(null);
    const [relatedNovels, setRelatedNovels] = useState<any[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchAuthors = async () => {
        try {
            const data = await getAllAuthors();
            setAuthors(data);
        } catch (error) {
            toast.error("Lỗi khi tải danh sách tác giả");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAuthors();
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

    const handleOpenModal = (author: any = null) => {
        if (author) {
            setEditData(author);
            setName(author.name);
            setSlug(author.slug);
            setDes(author.des || '');
        } else {
            setEditData(null);
            setName('');
            setSlug('');
            setDes('');
        }
        setIsModalOpen(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editData) {
                await updateAuthor(editData._id, { name, slug, des });
                toast.success("Cập nhật thành công");
            } else {
                await storeNewAuthor({ name, slug, des });
                toast.success("Thêm mới thành công");
            }
            setIsModalOpen(false);
            fetchAuthors();
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    }

    const startDeleteProcess = async (author: any) => {
        if (!window.confirm(`Bạn có chắc muốn xóa tác giả "${author.name}"?`)) return;
        
        setAuthorToDelete(author);
        setIsDeleting(true);
        try {
            const res = await deleteAuthor(author._id);
            if (res.hasNovels) {
                setRelatedNovels(res.novels);
                setIsDeleteModalOpen(true);
            } else {
                toast.success("Xóa tác giả thành công");
                fetchAuthors();
            }
        } catch (error) {
            toast.error("Lỗi khi xóa");
        } finally {
            setIsDeleting(false);
        }
    }

    const finalDelete = async (mode: string) => {
        if (!authorToDelete) return;
        setIsDeleting(true);
        try {
            await deleteAuthor(authorToDelete._id, mode);
            toast.success("Thực hiện thao tác thành công");
            setIsDeleteModalOpen(false);
            fetchAuthors();
        } catch (error) {
            toast.error("Thao tác thất bại");
        } finally {
            setIsDeleting(false);
        }
    }

    if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Đang tải dữ liệu tác giả...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center">
                    <AiOutlineUser className="mr-3 text-indigo-500" /> Quản lý tác giả
                </h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 font-semibold"
                >
                    <AiOutlinePlus className="mr-2" size={20} /> Thêm tác giả
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Tên tác giả</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Slug</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Số truyện</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Mô tả</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {authors.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">Chưa có tác giả nào trong hệ thống</td>
                                </tr>
                            ) : authors.map((author) => (
                                <tr key={author._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-700">{author.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded font-mono text-[11px] font-bold uppercase tracking-tighter">
                                            {author.slug}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-full font-bold text-sm ${author.novelCount > 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 opacity-50'}`}>
                                            {author.novelCount || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm italic truncate max-w-[300px]">
                                        {author.des || 'Chưa có mô tả'}
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        {!['an-danh', 'khong-ten-tac-gia'].includes(author.slug) && (
                                            <>
                                                <button 
                                                    onClick={() => handleOpenModal(author)}
                                                    className="inline-flex items-center justify-center w-9 h-9 text-blue-600 hover:bg-blue-50 rounded-xl transition-all mr-1"
                                                    title="Sửa"
                                                >
                                                    <AiOutlineEdit size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => startDeleteProcess(author)}
                                                    disabled={isDeleting}
                                                    className="inline-flex items-center justify-center w-9 h-9 text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                                                    title="Xóa"
                                                >
                                                    <AiOutlineDelete size={20} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl border border-white/20">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {editData ? 'Cập nhật tác giả' : 'Tạo mới tác giả'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Họ tên</label>
                                    <input 
                                        type="text" required
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-300"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (!editData) setSlug(generateSlug(e.target.value));
                                        }}
                                        placeholder="Tên tác giả..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Slug</label>
                                    <input 
                                        type="text" required
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono text-sm text-slate-500 bg-slate-50/50"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        placeholder="slug-duong-dan"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Giới thiệu ngắn</label>
                                <textarea 
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-medium text-slate-600 placeholder:text-slate-300"
                                    value={des}
                                    onChange={(e) => setDes(e.target.value)}
                                    placeholder="Một vài dòng giới thiệu về tác giả..."
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Hủy bỏ</button>
                                <button type="submit" className="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                    {editData ? 'Lưu thay đổi' : 'Tạo tác giả'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Advanced Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <AiOutlineWarning size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Cảnh báo: Tác giả có tác phẩm</h2>
                            <p className="text-slate-500 mt-2 max-w-md">
                                Tác giả <span className="font-bold text-slate-700">"{authorToDelete?.name}"</span> đang gắn liền với <span className="font-bold text-indigo-600">{relatedNovels.length}</span> tác phẩm. Bạn cần xử lý các tác phẩm này trước khi xóa.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-6 mb-8 max-h-48 overflow-y-auto border border-slate-100">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                                <AiOutlineBook className="mr-2" /> Danh sách tác phẩm liên quan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {relatedNovels.map(novel => (
                                    <div key={novel._id} className="bg-white px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 truncate">
                                        • {novel.title}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button 
                                onClick={() => finalDelete('unlink')}
                                disabled={isDeleting}
                                className="w-full py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-2xl transition-all flex items-center justify-center border border-blue-100 disabled:opacity-50"
                            >
                                1. Chuyển tác phẩm sang "Ẩn danh" & Xóa tác giả
                            </button>
                            <button 
                                onClick={() => finalDelete('delete')}
                                disabled={isDeleting}
                                className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-all flex items-center justify-center border border-red-100 disabled:opacity-50"
                            >
                                2. Xóa VĨNH VIỄN toàn bộ tác phẩm & Xóa tác giả
                            </button>
                            <button 
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setAuthorToDelete(null);
                                }}
                                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-all underline underline-offset-4"
                            >
                                Hủy bỏ thao tác
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

AdminAuthors.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminAuthors
