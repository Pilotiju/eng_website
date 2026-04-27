let preventPost = 0;

// =====================================================
function renderPosts(){
    let postsHTML = '';
    for (let i = 0; i < posts.length; i++){
        const postObject = posts[i];
        const {title, userIndex, date, content, flair, upvotesNum, downvotesNum, commentsNum, postLink} = postObject;
        const postIndex = i;
        const author = users[userIndex].name;
        const avatar = users[userIndex].avatar;
        const html = /*html*/`
          <div data-href="${postLink}" data-post-index="${postIndex}" class="feed_post js_feed_post">
            <div class="post__meta post__item">
              <div class="post__user_wrapper">
                <div class="post__avatar_wrapper">
                  <img src="img/avatars/${avatar}" alt="Avatar" class="post__avatar">
                </div>
                <div class="post_username">${author}</div>
              </div>
              <div class="whitespace"></div>
              <div class="post__date">${date}</div>
            </div>

            <div class="post__content post__item">
              <h1 class="feed_post__heading">
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
                <button class="post__comments post__actions_btn js_post__actions_btn post__actions_other_btn">
                  <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/comments.svg" alt="Comments">
                  <span class="js_comments_count post__comments_count">${commentsNum}</span>
                </button>
                <div class="whitespace"></div>
                <button data-post-index="${postIndex}" class="js_share_btn post__share_btn post__actions_btn js_post__actions_btn post__actions_other_btn">
                    <div class="post__share_text">Share</div>
                    <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/share.svg" alt="Share">
                </button>
            </div>
          </div>
        `;
        postsHTML += html;
    }

    document.querySelector('.post_feed').innerHTML = postsHTML;
}
// =====================================================
renderPosts();

const postsEl = document.querySelectorAll('.js_feed_post');
postsEl.forEach(initFuncs.initPost);

function openPost(){
    if (preventPost === 0){
        const postIndex = this.getAttribute('data-post-index');
        preventPost = 0;
        window.location.href = `https://pilotiju.github.io/eng_website/post_page.html?postIndex=${postIndex}`;
    }
}