import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Upload, Droplet, Copy, CheckCircle, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

const ColorPicker = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [hoverColor, setHoverColor] = useState('#ffffff');
    const [isHovering, setIsHovering] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Draw image to canvas when imageSrc changes
    useEffect(() => {
        if (imageSrc && canvasRef.current && imageRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const img = new window.Image();

            img.onload = () => {
                // Set canvas dimensions to match the displayed image dimensions
                // to ensure accurate coordinate mapping
                const displayWidth = imageRef.current.width;
                const displayHeight = imageRef.current.height;

                canvas.width = displayWidth;
                canvas.height = displayHeight;

                // Draw the image scaled to fit the canvas
                ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
            };
            img.src = imageSrc;
        }
    }, [imageSrc]); // We might need to handle resize events as well for a fully robust solution

    // Get color at mouse position
    const getColorData = (e) => {
        if (!canvasRef.current || !imageSrc) return null;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Get mouse coordinates relative to the canvas
        const rect = canvas.getBoundingClientRect();

        // Calculate scaling factors in case the rendered size differs from actual size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        // Ensure coordinates are within bounds
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            return rgbToHex(pixel[0], pixel[1], pixel[2]);
        }
        return null;
    };

    const handleMouseMove = (e) => {
        const color = getColorData(e);
        if (color) {
            setHoverColor(color);
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleImageClick = (e) => {
        const color = getColorData(e);
        if (color) {
            setSelectedColor(color);
        }
    };

    // Utility to convert RGB to HEX
    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    // Utility to convert HEX to RGB
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const clearImage = () => {
        setImageSrc(null);
        setSelectedColor('#ffffff');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const rgbColor = hexToRgb(selectedColor) || { r: 255, g: 255, b: 255 };
    const rgbString = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

    return (
        <>
            <SEO
                title="Image Color Picker Tool - Indian Webify"
                description="Extract beautiful colors from any image. Upload a picture and click to pick specific hex and RGB color codes instantly."
                keywords="color picker, image color extractor, find color from image, hex color tool, Indian Webify tools"
                url="/tools/colorpicker"
                image="/indianwebify.png"
            />
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-24 pb-12 bg-gradient-to-r from-[#6d123f] to-[#9a1d5a] text-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                                <Droplet className="w-10 h-10 text-[#e6961d]" />
                                Image Color Picker
                            </h1>
                            <p className="text-xl text-white/90">
                                Upload any image and extract accurate colors instantly
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-12 flex-grow">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column - Image Workspace */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            {imageSrc ? <><ImageIcon className="w-5 h-5 text-[#6d123f]" /> Image Canvas</> : <><Upload className="w-5 h-5 text-[#6d123f]" /> Upload Image</>}
                                        </h2>
                                        {imageSrc && (
                                            <button
                                                onClick={clearImage}
                                                className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                                            >
                                                <X className="w-4 h-4" /> Clear Image
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        {!imageSrc ? (
                                            // Upload Area
                                            <div
                                                className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ease-in-out
                                  ${isDragging ? 'border-[#e6961d] bg-orange-50' : 'border-gray-300 hover:border-[#6d123f] hover:bg-pink-50/30'}
                                  flex flex-col items-center justify-center min-h-[400px] cursor-pointer`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300
                                        ${isDragging ? 'bg-[#e6961d]/20 text-[#e6961d]' : 'bg-gray-100 text-gray-400'}`}>
                                                    <Upload className="w-10 h-10" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-700 mb-2">Drag & Drop your image</h3>
                                                <p className="text-gray-500 mb-6">or click to browse from your computer</p>
                                                <button className="px-6 py-3 bg-[#6d123f] text-white font-medium rounded-lg hover:bg-[#8a1851] transition-colors shadow-md hover:shadow-lg">
                                                    Select Image
                                                </button>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileUpload}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </div>
                                        ) : (
                                            // Image Display & Picker Area
                                            <div className="relative group rounded-xl overflow-hidden bg-gray-100 min-h-[400px] flex items-center justify-center shadow-inner cursor-crosshair">

                                                {/* Hidden canvas for pixel data reading */}
                                                <canvas ref={canvasRef} className="absolute opacity-0 pointer-events-none" />

                                                {/* Visible Image */}
                                                <img
                                                    ref={imageRef}
                                                    src={imageSrc}
                                                    alt="Uploaded to pick a color"
                                                    className="max-w-full max-h-[600px] object-contain block mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                                                    onMouseMove={handleMouseMove}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleImageClick}
                                                    crossOrigin="anonymous" // Important for external images if supported
                                                />

                                                {/* Hover Color Preview */}
                                                {isHovering && (
                                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/20 animate-fade-in z-10 pointer-events-none">
                                                        <div
                                                            className="w-10 h-10 rounded-lg shadow-inner ring-2 ring-black/10"
                                                            style={{ backgroundColor: hoverColor }}
                                                        ></div>
                                                        <div className="text-left font-mono">
                                                            <span className="block text-sm font-bold text-gray-800">{hoverColor}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Overlay instruction */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                                                    <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">Click anywhere to select color</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {imageSrc && (
                                    <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-200 text-sm flex gap-3 items-start">
                                        <CheckCircle className="w-5 h-5 shrink-0 text-[#e6961d]" />
                                        <p><strong>Pro tip:</strong> Click anywhere on the image above to capture the exact pixel color. Use the panel on the right to copy the color formats.</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Color Details */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <Droplet className="w-5 h-5 text-[#6d123f]" /> Selected Color
                                        </h2>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Big Color Preview */}
                                        <div
                                            className="w-full h-40 rounded-xl shadow-inner border border-black/5 transition-colors duration-300 relative group overflow-hidden"
                                            style={{ backgroundColor: selectedColor }}
                                        >
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <button
                                                    onClick={() => copyToClipboard(selectedColor)}
                                                    className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-white hover:scale-105 transition-all text-sm flex items-center gap-2"
                                                >
                                                    <Copy className="w-4 h-4" /> Copy Hex
                                                </button>
                                            </div>
                                        </div>

                                        {/* Color Values */}
                                        <div className="space-y-4">

                                            {/* HEX */}
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">HEX Color</label>
                                                <div className="flex justify-between items-center">
                                                    <code className="text-lg font-mono font-bold text-gray-800">{selectedColor}</code>
                                                    <button
                                                        onClick={() => copyToClipboard(selectedColor)}
                                                        className="p-2 text-gray-400 hover:text-[#6d123f] hover:bg-pink-50 rounded-lg transition-colors"
                                                        title="Copy HEX"
                                                    >
                                                        <Copy className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* RGB */}
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">RGB Color</label>
                                                <div className="flex justify-between items-center">
                                                    <code className="text-lg font-mono font-bold text-gray-800 text-sm sm:text-base">{rgbString}</code>
                                                    <button
                                                        onClick={() => copyToClipboard(rgbString)}
                                                        className="p-2 text-gray-400 hover:text-[#6d123f] hover:bg-pink-50 rounded-lg transition-colors"
                                                        title="Copy RGB"
                                                    >
                                                        <Copy className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Copied Notification */}
                                        <div className={`
                        transition-all duration-300 ease-in-out transform flex items-center gap-2 justify-center py-2 px-4 rounded-lg
                        ${copied ? 'opacity-100 translate-y-0 bg-green-50 text-green-700 border border-green-200' : 'opacity-0 translate-y-4 pointer-events-none'}
                    `}>
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">Copied to clipboard!</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
};

export default ColorPicker;
