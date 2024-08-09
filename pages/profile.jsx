import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useBlogsStore from "@/store/useBlogsStore";
import EditModalBlog from "@/components/Modals/EditBlogModal";
import DeleteBlogModal from "@/components/Modals/DeleteBlogModal";

const Profile = () => {
  const { userID, currentName, posts, isLoggedIn, initialize } = useAuthStore();
  const { userBlogs, fetchUserBlogs } = useBlogsStore();
  // const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  console.log(userBlogs, "check");

  useEffect(() => {
    console.log("Fetching user blogs function:", fetchUserBlogs);
    initialize();
    fetchUserBlogs(userID);
  }, [initialize, userID, fetchUserBlogs]);

  const toggleOptions = (index) => {
    setShowOptions((prev) => (prev === index ? null : index));
  };

  const openEditModal = (blog) => {
    setShowOptions(null);
    setSelectedBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setShowEditModal(true);
  };

  const openDeleteModal = (blog) => {
    setShowOptions(null);
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="w-full min-h-dvh flex justify-center py-[50px]">
      <div className="container">
        {isLoggedIn ? (
          <>
            <div className="w-full flex flex-col justify-center items-center rounded-lg border-[1px] border-gray-400 py-[20px]">
              <div className="bg-red-500 hover:bg-red-600 text-[60px] text-white font-medium py-2 px-[34px] rounded-full uppercase transition-all hover:scale-105 hover:shadow-sm">
                {currentName.charAt(0)}
              </div>
              <div className="text-[32px] font-semibold text-gray-600 mt-4">
                {currentName}
              </div>
              <div className="text-[28px] font-semibold text-gray-600 mt-8">
                {posts}
              </div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div className="w-full flex flex-col rounded-lg border-[1px] border-gray-400 gap-y-10 p-[50px] mt-8">
              <div className="text-[21px] font-medium">Posts</div>
              {userBlogs
                ?.sort((a, b) => new Date(b.id) - new Date(a.id))
                .map((item, index) => (
                  <div key={index} className="border-b-[1px] border-gray-400">
                    <div className="flex justify-between">
                      <div>{item?.title}</div>
                      <div className="relative">
                        <button
                          onClick={() => toggleOptions(index)}
                          className="font-bold"
                        >
                          ...
                        </button>
                        {showOptions === index && (
                          <div className="w-36 absolute right-0 z-10 bg-white rounded-md shadow-sm shadow-gray-500 p-4">
                            <div className="flex flex-col items-start gap-y-4">
                              <button onClick={() => openEditModal(item)}>
                                Edit post
                              </button>
                              <button onClick={() => openDeleteModal(item)}>
                                Delete post
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="my-4">{item?.description}</div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            No content is available to show. Please log in.
          </div>
        )}
      </div>
      {showEditModal && (
        <EditModalBlog
          id={selectedBlog.id}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          closeModal={handleCloseModal}
        />
      )}
      {showDeleteModal && (
        <DeleteBlogModal
          id={selectedBlog.id}
          closeModal={handleCloseModal}
          fetchUserBlogs={() => fetchUserBlogs(userID)}
        />
      )}
    </div>
  );
};

export default Profile;
