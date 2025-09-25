import Image from "next/image";
import React from "react";
import ishop from "@/assest/images/ishop.svg";
import facebook from "@/assest/images/facebook.png";
import twitter from "@/assest/images/twitter.png";
import visa from "@/assest/images/visa.png";
import Paypal from "@/assest/images/Paypal.png";
import master_card from "@/assest/images/master_card.png";
import Western_union from "@/assest/images/Western_union.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="w-full border-y text-gray-400">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
            {/* About Section */}
            <div className="flex flex-col gap-4">
              <Image src={ishop} alt="ishop" />
              <p>
                Your one-stop destination for the latest electronic gadgets and accessories. Explore top-quality products, unbeatable prices, and seamless shopping experiences. Shop smart, shop with us!
              </p>
            </div>

            {/* Follow Us Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
              <p>
                Stay connected with us! Follow us on Facebook and Twitter for the latest updates, exclusive deals, and more.
              </p>
              <div className="flex gap-4 items-center">
                <Link href={"#"}>
                  <Image src={facebook} alt="facebook" className="w-6 h-6" />
                </Link>
                <Link href={"#"}>
                  <Image src={twitter} alt="twitter" className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
              <p>
                iShop: address @building 124 <br />
                Call us now: 6350587050 <br />
                Email: Shardaritik17@gmail.com
              </p>
            </div>
          </div>

          <div className="w-full my-10 bg-gray-300 h-[1px]"></div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {["Information", "Service", "Extras", "My Account", "Useful Links", "Our Offers"].map((section) => (
              <div key={section}>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">{section}</h4>
                <ul className="space-y-2">
                  <li>About</li>
                  <li>Information</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-gray-200">
        <div className="max-w-[1100px] py-6 mx-auto px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-end gap-6">
          <Link href={"#"}>
            <Image src={visa} alt="visa" className="w-10 h-6" />
          </Link>
          <Link href={"#"}>
            <Image src={Paypal} alt="Paypal" className="w-10 h-6" />
          </Link>
          <Link href={"#"}>
            <Image src={master_card} alt="master_card" className="w-10 h-6" />
          </Link>
          <Link href={"#"}>
            <Image src={Western_union} alt="Western_union" className="w-10 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;