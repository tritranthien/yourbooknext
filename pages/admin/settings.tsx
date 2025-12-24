import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getSiteSettings, updateSiteSettings } from '../../libs/api/settingsAPI'
import { toast } from 'react-toastify'
import { AiOutlineSetting, AiOutlineComment, AiOutlineRead, AiOutlineGlobal } from 'react-icons/ai'

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        logo: '',
        banner: '',
        commentEnabled: true,
        commentPreApproval: false,
        defaultFont: 'Inter',
        defaultFontSize: 18,
        defaultNightMode: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSiteSettings();
                if (data) setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings", error);
                toast.error("Không thể tải cấu hình");
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSiteSettings(settings);
            toast.success("Cập nhật cấu hình thành công");
        } catch (error) {
            toast.error("Lỗi khi lưu cấu hình");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8">Đang tải cấu hình...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <AiOutlineSetting className="mr-3" /> Cài đặt hệ thống
            </h1>

            <form onSubmit={handleSave} className="space-y-8">
                {/* General Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center border-b pb-4">
                        <AiOutlineGlobal className="mr-2 text-blue-500" /> Cấu hình chung
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 block">Tên website</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={settings.siteName}
                                onChange={(e)=>setSettings({...settings, siteName: e.target.value})}
                                placeholder="Nhập tên website..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 block">Logo URL</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={settings.logo}
                                onChange={(e)=>setSettings({...settings, logo: e.target.value})}
                                placeholder="/logo.png"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-600 block">Banner URL</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={settings.banner}
                                onChange={(e)=>setSettings({...settings, banner: e.target.value})}
                                placeholder="/banner.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Comment Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center border-b pb-4">
                        <AiOutlineComment className="mr-2 text-green-500" /> Cấu hình bình luận
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-slate-800">Bật bình luận</h4>
                                <p className="text-xs text-slate-500">Cho phép người dùng để lại bình luận trên các chương truyện</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.commentEnabled}
                                    onChange={(e)=>setSettings({...settings, commentEnabled: e.target.checked})}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-slate-800">Duyệt trước khi hiển thị</h4>
                                <p className="text-xs text-slate-500">Mọi bình luận mới đều cần admin phê duyệt mới được công khai</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.commentPreApproval}
                                    onChange={(e)=>setSettings({...settings, commentPreApproval: e.target.checked})}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Reading Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center border-b pb-4">
                        <AiOutlineRead className="mr-2 text-purple-500" /> Cấu hình đọc truyện
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 block">Font chữ mặc định</label>
                            <select 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                value={settings.defaultFont}
                                onChange={(e)=>setSettings({...settings, defaultFont: e.target.value})}
                            >
                                <option value="Inter">Inter (Pixel-perfect)</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Merriweather">Merriweather (Serif - Easy to read)</option>
                                <option value="Outfit">Outfit</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 block">Kích thước chữ (px)</label>
                            <input 
                                type="number" 
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={settings.defaultFontSize}
                                onChange={(e)=>setSettings({...settings, defaultFontSize: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg md:col-span-2">
                            <div>
                                <h4 className="font-semibold text-slate-800">Chế độ ban đêm mặc định</h4>
                                <p className="text-xs text-slate-500">Tự động bật giao diện tối cho người đọc mới</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.defaultNightMode}
                                    onChange={(e)=>setSettings({...settings, defaultNightMode: e.target.checked})}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {saving ? 'Đang lưu...' : 'Lưu tất cả cấu hình'}
                    </button>
                </div>
            </form>
        </div>
    )
}

AdminSettings.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminSettings
