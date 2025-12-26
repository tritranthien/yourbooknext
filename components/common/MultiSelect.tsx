import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineDown } from 'react-icons/ai';

interface MultiSelectProps {
    label: string;
    options: { id: string, label: string }[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder: string;
    className?: string;
    creatable?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ 
    label, 
    options, 
    selectedValues, 
    onChange, 
    placeholder,
    className = "",
    creatable = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
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

    const filteredOptions = options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showCreateOption = creatable && searchTerm && !options.some(opt => opt.label.toLowerCase() === searchTerm.toLowerCase());

    return (
        <div className={`space-y-2 relative ${className}`} ref={containerRef}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
            <div 
                className={`w-full px-4 py-2 rounded-lg border flex items-center justify-between cursor-pointer bg-white dark:bg-slate-800 transition-all ${isOpen ? 'ring-2 ring-primary-500/20 border-primary-500 shadow-lg shadow-primary-500/5' : 'border-slate-200 dark:border-slate-700'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="truncate flex-1 text-slate-700 dark:text-slate-200 font-medium text-sm">
                    {selectedValues.length > 0 
                        ? `${selectedValues.length} đã chọn`
                        : placeholder}
                </div>
                <AiOutlineDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl z-[100] max-h-80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Search Input */}
                    <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                        <input 
                            autoFocus
                            type="text"
                            className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200"
                            placeholder="Tìm kiếm hoặc thêm mới..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {/* Selected Tags Section Preview in list */}
                        {selectedValues.length > 0 && !searchTerm && (
                            <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-1.5 bg-slate-50/50 dark:bg-slate-800/30">
                                {selectedValues.map(valId => {
                                    const opt = options.find(o => o.id === valId);
                                    const label = opt ? opt.label : valId;
                                    return (
                                        <span key={valId} className="inline-flex items-center px-2 py-1 bg-white dark:bg-slate-700 border border-primary-100 dark:border-primary-900/50 text-primary-600 dark:text-primary-400 rounded-lg text-[10px] font-bold shadow-sm">
                                            {label}
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleOption(valId);
                                                }}
                                                className="ml-1.5 hover:text-red-500 transition-colors"
                                            >
                                                <AiOutlineClose size={10} />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {showCreateOption && (
                            <div 
                                className="px-6 py-4 hover:bg-primary-50 dark:hover:bg-primary-900/10 flex items-center justify-between cursor-pointer border-b border-slate-100 dark:border-slate-700 group transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(searchTerm);
                                    setSearchTerm('');
                                }}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mb-0.5">Thêm nhãn mới</span>
                                    <span className="text-sm text-primary-600 dark:text-primary-400 font-bold">"{searchTerm}"</span>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <AiOutlineDown className="-rotate-90" size={12} />
                                </div>
                            </div>
                        )}

                        {filteredOptions.length === 0 && !showCreateOption ? (
                            <div className="px-6 py-8 text-center">
                                <p className="text-sm text-slate-400 dark:text-slate-500 italic">Không tìm thấy lựa chọn nào</p>
                            </div>
                        ) : (
                            <div className="py-2">
                                {filteredOptions.map(opt => (
                                    <div 
                                        key={opt.id}
                                        className={`px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between cursor-pointer transition-colors ${selectedValues.includes(opt.id) ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                                        onClick={() => toggleOption(opt.id)}
                                    >
                                        <span className={`text-sm ${selectedValues.includes(opt.id) ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>{opt.label}</span>
                                        {selectedValues.includes(opt.id) && <AiOutlineCheck size={16} className="text-primary-600 dark:text-primary-400" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
