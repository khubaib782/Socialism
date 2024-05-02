async function fetchUserPosts() {
  try {
    const user_id = parseInt(localStorage.getItem("userid"));
    const user_image = localStorage.getItem("userImage");
    const user_name = localStorage.getItem("userName");
    console.log(user_image, "img");
    console.log(user_name, "name");

    // console.log("User ID:", user_id);

    const usersResponse = await fetch("https://dummyjson.com/users");
    const usersData = await usersResponse.json();
    const user = usersData.users;
    console.log(user, "USER");
    // console.log(usersData, "datas");
    const loggedInUser = usersData.users.find((user) => user.id === user_id);
    console.log("Logged-In User:", loggedInUser); // Debugging: Log logged-in user
    console.log("userdata", usersData);

    if (!loggedInUser) {
      console.error("Logged-in user not found.");
      return;
    }

    const response = await fetch(
      `https://dummyjson.com/posts/user/${loggedInUser.id}`
    );
    const data = await response.json();
    const userPosts = data.posts;
    console.log("User Posts:", userPosts);

    // console.log(postImage, "Post");

    // if (!userPosts || !postImage) {
    //   console.error("User posts not found or feed container not found.");
    //   return;
    // }

    const postImage = document.getElementById("feed-container-user");
    // console.log(postImage, "PI");
    for (let i = 0; i < userPosts.length; i++) {
      const post = userPosts[i];
      console.log(post, "post");
      console.log(post.title, "title");
      console.log(post.id, "id");

      const userElement = document.createElement("div");
      userElement.classList.add("feedPosts");

      postImage.innerHTML += `
                              <div class="feed"> 
                              <section class="username">
                                <div class="image">
                                  <a href="/"
                                    ><img
                                    src="${user_image}"
                                      style="object-fit: cover"
                                  /></a>
                                </div>
                                <div class="id">
                                  <a href="/">${user_name}</a>
                                </div>
                              </section>
                              <section class="post">
                                <img
                                  src="https://i0.wp.com/myadventuresacrosstheworld.com/wp-content/uploads/2018/03/rice-fields-bali-spa-1-e1522157798920.jpg?resize=1000%2C667&ssl=1"
                                />
                              </section>
                              <section class="btn-group">
                                <button type="button" class="btn-love">
                                  <i class="far fa-heart fa-lg"></i>
                                </button>
                                <button type="button" class="btn-comment">
                                  <i class="far fa-comment fa-lg"></i>
                                </button>
                                <button type="button" class="btn-share">
                                  <i class="fas fa-share fa-lg"></i>
                                </button>
                                <button type="button" class="btn-bookmark">
                                  <i class="far fa-bookmark fa-lg"></i>
                                </button>
                              </section>
                              <section class="caption">
                                <p class="like">20 likes</p>
                                <p>
                                  <b>${loggedInUser.username}</b
                                  >
                                  ${post.title}
                                </p>
    
                               
        `;
      postImage.appendChild(userElement);
      // console.log("user element ye ha : ", userElement);
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
}

fetchUserPosts();

function logout() {
  swal("Logout!", "You have been successfully Logged Out!", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}
