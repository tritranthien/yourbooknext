import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Category } from '../../interface/_Category';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineTag, AiOutlinePicture, AiOutlineCloudUpload, AiOutlineClose, AiOutlineStar, AiFillBook, AiFillHeart, AiFillStar, AiFillThunderbolt, AiFillFire, AiFillFlag, AiFillTrophy, AiFillCrown, AiFillExperiment, AiFillSkin, AiFillSmile, AiFillCamera, AiFillCar, AiFillGift, AiFillPushpin, AiFillRocket, AiFillSafetyCertificate, AiFillSound, AiFillTool, AiFillUnlock, AiFillVideoCamera, AiFillWallet, AiFillWarning, AiFillYuque, AiOutlineAntDesign, AiOutlineApartment, AiOutlineAreaChart, AiOutlineAudit, AiOutlineBank, AiOutlineBarcode, AiOutlineBars, AiOutlineBgColors, AiOutlineBlock, AiOutlineBold, AiOutlineBoxPlot, AiOutlineBranches, AiOutlineBuild, AiOutlineBulb } from 'react-icons/ai'
import { MdMovie, MdSchool, MdScience, MdWork, MdFlight, MdPets, MdLandscape, MdPalette, MdMusicNote, MdRestaurant, MdSportsEsports, MdLocalMall, MdLocalHospital, MdLocalFlorist, MdLocalCafe, MdLocalBar, MdLocalPizza, MdLocalLibrary, MdLocalOffer, MdLocalShipping, MdLocalTaxi, MdNightlife, MdTerrain, MdTrain, MdTram, MdTransferWithinAStation, MdTransitEnterexit, MdTripOrigin, MdTwoWheeler, MdUmbrella, MdMap, MdPlace, MdNearMe, MdPersonPin, MdRestaurantMenu, MdSatellite, MdStoreMallDirectory, MdZoomOutMap } from 'react-icons/md'
import { BsMusicNote, BsController, BsFillLightningFill, BsFillMoonStarsFill, BsFillSunFill, BsFillCloudFill, BsFillCloudRainFill, BsFillCloudSnowFill, BsFillCloudLightningFill, BsFillEmojiSunglassesFill, BsFillEmojiWinkFill, BsFillEmojiSmileFill, BsFillEmojiLaughingFill, BsFillEmojiDizzyFill, BsFillEmojiAngryFill, BsGithub, BsGlobe, BsJoystick, BsLaptop, BsPhone, BsSmartwatch, BsTablet, BsTerminal, BsTrash, BsUnlock, BsUpload, BsVectorPen, BsWatch, BsWifi, BsWindow } from 'react-icons/bs'
import { RiSwordFill, RiAliensFill, RiGhostFill, RiSkullFill, RiMagicFill, RiCompass3Fill, RiMapPinFill, RiTreasureMapFill, RiSpyFill, RiKnifeBloodFill, RiAncientGateFill, RiBankCardFill, RiBearSmileFill, RiBikeFill, RiBookOpenFill, RiBookReadFill, RiBookletFill, RiBriefcaseFill, RiBuilding2Fill, RiBuilding4Fill, RiBusFill, RiCake2Fill, RiCamera3Fill, RiCarFill, RiCharacterRecognitionFill, RiClapperboardFill, RiCloudWindyFill, RiCodeBoxFill, RiCoinFill, RiCommunityFill, RiComputerFill, RiCupFill, RiCurrencyFill, RiCustomerService2Fill, RiDatabase2Fill, RiDeviceFill, RiDirectionFill, RiDiscFill, RiDoorLockFill, RiDraftFill, RiDragMove2Fill, RiDriveFill, RiDrizzleFill, RiDropFill, RiEarthFill, RiEdit2Fill, RiEmotionHappyFill, RiEmotionLaughFill, RiEmotionNormalFill, RiEmotionSadFill, RiEmotionUnhappyFill } from 'react-icons/ri'
import { ImBook, ImMagicWand, ImHeadphones, ImPacman, ImSpades, ImClubs, ImDiamonds } from 'react-icons/im'
import { FaBook, FaDragon, FaGhost, FaSkull, FaSpider, FaMask, FaRing, FaScroll, FaFeather, FaHourglass, FaDungeon, FaChessRook, FaChessKnight, FaChessKing, FaChessQueen, FaFistRaised, FaYinYang, FaDiceD20, FaHatWizard, FaSpaceShuttle, FaRobot, FaBiohazard, FaAtom, FaDna, FaMicrochip, FaBrain, FaSatellite, FaMeteor, FaUserSecret, FaUserAstronaut, FaUserNinja, FaUserTie, FaUserMd, FaUserGraduate, FaUserFriends, FaUserClock, FaUserCog, FaUserCheck, FaUserEdit, FaUserMinus, FaUserPlus, FaUserTimes, FaUserLock, FaUserShield, FaUserSlash, FaUserTag, FaHeart, FaHistory } from 'react-icons/fa'
import { GiFloatingCrystal, GiGalaxy, GiMagicPortal, GiPunch, GiSwordman, GiAngelOutfit, GiAnvil, GiArmorVest, GiBat, GiBattleAxe, GiBeastEye, GiBirdCage, GiBlackBook, GiBloodySword, GiBookshelf, GiBoomerang, GiBootPrints, GiBowman, GiBroadsword, GiBrokenShield, GiBurningBook, GiButterfly, GiCampfire, GiCannon, GiCastle, GiCat, GiCauldron, GiChainMail, GiChainsaw, GiChest, GiChicken, GiClockwork, GiCoffin, GiCompass, GiCrossbow, GiCrystalBall, GiCrystalWand, GiCupcake, GiCurledLeaf, GiCyclops, GiDaggers, GiDarkSquad, GiDeathNote, GiDevilMask, GiDiamondHard, GiDinosaurBones, GiDna2, GiDoubleFaceMask, GiDragonHead, GiDrop, GiDroplets, GiDungeonGate, GiEagleHead, GiEarthWorm, GiEggPod, GiElectric, GiElfEar, GiEmerald, GiEnergise, GiEvilBook, GiEvilMinion, GiExecutionerHood, GiEyeOfHorus, GiEyeball, GiFairy, GiFairyWand, GiFalconMoon, GiFalloutShelter, GiFeather, GiFencer, GiFireAce, GiFireAxe, GiFireBowl, GiFireBreath } from 'react-icons/gi'

