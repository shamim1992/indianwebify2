import React, { useState, useEffect } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { Copy, CheckCircle } from 'lucide-react';

const colorLuminance = (hex, lum) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
};

const getTextColor = (hex) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) return '#333333';
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#4a4a4a' : '#f5f5f5';
};

const getSecondaryTextColor = (hex) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) return '#7a7a7a';
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#7a7a7a' : '#c5c5c5';
};

const NeumorphismGenerator = () => {
    const [color, setColor] = useState('#e0e5ec');
    const [size, setSize] = useState(300);
    const [radius, setRadius] = useState(50);
    const [distance, setDistance] = useState(20);
    const [intensity, setIntensity] = useState(0.15);
    const [blur, setBlur] = useState(60);
    const [shape, setShape] = useState('flat'); // 'flat', 'pressed', 'concave', 'convex'
    const [copied, setCopied] = useState(false);

    const [cssCode, setCssCode] = useState('');

    const textColor = getTextColor(color);
    const secondaryTextColor = getSecondaryTextColor(color);

    useEffect(() => {
        const lightColor = colorLuminance(color, intensity);
        const darkColor = colorLuminance(color, -intensity);

        const gradientLight = colorLuminance(color, 0.05);
        const gradientDark = colorLuminance(color, -0.05);

        let background = color;
        if (shape === 'concave') {
            background = `linear-gradient(145deg, ${gradientDark}, ${gradientLight})`;
        } else if (shape === 'convex') {
            background = `linear-gradient(145deg, ${gradientLight}, ${gradientDark})`;
        }

        let boxShadow = '';
        if (shape === 'pressed') {
            boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkColor}, inset -${distance}px -${distance}px ${blur}px ${lightColor}`;
        } else {
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`;
        }

        setCssCode(`border-radius: ${radius}px;
background: ${shape === 'flat' || shape === 'pressed' ? color : background};
box-shadow: ${boxShadow};`);

    }, [color, size, radius, distance, intensity, blur, shape]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <SEO
                title="Neumorphism Generator - Indian Webify"
                description="Generate soft UI CSS code. Create beautiful neumorphic designs with customizable shadows, colors, and shapes."
                keywords="neumorphism, generator, soft UI, CSS generator, neumorphic design"
                url="/tools/neumorphism"
            />
            <div className="min-h-screen flex flex-col font-sans transition-colors duration-300" style={{ backgroundColor: color }}>
                {/* Navbar has a white background originally, we might want it to stay intact so we let it be, 
                    but the tools page usually has a specific header. We'll leave it as is to not break site consistency. */}
                <div className="bg-white">
                    <Navbar />
                </div>

                {/* Main Content */}
                <main className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 p-6 lg:p-12 pt-32 pb-24" style={{ backgroundColor: color }}>

                    {/* Left Panel: Preview */}
                    <div className="flex-1 flex items-center justify-center w-full max-w-lg min-h-[400px]">
                        <div
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                borderRadius: `${radius}px`,
                                background: shape === 'flat' || shape === 'pressed'
                                    ? color
                                    : (shape === 'concave'
                                        ? `linear-gradient(145deg, ${colorLuminance(color, -0.05)}, ${colorLuminance(color, 0.05)})`
                                        : `linear-gradient(145deg, ${colorLuminance(color, 0.05)}, ${colorLuminance(color, -0.05)})`),
                                boxShadow: shape === 'pressed'
                                    ? `inset ${distance}px ${distance}px ${blur}px ${colorLuminance(color, -intensity)}, inset -${distance}px -${distance}px ${blur}px ${colorLuminance(color, intensity)}`
                                    : `${distance}px ${distance}px ${blur}px ${colorLuminance(color, -intensity)}, -${distance}px -${distance}px ${blur}px ${colorLuminance(color, intensity)}`,
                                transition: 'all 0.3s ease'
                            }}
                        ></div>
                    </div>

                    {/* Right Panel: Controls */}
                    <div
                        className="w-full max-w-md rounded-[40px] p-8 md:p-10 transition-all duration-300"
                        style={{
                            background: color,
                            boxShadow: `10px 10px 30px ${colorLuminance(color, -intensity * 0.8)}, -10px -10px 30px ${colorLuminance(color, intensity * 0.8)}`
                        }}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="text-3xl font-bold tracking-wide" style={{ color: textColor }}>Neumorphism</h1>
                            <div className="flex items-center">
                                <span className="font-mono text-lg font-semibold mr-3 uppercase tracking-wider" style={{ color: textColor }}>{color}</span>
                                <div
                                    className="w-10 h-10 rounded-[10px] overflow-hidden relative cursor-pointer outline-none"
                                    style={{
                                        boxShadow: `4px 4px 8px ${colorLuminance(color, -0.15)}, -4px -4px 8px ${colorLuminance(color, 0.15)}`
                                    }}
                                >
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute top-[-20px] left-[-20px] w-24 h-24 cursor-pointer opacity-0 z-10"
                                    />
                                    <div className="w-full h-full" style={{ backgroundColor: color }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Shape selector - beautifully neumorphic */}
                        <div className="mb-10 grid grid-cols-4 gap-4">
                            {['flat', 'pressed', 'concave', 'convex'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setShape(s)}
                                    className="py-3 rounded-2xl font-bold uppercase tracking-wider text-[10px] transition-all duration-300 outline-none flex items-center justify-center text-center"
                                    style={{
                                        background: color,
                                        color: shape === s ? (textColor === '#f5f5f5' ? '#e6961d' : '#e6961d') : textColor,
                                        boxShadow: shape === s
                                            ? `inset 4px 4px 8px ${colorLuminance(color, -intensity * 0.6)}, inset -4px -4px 8px ${colorLuminance(color, intensity * 0.6)}`
                                            : `4px 4px 8px ${colorLuminance(color, -intensity * 0.6)}, -4px -4px 8px ${colorLuminance(color, intensity * 0.6)}`
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Sliders */}
                        <div className="space-y-7">
                            {[
                                { label: 'Size', value: size, setter: setSize, min: 50, max: 400, step: 1 },
                                { label: 'Radius', value: radius, setter: setRadius, min: 0, max: 200, step: 1 },
                                { label: 'Distance', value: distance, setter: setDistance, min: 0, max: 50, step: 1 },
                                { label: 'Intensity', value: intensity, setter: setIntensity, min: 0.01, max: 0.6, step: 0.01 },
                                { label: 'Blur', value: blur, setter: setBlur, min: 0, max: 100, step: 1 },
                            ].map((control) => (
                                <div key={control.label}>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: secondaryTextColor }}>{control.label}</label>
                                        <span className="text-sm font-mono font-semibold" style={{ color: textColor }}>{control.value}</span>
                                    </div>
                                    <div
                                        className="h-4 w-full rounded-full relative"
                                        style={{
                                            background: color,
                                            boxShadow: `inset 3px 3px 6px ${colorLuminance(color, -intensity * 0.5)}, inset -3px -3px 6px ${colorLuminance(color, intensity * 0.5)}`
                                        }}
                                    >
                                        <input
                                            type="range"
                                            min={control.min} max={control.max} step={control.step || 1}
                                            value={control.value}
                                            onChange={(e) => control.setter(Number(e.target.value))}
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div
                                            className="absolute top-[2px] bottom-[2px] left-[2px] rounded-full pointer-events-none transition-all duration-100 placeholder"
                                            style={{
                                                width: `calc(${(control.value - control.min) / (control.max - control.min) * 100}% - 4px)`,
                                                background: textColor === '#f5f5f5' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                            }}
                                        ></div>
                                        <div
                                            className="absolute w-6 h-6 rounded-full pointer-events-none top-1/2 -translate-y-1/2 -ml-3 transition-shadow"
                                            style={{
                                                left: `${(control.value - control.min) / (control.max - control.min) * 100}%`,
                                                background: color,
                                                boxShadow: `3px 3px 6px ${colorLuminance(color, -intensity * 0.8)}, -3px -3px 6px ${colorLuminance(color, intensity * 0.8)}`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Code output */}
                        <div className="mt-10">
                            <div
                                className="rounded-2xl overflow-hidden p-6 relative transition-all duration-300"
                                style={{
                                    boxShadow: `inset 5px 5px 10px ${colorLuminance(color, -intensity * 0.6)}, inset -5px -5px 10px ${colorLuminance(color, intensity * 0.6)}`
                                }}
                            >
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 z-10"
                                    style={{
                                        color: copied ? (textColor === '#f5f5f5' ? '#34d399' : '#059669') : textColor,
                                        boxShadow: copied
                                            ? `inset 2px 2px 5px ${colorLuminance(color, -intensity * 0.4)}, inset -2px -2px 5px ${colorLuminance(color, intensity * 0.4)}`
                                            : `3px 3px 6px ${colorLuminance(color, -intensity * 0.4)}, -3px -3px 6px ${colorLuminance(color, intensity * 0.4)}`
                                    }}
                                >
                                    {copied ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                                </button>
                                <pre className="text-sm font-mono whitespace-pre-wrap pt-8" style={{ color: textColor }}>
                                    {cssCode}
                                </pre>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="bg-white">
                    <FooterSection />
                </div>
            </div>
        </>
    );
};

export default NeumorphismGenerator;
