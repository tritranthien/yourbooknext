import { ReactElement, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import AdminLayout from '../../components/adminLayout/AdminLayout'
import { getAllCates, storeNewCate } from '../../libs/api/category'
import API, { getAuthHeader } from '../../libs/api/api'
import { upLoadPoster } from '../../libs/api/uploadFile'
import { toast } from 'react-toastify'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineTag, AiOutlinePicture, AiOutlineCloudUpload, AiOutlineClose, AiOutlineStar, AiFillBook, AiFillHeart, AiFillStar, AiFillThunderbolt, AiFillFire, AiFillFlag, AiFillTrophy, AiFillCrown, AiFillExperiment, AiFillSkin, AiFillSmile, AiFillCamera, AiFillCar, AiFillGift, AiFillPushpin, AiFillRocket, AiFillSafetyCertificate, AiFillSound, AiFillTool, AiFillUnlock, AiFillVideoCamera, AiFillWallet, AiFillWarning, AiFillYuque, AiOutlineAntDesign, AiOutlineApartment, AiOutlineAreaChart, AiOutlineAudit, AiOutlineBank, AiOutlineBarcode, AiOutlineBars, AiOutlineBgColors, AiOutlineBlock, AiOutlineBold, AiOutlineBoxPlot, AiOutlineBranches, AiOutlineBuild, AiOutlineBulb } from 'react-icons/ai'
import { MdMovie, MdSchool, MdScience, MdWork, MdFlight, MdPets, MdLandscape, MdPalette, MdMusicNote, MdRestaurant, MdSportsEsports, MdLocalMall, MdLocalHospital, MdLocalFlorist, MdLocalCafe, MdLocalBar, MdLocalPizza, MdLocalLibrary, MdLocalOffer, MdLocalShipping, MdLocalTaxi, MdNightlife, MdTerrain, MdTrain, MdTram, MdTransferWithinAStation, MdTransitEnterexit, MdTripOrigin, MdTwoWheeler, MdUmbrella, MdMap, MdPlace, MdNearMe, MdPersonPin, MdRestaurantMenu, MdSatellite, MdStoreMallDirectory, MdZoomOutMap } from 'react-icons/md'
import { BsMusicNote, BsController, BsFillLightningFill, BsFillMoonStarsFill, BsFillSunFill, BsFillCloudFill, BsFillCloudRainFill, BsFillCloudSnowFill, BsFillCloudLightningFill, BsFillEmojiSunglassesFill, BsFillEmojiWinkFill, BsFillEmojiSmileFill, BsFillEmojiLaughingFill, BsFillEmojiDizzyFill, BsFillEmojiAngryFill, BsGithub, BsGlobe, BsJoystick, BsLaptop, BsPhone, BsSmartwatch, BsTablet, BsTerminal, BsTrash, BsUnlock, BsUpload, BsVectorPen, BsWatch, BsWifi, BsWindow } from 'react-icons/bs'
import { RiSwordFill, RiAliensFill, RiGhostFill, RiSkullFill, RiMagicFill, RiCompass3Fill, RiMapPinFill, RiTreasureMapFill, RiSpyFill, RiKnifeBloodFill, RiAncientGateFill, RiBankCardFill, RiBearSmileFill, RiBikeFill, RiBookOpenFill, RiBookReadFill, RiBookletFill, RiBriefcaseFill, RiBuilding2Fill, RiBuilding4Fill, RiBusFill, RiCake2Fill, RiCamera3Fill, RiCarFill, RiCharacterRecognitionFill, RiClapperboardFill, RiCloudWindyFill, RiCodeBoxFill, RiCoinFill, RiCommunityFill, RiComputerFill, RiCupFill, RiCurrencyFill, RiCustomerService2Fill, RiDatabase2Fill, RiDeviceFill, RiDirectionFill, RiDiscFill, RiDoorLockFill, RiDraftFill, RiDragMove2Fill, RiDriveFill, RiDrizzleFill, RiDropFill, RiEarthFill, RiEdit2Fill, RiEmotionHappyFill, RiEmotionLaughFill, RiEmotionNormalFill, RiEmotionSadFill, RiEmotionUnhappyFill } from 'react-icons/ri'
import { ImBook, ImMagicWand, ImHeadphones, ImPacman, ImSpades, ImClubs, ImDiamonds } from 'react-icons/im'
import { FaDragon, FaGhost, FaSkull, FaSpider, FaMask, FaRing, FaScroll, FaFeather, FaHourglass, FaDungeon, FaChessRook, FaChessKnight, FaChessKing, FaChessQueen, FaFistRaised, FaYinYang, FaDiceD20, FaHatWizard, FaSpaceShuttle, FaRobot, FaBiohazard, FaAtom, FaDna, FaMicrochip, FaBrain, FaSatellite, FaMeteor, FaUserSecret, FaUserAstronaut, FaUserNinja, FaUserTie, FaUserMd, FaUserGraduate, FaUserFriends, FaUserClock, FaUserCog, FaUserCheck, FaUserEdit, FaUserMinus, FaUserPlus, FaUserTimes, FaUserLock, FaUserShield, FaUserSlash, FaUserTag } from 'react-icons/fa'
import { GiAngelOutfit, GiAnvil, GiArmorVest, GiBat, GiBattleAxe, GiBeastEye, GiBirdCage, GiBlackBook, GiBloodySword, GiBookshelf, GiBoomerang, GiBootPrints, GiBowman, GiBroadsword, GiBrokenShield, GiBurningBook, GiButterfly, GiCampfire, GiCannon, GiCastle, GiCat, GiCauldron, GiChainMail, GiChainsaw, GiChest, GiChicken, GiClockwork, GiCoffin, GiCompass, GiCrossbow, GiCrystalBall, GiCrystalWand, GiCupcake, GiCurledLeaf, GiCyclops, GiDaggers, GiDarkSquad, GiDeathNote, GiDevilMask, GiDiamondHard, GiDinosaurBones, GiDna2, GiDoubleFaceMask, GiDragonHead, GiDrop, GiDroplets, GiDungeonGate, GiEagleHead, GiEarthWorm, GiEggPod, GiElectric, GiElfEar, GiEmerald, GiEnergise, GiEvilBook, GiEvilMinion, GiExecutionerHood, GiEyeOfHorus, GiEyeball, GiFairy, GiFairyWand, GiFalconMoon, GiFalloutShelter, GiFeather, GiFencer, GiFireAce, GiFireAxe, GiFireBowl, GiFireBreath } from 'react-icons/gi'
import PosterPopup from '../../components/popup/PostersPopup'

