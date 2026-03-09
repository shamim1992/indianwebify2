import React, { useState } from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { MonitorSmartphone, Search, Smartphone, Tablet, Laptop, Monitor, Maximize } from 'lucide-react';

const ResponseChecker = () => {
    const [urlInput, setUrlInput] = useState('');
    const [activeUrl, setActiveUrl] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('Responsive');
    const [iframeDimensions, setIframeDimensions] = useState({ width: '100%', height: '100%' });

    const devices = [
        { name: 'Responsive', icon: <Maximize className="w-5 h-5" />, width: '100%', height: '100%' },
        { name: 'Mobile', icon: <Smartphone className="w-5 h-5" />, width: '375px', height: '667px' },
        { name: 'Tablet', icon: <Tablet className="w-5 h-5" />, width: '768px', height: '1024px' },
        { name: 'Laptop', icon: <Laptop className="w-5 h-5" />, width: '1280px', height: '800px' },
        { name: 'Desktop', icon: <Monitor className="w-5 h-5" />, width: '1920px', height: '1080px' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        let formattedUrl = urlInput;
        // Ensure URL has http or https
        if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'https://' + formattedUrl;
        }
        setActiveUrl(formattedUrl);
    };

    const handleDeviceChange = (device) => {
        setSelectedDevice(device.name);
        setIframeDimensions({ width: device.width, height: device.height });
    };

    return (
        <>
            <SEO
                title="Responsiveness Checker Tool - Indian Webify"
                description="Test your website's responsive design across different device sizes including mobile, tablet, laptop, and desktop."
                keywords="responsiveness checker, responsive design testing, mobile friendly test, web development tools, Indian Webify"
                url="/tools/response-checker"
                image="/indianwebify.png"
            />
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-24 pb-12 bg-gradient-to-r from-[#6d123f] to-[#9a1d5a] text-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                                <MonitorSmartphone className="w-10 h-10 text-[#e6961d]" />
                                Responsiveness Checker
                            </h1>
                            <p className="text-xl text-white/90">
                                Instantly preview how a website looks on different screen sizes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-8 flex-grow flex flex-col items-center">
                    <div className="container mx-auto px-4 w-full flex flex-col flex-grow items-center">

                        {/* URL Bar & Controls */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6 w-full max-w-5xl z-10 sticky top-20">
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                                {/* URL Form */}
                                <form onSubmit={handleSubmit} className="flex-grow flex w-full md:w-auto">
                                    <div className="relative flex-grow flex items-center">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6d123f] focus:border-[#6d123f] sm:text-sm transition duration-150 ease-in-out"
                                            placeholder="Enter website URL (e.g., example.com)"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="py-3 px-6 border border-transparent text-sm leading-5 font-medium rounded-r-lg text-white bg-[#6d123f] hover:bg-[#8a1851] focus:outline-none focus:shadow-outline-pink transition duration-150 ease-in-out"
                                        >
                                            Check
                                        </button>
                                    </div>
                                </form>

                                {/* Device Selector Toolbar */}
                                <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
                                    {devices.map((device) => (
                                        <button
                                            key={device.name}
                                            onClick={() => handleDeviceChange(device)}
                                            className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap gap-2
                                                ${selectedDevice === device.name
                                                    ? 'bg-white text-[#6d123f] shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                                }`}
                                            title={device.name}
                                        >
                                            {device.icon}
                                            <span className="hidden sm:inline">{device.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-grow w-full bg-gray-200 rounded-xl overflow-auto border-4 border-gray-300 shadow-inner flex items-center justify-center p-4 min-h-[500px]">
                            {activeUrl ? (
                                <div
                                    className="bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden relative"
                                    style={{
                                        width: iframeDimensions.width,
                                        height: selectedDevice === 'Responsive' ? '100%' : iframeDimensions.height,
                                        maxWidth: '100%',
                                        maxHeight: selectedDevice === 'Responsive' ? '100%' : 'none',
                                    }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-gray-300 pointer-events-none rounded-sm"></div>
                                    <iframe
                                        title="Responsive Preview"
                                        src={activeUrl}
                                        className="w-full h-full border-none"
                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 flex flex-col items-center">
                                    <MonitorSmartphone className="w-16 h-16 mb-4 text-gray-300" />
                                    <h3 className="text-xl font-medium text-gray-500">No URL Provided</h3>
                                    <p className="mt-2 text-sm">Enter a URL in the bar above to see the responsiveness check.</p>
                                </div>
                            )}
                        </div>

                        {/* Info banner */}
                        <div className="w-full max-w-5xl mt-6">
                            <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-200 text-sm flex gap-3 text-left">
                                <MonitorSmartphone className="w-5 h-5 shrink-0 text-[#e6961d]" />
                                <p><strong>Note:</strong> Some websites have security settings (like `X-Frame-Options`) that prevent them from being displayed in an iframe. If you see a blank box, the target website might be restricting display.</p>
                            </div>
                        </div>

                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
};

export default ResponseChecker;