interface HomeCategoryListProps {
    categories: Category[];
}

// Icon definitions map
const PREDEFINED_ICONS = {
    // Fantasy & Magic
    'FaDragon': FaDragon,
    'GiDragonHead': GiDragonHead,
    'RiSwordFill': RiSwordFill,
    'GiBroadsword': GiBroadsword,
    'GiDaggers': GiDaggers,
    'AiFillCrown': AiFillCrown,
    'FaChessKing': FaChessKing,
    'FaChessQueen': FaChessQueen,
    'GiCastle': GiCastle,
    'FaDungeon': FaDungeon,
    'GiDungeonGate': GiDungeonGate,
    'ImMagicWand': ImMagicWand,
    'GiCrystalWand': GiCrystalWand,
    'GiFairyWand': GiFairyWand,
    'RiMagicFill': RiMagicFill,
    'FaHatWizard': FaHatWizard,
    'GiCrystalBall': GiCrystalBall,
    'GiCauldron': GiCauldron,
    'FaRing': FaRing,
    'AiFillThunderbolt': AiFillThunderbolt,
    'AiFillFire': AiFillFire,
    'GiFireBreath': GiFireBreath,
    'GiElfEar': GiElfEar,
    'GiFairy': GiFairy,
    'GiAngelOutfit': GiAngelOutfit,

    // Sci-Fi & Technology
    'RiAliensFill': RiAliensFill,
    'FaRobot': FaRobot,
    'FaSpaceShuttle': FaSpaceShuttle,
    'AiFillRocket': AiFillRocket,
    'FaSatellite': FaSatellite,
    'FaMeteor': FaMeteor,
    'FaAtom': FaAtom,
    'FaDna': FaDna,
    'GiDna2': GiDna2,
    'FaMicrochip': FaMicrochip,
    'MdScience': MdScience,
    'AiFillExperiment': AiFillExperiment,
    'FaBiohazard': FaBiohazard,
    'GiClockwork': GiClockwork,
    'GiFalloutShelter': GiFalloutShelter,
    'BsTerminal': BsTerminal,

    // Horror & Mystery
    'FaGhost': FaGhost,
    'RiGhostFill': RiGhostFill,
    'FaSkull': FaSkull,
    'RiSkullFill': RiSkullFill,
    'FaSpider': FaSpider,
    'RiKnifeBloodFill': RiKnifeBloodFill,
    'GiCoffin': GiCoffin,
    'GiDeathNote': GiDeathNote,
    'GiDevilMask': GiDevilMask,
    'GiExecutionerHood': GiExecutionerHood,
    'FaMask': FaMask,
    'RiSpyFill': RiSpyFill,
    'FaUserSecret': FaUserSecret,
    'FaUserNinja': FaUserNinja,
    'GiEyeOfHorus': GiEyeOfHorus,
    'GiBeastEye': GiBeastEye,

    // Combat & Action
    'FaFistRaised': FaFistRaised,
    'GiBattleAxe': GiBattleAxe,
    'GiBowman': GiBowman,
    'GiCrossbow': GiCrossbow,
    'GiBloodySword': GiBloodySword,
    'GiBrokenShield': GiBrokenShield,
    'GiArmorVest': GiArmorVest,
    'GiChainMail': GiChainMail,
    'GiCannon': GiCannon,
    'FaDiceD20': FaDiceD20,

    // Classics & Education
    'AiFillBook': AiFillBook,
    'ImBook': ImBook,
    'RiBookOpenFill': RiBookOpenFill,
    'RiBookReadFill': RiBookReadFill,
    'GiBlackBook': GiBlackBook,
    'GiBurningBook': GiBurningBook,
    'GiEvilBook': GiEvilBook,
    'GiBookshelf': GiBookshelf,
    'FaScroll': FaScroll,
    'FaFeather': FaFeather,
    'GiFeather': GiFeather,
    'MdSchool': MdSchool,
    'FaUserGraduate': FaUserGraduate,

    // Romance & Emotion
    'AiFillHeart': AiFillHeart,
    'RiEmotionHappyFill': RiEmotionHappyFill,
    'RiEmotionSadFill': RiEmotionSadFill,
    'AiFillSmile': AiFillSmile,
    'BsFillEmojiSmileFill': BsFillEmojiSmileFill,
    'AiFillGift': AiFillGift,
    'MdLocalFlorist': MdLocalFlorist,
    'FaHeart': FaHeart,

    // Nature & World
    'BsGlobe': BsGlobe,
    'RiEarthFill': RiEarthFill,
    'BsFillMoonStarsFill': BsFillMoonStarsFill,
    'BsFillSunFill': BsFillSunFill,
    'BsFillCloudFill': BsFillCloudFill,
    'MdLandscape': MdLandscape,
    'MdTerrain': MdTerrain,
    'GiCampfire': GiCampfire,
    'GiCurledLeaf': GiCurledLeaf,
    'GiButterfly': GiButterfly,
    'MdPets': MdPets,
    'GiCat': GiCat,
    'GiBat': GiBat,
    'GiChicken': GiChicken,
    'GiEagleHead': GiEagleHead,
    'GiFalconMoon': GiFalconMoon,

    // Adventure & Travel
    'RiCompass3Fill': RiCompass3Fill,
    'GiCompass': GiCompass,
    'RiMapPinFill': RiMapPinFill,
    'RiTreasureMapFill': RiTreasureMapFill,
    'MdMap': MdMap,
    'AiFillFlag': AiFillFlag,
    'MdFlight': MdFlight,
    'RiCarFill': RiCarFill,
    'AiFillCar': AiFillCar,
    'GiBootPrints': GiBootPrints,

    // Eastern / Martial Arts
    'FaYinYang': FaYinYang,
    'GiAnvil': GiAnvil,

    // Life & Society
    'MdWork': MdWork,
    'MdLocalCafe': MdLocalCafe,
    'MdLocalBar': MdLocalBar,
    'RiCupFill': RiCupFill,
    'MdRestaurant': MdRestaurant,
    'MdMovie': MdMovie,
    'BsMusicNote': BsMusicNote,
    'ImHeadphones': ImHeadphones,
    'BsController': BsController,
    'MdSportsEsports': MdSportsEsports,
    'AiFillCamera': AiFillCamera,
    'AiFillTrophy': AiFillTrophy,
    'AiFillStar': AiFillStar,
    'GiSwordman': GiSwordman,
    'GiFloatingCrystal': GiFloatingCrystal,
    'FaHistory': FaHistory,
    'GiGalaxy': GiGalaxy,
    'GiMagicPortal': GiMagicPortal,
};

