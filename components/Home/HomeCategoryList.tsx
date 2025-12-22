import Link from 'next/link';
import React from 'react';
import { Category } from '../../interface/_Category';
import { FaBook, FaDragon, FaGhost, FaHeart, FaHistory, FaMagic, FaUserSecret } from 'react-icons/fa';
import { GiBroadsword, GiCompass, GiFloatingCrystal, GiGalaxy, GiMagicPortal, GiPunch, GiSwordman } from 'react-icons/gi';

interface HomeCategoryListProps {
    categories: Category[];
}

// Helper to map category names/slugs to icons
const getIcon = (slug: string) => {
    const iconProps = { size: 24 };
    let Icon: any = FaBook; // Default

    if (slug.includes('tien-hiep')) Icon = GiFloatingCrystal;
    else if (slug.includes('huyen-huyen')) Icon = FaDragon;
    else if (slug.includes('kiem-hiep')) Icon = GiSwordman;
    else if (slug.includes('lich-su')) Icon = FaHistory;
    else if (slug.includes('do-thi')) Icon = FaBook;
    else if (slug.includes('vong-du')) Icon = GiGalaxy;
    else if (slug.includes('khoa-huyen')) Icon = GiMagicPortal;
    else if (slug.includes('he-thong')) Icon = GiCompass;
    else if (slug.includes('dii-gioi')) Icon = GiBroadsword;
    else if (slug.includes('ngon-tinh')) Icon = FaHeart;
    else if (slug.includes('dam-my')) Icon = FaUserSecret;
    else if (slug.includes('linh-di')) Icon = FaGhost;

    return <Icon {...iconProps} />;
}

const HomeCategoryList: React.FC<HomeCategoryListProps> = ({ categories }) => {
    if (!categories || categories.length === 0) return null;

    return (
        <div className="w-full py-6">
            <div className="flex items-center gap-2 mb-4">
                <span className='h-6 w-1 bg-primary-500 rounded-full block'></span>
                <h2 className='text-xl font-bold text-gray-800 uppercase tracking-wide'>Thể Loại Truyện</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((cate, index) => (
                    <Link legacyBehavior href={`/tonghop/${cate.slug}`} key={index} passHref>
                        <a className="group flex items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-primary-500 group-hover:text-white flex items-center justify-center transition-colors duration-300 mr-3">
                                {getIcon(cate.slug || '')}
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors first-letter:uppercase">
                                {cate.cate}
                            </span>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeCategoryList;
