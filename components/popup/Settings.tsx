import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { IoIosSettings, IoMdColorFill, IoMdColorFilter } from 'react-icons/io'
import { FaWindowClose, FaFont } from 'react-icons/fa'
import { MdFormatSize, MdVerticalAlignBottom, MdLineWeight, MdFormatLineSpacing } from 'react-icons/md'
import { getSiteSettings } from '../../libs/api/settingsAPI'

interface ChapProps {
    closePopup: () => void,
    settingThemse: (thems: { bg: string, color: string }) => void,
    settingFontSize: (fz: string) => void,
    settingFont: (f: string) => void,
    stringFont: string,
    stringSize: string,
    breakSentence: boolean,
    setBreakSentence: (b: boolean) => void,
    lineHeight: number,
    setLineHeight: (lh: number) => void,
    paragraphSpacing: number,
    setParagraphSpacing: (ps: number) => void,
    paragraphIndent: boolean,
    setParagraphIndent: (pi: boolean) => void
}

const defaultFonts = [
    'font-reading-lora',
    'font-reading-merriweather',
    'font-sans',
    'font-serif',
    'font-outfit',
    'font-space-grotesk',
    'font-exo-2'
]

const colors = [
    { bg: 'bg-white', color: 'text-black', hex: '#ffffff', textHex: '#000000' },
    { bg: 'bg-[#FFE5DC]', color: 'text-black', hex: '#FFE5DC', textHex: '#000000' },
    { bg: 'bg-[#FFFEDC]', color: 'text-black', hex: '#FFFEDC', textHex: '#000000' },
    { bg: 'bg-[#E9FFDC]', color: 'text-black', hex: '#E9FFDC', textHex: '#000000' },
    { bg: 'bg-[#DCFFEA]', color: 'text-black', hex: '#DCFFEA', textHex: '#000000' },
    { bg: 'bg-[#DEDCFF]', color: 'text-black', hex: '#DEDCFF', textHex: '#000000' },
    { bg: 'bg-[#3D3D3D]', color: 'text-[#D4D4D4]', hex: '#3D3D3D', textHex: '#D4D4D4' },
]

const Settings: React.FC<ChapProps> = ({ closePopup, settingThemse, settingFont, settingFontSize, stringSize, stringFont, breakSentence, setBreakSentence, lineHeight, setLineHeight, paragraphSpacing, setParagraphSpacing, paragraphIndent, setParagraphIndent }: ChapProps) => {
    const [bgHex, setBgHex] = useState('#ffffff');
    const [textHex, setTextHex] = useState('#000000');
    const [customFonts, setCustomFonts] = useState<{ name: string, url: string }[]>([]);

    useEffect(() => {
        const fetchCustomFonts = async () => {
            try {
                const data = await getSiteSettings();
                if (data && data.customFonts) {
                    setCustomFonts(data.customFonts);
                }
            } catch (error) {
                console.error("Failed to load custom fonts", error);
            }
        };
        fetchCustomFonts();
    }, []);

    const currentSize = parseInt(stringSize.match(/\d+/)?.[0] || '20');

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        settingFontSize(`text-[${e.target.value}px]`);
    };

    const applyCustomTheme = (newBg?: string, newText?: string) => {
        const b = newBg || bgHex;
        const t = newText || textHex;
        settingThemse({ bg: `custom-[${b}]`, color: `text-[${t}]` });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <style>{`
                ${customFonts.map(font => `
                    @font-face {
                        font-family: '${font.name}';
                        src: url('${font.url}');
                    }
                `).join('\n')}
            `}</style>

            <div className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up`}>
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 font-outfit">
                        <IoIosSettings className="text-2xl text-primary-500 animate-spin-slow" />
                        Tùy chỉnh đọc truyện
                    </h2>
                    <button
                        onClick={closePopup}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600 shadow-sm"
                    >
                        <FaWindowClose className="text-2xl" />
                    </button>
                </div>

                <div className="px-8 py-8 h-[550px] overflow-y-auto custom-scrollbar">
                    {/* Preview Section */}
                    <div className="mb-10 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                            <IoMdColorFilter /> Mẫu hiển thị thực tế
                        </span>
                        <div
                            className={`p-8 rounded-xl transition-all duration-300 shadow-inner border border-black/5 min-h-[120px]`}
                            style={{
                                backgroundColor: bgHex,
                                color: textHex,
                                fontSize: `${currentSize}px`,
                                fontFamily: stringFont.startsWith('font-') ? undefined : stringFont,
                                lineHeight: lineHeight,
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            <div style={{ marginBottom: `${paragraphSpacing}px`, textIndent: paragraphIndent ? '2em' : '0' }}>Đoạn văn thứ nhất.{breakSentence ? '\n' : ' '}Câu tiếp theo trong đoạn.</div>
                            <div style={{ textIndent: paragraphIndent ? '2em' : '0' }}>Đoạn văn thứ hai. Khởi đầu một ý tưởng mới.</div>
                        </div>
                    </div>

                    {/* Font & Size Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <FaFont /> Phông chữ
                            </label>
                            <div className="relative">
                                <select
                                    value={stringFont}
                                    onChange={(e) => settingFont(e.target.value)}
                                    className="w-full h-14 pl-4 pr-10 bg-white border-2 border-gray-100 rounded-xl appearance-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 outline-none transition-all font-medium text-gray-700"
                                >
                                    <optgroup label="Phông hệ thống & Web fonts">
                                        {defaultFonts.map((f, i) => {
                                            const displayName = f === 'font-reading-lora' ? 'Lora (Serif sạch)' :
                                                f === 'font-reading-merriweather' ? 'Merriweather (Dày)' :
                                                    f === 'font-sans' ? 'Be Vietnam Pro (Tròn)' :
                                                        f === 'font-serif' ? 'Serif Truyền thống' :
                                                            f === 'font-outfit' ? 'Outfit (Hiện đại)' :
                                                                f === 'font-space-grotesk' ? 'Space Grotesk' :
                                                                    f === 'font-exo-2' ? 'Exo 2 (Mạnh mẽ)' : f;
                                            return <option key={i} value={f}>{displayName}</option>;
                                        })}
                                    </optgroup>

                                    {customFonts.length > 0 && (
                                        <optgroup label="Phông chữ tùy chỉnh (Upload)">
                                            {customFonts.map((font, i) => (
                                                <option key={`custom-${i}`} value={font.name}>{font.name}</option>
                                            ))}
                                        </optgroup>
                                    )}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <MdFormatSize /> Kích cỡ: {currentSize}px
                                </label>
                                <div className="flex gap-1">
                                    <button onClick={() => settingFontSize(`text-[${currentSize - 1}px]`)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">-</button>
                                    <button onClick={() => settingFontSize(`text-[${currentSize + 1}px]`)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">+</button>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="48"
                                value={currentSize}
                                onChange={handleFontSizeChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            />
                        </div>
                    </div>

                    {/* Experimental / Advanced Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <MdVerticalAlignBottom /> Tùy chỉnh dòng & câu
                            </label>
                            <div
                                onClick={() => setBreakSentence(!breakSentence)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${breakSentence ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-primary-200'}`}
                            >
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${breakSentence ? 'text-primary-900' : 'text-gray-700'}`}>Tự động ngắt câu</span>
                                    <span className="text-[10px] text-gray-400">Tạo dòng mới sau mỗi dấu câu</span>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${breakSentence ? 'bg-primary-500' : 'bg-gray-200'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${breakSentence ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <MdLineWeight /> Khoảng cách dòng: {lineHeight}
                                </label>
                            </div>
                            <input
                                type="range"
                                min="1.0"
                                max="3.0"
                                step="0.1"
                                value={lineHeight}
                                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            />
                        </div>
                    </div>

                    {/* Paragraph Spacing & Indent Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <MdFormatLineSpacing /> Khoảng cách đoạn văn: {paragraphSpacing}px
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="2"
                                value={paragraphSpacing}
                                onChange={(e) => setParagraphSpacing(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <MdVerticalAlignBottom /> Định dạng đoạn
                            </label>
                            <div
                                onClick={() => setParagraphIndent(!paragraphIndent)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${paragraphIndent ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-primary-200'}`}
                            >
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${paragraphIndent ? 'text-primary-900' : 'text-gray-700'}`}>Thụt lề đầu dòng</span>
                                    <span className="text-[10px] text-gray-400">Thụt vào 2 ký tự đầu đoạn</span>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${paragraphIndent ? 'bg-primary-500' : 'bg-gray-200'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${paragraphIndent ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Settings Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* Background Color Picker */}
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <IoMdColorFill /> Màu nền
                            </span>
                            <div className="flex flex-wrap gap-3 items-center">
                                {colors.slice(0, 5).map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            settingThemse(color);
                                            setBgHex(color.hex);
                                            setTextHex(color.textHex);
                                        }}
                                        className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-110 ${bgHex === color.hex ? 'border-primary-500 ring-2 ring-primary-50' : 'border-gray-100 shadow-sm'} ${color.bg}`}
                                    />
                                ))}
                                <div className="relative w-10 h-10 group">
                                    <input
                                        type="color"
                                        value={bgHex}
                                        onChange={(e) => { setBgHex(e.target.value); applyCustomTheme(e.target.value, textHex); }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div
                                        className={`w-full h-full rounded-full border-2 border-dashed flex items-center justify-center transition-all ${bgHex.startsWith('#') && !colors.some(c => c.hex === bgHex) ? 'border-primary-500' : 'border-gray-300 group-hover:border-primary-400'}`}
                                        style={{ backgroundColor: bgHex }}
                                    >
                                        <span className="text-lg font-bold opacity-30">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Color Picker */}
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <IoMdColorFill /> Màu chữ
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 flex items-center gap-3 bg-gray-50 border border-gray-100 p-2 rounded-xl">
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <input
                                            type="color"
                                            value={textHex}
                                            onChange={(e) => { setTextHex(e.target.value); applyCustomTheme(bgHex, e.target.value); }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div
                                            className="w-full h-full rounded-full border border-gray-200 shadow-sm flex items-center justify-center"
                                            style={{ backgroundColor: textHex }}
                                        >
                                            <span className="text-white text-xs mix-blend-difference font-bold">T</span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={textHex}
                                        onChange={(e) => { setTextHex(e.target.value); applyCustomTheme(bgHex, e.target.value); }}
                                        className="bg-transparent text-sm font-mono w-20 outline-none text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;