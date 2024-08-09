import { useState, useEffect } from "react";
import Link from "next/link";
import CreateBlogModal from "@/components/Modals/CreateBlogModal";
import useBlogsStore from "@/store/useBlogsStore";
import useAuthStore from "@/store/useAuthStore";

const Blogs = () => {
  const { blogs, error, fetchBlogs } = useBlogsStore();
  const { userID, currentName, isLoggedIn, initialize } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initialize();
    fetchBlogs();
  }, [fetchBlogs, initialize]);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen flex justify-center py-[50px]">
      <div className="container">
        <h1 className="text-[40px] text-center">Blogs</h1>
        {error && <p className="flex justify-center mt-10">{error}</p>}
        <div className="flex items-center gap-2 mt-10">
          {isLoggedIn && (
            <>
              <Link
                href={"/profile"}
                title="Go to profile"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-[14px] rounded-full uppercase transition-all hover:scale-105 hover:shadow-sm"
              >
                {currentName.charAt(0)}
              </Link>
              <textarea
                onClick={openModal}
                placeholder="Create post?"
                className="w-full text-[17px] border-[1px] border-solid border-gray-400 rounded-lg py-[8px] px-[10px]"
              ></textarea>
            </>
          )}
        </div>
        <div className="w-full rounded-lg border-[1px] border-gray-400 p-[50px] mt-8">
          {blogs.length > 0 ? (
            <div className="flex flex-col gap-y-20">
              {blogs
                ?.sort((a, b) => new Date(b.id) - new Date(a.id))
                .map((item, index) => (
                  <div
                    key={index}
                    className="w-full border-b-[1px] border-gray-400 py-[30px]"
                  >
                    <div className="">{item.title}</div>
                    <p className="mt-8"> {item.description}</p>
                    <div className="mt-16">Posted by: {item.user.name}</div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              There is no blog to show
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <CreateBlogModal
          userID={userID}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          closeModal={() => {
            setShowModal(false);
          }}
          fetchBlogs={() => {
            fetchBlogs();
          }}
        />
      )}
    </div>
  );
};

export default Blogs;
