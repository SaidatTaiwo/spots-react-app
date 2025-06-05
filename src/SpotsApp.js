import React, { useRef, useEffect, useState } from 'react';
import './SpotsApp.css';

const SpotsApp = () => {
  const postsContainerRef = useRef(null);
  const newPostBtnRef = useRef(null);
  const editProfileBtnRef = useRef(null);
  const newPostFormRef = useRef(null);
  const profileFormRef = useRef(null);
  const previewImageRef = useRef(null);
  const previewTitleRef = useRef(null);
  const postTitleRef = useRef(null);
  const postImageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const profileImageRef = useRef(null);

  const [posts, setPosts] = useState([
    {
      image: "/public/Circle 17 pictures/Val thorens.png",
      title: "Val thorens",
      liked: false
    },
    {
      image: "/public/Circle 17 pictures/Restaurant terrace.png",
      title: "Restaurant Terrace",
      liked: false
    },
    {
      image: "/public/Circle 17 pictures/An outdoor cafe.png" ,
      title: "An outdoor cafe",
      liked: false
    },
    {
      image: "/public/Circle 17 pictures/A very long bridge.png",
      title: "A very long bridge",
      liked: false
    },
    {
      image: "/public/Circle 17 pictures/Tunnel with morning light.png",
      title: "Tunnel with morning light",
      liked: false
    },
    {
      image: "/public/Circle 17 pictures/Mountain house.png",
      title: "Mountain house",
      liked: false
    }
  ]);

  useEffect(() => {
    const postsContainer = postsContainerRef.current;

    const handleLikeOrPreview = (e) => {
      const likeBtn = e.target.closest('.like-btn');
      if (likeBtn) {
        const index = likeBtn.dataset.index;
        const updatedPosts = [...posts];
        updatedPosts[index].liked = !updatedPosts[index].liked;
        setPosts(updatedPosts);
        return;
      }

      const postImg = e.target.closest('.post-img');
      if (postImg) {
        const index = postImg.dataset.index;
        previewImageRef.current.src = posts[index].image;
        previewTitleRef.current.textContent = posts[index].title;
        openModal('previewModal');
      }
    };

    postsContainer.addEventListener('click', handleLikeOrPreview);

    document.querySelectorAll('.close').forEach(btn => {
      btn.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
          modal.style.display = 'none';
        });
      }
    });

    window.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });

    newPostBtnRef.current.addEventListener('click', () => openModal('newPostModal'));
    editProfileBtnRef.current.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('editProfileModal');
    });
    newPostFormRef.current.addEventListener('submit', handleNewPost);
    profileFormRef.current.addEventListener('submit', handleProfileUpdate);

    return () => {
      postsContainer.removeEventListener('click', handleLikeOrPreview);
    };
  }, [posts]);

  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = 'block';
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
  };

  const handleNewPost = (e) => {
    e.preventDefault();
    const title = postTitleRef.current.value;
    const imageFile = postImageRef.current.files[0];

    if (imageFile) {
      const newPost = {
        image: URL.createObjectURL(imageFile),
        title,
        liked: false
      };
      setPosts([newPost, ...posts]);
      closeModal('newPostModal');
      newPostFormRef.current.reset();
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const title = titleRef.current.value;
    const imageFile = profileImageRef.current.files[0];

    if (name) document.querySelector('.profile-name h2').textContent = name;
    if (title) document.querySelector('.profile-name p').textContent = title;
    if (imageFile) {
      document.querySelector('.profile-img img').src = URL.createObjectURL(imageFile);
    }

    closeModal('editProfileModal');
  };

  return (
    <>
      <div className="header">
        <img src="/public/Circle 17 icons/Logo.svg" alt="Logo" />
      </div>

      <main className="container">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-img">
              <img src="/public/Circle 17 icons/image.png" alt="Profile Image" />
            </div>
            <div className="profile-info">
              <div className="profile-name">
                <h2 className="multiline-ellipsis">Bessie Coleman</h2>
                <p className="multiline-ellipsis">Civil Aviator</p>
              </div>
              <a className="edit-link" href="#" id="editProfileBtn" ref={editProfileBtnRef}>
                <img src="/public/Circle 17 icons/edit icon.png" alt="Edit Icon" />
                <span>Edit Profile</span>
              </a>
            </div>
          </div>
          <button className="new-post-button" id="newPostBtn" ref={newPostBtnRef}>
            <img src="/public/Circle 17 icons/plus sign.png" alt="Plus Icon" />
            <span>New Post</span>
          </button>
        </div>

        <div className="posts-container" id="postsContainer" ref={postsContainerRef}>
          {/* Posts will be inserted here by JavaScript */}
        </div>
      </main>

      <div id="editProfileModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Edit Profile</h2>
          <form id="profileForm" ref={profileFormRef}>
            <input type="text" id="name" minLength="6" placeholder="Name" defaultValue="Bessie Coleman" ref={nameRef} />
            <input type="text" id="title" minLength="6" placeholder="Title" defaultValue="Civil Aviator" ref={titleRef} />
            <input type="file" id="profileImage" accept="image/*" ref={profileImageRef} />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>

      <div id="previewModal" className="modal">
        <div className="modal-content preview-content">
          <span className="close">&times;</span>
          <img id="previewImage" src="" alt="Preview" ref={previewImageRef} />
          <h3 id="previewTitle" ref={previewTitleRef}></h3>
        </div>
      </div>

      <div id="newPostModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Create New Post</h2>
          <form id="newPostForm" ref={newPostFormRef}>
            <input type="file" id="postImage" accept="image/*" required ref={postImageRef} />
            <input type="text" id="postTitle" placeholder="Title" required ref={postTitleRef} />
            <button type="submit">Create Post</button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer">
          <p>2023 &copy; Spots</p>
        </div>
      </footer>
    </>
  );
};

export default SpotsApp;