// Icon definitions
const PREDEFINED_ICONS = [
    // Fantasy & Magic
    { name: 'FaDragon', icon: FaDragon },
    { name: 'GiDragonHead', icon: GiDragonHead },
    { name: 'RiSwordFill', icon: RiSwordFill },
    { name: 'GiBroadsword', icon: GiBroadsword },
    { name: 'GiDaggers', icon: GiDaggers },
    { name: 'AiFillCrown', icon: AiFillCrown },
    { name: 'FaChessKing', icon: FaChessKing },
    { name: 'FaChessQueen', icon: FaChessQueen },
    { name: 'GiCastle', icon: GiCastle },
    { name: 'FaDungeon', icon: FaDungeon },
    { name: 'GiDungeonGate', icon: GiDungeonGate },
    { name: 'ImMagicWand', icon: ImMagicWand },
    { name: 'GiCrystalWand', icon: GiCrystalWand },
    { name: 'GiFairyWand', icon: GiFairyWand },
    { name: 'RiMagicFill', icon: RiMagicFill },
    { name: 'FaHatWizard', icon: FaHatWizard },
    { name: 'GiCrystalBall', icon: GiCrystalBall },
    { name: 'GiCauldron', icon: GiCauldron },
    { name: 'FaRing', icon: FaRing },
    { name: 'AiFillThunderbolt', icon: AiFillThunderbolt },
    { name: 'AiFillFire', icon: AiFillFire },
    { name: 'GiFireBreath', icon: GiFireBreath },
    { name: 'GiElfEar', icon: GiElfEar },
    { name: 'GiFairy', icon: GiFairy },
    { name: 'GiAngelOutfit', icon: GiAngelOutfit },

    // Sci-Fi & Technology
    { name: 'RiAliensFill', icon: RiAliensFill },
    { name: 'FaRobot', icon: FaRobot },
    { name: 'FaSpaceShuttle', icon: FaSpaceShuttle },
    { name: 'AiFillRocket', icon: AiFillRocket },
    { name: 'FaSatellite', icon: FaSatellite },
    { name: 'FaMeteor', icon: FaMeteor },
    { name: 'FaAtom', icon: FaAtom },
    { name: 'FaDna', icon: FaDna },
    { name: 'GiDna2', icon: GiDna2 },
    { name: 'FaMicrochip', icon: FaMicrochip },
    { name: 'MdScience', icon: MdScience },
    { name: 'AiFillExperiment', icon: AiFillExperiment },
    { name: 'FaBiohazard', icon: FaBiohazard },
    { name: 'GiClockwork', icon: GiClockwork },
    { name: 'GiFalloutShelter', icon: GiFalloutShelter },
    { name: 'BsTerminal', icon: BsTerminal },

    // Horror & Mystery
    { name: 'FaGhost', icon: FaGhost },
    { name: 'RiGhostFill', icon: RiGhostFill },
    { name: 'FaSkull', icon: FaSkull },
    { name: 'RiSkullFill', icon: RiSkullFill },
    { name: 'FaSpider', icon: FaSpider },
    { name: 'RiKnifeBloodFill', icon: RiKnifeBloodFill },
    { name: 'GiCoffin', icon: GiCoffin },
    { name: 'GiDeathNote', icon: GiDeathNote },
    { name: 'GiDevilMask', icon: GiDevilMask },
    { name: 'GiExecutionerHood', icon: GiExecutionerHood },
    { name: 'FaMask', icon: FaMask },
    { name: 'RiSpyFill', icon: RiSpyFill },
    { name: 'FaUserSecret', icon: FaUserSecret },
    { name: 'FaUserNinja', icon: FaUserNinja },
    { name: 'GiEyeOfHorus', icon: GiEyeOfHorus },
    { name: 'GiBeastEye', icon: GiBeastEye },

    // Combat & Action
    { name: 'FaFistRaised', icon: FaFistRaised },
    { name: 'GiBattleAxe', icon: GiBattleAxe },
    { name: 'GiBowman', icon: GiBowman },
    { name: 'GiCrossbow', icon: GiCrossbow },
    { name: 'RiSwordFill', icon: RiSwordFill },
    { name: 'GiBloodySword', icon: GiBloodySword },
    { name: 'GiBrokenShield', icon: GiBrokenShield },
    { name: 'GiArmorVest', icon: GiArmorVest },
    { name: 'GiChainMail', icon: GiChainMail },
    { name: 'GiCannon', icon: GiCannon },
    { name: 'FaDiceD20', icon: FaDiceD20 },

    // Classics & Education
    { name: 'AiFillBook', icon: AiFillBook },
    { name: 'ImBook', icon: ImBook },
    { name: 'RiBookOpenFill', icon: RiBookOpenFill },
    { name: 'RiBookReadFill', icon: RiBookReadFill },
    { name: 'GiBlackBook', icon: GiBlackBook },
    { name: 'GiBurningBook', icon: GiBurningBook },
    { name: 'GiEvilBook', icon: GiEvilBook },
    { name: 'GiBookshelf', icon: GiBookshelf },
    { name: 'FaScroll', icon: FaScroll },
    { name: 'FaFeather', icon: FaFeather },
    { name: 'GiFeather', icon: GiFeather },
    { name: 'MdSchool', icon: MdSchool },
    { name: 'FaUserGraduate', icon: FaUserGraduate },

    // Romance & Emotion
    { name: 'AiFillHeart', icon: AiFillHeart },
    { name: 'RiEmotionHappyFill', icon: RiEmotionHappyFill },
    { name: 'RiEmotionSadFill', icon: RiEmotionSadFill },
    { name: 'AiFillSmile', icon: AiFillSmile },
    { name: 'BsFillEmojiSmileFill', icon: BsFillEmojiSmileFill },
    { name: 'AiFillGift', icon: AiFillGift },
    { name: 'MdLocalFlorist', icon: MdLocalFlorist },

    // Nature & World
    { name: 'BsGlobe', icon: BsGlobe },
    { name: 'RiEarthFill', icon: RiEarthFill },
    { name: 'BsFillMoonStarsFill', icon: BsFillMoonStarsFill },
    { name: 'BsFillSunFill', icon: BsFillSunFill },
    { name: 'BsFillCloudFill', icon: BsFillCloudFill },
    { name: 'MdLandscape', icon: MdLandscape },
    { name: 'MdTerrain', icon: MdTerrain },
    { name: 'GiCampfire', icon: GiCampfire },
    { name: 'GiCurledLeaf', icon: GiCurledLeaf },
    { name: 'GiButterfly', icon: GiButterfly },
    { name: 'MdPets', icon: MdPets },
    { name: 'GiCat', icon: GiCat },
    { name: 'GiBat', icon: GiBat },
    { name: 'GiChicken', icon: GiChicken },
    { name: 'GiEagleHead', icon: GiEagleHead },
    { name: 'GiFalconMoon', icon: GiFalconMoon },

    // Adventure & Travel
    { name: 'RiCompass3Fill', icon: RiCompass3Fill },
    { name: 'GiCompass', icon: GiCompass },
    { name: 'RiMapPinFill', icon: RiMapPinFill },
    { name: 'RiTreasureMapFill', icon: RiTreasureMapFill },
    { name: 'MdMap', icon: MdMap },
    { name: 'AiFillFlag', icon: AiFillFlag },
    { name: 'MdFlight', icon: MdFlight },
    { name: 'RiCarFill', icon: RiCarFill },
    { name: 'AiFillCar', icon: AiFillCar },
    { name: 'GiBootPrints', icon: GiBootPrints },

    // Eastern / Martial Arts
    { name: 'FaYinYang', icon: FaYinYang },
    { name: 'GiAnvil', icon: GiAnvil },

    // Life & Society
    { name: 'MdWork', icon: MdWork },
    { name: 'MdLocalCafe', icon: MdLocalCafe },
    { name: 'MdLocalBar', icon: MdLocalBar },
    { name: 'RiCupFill', icon: RiCupFill },
    { name: 'MdRestaurant', icon: MdRestaurant },
    { name: 'MdMovie', icon: MdMovie },
    { name: 'BsMusicNote', icon: BsMusicNote },
    { name: 'ImHeadphones', icon: ImHeadphones },
    { name: 'BsController', icon: BsController },
    { name: 'MdSportsEsports', icon: MdSportsEsports },
    { name: 'AiFillCamera', icon: AiFillCamera },
    { name: 'AiFillTrophy', icon: AiFillTrophy },
    { name: 'AiFillStar', icon: AiFillStar },
]

