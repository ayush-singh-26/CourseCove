function Footer() {
    return (
        <div className="mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
                <div>
                    <h1 className="text-3xl sm:text-3xl font-semibold text-purple-600 hover:text-purple-700 transition-colors my-5">Course-Cove</h1>
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">Empowering learners with personalized, interactive, and accessible education anytime, anywhere. Unlock your potential with our all-in-one learning platform.</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">Company</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+91 6389394206</li>
                        <li>ayushsinghtemp@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2025 -All Right Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
