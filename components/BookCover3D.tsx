import Image from 'next/image';
import React from 'react';

interface BookCover3DProps {
    src: string;
    alt: string;
    className?: string; // wrapper classes for width/height
}

const BookCover3D: React.FC<BookCover3DProps> = ({ src, alt, className = "" }) => {
    return (
        <div className={`relative ${className} flex items-center justify-center pr-[10px]`}>
            {/* Perspective Container */}
            <div className="relative w-full h-[90%] group" style={{ perspective: '400px' }}> {/* Giảm perspective để cạnh trái ngắn lại rõ hơn */}

                {/* Shadow (Bóng đổ ra sau lưng sách) */}
                {/* <div
                    className="absolute top-[8%] left-[20%] w-[80%] h-[85%] bg-black/40 blur-md rounded-sm transition-all duration-500 ease-out group-hover:blur-xl group-hover:scale-105"
                    style={{
                        transform: 'rotateY(-25deg) translateZ(-40px) translateX(25px) skewY(-10deg)', // Đẩy ra sau và lệch phải
                        zIndex: -1,
                        opacity: 0.5
                    }}
                ></div> */}

                {/* Rotated Book Container */}
                <div
                    className="relative w-full h-full transition-transform duration-500 ease-out transform-style-3d group-hover:rotate-y-[-25deg] group-hover:translate-x-2"
                    style={{
                        transform: 'rotateY(-20deg)', // Tăng góc xoay
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* 1. FRONT COVER */}
                    <div className="absolute inset-0 bg-white shadow-xl overflow-hidden rounded-[1px] backface-hidden border-l-[1px] border-l-white/60 border-r-[1px] border-r-white/40">
                        <Image
                            src={src}
                            alt={alt}
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full"
                            priority
                        />
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 pointer-events-none"></div>
                        {/* Spine Highlight (White Inline Shadow) - Left */}
                        <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-r from-white/60 to-transparent pointer-events-none"></div>
                        {/* Right Edge Highlight */}
                        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>
                    </div>

                    {/* 2. SIDE PANEL (PAGES THICKNESS) - RIGHT SIDE */}
                    {/* Dịch ra ngoài (left: 100%) để nối tiếp với hình ảnh */}
                    <div
                        className="absolute top-[2%] left-[100%] bottom-[2%] w-[35%] bg-gray-200 z-[20]"
                        style={{
                            transformOrigin: 'left',
                            transform: 'rotateY(90deg)', // Xoay 90 độ ra phía sau để tạo độ dày
                            // Inside shadow nhẹ tạo chiều sâu, bỏ border line
                            boxShadow: 'inset 4px 0 8px rgba(0, 0, 0, 0.34)',
                        }}
                    >
                    </div>

                    {/* 3. HARD COVER BACK (Mặt sau bìa cứng) */}
                    {/* <div
                        className="absolute top-0 bottom-0 left-[91%] w-[2px] bg-gray-400"
                        style={{
                            transformOrigin: 'left',
                            transform: 'rotateY(90deg) translateZ(12px)', // Đẩy ra sau hết độ dày
                        }}
                    ></div> */}

                </div>
            </div>
        </div>
    );
};

export default BookCover3D;
