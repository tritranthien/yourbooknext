import { ReactElement, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getPendingNovels, approveNovel, rejectNovel } from '../../libs/api/novelAPI'
import { SerVerNovel } from '../../interface/_Novel'
import { AiOutlineReload, AiOutlineLeft, AiOutlineRight, AiOutlineCheck, AiOutlineClose, AiOutlineEye } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import Link from 'next/link'

const NovelApproval = () => {
    const [novels, setNovels] = useState<SerVerNovel[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 20;

    const fetchPending = useCallback(async (currentPage: number) => {
        setLoading(true);
        try {
            const data = await getPendingNovels(currentPage);
            setNovels(data.novels || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Failed to fetch pending novels", error);
            toast.error("Không thể tải danh sách truyện chờ duyệt");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPending(page);
    }, [fetchPending, page]);

    const handleApprove = async (id: string, title: string) => {
        if (!window.confirm(`Bạn có chắc muốn duyêt truyện "${title}"?`)) return;
        try {
            await approveNovel(id);
            toast.success("Đã duyệt truyện thành công");
            fetchPending(page);
        } catch (error) {
            toast.error("Lỗi khi duyệt truyện");
        }
    }

    const handleReject = async (id: string, title: string) => {
        if (!window.confirm(`Bạn có chắc muốn TỪ CHỐI (Xóa) truyện "${title}"?`)) return;
        try {
            await rejectNovel(id);
            toast.error("Đã từ chối và xóa truyện");
            fetchPending(page);
        } catch (error) {
            toast.error("Lỗi khi từ chối truyện");
        }
    }

    const handlePageClick = (event: { selected: number }) => {
        setPage(event.selected + 1);
    };

    const pageCount = Math.ceil(total / limit) || 1;

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Duyệt Truyện Mới</h1>
                <button 
                    onClick={() => fetchPending(page)}
                    className="p-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <AiOutlineReload className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-slate-700 dark:text-slate-300">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-xs uppercase tracking-wider font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Truyện</th>
                                <th className="px-6 py-4">Tác giả / Thể loại</th>
                                <th className="px-6 py-4">Người đăng</th>
                                <th className="px-6 py-4">Ngày đăng</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                            <span className="text-slate-400 font-medium">Đang tải dữ liệu...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : novels.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-40">
                                            <AiOutlineCheck size={48} className="text-green-500" />
                                            <span className="text-slate-500 font-bold text-lg">Tất cả đã được duyệt sạch!</span>
                                            <p className="text-sm">Không có truyện nào đang chờ.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : novels.map((novel) => (
                                <tr key={novel._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center min-w-[250px]">
                                            <div className="w-12 h-16 bg-slate-100 rounded-lg mr-4 overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative">
                                                {novel.image ? (
                                                    <Image src={novel.image} alt={novel.title} layout="fill" objectFit="cover" unoptimized className="group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors line-clamp-1">{novel.title}</span>
                                                <span className="text-[10px] text-slate-400 font-mono mt-1">ID: {novel._id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {(novel.author as any)?.name || 'N/A'}
                                            </span>
                                            <span className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded w-fit font-bold">
                                                {(novel.category as any)?.cate || 'Uncategorized'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{(novel.poster as any)?.username || 'System'}</span>
                                            <span className="text-[11px] text-slate-400">{(novel.poster as any)?.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                                        {new Date(novel.createdAt).toLocaleDateString()} <br/>
                                        {new Date(novel.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/truyen/${novel.slug}`} target="_blank">
                                                <a className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all" title="Xem trước">
                                                    <AiOutlineEye size={20} />
                                                </a>
                                            </Link>
                                            <button 
                                                onClick={() => handleReject(novel._id, novel.title)}
                                                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                title="Từ chối"
                                            >
                                                <AiOutlineClose size={20} />
                                            </button>
                                            <button 
                                                onClick={() => handleApprove(novel._id, novel.title)}
                                                className="p-2 bg-green-500 text-white hover:bg-green-600 rounded-lg shadow-lg shadow-green-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                                                title="Duyệt"
                                            >
                                                <AiOutlineCheck size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!loading && total > limit && (
                <div className="mt-8">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<AiOutlineRight />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel={<AiOutlineLeft />}
                        forcePage={page - 1}
                        containerClassName="flex items-center justify-center gap-1 list-none select-none"
                        pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium text-sm"
                        activeLinkClassName="!bg-blue-600 !text-white !border-blue-600 shadow-lg shadow-blue-200 dark:shadow-none"
                        previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        disabledLinkClassName="opacity-30 cursor-not-allowed"
                    />
                </div>
            )}
            
            {!loading && total > 0 && (
                <div className="mt-4 text-center text-slate-400 text-sm font-medium">
                    Hiển thị {novels.length} truyện trong tổng số {total} chờ duyệt
                </div>
            )}
        </div>
    )
}

NovelApproval.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default NovelApproval
