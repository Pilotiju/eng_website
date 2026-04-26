let postIndex = 0;
function getURLPostIndex(){
    const urlParams = new URLSearchParams(document.location.search);
    postIndex = urlParams.get('postIndex');
    console.log(`URLParam postIndex: ${postIndex}`);
}
getURLPostIndex();
// ======================================================
function renderPosts(){
    let postsHTML = '';
        const postObject = posts[postIndex];
        const {title, userIndex, date, content, flair, upvotesNum, downvotesNum, commentsNum, postLink} = postObject;
        const author = users[userIndex].name;
        const avatar = users[userIndex].avatar;
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
function renderPostComments(){
  let commentsHTML = '';
  for (let i = 0; i < posts[postIndex].comments.length; i++){
    const commentObject = posts[postIndex].comments[i];
    const {commenterIndex, content, date, upvotesNum, downvotesNum} = commentObject;
    const userObject = users[commenterIndex];
    const {name, avatar} = userObject;
      const html = /*html*/`
      <div class="js_comment__comment_thread comment__comment_thread">
        <div class="comment_wrapper comment__item">
          <div class="comment__meta normal_fs">
            <img src="img/avatars/${avatar}" alt="Commentor avatar" class="comment__avatar">
            <span class="comment__user_name">${name}</span>
            <span class="comment__meta_seperator">•</span>
            <span class="comment__date">${date}</span>
          </div>
          <div class="comment__content comment__item normal_fs">
            ${content}
          </div>
          <div class="comment__actions comment__item">
            <div class="post__vote_btns_wrapper" data-comment-index="${i}">
              <button class="js_comment_upvote_btn comment__upvote_btn comment__actions_vote_btn js_comment__actions_btn">
                <img class="js_post__action_btn_icon comment__actions_vote_img" src="img/system/comment_heart.svg" alt="Upvote">
                <span class="js_upvotes_count js_comment__votes_count comment__votes_count post__votes_count">${upvotesNum}</span>
              </button>
              <button class="js_comment_downvote_btn comment__downvote_btn comment__actions_vote_btn js_comment__actions_btn">
                <img class="js_post__action_btn_icon comment__actions_vote_img" src="img/system/comment_heart-crack.svg" alt="Downvote">
                <span class="js_downvotes_count js_comment__votes_count comment__votes_count post__votes_count">${downvotesNum}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      `;
      commentsHTML += html;
  }
  document.querySelector('.js_posts_comments_wrapper').innerHTML = commentsHTML;
}
// =====================================================
renderPosts();

renderPostComments();

const CommentUpvoteBtns = document.querySelectorAll('.js_comment_upvote_btn');
CommentUpvoteBtns.forEach(initFuncs.initCommentUpvoteBtn);
const CommentDownvoteBtns = document.querySelectorAll('.js_comment_downvote_btn');
CommentDownvoteBtns.forEach(initFuncs.initCommentDownvoteBtn);

function toggleCommentUpvotePost(){
    const parentElement = this.parentElement;
    const otherVoteBtn = this.parentElement.querySelector('.js_comment_downvote_btn');
    if (parentElement.classList.contains('post__vote_btn--voted')){
        if (this.classList.contains('post__upvote_btn--upvoted')){
            // remove Upvote
            this.classList.remove('post__upvote_btn--upvoted');
            removeCommentVoteBtnUI(this);
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            // remove other Vote
            otherVoteBtn.classList.remove('post__downvote_btn--downvoted');
            this.classList.add('post__upvote_btn--upvoted');
            removeCommentVoteBtnUI(otherVoteBtn);
            addCommentVoteBtnUI(this);
            console.log('Upvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__upvote_btn--upvoted');
        addCommentVoteBtnUI(this, otherVoteBtn);
        console.log('Upvoted');
    }
}
function toggleCommentDownvotePost(){
    const parentElement = this.parentElement;
    const otherVoteBtn = this.parentElement.querySelector('.js_comment_upvote_btn');
    if (parentElement.classList.contains('post__vote_btn--voted')){
        if (this.classList.contains('post__downvote_btn--downvoted')){
            // remove Downvote
            this.classList.remove('post__downvote_btn--downvoted');
            removeCommentVoteBtnUI(this);
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            // remove other Vote
            otherVoteBtn.classList.remove('post__upvote_btn--upvoted');
            this.classList.add('post__downvote_btn--downvoted');
            removeCommentVoteBtnUI(otherVoteBtn);
            addCommentVoteBtnUI(this);
            console.log('Downvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__downvote_btn--downvoted');
        addCommentVoteBtnUI(this, otherVoteBtn);
        console.log('Downvoted');
    }
}
function addCommentVoteBtnUI(thisVoteBtn, otherVoteBtn, thisCommentVoteNum){
    const thisVoteBtnImg =  thisVoteBtn.querySelector('.js_post__action_btn_icon');
    const thisVoteBtnCount =  thisVoteBtn.querySelector('.js_comment__votes_count');
    const commentIndex = thisVoteBtn.parentElement.getAttribute('data-comment-index');
    if (thisVoteBtn.classList.contains('js_comment_upvote_btn')){
        // Update Counter
        posts[postIndex].comments[commentIndex].upvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].comments[commentIndex].upvotesNum;

        thisVoteBtnCount.style.color = 'white';
        thisVoteBtnImg.src = 'img/system/comment_heart-voted.svg';
    } else{
        // Update Counter
        posts[postIndex].comments[commentIndex].downvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].comments[commentIndex].downvotesNum;

        thisVoteBtnCount.style.color = 'white';
        thisVoteBtnImg.src = 'img/system/comment_heart-crack-voted.svg';
    }
}
function removeCommentVoteBtnUI(voteBtn, thisCommentVoteNum){
    const voteBtnImg =  voteBtn.querySelector('.js_post__action_btn_icon');
    const voteBtnCount =  voteBtn.querySelector('.js_comment__votes_count');
    const commentIndex = voteBtn.parentElement.getAttribute('data-comment-index');
    console.log(postIndex);
    if (voteBtn.classList.contains('js_comment_upvote_btn')){
        // Update Counter
        posts[postIndex].comments[commentIndex].upvotesNum--;
        voteBtnCount.innerText = posts[postIndex].comments[commentIndex].upvotesNum;

        voteBtnCount.style.color = 'black';
        voteBtnImg.src = 'img/system/comment_heart.svg';
    } else{
        // Update Counter
        posts[postIndex].comments[commentIndex].downvotesNum--;
        voteBtnCount.innerText = posts[postIndex].comments[commentIndex].downvotesNum;

        voteBtnCount.style.color = 'black';
        voteBtnImg.src = 'img/system/comment_heart-crack.svg';
    }
}