import React from 'react';
import Link from 'next/link';
import { Pipette, Code2, Layers } from 'lucide-react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import useInView from '@/hooks/useInView';

const tools = [
    {
        title: 'Color Picker',
        description: 'Extract exact HEX and RGB colors from any image effortlessly. Perfect for designers and developers.',
        link: '/tools/colorpicker',
        icon: <Pipette className="text-5xl mb-4" />
    },
    {
        title: 'Neumorphism Generator',
        description: 'Generate beautiful soft UI CSS code. Create custom neumorphic designs with customizable shadows and shapes.',
        link: '/tools/neumorphism',
        icon: <Layers className="text-5xl mb-4" />
    }
];

const ToolsPage = () => {
    const [ref, inView] = useInView();

    return (
        <>
            <SEO
                title="Tools - Indian Webify"
                description="Explore our range of digital tools designed to boost your productivity. Extract colors, analyze code, and more with Indian Webify's toolkit."
                keywords="tools, digital tools, Indian Webify, color picker, developer tools"
                url="/tools"
                image="/logo2.png"
            />
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Navbar />

                {/* Hero block for tools */}
                <section className="pt-32 pb-20 bg-[#6d123f] text-white relative flex-grow-0 overflow-hidden">
                    <div className="container mx-auto px-6 text-center relative z-10 animate-fade-in-down">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-[#e6961d]">Digital Tools</span>
                        </h1>
                        <div className="w-24 h-1 bg-[#e6961d] mx-auto mb-6 rounded-full"></div>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                            Empower your workflow with our suite of free digital tools. Designed for developers, designers, and everyday creators to simplify complex tasks.
                        </p>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white mix-blend-overlay filter blur-3xl animate-blob"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#e6961d] mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    </div>
                </section>

                {/* Tools Grid Section */}
                <section className="py-20 md:py-28 flex-grow bg-gray-50 relative z-20">
                    <div className="container mx-auto px-6" ref={ref}>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                            {tools.map((tool, index) => (
                                <Link href={tool.link} key={index}>
                                    <div
                                        className="h-full bg-white rounded-2xl p-8 transition-transform duration-300 shadow-lg hover:-translate-y-2 hover:shadow-[0px_10px_30px_rgba(230,150,29,0.25)] flex flex-col items-center text-center border border-gray-100 group cursor-pointer"
                                        style={{ animationDelay: `${index * 0.15}s` }}
                                    >
                                        <div className="text-[#e6961d] mb-4 bg-orange-50 p-4 rounded-full group-hover:bg-[#e6961d] group-hover:text-white transition-colors duration-300">
                                            {tool.icon}
                                        </div>
                                        <h3 className="mb-4 text-[#6d123f] font-bold text-2xl group-hover:text-[#b45309] transition-colors">{tool.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-base">
                                            {tool.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}

                            {/* Coming Soon Card */}
                            <div className="h-full bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center text-gray-400 transition-all duration-300 hover:border-gray-400 hover:bg-gray-100">
                                <div className="text-gray-300 mb-4 bg-gray-100 p-4 rounded-full">
                                    <Code2 className="text-5xl" />
                                </div>
                                <h3 className="mb-3 font-bold text-xl text-gray-500">More Tools Coming</h3>
                                <p className="text-sm px-4">We are constantly building new utilities. Stay tuned for updates!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
};

export default ToolsPage;
