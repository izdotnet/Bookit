import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer__bg">
      <div className="footer__container">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <p className="text-base text-gray-500 ">
            Bookit 2023 - All rights reserved &copy;
          </p>
        </div>
        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20">
          <Link className="footer__link" href="/">
            Home
          </Link>
          <Link className="footer__link" href="/">
            Legal
          </Link>
          <Link className="footer__link" href="/">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
