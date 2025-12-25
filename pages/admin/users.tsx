import { ReactElement, useEffect, useState, useRef } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllUsers } from '../../libs/api/adminAPI'
import { UserFind } from '../../interface/_User'
import { AiOutlineSearch, AiOutlineFilter, AiOutlineReload, AiOutlineLeft, AiOutlineRight, AiOutlineDown, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

const MultiSelect = ({ label, options, selectedValues, onChange, placeholder }: { 
    label: string, 
    options: { id: string, label: string }[], 
    selectedValues: string[], 
    onChange: (values: string[]) => void, 
    placeholder: string 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (id: string) => {
        if (selectedValues.includes(id)) {
            onChange(selectedValues.filter(v => v !== id));
        } else {
            onChange([...selectedValues, id]);
        }
    };

    return (
        <div className="space-y-2 relative" ref={containerRef}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <div 
                className={`w-full px-4 py-2 rounded-lg border flex items-center justify-between cursor-pointer bg-white text-sm transition-all ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="truncate flex-1 text-slate-700">
                    {selectedValues.length > 0 
                        ? `${selectedValues.length} đã chọn`
                        : placeholder}
                </div>
                <AiOutlineDown size={12} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto animate-fade-in-up custom-scrollbar">
                    {selectedValues.length > 0 && (
                        <div className="sticky top-0 z-10 p-2 border-b border-slate-100 flex flex-wrap gap-1.5 bg-slate-50/95 backdrop-blur-sm max-h-[100px] overflow-y-auto custom-scrollbar">
                            {selectedValues.map(valId => {
                                const opt = options.find(o => o.id === valId);
                                if (!opt) return null;
                                return (
                                    <span key={valId} className="inline-flex items-center px-1.5 py-0.5 bg-white border border-blue-100 text-blue-600 rounded text-[10px] font-bold shadow-sm animate-fade-in-right">
                                        {opt.label}
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleOption(valId);
                                            }}
                                            className="ml-1 hover:text-red-500 transition-colors"
                                        >
                                            <AiOutlineClose size={8} />
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    )}
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-xs text-slate-400 italic">Không có lựa chọn nào</div>
                    ) : options.map(opt => (
                        <div 
                            key={opt.id}
                            className={`px-4 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors ${selectedValues.includes(opt.id) ? 'bg-blue-50/50' : ''}`}
                            onClick={() => toggleOption(opt.id)}
                        >
                            <span className={`text-sm ${selectedValues.includes(opt.id) ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}>{opt.label}</span>
                            {selectedValues.includes(opt.id) && <AiOutlineCheck size={14} className="text-blue-600" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const AdminUsers = () => {
    const [users, setUsers] = useState<UserFind[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 15;

    // Filter states
    const [search, setSearch] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const fetchUsers = async (currentPage: number) => {
        setLoading(true);
        try {
            const filters: any = { page: currentPage, limit };
            if (search.trim()) filters.search = search.trim();
            if (selectedRoles.length > 0) filters.role = selectedRoles.join(',');

            const data = await getAllUsers(filters);
            setUsers(data.users || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchUsers(1);
    }

    const handleReset = () => {
        setSearch('');
        setSelectedRoles([]);
        setPage(1);
        setLoading(true);
        getAllUsers({ page: 1, limit }).then(data => {
            setUsers(data.users || []);
            setTotal(data.total || 0);
            setLoading(false);
        }).catch(() => setLoading(false));
    }

    const handlePageClick = (event: { selected: number }) => {
        const newPage = event.selected + 1;
        setPage(newPage);
        fetchUsers(newPage);
    };

    const pageCount = Math.ceil(total / limit) || 1;

    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Quản lý người dùng</h1>
            
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
                <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tìm kiếm</label>
                        <div className="relative">
                            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                placeholder="Username hoặc Email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <MultiSelect 
                        label="Vai trò"
                        placeholder="Tất cả vai trò"
                        options={[
                            { id: 'admin', label: 'Admin' },
                            { id: 'user', label: 'User' },
                            { id: 'mod', label: 'Moderator' }
                        ]}
                        selectedValues={selectedRoles}
                        onChange={setSelectedRoles}
                    />

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
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center text-xl"
                            title="Làm mới"
                        >
                            <AiOutlineReload />
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Username</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Vai trò</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400">Đang tải dữ liệu...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400">Không tìm thấy người dùng nào</td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-500 text-xs font-mono">{user._id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{user.username}</td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 
                                            user.role === 'mod' ? 'bg-purple-100 text-purple-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors font-semibold text-xs mr-2">Sửa</button>
                                        <button className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors font-semibold text-xs">Khóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                    Hiển thị {users.length} trong tổng số {total} người dùng
                </div>
            )}
        </div>
    )
}

AdminUsers.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminUsers

