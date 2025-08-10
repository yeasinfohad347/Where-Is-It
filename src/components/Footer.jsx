import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-base-100 text-text mt-20">
      <div className="flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 max-w-7xl">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="/"
            className="flex justify-center space-x-3 lg:justify-start items-center"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
              <img className="rounded-full" src={logo} alt="WhereIsIt Logo" />
            </div>
            <span className="self-center text-2xl font-semibold text-primary">
              WhereIsIt
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-primary">Product</h3>
            <ul className="space-y-1 ">
              <li>
                <a href="#" className="hover:text-primary transition">Features</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">Success Stories</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">Lost & Found</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-primary">Company</h3>
            <ul className="space-y-1 ">
              <li>
                <a href="#" className="hover:text-primary transition">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase text-primary">Developers</h3>
            <ul className="space-y-1 ">
              <li>
                <a href="#" className="hover:text-primary transition">API</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">Docs</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">GitHub</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="uppercase text-primary">Social media</div>
            <div className="flex justify-start space-x-3 text-secondary">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="flex items-center p-1 hover:text-primary transition"
              >
                {/* Facebook SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                className="flex items-center p-1 hover:text-primary transition"
              >
                {/* Twitter SVG */}
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="flex items-center p-1 hover:text-primary transition"
              >
                {/* Instagram SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 text-sm text-center ">
        © {new Date().getFullYear()} WhereIsIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
