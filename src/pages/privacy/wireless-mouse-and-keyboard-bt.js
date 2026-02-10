import React from 'react';
import Navbar from '@/components/header/Navbar';
import FooterSection from '@/components/footer/FooterSection';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Bluetooth, Bell, Smartphone, Info, Mail, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            id: 'collection',
            icon: <Eye className="w-6 h-6 text-[#e6961d]" />,
            title: '1. Information Collection',
            content: (
                <>
                    <p className="font-semibold mb-2">1.1 We Do Not Collect Personal Data</p>
                    <p className="mb-4 text-gray-600">We do not collect, store, or process:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600">
                        <li>Name, email address, or phone number</li>
                        <li>Physical address or location data</li>
                        <li>User accounts or login credentials</li>
                        <li>Keystrokes, mouse movements, or input transmitted through the App</li>
                        <li>Contacts, photos, files, camera, or microphone data</li>
                    </ul>
                    <p className="mt-4 text-gray-600 font-medium">The App works locally on your device and does not transmit user input to any server.</p>
                </>
            )
        },
        {
            id: 'bluetooth',
            icon: <Bluetooth className="w-6 h-6 text-[#e6961d]" />,
            title: '2. Bluetooth Usage',
            content: (
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>The App uses Bluetooth to function as a wireless Human Interface Device (HID).</li>
                    <li>Communication occurs directly between your phone and the paired device.</li>
                    <li>No Bluetooth data, device names, pairing details, or usage activity is transmitted to us.</li>
                    <li>We do not operate servers that receive Bluetooth data.</li>
                </ul>
            )
        },
        {
            id: 'advertising',
            icon: <Lock className="w-6 h-6 text-[#e6961d]" />,
            title: '3. Advertising (Google AdMob)',
            content: (
                <>
                    <p className="mb-4 text-gray-600">The App uses Google AdMob to display advertisements. AdMob may automatically collect certain non-personal information, including:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                        <li>Advertising ID</li>
                        <li>Device model and operating system version</li>
                        <li>Ad interaction data (impressions and clicks)</li>
                    </ul>
                    <p className="text-gray-600 mb-4">
                        This information is collected and processed by Google according to Google’s Privacy Policy:
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e6961d] hover:underline ml-1">
                            https://policies.google.com/privacy
                        </a>
                    </p>
                    <p className="text-gray-600 italic">We do not access or store personally identifiable information through AdMob. You can reset or limit your Advertising ID in: Settings &gt; Privacy &gt; Ads</p>
                </>
            )
        },
        {
            id: 'permissions',
            icon: <ShieldCheck className="w-6 h-6 text-[#e6961d]" />,
            title: '4. Permissions',
            content: (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="px-4 py-2 border-b font-semibold text-gray-900">Permission</th>
                                <th className="px-4 py-2 border-b font-semibold text-gray-900">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td className="px-4 py-2 border-b">Bluetooth / Bluetooth Admin</td>
                                <td className="px-4 py-2 border-b">Discover and communicate with nearby devices (Android 11 and below)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Bluetooth Scan</td>
                                <td className="px-4 py-2 border-b">Find available devices (not used for location tracking)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Bluetooth Connect</td>
                                <td className="px-4 py-2 border-b">Connect to paired devices</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Bluetooth Advertise</td>
                                <td className="px-4 py-2 border-b">Allow device to act as a Bluetooth HID</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Foreground Service</td>
                                <td className="px-4 py-2 border-b">Maintain stable Bluetooth connection</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Notifications</td>
                                <td className="px-4 py-2 border-b">Show connection status while active</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-4 text-gray-600 italic">Bluetooth permissions are used solely for remote control functionality.</p>
                </div>
            )
        },
        {
            id: 'storage',
            icon: <Smartphone className="w-6 h-6 text-[#e6961d]" />,
            title: '5. Data Storage',
            content: (
                <p className="text-gray-600">
                    All operational data remains locally on your device. We do not maintain remote servers or cloud storage for user data.
                </p>
            )
        },
        {
            id: 'sharing',
            icon: <Info className="w-6 h-6 text-[#e6961d]" />,
            title: '6. Data Sharing',
            content: (
                <p className="text-gray-600">
                    We do not sell, trade, or share user data. The only third-party service used is Google AdMob for advertising purposes.
                </p>
            )
        }
    ];

    const additionalSections = [
        { title: "7. Children's Privacy", content: "The App is not intended for children under 13. We do not knowingly collect personal information from children." },
        { title: "8. Security", content: "Because the App does not collect or store personal data externally, the risk of data breach is minimized. Bluetooth communication relies on Android’s built-in security protocols." },
        {
            title: "9. Your Controls", content: (
                <>
                    <p className="mb-2">You may:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-600">
                        <li>Revoke Bluetooth permissions in device settings</li>
                        <li>Disable notifications in device settings</li>
                        <li>Reset or opt out of personalized ads</li>
                    </ul>
                    <p className="mt-2 text-gray-600 italic">Please note: The App cannot function without Bluetooth permissions.</p>
                </>
            )
        },
        { title: "10. Changes to This Policy", content: "We may update this Privacy Policy periodically. Updates will be reflected by revising the “Last Updated” date." },
        {
            title: "11. Contact", content: (
                <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-5 h-5 text-[#e6961d]" />
                    <span>For questions regarding this Privacy Policy: <a href="mailto:mhsdigitalhub@gmail.com" className="text-[#e6961d] hover:underline">mhsdigitalhub@gmail.com</a></span>
                </div>
            )
        }
    ];

    return (
        <>
            <SEO
                title="Privacy Policy - Wireless Mouse & Keyboard BT"
                description="Privacy Policy for Wireless Mouse & Keyboard BT. Learn how we handle your data and respect your privacy."
                keywords="privacy policy, wireless mouse, keyboard bt, bluetooth mouse app, privacy"
                url="/privacy/wireless-mouse-and-keyboard-bt"
            />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />

                {/* Hero Header */}
                <section className="pt-32 pb-16 bg-[#6d123f] text-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                            <p className="text-xl text-[#e6961d] font-semibold mb-2">Wireless Mouse & Keyboard BT</p>
                            <p className="text-white/70">Last Updated: February 10, 2026</p>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 flex-grow">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className="p-8 md:p-12">
                                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                                    <strong>Wireless Mouse & Keyboard BT</strong> (“the App”, “we”, “our”) respects your privacy. This Privacy Policy explains how information is handled when you use the App.
                                </p>

                                <div className="space-y-12">
                                    {sections.map((section) => (
                                        <div key={section.id} className="scroll-mt-32">
                                            <div className="flex items-center space-x-4 mb-6">
                                                <div className="p-3 bg-gray-50 rounded-xl">
                                                    {section.icon}
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                            </div>
                                            <div className="pl-0 md:pl-16">
                                                {section.content}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                        {additionalSections.map((section, idx) => (
                                            <div key={idx} className="bg-gray-50 p-6 rounded-xl">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                                                <div className="text-gray-600 text-sm leading-relaxed">
                                                    {section.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>


                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
};

export default PrivacyPolicy;