const getIconComponent = (name: string, props: any = {}) => {
    const iconDef = PREDEFINED_ICONS.find(i => i.name === name);
    if (iconDef) {
        const Icon = iconDef.icon;
        return <Icon {...props} />;
    }
    return null;
}

const AdminCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [icon, setIcon] = useState('');
    const [openLibrary, setOpenLibrary] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, cateId: string, cateName: string, novelCount: number } | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            const data = await getAllCates();
            setCategories(data);
        } catch (error) {
            toast.error("Lỗi khi tải thể loại");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

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

    const handleOpenModal = (cate: any = null) => {
        if (cate) {
            setEditData(cate);
            setName(cate.cate);
            setSlug(cate.slug);
            setIcon(cate.icon || '');
        } else {
            setEditData(null);
            setName('');
            setSlug('');
            setIcon('');
        }
        setIsModalOpen(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authHeader = getAuthHeader();
            if (editData) {
                await API.patch(`/category/${editData._id}`, { cate: name, slug, icon }, authHeader);
                toast.success("Cập nhật thành công");
            } else {
                await storeNewCate({ cate: name, slug, icon });
                toast.success("Thêm mới thành công");
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa thể loại này?")) return;
        try {
            const authHeader = getAuthHeader();
            const res = await API.delete(`/category/${id}`, authHeader);
            
            if (res.data && res.data.requireOption) {
                setDeleteConfirm({
                    isOpen: true,
                    cateId: id,
                    cateName: categories.find(c => c._id === id)?.cate || '',
                    novelCount: res.data.novelCount
                });
            } else {
                toast.success("Xóa thành công");
                fetchCategories();
            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message || "Không thể xóa thể loại này");
            } else {
                toast.error("Lỗi khi xóa: " + (error.response?.data?.message || error.message));
            }
        }
    }

    const handleConfirmDeleteAction = async (option: 'reassign' | 'delete_novels') => {
        if (!deleteConfirm) return;
        try {
            const authHeader = getAuthHeader();
            await API.delete(`/category/${deleteConfirm.cateId}?option=${option}`, authHeader);
            toast.success("Xóa thành công");
            setDeleteConfirm(null);
            fetchCategories();
        } catch (error: any) {
            toast.error("Lỗi khi xóa: " + (error.response?.data?.message || error.message));
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('poster', file);

        const uploadToast = toast.loading("Đang tải icon lên...");
        try {
            const res = await upLoadPoster(formData);
            if (res.secure_url) {
                setIcon(res.secure_url);
                toast.update(uploadToast, { render: "Tải ảnh thành công", type: "success", isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            toast.update(uploadToast, { render: "Tải ảnh thất bại", type: "error", isLoading: false, autoClose: 3000 });
        }
    }

    const handleChooseImage = (imgUrl: string) => {
        setIcon(imgUrl);
        setOpenLibrary(false);
    }

    const handleSelectIcon = (iconName: string) => {
        setIcon(iconName);
        setShowIconPicker(false);
    }

    const isUrl = (str: string) => {
        return str.includes('http') || str.includes('/');
    }

    if (loading) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
                    <AiOutlineTag className="mr-3 text-pink-500" /> Quản lý thể loại
                </h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <AiOutlinePlus className="mr-2" /> Thêm thể loại
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Tên thể loại</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Slug</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase text-center">Số lượng truyện</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {categories.map((cate) => (
                            <tr key={cate._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 flex items-center">
                                    {cate.icon && (
                                        isUrl(cate.icon) ? (
                                            <Image src={cate.icon} alt="" width={32} height={32} unoptimized className="w-8 h-8 rounded object-cover mr-3 bg-slate-100" />
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center mr-3 text-slate-600">
                                                {getIconComponent(cate.icon, { size: 20 })}
                                            </div>
                                        )
                                    )}
                                    {cate.cate}
                                </td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{cate.slug}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                        <AiFillBook className="mr-1.5" />
                                        {cate.novelCount || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleOpenModal(cate)}
                                        disabled={cate.editable === false}
                                        className={`p-2 rounded-lg transition-colors mr-2 ${cate.editable === false ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cate._id)}
                                        disabled={cate.editable === false}
                                        className={`p-2 rounded-lg transition-colors ${cate.editable === false ? 'text-slate-300 cursor-not-allowed' : 'text-red-600 hover:bg-red-50'}`}
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-in border border-slate-100 dark:border-slate-800 transition-colors">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-50 dark:border-slate-800 pb-4 transition-colors">
                            {editData ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 transition-colors">Tên thể loại</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (!editData) setSlug(generateSlug(e.target.value));
                                    }}
                                    placeholder="VD: Tiên Hiệp"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 transition-colors">Slug</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="tien-hiep"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-4 items-start">
                                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative group shrink-0 transition-colors">
                                        {icon ? (
                                            isUrl(icon) ? (
                                                <>
                                                    <Image src={icon} width={64} height={64} unoptimized className="w-full h-full object-cover" alt="Icon preview" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setIcon('')}
                                                            className="p-1 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                                        >
                                                            <AiOutlineClose size={12} />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="relative group w-full h-full flex items-center justify-center">
                                                    <div className="text-3xl text-slate-700 dark:text-slate-300">
                                                        {getIconComponent(icon)}
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setIcon('')}
                                                            className="p-1 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                                        >
                                                            <AiOutlineClose size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <AiOutlinePicture className="text-slate-300 dark:text-slate-600 text-xl" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex gap-2">
                                             <button 
                                                type="button"
                                                onClick={() => setShowIconPicker(true)}
                                                className="flex-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors border border-blue-100 dark:border-blue-900/50"
                                            >
                                                <AiOutlineStar className="mr-2" /> Chọn Icon
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-200 dark:bg-slate-700"></div>
                                            <span className="relative z-10 bg-white dark:bg-slate-900 px-2 text-xs text-slate-400 dark:text-slate-500 block w-fit mx-auto transition-colors">HOẶC DÙNG ẢNH</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
                                            value={icon}
                                            onChange={(e)=>setIcon(e.target.value)}
                                            placeholder="URL icon..."
                                        />
                                        <div className="flex gap-2">
                                            <button 
                                                type="button"
                                                onClick={() => setOpenLibrary(true)}
                                                className="flex-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
                                            >
                                                <AiOutlinePicture className="mr-1.5" /> Thư viện
                                            </button>
                                            <label className="flex-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer mr-0">
                                                <AiOutlineCloudUpload className="mr-1.5" /> Upload
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
                                >
                                    {editData ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openLibrary && (
                <PosterPopup 
                    choonseImage={handleChooseImage} 
                    closePopup={() => setOpenLibrary(false)} 
                />
            )}

            {showIconPicker && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl p-6 shadow-2xl scale-in border border-slate-100 dark:border-slate-800 transition-colors max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50 dark:border-slate-800 transition-colors">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Chọn Icon</h2>
                            <button onClick={() => setShowIconPicker(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 p-2">
                                {PREDEFINED_ICONS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button 
                                            key={item.name}
                                            onClick={() => handleSelectIcon(item.name)}
                                            className={`flex flex-col items-center justify-center p-3 aspect-square rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group ${icon === item.name ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/50' : 'bg-slate-50 dark:bg-slate-800/30'}`}
                                            title={item.name}
                                        >
                                            <Icon className="text-2xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 transition-colors" />
                                            {/* <span className="text-[10px] text-slate-400 truncate w-full px-2 text-center group-hover:text-blue-500">{item.name}</span> */}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Option Modal */}
            {deleteConfirm && deleteConfirm.isOpen && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-in border border-slate-100 dark:border-slate-800 transition-colors">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <AiFillWarning className="text-red-600 dark:text-red-400 text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 transition-colors">Xử lý truyện liên quan</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors">
                                Thể loại <span className="font-bold text-slate-800 dark:text-slate-200">&quot;{deleteConfirm.cateName}&quot;</span> hiện đang có <span className="font-bold text-blue-600 dark:text-blue-400">{deleteConfirm.novelCount}</span> truyện.
                                Bạn muốn xử lý như thế nào?
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleConfirmDeleteAction('reassign')}
                                className="w-full flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
                            >
                                <div className="text-left">
                                    <span className="block font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">Chuyển sang &quot;Khác&quot;</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Giữ lại truyện, chỉ đổi thể loại</span>
                                </div>
                                <AiOutlineTag className="text-slate-400 group-hover:text-blue-500 text-xl" />
                            </button>
                            <button
                                onClick={() => handleConfirmDeleteAction('delete_novels')}
                                className="w-full flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-red-500 dark:hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all group"
                            >
                                <div className="text-left">
                                    <span className="block font-semibold text-slate-700 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">Xóa tất cả truyện</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Cảnh báo: Không thể khôi phục</span>
                                </div>
                                <AiOutlineDelete className="text-slate-400 group-hover:text-red-500 text-xl" />
                            </button>
                        </div>
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="w-full mt-4 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

AdminCategories.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminCategories
