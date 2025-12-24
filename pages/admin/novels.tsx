import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllNovels, updateNovel, deleteNovel } from '../../libs/api/adminAPI'
import { getAllCates } from '../../libs/api/category'
import { getAllAuthors } from '../../libs/api/authorAPI'
import { SerVerNovel } from '../../interface/_Novel'
import { Category } from '../../interface/_Category'
import { Author } from '../../interface/_Author'
import { AiOutlineSearch, AiOutlineFilter, AiOutlineReload, AiOutlineLeft, AiOutlineRight, AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

const AdminNovels = () => {
    const [novels, setNovels] = useState<SerVerNovel[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const limit = 15;

    // Modal Edit state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingNovel, setEditingNovel] = useState<SerVerNovel | null>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        status: '',
        category: '',
        author: '',
        description: ''
    });

    const fetchNovels = async (currentPage: number) => {
        setLoading(true);
        try {
            const filters: any = { page: currentPage, limit };
            if (title.trim()) filters.title = title.trim();
            if (categoryId) filters.categoryId = categoryId;
            if (status) filters.status = status;

            const data = await getAllNovels(filters);
            setNovels(data.novels || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Failed to fetch novels", error);
            toast.error("Không thể tải danh sách truyện");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [catesData, authorsData] = await Promise.all([
                    getAllCates(),
                    getAllAuthors()
                ]);
                setCategories(catesData || []);
                setAuthors(authorsData || []);
            } catch (error) {
                console.error("Failed to fetch metadata", error);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        fetchNovels(1);
    }, []);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchNovels(1);
    }

    const handleReset = () => {
        setTitle('');
        setCategoryId('');
        setStatus('');
        setPage(1);
        setLoading(true);
        getAllNovels({ page: 1, limit }).then(data => {
            setNovels(data.novels || []);
            setTotal(data.total || 0);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    const handlePageClick = (event: { selected: number }) => {
        const newPage = event.selected + 1;
        setPage(newPage);
        fetchNovels(newPage);
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Bạn có chắc muốn xóa truyện "${name}"? Thao tác này không thể hoàn tác.`)) {
            try {
                await deleteNovel(id);
                toast.success("Đã xóa truyện thành công");
                fetchNovels(page);
            } catch (error) {
                toast.error("Lỗi khi xóa truyện");
            }
        }
    }

    const openEditModal = (novel: SerVerNovel) => {
        setEditingNovel(novel);
        setEditForm({
            title: novel.title,
            status: novel.status,
            category: typeof novel.category === 'object' ? (novel.category as any)._id : novel.category,
            author: typeof novel.author === 'object' ? (novel.author as any)._id : novel.author,
            description: novel.description || ''
        });
        setIsEditModalOpen(true);
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingNovel) return;

        try {
            await updateNovel(editingNovel._id, editForm);
            toast.success("Cập nhật truyện thành công");
            setIsEditModalOpen(false);
            fetchNovels(page);
        } catch (error) {
            toast.error("Lỗi khi cập nhật truyện");
        }
    }

    const pageCount = Math.ceil(total / limit) || 1;

    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Quản lý Truyện</h1>
            
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
                <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tìm kiếm tên</label>
                        <div className="relative">
                            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                placeholder="Nhập tên truyện..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thể loại</label>
                        <select 
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Tất cả thể loại</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.cate}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</label>
                        <select 
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="continue">Đang ra</option>
                            <option value="completed">Hoàn thành</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-md shadow-blue-100"
                        >
                            <AiOutlineFilter className="mr-2" /> Lọc
                        </button>
                        <button 
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                            title="Làm mới"
                        >
                            <AiOutlineReload />
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Tên truyện</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Thể loại</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Tác giả</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-center">Số chương</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Trạng thái</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Lượt xem</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right min-w-[120px]">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">Đang tải dữ liệu...</td>
                            </tr>
                        ) : novels.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">Không tìm thấy truyện nào</td>
                            </tr>
                        ) : novels.map((novel) => (
                            <tr key={novel._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center min-w-[200px]">
                                        <div className="w-10 h-14 bg-slate-100 rounded mr-3 overflow-hidden flex-shrink-0">
                                            {novel.image ? (
                                                <img src={novel.image} alt={novel.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                                            )}
                                        </div>
                                        <div className="font-medium text-slate-800 line-clamp-2">{novel.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full uppercase font-bold">
                                        {typeof novel.category === 'object' ? (novel.category as any)?.cate : 'Chưa phân loại'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 text-sm whitespace-nowrap">{typeof novel.author === 'object' ? (novel.author as any)?.name : 'Ẩn danh'}</td>
                                <td className="px-6 py-4 text-center font-semibold text-slate-700">{(novel as any).chapCount || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                        novel.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {novel.status === 'completed' ? 'Hoàn thành' : 'Đang ra'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 text-right font-mono text-sm whitespace-nowrap">{novel.views?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <button 
                                        onClick={() => openEditModal(novel)}
                                        className="inline-flex items-center justify-center text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors font-medium text-xs mr-1"
                                        title="Sửa"
                                    >
                                        <AiOutlineEdit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(novel._id, novel.title)}
                                        className="inline-flex items-center justify-center text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors font-medium text-xs"
                                        title="Xóa"
                                    >
                                        <AiOutlineDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            {!loading && total > limit && (
                <div className="mt-8 flex justify-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<AiOutlineRight />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel={<AiOutlineLeft />}
                        forcePage={page - 1}
                        containerClassName="flex items-center gap-1 list-none select-none"
                        pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-medium text-sm"
                        activeLinkClassName="!bg-blue-600 !text-white !border-blue-600 shadow-md shadow-blue-100"
                        previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all ml-2"
                        nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all mr-2"
                        disabledLinkClassName="opacity-30 cursor-not-allowed hover:bg-white border-slate-100"
                        breakLinkClassName="w-10 h-10 flex items-center justify-center text-slate-400"
                    />
                </div>
            )}
            
            {!loading && total > 0 && (
                <div className="mt-4 text-center text-slate-400 text-sm font-medium italic">
                    Hiển thị {novels.length} trong tổng số {total} truyện
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-slate-100 my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">Sửa thông tin truyện</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Tên truyện</label>
                                    <input 
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Tác giả</label>
                                    <select 
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={editForm.author}
                                        onChange={(e) => setEditForm({...editForm, author: e.target.value})}
                                        required
                                    >
                                        <option value="">Chọn tác giả</option>
                                        {authors.map(author => (
                                            <option key={author._id} value={author._id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Thể loại</label>
                                    <select 
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Chọn thể loại</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.cate}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Trạng thái</label>
                                    <select 
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        required
                                    >
                                        <option value="continue">Đang ra</option>
                                        <option value="completed">Hoàn thành</option>
                                        <option value="drop">Tạm ngưng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">Mô tả</label>
                                <textarea 
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

AdminNovels.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminNovels
