import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Chaplist from '../../../../components/popup/Chaplist';
import Settings from '../../../../components/popup/Settings';
import { SerVerChap } from '../../../../interface/_Chap';
import { getChap } from '../../../../libs/api/novelAPI';
import { getSiteSettings } from '../../../../libs/api/settingsAPI';

interface SSGProps {
    params: {
        chap: number,
        slug: string
    }
}

interface SSRRES {
    thisChap: SerVerChap,
    slug: string,
}

const ChapIndex: React.FC<SSRRES> = ({ slug, thisChap }: SSRRES) => {
    const router = useRouter();
    const [show, setShow] = useState<number>(-1);
    const [fontSize, setFontSize] = useState('text-[20px]');
    const [stringFont, setStringFont] = useState('font-reading-lora');
    const [themse, setThemse] = useState({
        bg: 'bg-[#f4f1ea]', // Soft paper color
        color: 'text-gray-900'
    });
    const [customFonts, setCustomFonts] = useState<{name: string, url: string}[]>([]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSiteSettings();
                if (data && data.customFonts) {
                    setCustomFonts(data.customFonts);
                }
            } catch (error) {
                console.error("Failed to fetch custom fonts", error);
            }
        };
        fetchSettings();
    }, []);

    const [breakSentence, setBreakSentence] = useState(false);
    const [lineHeight, setLineHeight] = useState(1.8);
    const [paragraphSpacing, setParagraphSpacing] = useState(16);
    const [paragraphIndent, setParagraphIndent] = useState(true);
    const [visibleMarkerIndices, setVisibleMarkerIndices] = useState<number[]>([]);

    const READER_SETTINGS_KEY = 'reader-settings-v1';

    // Load settings on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem(READER_SETTINGS_KEY);
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings.fontSize) setFontSize(settings.fontSize);
                if (settings.stringFont) setStringFont(settings.stringFont);
                if (settings.themse) setThemse(settings.themse);
                if (typeof settings.breakSentence === 'boolean') setBreakSentence(settings.breakSentence);
                if (settings.lineHeight) setLineHeight(settings.lineHeight);
                if (settings.paragraphSpacing) setParagraphSpacing(settings.paragraphSpacing);
                if (typeof settings.paragraphIndent === 'boolean') setParagraphIndent(settings.paragraphIndent);
            } catch (e) {
                console.error("Failed to parse saved settings", e);
            }
        }
    }, []);

    // Save settings on change
    useEffect(() => {
        const settings = {
            fontSize,
            stringFont,
            themse,
            breakSentence,
            lineHeight,
            paragraphSpacing,
            paragraphIndent
        };
        localStorage.setItem(READER_SETTINGS_KEY, JSON.stringify(settings));
    }, [fontSize, stringFont, themse, breakSentence, lineHeight, paragraphSpacing, paragraphIndent]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const updateMarker = () => {
            const paras = document.querySelectorAll('.reading-para');
            const visibleIndices: number[] = [];
            const viewHeight = window.innerHeight;

            paras.forEach((p, idx) => {
                const rect = p.getBoundingClientRect();
                
                // If the paragraph is significantly visible in the viewport
                if (rect.top < viewHeight * 0.9 && rect.bottom > viewHeight * 0.1) {
                    visibleIndices.push(idx);
                }
            });

            setVisibleMarkerIndices(visibleIndices);
        };

        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateMarker, 500); // Faster update for multiple highlights
        };

        window.addEventListener('scroll', handleScroll);
        updateMarker(); 
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [thisChap.content, breakSentence, paragraphSpacing, paragraphIndent, stringFont, lineHeight]);

    const settingThemse = (themse: { bg: string, color: string }) => {
        setThemse(themse);
    }
    const settingFontSize = (fontsize: string) => {
        setFontSize(fontsize);
    }
    const settingFont = (font: string) => {
        setStringFont(font);
    }

    const formatContent = (content: string) => {
        if (!content) return '';
        if (breakSentence) {
            // Add a single newline after characters that typically end a sentence, 
            // but ONLY if there isn't already a newline there (preserve paragraph breaks).
            return content.replace(/([.?!])\s+/g, (match, p1) => {
                if (match.includes('\n')) return match;
                return p1 + '\n';
            });
        }
        return content;
    }

    const customBgColor = themse.bg.startsWith('custom-[') ? themse.bg.match(/\[(.*?)\]/)?.[1] : null;
    const customTextColor = themse.color.startsWith('text-[') ? themse.color.match(/\[(.*?)\]/)?.[1] : null;

    // Accurate font size extraction for inline style
    const numericFontSize = parseInt(fontSize.match(/\d+/)?.[0] || '20');

    return (
        <div 
            className={`min-h-screen w-full transition-colors duration-500 ${customBgColor ? '' : themse.bg} ${customTextColor ? '' : themse.color}`}
            style={{
                backgroundColor: customBgColor || undefined,
                color: customTextColor || undefined
            }}
        >
            <style>{`
                ${customFonts.map(font => `
                    @font-face {
                        font-family: '${font.name}';
                        src: url('${font.url}');
                    }
                `).join('\n')}
            `}</style>
            
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-10 w-full bg-white/10 backdrop-blur-md border-b border-gray-900/5">
                <div className="container py-3 flex items-center justify-between">
                    <Link legacyBehavior passHref href={`/truyen/${slug}`}>
                        <a className="group flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                            <IoIosArrowBack className="group-hover:-translate-x-1 transition-transform" />
                            <span>Quay lại truyện</span>
                        </a>
                    </Link>
                    <div className="hidden md:block text-sm font-reading-lora italic truncate max-w-[300px]">
                        {thisChap.novel.title}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShow(1)}
                            className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            title="Cài đặt"
                        >
                            <IoIosSettings className="text-xl opacity-70" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container max-w-5xl py-12 md:py-20">
                {/* Chapter Header */}
                <header className="mb-16 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-black/5 text-xs font-reading-lora font-bold opacity-60">
                        Chương {thisChap.chap}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-reading-lora font-bold mb-6 tracking-tight leading-tight">
                        {thisChap.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-xs font-medium opacity-40 uppercase tracking-[0.2em]">
                        <span>{thisChap.poster?.username}</span>
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        <span>{format(parseISO(thisChap.updatedAt), 'dd/MM/yyyy')}</span>
                    </div>
                </header>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mb-12 px-2">
                    <button
                        disabled={thisChap.chap <= 1}
                        onClick={() => { router.push(`/truyen/${slug}/${thisChap.chap - 1}`) }}
                        className="flex items-center gap-3 group disabled:opacity-20 transition-all"
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-current opacity-20 group-hover:opacity-100 transition-opacity">
                            <MdArrowBackIosNew className="text-xs" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">Trước</span>
                    </button>

                    <button
                        onClick={() => setShow(0)}
                        className="flex items-center gap-2 group px-6 py-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-all"
                    >
                        <AiOutlineUnorderedList className="text-lg opacity-60" />
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Mục lục</span>
                    </button>

                    <button
                        disabled={thisChap.chap == thisChap.novel.chapCount}
                        onClick={() => { router.push(`/truyen/${slug}/${thisChap.chap + 1}`) }}
                        className="flex items-center gap-3 group disabled:opacity-20 transition-all text-right"
                    >
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">Tiếp</span>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-current opacity-20 group-hover:opacity-100 transition-opacity">
                            <MdArrowForwardIos className="text-xs" />
                        </div>
                    </button>
                </div>

                {/* Chapter Content - FULL TEXT MODE */}
                <main className="relative">
                    <div 
                        className={`book-content mx-auto mb-20 select-text ${stringFont.startsWith('font-') ? stringFont : ''}`}
                        style={{ 
                            fontSize: `${numericFontSize}px`,
                            fontFamily: stringFont.startsWith('font-') ? undefined : stringFont,
                            lineHeight: lineHeight
                        }}
                    >
                        {formatContent(thisChap.content).split(/\n\s*\n/).filter(p => p.trim() !== '').map((para, idx) => (
                            <div 
                                key={idx} 
                                style={{ 
                                    marginBottom: `${paragraphSpacing}px`,
                                    textIndent: paragraphIndent ? '2em' : '0',
                                    whiteSpace: 'pre-wrap'
                                }}
                                className={`reading-para relative transition-all duration-1000 px-6 -mx-6 border-l-[1.5px] ${visibleMarkerIndices.includes(idx) ? 'bg-primary-500/[0.02] border-primary-500/30' : 'border-transparent'}`}
                                title={visibleMarkerIndices.includes(idx) ? 'Vùng đang đọc' : undefined}
                            >
                                {para.trim()}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-6 mb-20">
                        <button
                            disabled={thisChap.chap <= 1}
                            onClick={() => { router.push(`/truyen/${slug}/${thisChap.chap - 1}`) }}
                            className="flex flex-col items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 border border-black/5 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                                <MdArrowBackIosNew />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Chương trước</span>
                        </button>

                        <button
                            onClick={() => setShow(0)}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 border border-black/5 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                                <AiOutlineUnorderedList />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Mục lục</span>
                        </button>

                        <button
                            disabled={thisChap.chap == thisChap.novel.chapCount}
                            onClick={() => { router.push(`/truyen/${slug}/${thisChap.chap + 1}`) }}
                            className="flex flex-col items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 border border-black/5 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                                <MdArrowForwardIos />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Chương sau</span>
                        </button>
                    </div>
                </main>
            </div>

            {/* Floating Navigation Controls (Mobile) */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 md:hidden">
                <button onClick={() => setShow(0)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-black border border-gray-100">
                    <AiOutlineUnorderedList />
                </button>
                <button onClick={() => setShow(1)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl text-black border border-gray-100">
                    <IoIosSettings />
                </button>
            </div>

            {show == 0 && <Chaplist slug={slug} novel={thisChap.novel._id} closePopup={() => setShow(-1)} />}
            {show == 1 && (
                <Settings 
                    settingFont={settingFont} 
                    stringFont={stringFont} 
                    stringSize={fontSize} 
                    settingFontSize={settingFontSize} 
                    settingThemse={settingThemse} 
                    closePopup={() => setShow(-1)} 
                    breakSentence={breakSentence}
                    setBreakSentence={setBreakSentence}
                    lineHeight={lineHeight}
                    setLineHeight={setLineHeight}
                    paragraphSpacing={paragraphSpacing}
                    setParagraphSpacing={setParagraphSpacing}
                    paragraphIndent={paragraphIndent}
                    setParagraphIndent={setParagraphIndent}
                />
            )}
        </div>
    );
};

export const getServerSideProps = async ({ params }: SSGProps) => {
    const { slug, chap } = params;
    const thisChap = await getChap(slug, chap);
    if (!thisChap._id) {
        return {
            redirect: {
                permanent: false,
                destination: "/page404",
            },
            props: {}
        }
    }
    return {
        props: {
            slug,
            thisChap
        }
    }
}

export default ChapIndex;
