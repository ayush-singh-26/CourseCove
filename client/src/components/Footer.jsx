import React from "react";
import { assets } from "../../assets/assets";
function Footer() {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor similique, quos neque eos nam, blanditiis incidunt repudiandae facilis distinctio quis laboriosam id ipsa magni officiis earum odit accusamus tempore corporis minima quasi adipisci error. Quo maxime illo ratione non saepe?</p>
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
                <p className="py-5 text-sm text-center">Copyright 2024@ Prescripto -All Right Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