// Helper to map category names/slugs to icons (Legacy fallback)
const getIcon = (slug?: string, iconName?: string) => {
    const iconProps = { size: 24 };
    
    // 1. Try to use direct icon name if available
    if (iconName) {
        // Check if it is a URL
        if (iconName.includes('/') || iconName.includes('http')) {
             return <Image src={iconName} alt="" width={24} height={24} unoptimized className="w-6 h-6 object-cover rounded" />;
        }
        
        // Check if it is a predefined icon name
        const IconComponent = PREDEFINED_ICONS[iconName as keyof typeof PREDEFINED_ICONS];
        if (IconComponent) {
            return <IconComponent {...iconProps} />;
        }
    }

    // 2. Fallback to slug-based matching (Old logic)
    let Icon: any = FaBook; // Default

    if (slug?.includes('tien-hiep')) Icon = GiFloatingCrystal;
    else if (slug?.includes('huyen-huyen')) Icon = FaDragon;
    else if (slug?.includes('kiem-hiep')) Icon = GiSwordman;
    else if (slug?.includes('lich-su')) Icon = FaHistory;
    else if (slug?.includes('do-thi')) Icon = FaBook;
    else if (slug?.includes('vong-du')) Icon = GiGalaxy;
    else if (slug?.includes('khoa-huyen')) Icon = GiMagicPortal;
    else if (slug?.includes('he-thong')) Icon = GiCompass;
    else if (slug?.includes('dii-gioi')) Icon = GiBroadsword;
    else if (slug?.includes('ngon-tinh')) Icon = FaHeart;
    else if (slug?.includes('dam-my')) Icon = FaUserSecret;
    else if (slug?.includes('linh-di')) Icon = FaGhost;

    return <Icon {...iconProps} />;
}

const HomeCategoryList: React.FC<HomeCategoryListProps> = ({ categories }) => {
    if (!categories || categories.length === 0) return null;

    return (
        <div className="w-full py-6">
            {/* <div className="flex items-center gap-2 mb-4">
                <span className='h-6 w-1 bg-primary-500 rounded-full block'></span>
                <h2 className='text-xl font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wide'>Thể Loại Truyện</h2>
            </div> */}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categories.map((cate, index) => (
                    <Link legacyBehavior href={`/tonghop/${cate.slug}`} key={index} passHref>
                        <a className="group flex items-center p-3 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-500/50 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-slate-700/50 text-gray-400 dark:text-slate-500 group-hover:bg-primary-500 group-hover:text-white flex items-center justify-center transition-colors duration-300 mr-3 overflow-hidden">
                                {getIcon(cate.slug, cate.icon)}
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors first-letter:uppercase">
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
