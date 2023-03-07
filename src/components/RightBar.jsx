import React from "react";
import { Link } from "react-router-dom";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { MdOutlineArticle, MdArticle } from "react-icons/md";
export default function RightBar() {
  const [current, setCurrent] = React.useState("Blog and Articles");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
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
      <div className="flex my-2 gap-2 flex-col max-w-48 p-2  h-full">
        {Pages.map((page) => (
          <Link
            to={page.path}
            key={page.name}
            className={`${current === page.name ? "bg-gray-700" : "bg-gray-800"}
            hover:bg-gray-700 text-white p-2 gap-2  flex rounded-md`}
            onClick={() => setCurrent(page.name)}
          >
            <div className="flex items-center gap-2">
              {current === page.name ? page.icons.active : page.icons.inactive}
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
    </div>
  );
}

const Pages = [
  {
    name: "Blog and Articles",
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
];
