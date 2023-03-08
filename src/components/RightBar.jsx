import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { MdOutlineArticle, MdArticle } from "react-icons/md";
export default function RightBar() {
  const [current, setCurrent] = useState("Articles");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  return (
    <div className="h-screen bg-gray-800">
      <div
        className={`flex gap-2 flex-col justify-between items-center p-2 ${
          open ? "w-48 max-w-48" : "w-12"
        }`}
      >
        {Pages.map((page) => (
          <div key={page.Group} className="flex flex-col w-full gap-2">
            <p className="text-gray-400 text-sm">{page.Group}</p>
            {page.Pages.map((page) => (
              <Link
                to={page.path}
                key={page.name}
                className={`${
                  current === page.name ? "bg-gray-700" : "bg-gray-800"
                }
              hover:bg-gray-700 text-white p-2 gap-2 w-full flex rounded-md`}
                onClick={() => setCurrent(page.name)}
              >
                <div className="flex items-center gap-2">
                  {current === page.name
                    ? page.icons.active
                    : page.icons.inactive}
                </div>
                <p>
                  {
                    open
                      ? page.name
                      : "" /* If the screen is less than 768px then the text will not be displayed */
                  }
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Pages = [
  {
    Group: "Blog",
    Pages: [
      {
        name: "Articles",
        path: "/Articles",
        icons: {
          active: <MdArticle size={20} />,
          inactive: <MdOutlineArticle size={20} />,
        },
      },
      {
        name: "Users",
        path: "/users",
        icons: {
          active: <RiUser3Fill size={20} />,
          inactive: <RiUser3Line size={20} />,
        },
      },
    ],
  },
  {
    Group: "CRM",
    Pages: [
      {
        name: "Clients",
        path: "/clients",
        icons: {
          active: <RiUser3Fill size={20} />,
          inactive: <RiUser3Line size={20} />,
        },
      },
    ],
  },
];
