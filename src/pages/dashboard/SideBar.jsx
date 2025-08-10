// import React from "react";
// import { NavLink, Link } from "react-router";
// import { FaHome, FaListAlt, FaPlusCircle, FaRecycle } from "react-icons/fa";

// const SideBar = ({ onClose }) => {
//   return (
//     <>
//       <div className="flex items-center gap-2 mb-8">
//         <span className="text-2xl font-bold tracking-wide">🔍 WhereIsIt</span>
//         {/* Close button for mobile sidebar */}
//         {onClose && (
//           <button
//             className="btn btn-sm btn-circle btn-ghost ml-auto lg:hidden"
//             onClick={onClose}
//             aria-label="Close Sidebar"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//       <nav className="flex-1 space-y-2">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             `btn btn-ghost w-full justify-start ${isActive ? "btn-primary text-white" : ""}`
//           }
//           onClick={onClose}
//         >
//           <FaHome className="mr-2" /> Home
//         </NavLink>
//         <NavLink
//           to="/dashboard/myPost"
//           className={({ isActive }) =>
//             `btn btn-ghost w-full justify-start ${isActive ? "btn-primary text-white" : ""}`
//           }
//           onClick={onClose}
//         >
//           <FaListAlt className="mr-2" /> Manage My Item
//         </NavLink>
//         <NavLink
//           to="/dashboard/addPost"
//           className={({ isActive }) =>
//             `btn btn-ghost w-full justify-start ${isActive ? "btn-primary text-white" : ""}`
//           }
//           onClick={onClose}
//         >
//           <FaPlusCircle className="mr-2" /> Add Item
//         </NavLink>
//         <NavLink
//           to="/dashboard/recovered"
//           className={({ isActive }) =>
//             `btn btn-ghost w-full justify-start ${isActive ? "btn-primary text-white" : ""}`
//           }
//           onClick={onClose}
//         >
//           <FaRecycle className="mr-2" /> Recovery Item
//         </NavLink>
//       </nav>

//       <div className="mt-8">
//         <Link to="/" className="btn btn-secondary w-full" onClick={onClose}>
//           ← Back Home
//         </Link>
//       </div>
//     </>
//   );
// };

// export default SideBar;
