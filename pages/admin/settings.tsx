import { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getSiteSettings, updateSiteSettings } from '../../libs/api/settingsAPI'
import { upLoadPoster, upLoadFont } from '../../libs/api/uploadFile'
import { toast } from 'react-toastify'
import { AiOutlineSetting, AiOutlineComment, AiOutlineRead, AiOutlineGlobal, AiOutlineCloudUpload, AiOutlinePicture, AiOutlineClose, AiOutlineDelete, AiOutlineFontSize } from 'react-icons/ai'
import PosterPopup from '../../components/popup/PostersPopup'

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        logo: '',
        banner: '',
        commentEnabled: true,
        commentPreApproval: false,
        defaultFont: 'Inter',
        defaultFontSize: 18,
        defaultNightMode: false,
        customFonts: [] as { name: string, url: string }[]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Popup state
    const [openLibrary, setOpenLibrary] = useState(false);
    const [pickingType, setPickingType] = useState<'logo' | 'banner' | 'none'>('none');
    const [newFontName, setNewFontName] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSiteSettings();
                if (data) {
                    setSettings(prev => ({
                        ...prev,
                        ...data,
                        customFonts: data.customFonts || []
                    }));
                }
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        if (!e.target.files || !e.target.files[0]) return;
        
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('poster', file);

        const uploadToast = toast.loading(`Đang tải ${type === 'logo' ? 'logo' : 'banner'} lên...`);
        try {
            const res = await upLoadPoster(formData);
            if (res.secure_url) {
                setSettings({ ...settings, [type]: res.secure_url });
                toast.update(uploadToast, { render: "Tải ảnh thành công", type: "success", isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            toast.update(uploadToast, { render: "Tải ảnh thất bại", type: "error", isLoading: false, autoClose: 3000 });
        }
    }

    const handleChooseImage = (imgUrl: string) => {
        if (pickingType === 'logo') setSettings({ ...settings, logo: imgUrl });
        if (pickingType === 'banner') setSettings({ ...settings, banner: imgUrl });
        setOpenLibrary(false);
        setPickingType('none');
    }

    const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        if (!newFontName.trim()) {
            toast.error("Vui lòng nhập tên font trước khi upload");
            return;
        }

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('font', file);

        const uploadToast = toast.loading("Đang tải font lên...");
        try {
            const res = await upLoadFont(formData);
            if (res.secure_url) {
                const updatedFonts = [...(settings.customFonts || []), { name: newFontName, url: res.secure_url }];
                const updatedSettings = { 
                    ...settings, 
                    customFonts: updatedFonts 
                };
                
                setSettings(updatedSettings);
                setNewFontName('');
                
                // Auto save
                await updateSiteSettings(updatedSettings);
                toast.update(uploadToast, { render: "Thêm font thành công", type: "success", isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            console.error(error);
            toast.update(uploadToast, { render: "Tải font thất bại", type: "error", isLoading: false, autoClose: 3000 });
        }
    }

    const removeCustomFont = async (index: number) => {
        if (window.confirm('Bạn có chắc muốn xóa font này?')) {
            const newFonts = [...(settings.customFonts || [])];
            newFonts.splice(index, 1);
            
            const updatedSettings = { ...settings, customFonts: newFonts };
            setSettings(updatedSettings);
            
            // Auto save
            try {
                await updateSiteSettings(updatedSettings);
                toast.success("Đã xóa font");
            } catch (error) {
                toast.error("Lỗi khi lưu thay đổi");
            }
        }
    }

    if (loading) return <div className="p-8">Đang tải cấu hình...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <AiOutlineSetting className="mr-3" /> Cài đặt hệ thống
            </h1>

            <style>{`
                ${settings.customFonts?.map(font => `
                    @font-face {
                        font-family: '${font.name}';
                        src: url('${font.url}');
                    }
                `).join('\n') || ''}
            `}</style>

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
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-600 block">Logo Website</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden relative group">
                                    {settings.logo ? (
                                        <>
                                            <img src={settings.logo} className="w-full h-full object-contain" alt="Logo preview" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    type="button"
                                                    onClick={() => setSettings({...settings, logo: ''})}
                                                    className="p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                                >
                                                    <AiOutlineClose size={16} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <AiOutlinePicture className="text-slate-300 text-3xl" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1 w-full">
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                        value={settings.logo}
                                        onChange={(e)=>setSettings({...settings, logo: e.target.value})}
                                        placeholder="Nhập URL logo hoặc tải lên..."
                                    />
                                    <div className="flex gap-2">
                                        <button 
                                            type="button"
                                            onClick={() => { setPickingType('logo'); setOpenLibrary(true); }}
                                            className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
                                        >
                                            <AiOutlinePicture className="mr-1.5" /> Thư viện
                                        </button>
                                        <label className="flex-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer">
                                            <AiOutlineCloudUpload className="mr-1.5" /> Upload mới
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-600 block">Banner Website</label>
                            <div className="flex flex-col gap-4">
                                <div className="w-full h-32 md:h-40 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden relative group">
                                    {settings.banner ? (
                                        <>
                                            <img src={settings.banner} className="w-full h-full object-cover" alt="Banner preview" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    type="button"
                                                    onClick={() => setSettings({...settings, banner: ''})}
                                                    className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                                >
                                                    <AiOutlineClose size={20} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <AiOutlinePicture className="text-slate-300 text-4xl" />
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input 
                                        type="text" 
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                        value={settings.banner}
                                        onChange={(e)=>setSettings({...settings, banner: e.target.value})}
                                        placeholder="Nhập URL banner hoặc tải lên..."
                                    />
                                    <div className="flex gap-2 shrink-0">
                                        <button 
                                            type="button"
                                            onClick={() => { setPickingType('banner'); setOpenLibrary(true); }}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
                                        >
                                            <AiOutlinePicture className="mr-1.5" /> Thư viện
                                        </button>
                                        <label className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer">
                                            <AiOutlineCloudUpload className="mr-1.5" /> Upload mới
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Font Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center border-b pb-4">
                        <AiOutlineFontSize className="mr-2 text-pink-500" /> Quản lý Font chữ
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 block">Tên font mới</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    value={newFontName}
                                    onChange={(e)=>setNewFontName(e.target.value)}
                                    placeholder="Ví dụ: MyCustomFont"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 block">File Font (.ttf, .woff, .woff2)</label>
                                <label className={`flex items-center justify-center w-full px-4 py-2 rounded-lg border border-dashed border-blue-200 bg-blue-50 text-blue-700 font-semibold cursor-pointer hover:bg-blue-100 transition-colors ${!newFontName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <AiOutlineCloudUpload className="mr-2 text-xl" /> 
                                    {newFontName.trim() ? 'Chọn file & Upload' : 'Nhập tên font trước'}
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept=".ttf,.woff,.woff2" 
                                        onChange={handleFontUpload}
                                        disabled={!newFontName.trim()}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* List of Fonts */}
                        <div className="border rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-600">Tên Font</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600">URL Source</th>
                                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-800">Inter</td>
                                        <td className="px-4 py-3 text-slate-500 italic">System Default</td>
                                        <td className="px-4 py-3 text-right text-slate-400">Mặc định</td>
                                    </tr>
                                    <tr className="bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-800">Roboto</td>
                                        <td className="px-4 py-3 text-slate-500 italic">System Default</td>
                                        <td className="px-4 py-3 text-right text-slate-400">Mặc định</td>
                                    </tr>
                                    {settings.customFonts?.map((font, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-800">{font.name}</td>
                                            <td className="px-4 py-3 text-blue-600 truncate max-w-[200px]">
                                                <a href={font.url} target="_blank" rel="noreferrer" className="hover:underline">{font.url}</a>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button 
                                                    onClick={() => removeCustomFont(idx)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Xóa font"
                                                >
                                                    <AiOutlineDelete size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                {settings.customFonts?.map((font, idx) => (
                                    <option key={idx} value={font.name}>{font.name} (Custom)</option>
                                ))}
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
                        
                        {/* Font Preview */}
                        <div className="md:col-span-2 mt-4">
                            <label className="text-sm font-semibold text-slate-600 block mb-2">Xem trước hiển thị (Preview)</label>
                            <div className={`p-6 rounded-xl border border-slate-200 transition-colors ${settings.defaultNightMode ? 'bg-[#1a1a1a] text-[#e0e0e0]' : 'bg-white text-slate-800'}`}>
                                <p style={{ 
                                    fontFamily: settings.defaultFont, 
                                    fontSize: `${settings.defaultFontSize}px`,
                                    lineHeight: '1.6'
                                }}>
                                    "Cảnh giới cao nhất của sự mạnh mẽ là chấp nhận. Khi nào chúng ta có thể chấp nhận mọi việc xảy đến với mình, đó là lúc chúng ta mạnh mẽ nhất. Đọc sách không chỉ là để thu nạp kiến thức, mà còn là để rèn luyện tâm hồn."
                                </p>
                                <p className="mt-4 text-xs opacity-50 italic text-right">
                                    Font: {settings.defaultFont} | Size: {settings.defaultFontSize}px
                                </p>
                            </div>
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

            {openLibrary && (
                <PosterPopup 
                    choonseImage={handleChooseImage} 
                    closePopup={() => { setOpenLibrary(false); setPickingType('none'); }} 
                />
            )}
        </div>
    )
}

AdminSettings.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminSettings
