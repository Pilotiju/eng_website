function checkURLSearchParams(){
    const urlParams = new URLSearchParams(document.location.search);
    const postIndex = urlParams.get('postIndex');
    console.log(`Using [urlParam] -> ${postIndex}`);
    return postIndex;
}

// ======================================================
function renderPosts(){
    let postsHTML = '';
        const postIndex = checkURLSearchParams();
        const postObject = posts[postIndex];
        const {title, author, date, content, flair, upvotesNum, downvotesNum, commentsNum, postLink, avatar} = postObject;
        const html = /*html*/`
            <div data-href="${postLink}" data-post-index="${postIndex}" class="posts js_posts">
              <div class="post__meta post__item">
                <div class="post__user_wrapper">
                  <img src="img/avatars/${avatar}" alt="Avatar" class="post__avatar">
                  <div class="post_username">${author}</div>
                </div>
                <div class="whitespace"></div>
                <div class="post__date">${date}</div>
              </div>

            <div class="post__content post__item">
              <h1 class="post__heading">
                ${title}
                <div class="post__flair_wrapper">
                  <div class="post__flair flair__${flair}">
                    ${flair}
                  </div>
                </div>
              </h1>
              ${content}
            </div>

              <div class="post__actions post__item">
                <div class="post__vote_btns_wrapper">
                  <button class="js_upvote_btn post__upvote_btn post__actions_btn js_post__actions_btn post__actions_vote_btn">
                    <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/heart.svg" alt="Upvote">
                    <span class="js_upvotes_count js_post__votes_count post__votes_count">${upvotesNum}</span>
                  </button>
                  <button class="js_downvote_btn post__downvote_btn post__actions_btn js_post__actions_btn post__actions_vote_btn">
                    <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/heart-crack.svg" alt="Downvote">
                    <span class="js_downvotes_count js_post__votes_count post__votes_count">${downvotesNum}</span>
                  </button>
                </div>
                <div class="whitespace"></div>
                <div class="whitespace"></div>
                <button class="js_share_btn post__share_btn post__actions_btn js_post__actions_btn post__actions_other_btn">
                    <div class="post__share_text">Share</div>
                    <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/share.svg" alt="Share">
                </button>
            </div>
            </div>
        `;
        postsHTML += html;
    document.querySelector('.js_posts_wrapper').innerHTML = postsHTML;
}
// =====================================================
renderPosts();