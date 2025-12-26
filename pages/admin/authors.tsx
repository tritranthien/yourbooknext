import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllAuthors, storeNewAuthor, updateAuthor, deleteAuthor, getNovelsByAuthor } from '../../libs/api/authorAPI'
import { upLoadPoster } from '../../libs/api/uploadFile'
import { toast } from 'react-toastify'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineUser, AiOutlineClose, AiOutlineWarning, AiOutlineBook, AiOutlineCamera, AiOutlineSearch, AiOutlineFilter, AiOutlineReload } from 'react-icons/ai'
import Image from 'next/image'
import debounce from 'lodash.debounce'
import { useCallback } from 'react'

const AdminAuthors = () => {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchName, setSearchName] = useState('');
    const [searchNovel, setSearchNovel] = useState('');
    
    // Create/Edit Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [des, setDes] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Delete Confirmation Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState<any>(null);
    const [relatedNovels, setRelatedNovels] = useState<any[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    // Hover Novels logic
    const [hoveredAuthorId, setHoveredAuthorId] = useState<string | null>(null);
    const [authorNovelsCache, setAuthorNovelsCache] = useState<Record<string, any[]>>({});
    const [fetchingAuthors, setFetchingAuthors] = useState<Record<string, boolean>>({});

    const handleAuthorHover = async (authorId: string) => {
        setHoveredAuthorId(authorId);
        if (!authorNovelsCache[authorId] && !fetchingAuthors[authorId]) {
            setFetchingAuthors(prev => ({ ...prev, [authorId]: true }));
            try {
                const novels = await getNovelsByAuthor(authorId);
                setAuthorNovelsCache(prev => ({ ...prev, [authorId]: novels }));
            } catch (error) {
                console.error("Error fetching author novels:", error);
            } finally {
                setFetchingAuthors(prev => ({ ...prev, [authorId]: false }));
            }
        }
    };

    const fetchAuthors = useCallback(async (name?: string, novel?: string) => {
        try {
            setLoading(true);
            const data = await getAllAuthors(name, novel);
            setAuthors(data);
        } catch (error) {
            console.error("Error fetching authors:", error);
            toast.error("Lỗi khi tải danh sách tác giả");
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetch = useCallback(
        debounce((name: string, novel: string) => {
            fetchAuthors(name, novel);
        }, 500),
        [fetchAuthors]
    );

    useEffect(() => {
        debouncedFetch(searchName, searchNovel);
    }, [searchName, searchNovel, debouncedFetch]);

    const handleResetFilters = () => {
        setSearchName('');
        setSearchNovel('');
    }

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
            setPreviewUrl(author.image || null);
        } else {
            setEditData(null);
            setName('');
            setSlug('');
            setDes('');
            setPreviewUrl(null);
        }
        setImageFile(null);
        setIsModalOpen(true);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let finalImageUrl = previewUrl;

            // If there's a new file, upload it first
            if (imageFile) {
                const formData = new FormData();
                formData.append('poster', imageFile);
                const uploadRes = await upLoadPoster(formData);
                if (uploadRes.secure_url) {
                    finalImageUrl = uploadRes.secure_url;
                }
            }

            const authorData = { 
                name, 
                slug, 
                des, 
                image: finalImageUrl || undefined
            };

            if (editData) {
                await updateAuthor(editData._id, authorData);
                toast.success("Cập nhật thành công");
            } else {
                await storeNewAuthor(authorData);
                toast.success("Thêm mới thành công");
            }
            setIsModalOpen(false);
            fetchAuthors();
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra");
        } finally {
            setIsSubmitting(false);
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

    if (loading) return <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">Đang tải dữ liệu tác giả...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
                    <AiOutlineUser className="mr-3 text-indigo-500" /> Quản lý tác giả
                </h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none font-semibold"
                >
                    <AiOutlinePlus className="mr-2" size={20} /> Thêm tác giả
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8 mt-2 transition-colors">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                            <AiOutlineSearch className="mr-2" /> Tìm theo tên tác giả
                        </label>
                        <input 
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Nhập tên tác giả..."
                            className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                            <AiOutlineFilter className="mr-2" /> Tìm theo tên truyện
                        </label>
                        <input 
                            type="text"
                            value={searchNovel}
                            onChange={(e) => setSearchNovel(e.target.value)}
                            placeholder="Nhập tên tác phẩm..."
                            className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />
                    </div>
                    <button 
                        onClick={handleResetFilters}
                        className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-bold flex items-center justify-center min-w-[140px]"
                    >
                        <AiOutlineReload className="mr-2" /> Làm mới
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Ảnh</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Tên tác giả</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Slug</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center whitespace-nowrap">Số truyện</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mô tả</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {authors.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">Chưa có tác giả nào trong hệ thống</td>
                                </tr>
                            ) : authors.map((author) => (
                                <tr key={author._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 relative bg-slate-50 dark:bg-slate-800">
                                            {author.image ? (
                                                <Image src={author.image} layout="fill" objectFit="cover" alt={author.name} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                                    <AiOutlineUser size={24} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 relative">
                                        <div 
                                            className="font-semibold text-slate-700 dark:text-slate-200 cursor-help hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                                            onMouseEnter={() => handleAuthorHover(author._id)}
                                            onMouseLeave={() => setHoveredAuthorId(null)}
                                        >
                                            {author.name}
                                        </div>
                                        {hoveredAuthorId === author._id && (
                                            <div className="absolute left-full top-0 ml-4 z-50 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 origin-left transition-all animate-fade-in-right transition-colors">
                                                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center">
                                                    <AiOutlineBook className="mr-2 text-indigo-500" size={14} /> Tác phẩm ({authorNovelsCache[author._id]?.length || 0})
                                                </h4>
                                                {fetchingAuthors[author._id] && !authorNovelsCache[author._id] ? (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">Đang tải...</span>
                                                    </div>
                                                ) : authorNovelsCache[author._id]?.length > 0 ? (
                                                    <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                        {authorNovelsCache[author._id].map((novel: any) => (
                                                            <li key={novel._id} className="text-[13px] text-slate-600 dark:text-slate-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-start group/item">
                                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 group-hover/item:bg-indigo-400 mt-1.5 mr-2.5 shrink-0 transition-colors" />
                                                                {novel.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-xs text-slate-400 dark:text-slate-500 italic py-2">Chưa có tác phẩm nào</div>
                                                )}
                                                
                                                {/* Tooltip arrow */}
                                                <div className="absolute top-6 -left-2 w-4 h-4 bg-white dark:bg-slate-900 border-l border-b border-slate-100 dark:border-slate-800 rotate-45" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded font-mono text-[11px] font-bold uppercase tracking-tighter transition-colors">
                                            {author.slug}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-full font-bold text-sm transition-colors ${author.novelCount > 0 ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 opacity-50'}`}>
                                            {author.novelCount || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm italic truncate max-w-[300px] transition-colors">
                                        {author.des || 'Chưa có mô tả'}
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        {author.editable !== false && (
                                            <>
                                                <button 
                                                    onClick={() => handleOpenModal(author)}
                                                    className="inline-flex items-center justify-center w-9 h-9 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all mr-1"
                                                    title="Sửa"
                                                >
                                                    <AiOutlineEdit size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => startDeleteProcess(author)}
                                                    disabled={isDeleting}
                                                    className="inline-flex items-center justify-center w-9 h-9 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all disabled:opacity-50"
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
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-lg p-8 shadow-2xl border border-white/20 dark:border-slate-800 transition-colors">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                {editData ? 'Cập nhật tác giả' : 'Tạo mới tác giả'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Họ tên</label>
                                    <input 
                                        type="text" required
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (!editData) setSlug(generateSlug(e.target.value));
                                        }}
                                        placeholder="Tên tác giả..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Slug</label>
                                    <input 
                                        type="text" required
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono text-sm text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        placeholder="slug-duong-dan"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Ảnh tác giả</label>
                                <div className="flex items-center gap-6">
                                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-inner bg-slate-50 dark:bg-slate-800 group transition-colors">
                                        {previewUrl ? (
                                            <Image src={previewUrl} layout="fill" objectFit="cover" alt="Preview" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                                <AiOutlineUser size={48} />
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <AiOutlineCamera className="text-white" size={32} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Thay đổi ảnh đại diện</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">Hỗ trợ JPG, PNG. Dung lượng tối đa 2MB.</p>
                                        <button 
                                            type="button"
                                            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                                            className="mt-2 px-4 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors border border-indigo-100 dark:border-indigo-800/50"
                                        >
                                            Chọn ảnh từ máy tính
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Giới thiệu ngắn</label>
                                <textarea 
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                    value={des}
                                    onChange={(e) => setDes(e.target.value)}
                                    placeholder="Một vài dòng giới thiệu về tác giả..."
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all">Hủy bỏ</button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        editData ? 'Lưu thay đổi' : 'Tạo tác giả'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Advanced Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-10 shadow-2xl animate-in fade-in zoom-in duration-300 border border-slate-100 dark:border-slate-800 transition-colors">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <AiOutlineWarning size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Cảnh báo: Tác giả có tác phẩm</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md transition-colors">
                                Tác giả <span className="font-bold text-slate-700 dark:text-slate-200">&quot;{authorToDelete?.name}&quot;</span> đang gắn liền với <span className="font-bold text-indigo-600 dark:text-indigo-400">{relatedNovels.length}</span> tác phẩm. Bạn cần xử lý các tác phẩm này trước khi xóa.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 mb-8 max-h-48 overflow-y-auto border border-slate-100 dark:border-slate-800 transition-colors">
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                                <AiOutlineBook className="mr-2" /> Danh sách tác phẩm liên quan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {relatedNovels.map(novel => (
                                    <div key={novel._id} className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 truncate transition-colors">
                                        • {novel.title}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button 
                                onClick={() => finalDelete('unlink')}
                                disabled={isDeleting}
                                className="w-full py-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold rounded-2xl transition-all flex items-center justify-center border border-blue-100 dark:border-blue-900/50 disabled:opacity-50"
                            >
                                1. Chuyển tác phẩm sang &quot;Không tên tác giả&quot; &amp; Xóa tác giả
                            </button>
                            <button 
                                onClick={() => finalDelete('delete')}
                                disabled={isDeleting}
                                className="w-full py-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold rounded-2xl transition-all flex items-center justify-center border border-red-100 dark:border-red-900/50 disabled:opacity-50"
                            >
                                2. Xóa VĨNH VIỄN toàn bộ tác phẩm & Xóa tác giả
                            </button>
                            <button 
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setAuthorToDelete(null);
                                }}
                                className="w-full py-4 text-slate-400 dark:text-slate-500 font-bold hover:text-slate-600 dark:hover:text-slate-300 transition-all underline underline-offset-4"
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
