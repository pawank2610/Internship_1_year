import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Container, Truck, RefreshCw, X, ChevronLeft, ChevronRight, Check, Heart } from 'lucide-react';
import Manifesto from '../components/Manifesto';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Static lookup so we know what to actually put in the bag for each drop.
// Keyed the same way as `activeProduct` so it's easy to pull the right one.
const PRODUCT_INFO = {
  blank: { id: 'blank-canvas-drop-01', title: 'BLANK CANVAS // DROP 01', price: 45 },
  logo: { id: 'studio-logo-form-drop-01', title: 'STUDIO LOGO FORM // DROP 01', price: 48 },
  shadow: { id: 'shadow-profile-tee-01', title: '01 SHADOW PROFILE TEE', price: 45 },
  vintage: { id: 'vintage-heavy-crop-sun-washed', title: 'VINTAGE HEAVY CROP // SUN WASHED', price: 52 },
  earth: { id: 'box-earth-minimalist', title: 'BOX EARTH MINIMALIST', price: 46 },
};

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Modal tracking state mapping data structures
  const [activeProduct, setActiveProduct] = useState(null); // 'blank' | 'logo' | 'shadow' | 'vintage' | 'earth'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  // Array 1: Plain heavyweight white tee assets
  const blankTeeImages = [
    "/src/assets/tshirt 1/05-05-2025 christian00428.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00425.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00428 - Copy.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00430.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00432.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00434.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00438.jpg",
    "/src/assets/tshirt 1/05-05-2025 christian00440.jpg"
  ];

  // Array 2: Brand logo chest graphic tee assets
  const logoTeeImages = [
    "/src/assets/tshirt 2/05-05-2025 christian00445.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00444.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00445 - Copy.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00449.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00450.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00452.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00456.jpg",
    "/src/assets/tshirt 2/05-05-2025 christian00462.jpg"
  ];

  // Array 3: New sleek black premium tee assets mapped verbatim
  const shadowTeeImages = [
    "/src/assets/tshirt 3/05-05-2025 christian00466.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00463.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00466 - Copy.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00468.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00470.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00474.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00475.jpg",
    "/src/assets/tshirt 3/05-05-2025 christian00479.jpg"
  ];

  // Array 4: Added Vintage Heavy Crop tee assets
  const vintageTeeImages = [
    "/src/assets/tshirt 4/05-05-2025 christian00482.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00480.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00484.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00486.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00488.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00490.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00492.jpg",
    "/src/assets/tshirt 4/05-05-2025 christian00494.jpg", 
  ];

  // Array 5: Added Earth Minimalist tee assets
  const earthTeeImages = [
    "/src/assets/tshirt 5/05-05-2025 christian00498.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00496.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00500.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00502.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00504.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00506.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00508.jpg",
    "/src/assets/tshirt 5/05-05-2025 christian00510.jpg"
  ];

  // Dynamic image resolution engine assignment
  const getActiveImages = () => {
    if (activeProduct === 'logo') return logoTeeImages;
    if (activeProduct === 'shadow') return shadowTeeImages;
    if (activeProduct === 'vintage') return vintageTeeImages;
    if (activeProduct === 'earth') return earthTeeImages;
    return blankTeeImages;
  };

  const activeImages = getActiveImages();

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const handleToggleWishlist = (e, productKey, previewImage) => {
    e.stopPropagation(); // don't let the click also open the product modal
    const info = PRODUCT_INFO[productKey];
    toggleWishlist({
      id: info.id,
      title: info.title,
      price: info.price,
      image: previewImage,
    });
  };

  const openProductModal = (productKey) => {
    setActiveProduct(productKey);
    setCurrentImageIndex(0);
    setJustAdded(false);
  };

  const handleAddToBag = () => {
    if (!activeProduct) return;

    const info = PRODUCT_INFO[activeProduct];
    addToCart({
      id: info.id,
      title: info.title,
      price: info.price,
      image: activeImages[0],
    });

    // Quick visual confirmation before the modal closes
    setJustAdded(true);
    setTimeout(() => {
      setActiveProduct(null);
    }, 700);
  };

  return (
    <div className="w-full bg-black">
      {/* Hero Poster Landing Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-start px-6 md:px-16 bg-black overflow-hidden border-b border-neutral-900 pt-12 pb-16">
        <div className="max-w-5xl z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-4 bg-brand-red inline-block"></span>
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase">AW '26 • NEW DROP</span>
          </div>

          <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-impact tracking-tight leading-[0.9] uppercase select-none">
            PURE COTTON.<br />
            <span className="text-brand-red">PURE INTENT.</span>
          </h1>

          <p className="text-neutral-400 text-xs md:text-sm mt-6 max-w-lg leading-relaxed tracking-wide font-medium">
            CosoStyle crafts heavyweight 240 GSM cotton tees in limited runs. No polyester. No filler. Just structure, drape, and silence.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/shop" className="bg-brand-red hover:bg-red-700 text-white font-black text-xs tracking-widest px-8 py-4 flex items-center gap-3 uppercase transition-colors duration-200">
              SHOP THE DROP <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link to="/shop?category=oversized" className="border border-neutral-800 bg-transparent hover:border-white text-white font-black text-xs tracking-widest px-8 py-4 uppercase transition-colors duration-200">
              OVERSIZED CUTS
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Proposition Banner */}
      <section className="w-full bg-black border-b border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-brand-red mt-0.5" size={18} />
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white">100% PURE COTTON</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Combed & ringspun</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Container className="text-brand-red mt-0.5" size={18} />
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white">240 GSM HEAVYWEIGHT</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Structure that lasts</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="text-brand-red mt-0.5" size={18} />
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white">FREE SHIP OVER $80</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Worldwide delivery</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="text-brand-red mt-0.5" size={18} />
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white">MADE TO OUTLAST</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Limited drops only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Collection Gallery - Compact Luxury Grid Structure */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between border-b border-neutral-900 pb-4 mb-8">
          <div>
            <span className="text-[10px] font-bold text-brand-red tracking-widest uppercase block mb-1">FEATURED</span>
            <h2 className="text-white text-3xl font-black font-impact tracking-wide uppercase">THE STUDIO PICKS</h2>
          </div>
        </div>

        {/* Responsive scannable product matrix block */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          
          {/* TEE STYLE 1: BLANK CANVAS */}
          <div 
            onClick={() => openProductModal('blank')}
            className="group cursor-pointer flex flex-col w-full"
          >
            <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img 
                src={blankTeeImages[0]} 
                alt="Blank Canvas Front View" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => handleToggleWishlist(e, 'blank', blankTeeImages[0])}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-brand-red transition z-10 backdrop-blur-sm cursor-pointer"
              >
                <Heart
                  size={16}
                  className={isInWishlist(PRODUCT_INFO.blank.id) ? 'fill-brand-red text-brand-red' : ''}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View All Angles
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                BLANK CANVAS // DROP 01
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 tracking-wider font-semibold uppercase">240 GSM White</span>
                <span className="text-neutral-400 text-xs font-bold">$45</span>
              </div>
            </div>
          </div>

          {/* TEE STYLE 2: STUDIO LOGO FORM */}
          <div 
            onClick={() => openProductModal('logo')}
            className="group cursor-pointer flex flex-col w-full"
          >
            <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img 
                src={logoTeeImages[0]} 
                alt="Studio Logo Tee Front View" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => handleToggleWishlist(e, 'logo', logoTeeImages[0])}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-brand-red transition z-10 backdrop-blur-sm cursor-pointer"
              >
                <Heart
                  size={16}
                  className={isInWishlist(PRODUCT_INFO.logo.id) ? 'fill-brand-red text-brand-red' : ''}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View All Angles
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                STUDIO LOGO FORM // DROP 01
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 tracking-wider font-semibold uppercase">240 GSM Graphic</span>
                <span className="text-neutral-400 text-xs font-bold">$48</span>
              </div>
            </div>
          </div>

          {/* TEE STYLE 3: ONYX BLACK SHADOW PROFILE */}
          <div 
            onClick={() => openProductModal('shadow')}
            className="group cursor-pointer flex flex-col w-full"
          >
            <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img 
                src={shadowTeeImages[0]} 
                alt="Shadow Profile Black Tee Front View" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => handleToggleWishlist(e, 'shadow', shadowTeeImages[0])}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-brand-red transition z-10 backdrop-blur-sm cursor-pointer"
              >
                <Heart
                  size={16}
                  className={isInWishlist(PRODUCT_INFO.shadow.id) ? 'fill-brand-red text-brand-red' : ''}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View All Angles
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                01 SHADOW PROFILE TEE
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 tracking-wider font-semibold uppercase">240 GSM Onyx Black</span>
                <span className="text-neutral-400 text-xs font-bold">$45</span>
              </div>
            </div>
          </div>

          {/* TEE STYLE 4: VINTAGE HEAVY CROP */}
          <div 
            onClick={() => openProductModal('vintage')}
            className="group cursor-pointer flex flex-col w-full"
          >
            <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img 
                src={vintageTeeImages[0]} 
                alt="Vintage Heavy Crop Front View" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => handleToggleWishlist(e, 'vintage', vintageTeeImages[0])}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-brand-red transition z-10 backdrop-blur-sm cursor-pointer"
              >
                <Heart
                  size={16}
                  className={isInWishlist(PRODUCT_INFO.vintage.id) ? 'fill-brand-red text-brand-red' : ''}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View All Angles
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                VINTAGE HEAVY CROP // SUN WASHED
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 tracking-wider font-semibold uppercase">240 GSM Faded Grey</span>
                <span className="text-neutral-400 text-xs font-bold">$52</span>
              </div>
            </div>
          </div>

          {/* TEE STYLE 5: EARTH MINIMALIST */}
          <div 
            onClick={() => openProductModal('earth')}
            className="group cursor-pointer flex flex-col w-full"
          >
            <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img 
                src={earthTeeImages[0]} 
                alt="Earth Minimalist Front View" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => handleToggleWishlist(e, 'earth', earthTeeImages[0])}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-brand-red transition z-10 backdrop-blur-sm cursor-pointer"
              >
                <Heart
                  size={16}
                  className={isInWishlist(PRODUCT_INFO.earth.id) ? 'fill-brand-red text-brand-red' : ''}
                />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View All Angles
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                BOX EARTH MINIMALIST
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 tracking-wider font-semibold uppercase">240 GSM Olive Clay</span>
                <span className="text-neutral-400 text-xs font-bold">$46</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Manifesto />

      {/* FULL-SCREEN INTERACTIVE GALLERY SLIDESHOW MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md px-4">
          <div className="absolute inset-0" onClick={() => setActiveProduct(null)}></div>

          <div className="relative w-full max-w-4xl bg-[#08080A] border border-neutral-900 shadow-2xl z-10 flex flex-col md:flex-row h-[85vh] md:h-[75vh]">
            
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors bg-black/60 p-2 z-30 border border-neutral-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left Image Screen Viewport Slider Box Container */}
            <div className="w-full md:w-3/5 h-2/3 md:h-full relative flex items-center justify-center bg-black border-b md:border-b-0 md:border-r border-neutral-900 overflow-hidden">
              <img 
                src={activeImages[currentImageIndex]} 
                alt="Product Multi-angle View Profile" 
                className="w-full h-full object-contain object-center select-none"
              />

              <button 
                onClick={prevSlide}
                className="absolute left-4 bg-black/60 border border-neutral-800 text-white p-3 hover:text-brand-red transition-colors z-20 cursor-pointer"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <button 
                onClick={nextSlide}
                className="absolute right-4 bg-black/60 border border-neutral-800 text-white p-3 hover:text-brand-red transition-colors z-20 cursor-pointer"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>

              {/* Refined Minimalist Dash Tracking Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {activeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    className={`h-[2px] transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex 
                        ? 'w-6 bg-brand-red' 
                        : 'w-3 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Specifications Panel Sheet Content Box */}
            <div className="w-full md:w-2/5 p-6 flex flex-col justify-between h-1/3 md:h-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-red font-black tracking-widest uppercase mb-1">STUDIO ESSENTIALS</span>
                <h2 className="text-white text-2xl font-black tracking-tight font-impact uppercase leading-tight mb-2">
                  {activeProduct === 'logo' && 'STUDIO LOGO FORM // DROP 01'}
                  {activeProduct === 'blank' && 'BLANK CANVAS // DROP 01'}
                  {activeProduct === 'shadow' && '01 SHADOW PROFILE TEE'}
                  {activeProduct === 'vintage' && 'VINTAGE HEAVY CROP // SUN WASHED'}
                  {activeProduct === 'earth' && 'BOX EARTH MINIMALIST'}
                </h2>
                <div className="text-xl font-bold text-white mb-4">
                  {activeProduct === 'logo' && '$48'}
                  {activeProduct === 'blank' && '$45'}
                  {activeProduct === 'shadow' && '$45'}
                  {activeProduct === 'vintage' && '$52'}
                  {activeProduct === 'earth' && '$46'}
                </div>
                
                <p className="text-neutral-400 text-xs leading-relaxed tracking-wide mb-6">
                  {activeProduct === 'logo' && 'Embellished with high-density central core brand chest signature work. Tailored from bespoke 240 GSM pre-shrunk cotton, delivering an uncompromising box structured fit that holds its mold.'}
                  {activeProduct === 'blank' && 'Engineered with premium combed ringspun 240 GSM cotton. Features reinforced shoulder taping, a dense crew collar, and an exquisite drop profile that preserves structure across infinite wear cycles.'}
                  {activeProduct === 'shadow' && 'The definitive dark architecture piece. Meticulously built from deep-dyed onyx 240 GSM heavy combed ringspun cotton thread, giving a structured contour drop drape designed to stay sleek forever.'}
                  {activeProduct === 'vintage' && 'Sun-faded perfection. This retro architecture aesthetic drop cuts slightly shorter for the ultimate high-waist box fit drape. Heavy enzyme-washed for a natural broken-in premium handle.'}
                  {activeProduct === 'earth' && 'Grounded tone minimal design structure. Custom dyed in organic olive clay hue, implementing an extended sleeve silhouette drop with an extra dense ribbed collar band detailing.'}
                </p>

                {/* Micro Click-to-Swap Thumbnail Selection Row Strip */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {activeImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square border overflow-hidden bg-[#0F0F12] transition-all duration-150 ${
                        idx === currentImageIndex ? 'border-brand-red ring-1 ring-brand-red' : 'border-neutral-800 hover:border-neutral-500'
                      }`}
                    >
                      <img src={imgUrl} className="w-full h-full object-cover object-top" alt="" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToBag}
                disabled={justAdded}
                className="w-full bg-brand-red hover:bg-red-700 disabled:bg-green-700 text-white text-xs font-black tracking-widest py-4 uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {justAdded ? (
                  <>
                    <Check size={14} strokeWidth={3} /> ADDED TO BAG
                  </>
                ) : (
                  'ADD TO BAG'
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}