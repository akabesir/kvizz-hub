import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { BiHelpCircle, BiLogOut, } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, } from "react-icons/ai";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.css'
const routes = [
  {
    path: "/community",
    name: "Community",
    icon: <FaHome />,
  },
  {
    path: "/myProfile",
    name: "My Profile",
    icon: <FaUser />,
  },
  
  
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    
   
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
  {
    path: "/help",
    name: "FAQ",
    icon: <BiHelpCircle />,
  },
  {
    path: "/contact",
    name: "Contact Us",
    icon: <MdOutlineContacts />,
  },
  {
    path: "/login",
    name: <span style={{ color: "red" }}>Log Out</span>,
    icon: <BiLogOut />,
    
  },
 
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  MyWorkspace
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              

              return (
                <NavLink to={route.path} key={index} className="link">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main></main>
      </div>
    </>
  );
};

export default SideBar;
