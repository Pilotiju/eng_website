const postIndex = getURLPostIndex();
function getURLPostIndex() {
  const urlParams = new URLSearchParams(document.location.search);
  const postIndex = urlParams.get('postIndex');
  console.log(
    `%cURLParam [postIndex]:%c${postIndex}`,
    "border-left: LightSkyBlue solid 3px; color: LightSkyBlue; padding: 2px 3px 2px 6px; font-weight: bold; font-size: 15px; background-color: black",
    "margin-left: 5px; color: LightSkyBlue; font-size: 16px;"
  );
  if (postIndex === null){
    return null;
  } else{
    return Number(postIndex);
  }
}
let commentID = 0;

if (postIndex === null || posts.length - 1 < postIndex){
  error();
}
// ======================================================
function renderPosts() {
  let html = '';
  const postObject = posts[postIndex];
  const { title, userIndex, date, content, flair, upvotesNum, downvotesNum, commentsNum, postLink } = postObject;
  const author = users[userIndex].name;
  const avatar = users[userIndex].avatar;
  const postHTML = /*html*/`
            <div data-post-index="${postIndex}" class="posts js_posts js_post_get_data">
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
                  <div class="js_post__vote_btns_wrapper post__vote_btns_wrapper">
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
  html += postHTML;
  document.querySelector('.js_posts_wrapper').innerHTML = html;
}
// =====================================================
function renderComments(commentArray, nestedLevel, parentCommentID) {
  // level 0 => -1 | doesn't work otherwise idk why
  nestedLevel++;
  let html = '';
  commentArray.forEach((commentObject, i) => {
    let seperatorHTML = '';
    const { commenterIndex, content, date, upvotesNum, downvotesNum } = commentObject;
    commentObject.commentID = commentID;
    const userObject = users[commenterIndex];
    console.log(`Object: ${commentObject.content}  |  nestedLevel: ${nestedLevel}  |  commentID: ${commentID}`);
    const { name, avatar } = userObject;
    let commentsHTML = /*html*/`
    <div class="js_comment_wrapper comment_wrapper comment__item" data-comment-id="${commentID}" style="margin-left:${nestedLevel * 50}px">
      <div class="js_comment__meta comment__meta normal_fs" data-parent-comment-id="${parentCommentID}">
        <div class="comment__avatar_wrapper">
          <img src="img/avatars/${avatar}" alt="Commentor avatar" class="comment__avatar">
        </div>
        <span class="comment__user_name">${name} --- nested:[${nestedLevel}] --- ID:[${commentID}] --- parentCommentID:[${parentCommentID}]</span>
        <span class="comment__meta_seperator">•</span>
        <span class="comment__date">${date}</span>
      </div>
      <div class="comment__content comment__item normal_fs">
        ${content}
      </div>
      <div class="comment__actions comment__item">
        <div class="js_post__vote_btns_wrapper post__vote_btns_wrapper">
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
    `;
    commentID++;
    if (nestedLevel === 0 && commentObject.comments.length === 0) {
      seperatorHTML += /*html*/`<div class="comment__thread_seperator"></div>`;
    }
    if (i === 0) {
      html += commentsHTML;
      html += seperatorHTML;
    } else {
      seperatorHTML += commentsHTML;
      html += seperatorHTML;
    }
    if (commentObject.comments.length > 0) {
      html += renderComments(commentObject.comments, nestedLevel, commentID - 1);
    }
  });
  return html;
}

// =====================================================
function checkLoadedAllCommentImgs() {
  if (loadedImgs === commentImgs.length) {
    drawThreadLines();
  }
}

function drawThreadLines() {
  checkDrewThreadlines = 1;
  commentMetas.forEach((commentMeta) => {
    const parentID = commentMeta.getAttribute('data-parent-comment-id');
    if (parentID != "-1") {
      const parentMeta = document.querySelector(`[data-comment-id="${parentID}"]`).querySelector('.js_comment__meta');
      const ownRect = commentMeta.getBoundingClientRect();
      const parentRect = parentMeta.getBoundingClientRect();
      const yDistance = ownRect.top - parentRect.top;
      // console.log('============================');
      // console.log(commentMeta);
      // console.log(parentMeta);
      // console.log(ownRect);
      // console.log(`ownRect: ${ownRect.top}`);
      // console.log(`parentRect: ${parentRect.top}`);
      // console.log(yDistance);
      // console.log('============================');
      const createThreadline = document.createElement('div');
      createThreadline.classList.add('comment__threadline');
      createThreadline.style.height = `${yDistance - 25}px`;
      createThreadline.style.bottom = `20px`;
      commentMeta.append(createThreadline);
    }
  });
}

function toggleCommentUpvotePost(thisEl) {
  const parentElement = thisEl.parentElement;
  const otherVoteBtn = thisEl.parentElement.querySelector('.js_comment_downvote_btn');
  if (parentElement.classList.contains('comment__vote_btn--voted')) {
    if (thisEl.classList.contains('comment__upvote_btn--upvoted')) {
      // remove Upvote
      thisEl.classList.remove('comment__upvote_btn--upvoted');
      removeCommentVoteBtnUI(thisEl);
      parentElement.classList.remove('comment__vote_btn--voted');
    } else {
      // remove other Vote
      otherVoteBtn.classList.remove('comment__downvote_btn--downvoted');
      thisEl.classList.add('comment__upvote_btn--upvoted');
      removeCommentVoteBtnUI(otherVoteBtn);
      addCommentVoteBtnUI(thisEl);
      console.log(
        '%cUpvoted Comment',
        'color:rgb(255,89,9)'
      );
    }
  } else {
    parentElement.classList.add('comment__vote_btn--voted');
    thisEl.classList.add('comment__upvote_btn--upvoted');
    addCommentVoteBtnUI(thisEl);
    console.log(
      '%cUpvoted Comment',
      'color:rgb(255,89,9)'
    );
  }
}
function toggleCommentDownvotePost(thisEl) {
  const parentElement = thisEl.parentElement;
  const otherVoteBtn = thisEl.parentElement.querySelector('.js_comment_upvote_btn');
  if (parentElement.classList.contains('comment__vote_btn--voted')) {
    if (thisEl.classList.contains('comment__downvote_btn--downvoted')) {
      // remove Downvote
      thisEl.classList.remove('comment__downvote_btn--downvoted');
      removeCommentVoteBtnUI(thisEl);
      parentElement.classList.remove('comment__vote_btn--voted');
    } else {
      // remove other Vote
      otherVoteBtn.classList.remove('comment__upvote_btn--upvoted');
      thisEl.classList.add('comment__downvote_btn--downvoted');
      removeCommentVoteBtnUI(otherVoteBtn);
      addCommentVoteBtnUI(thisEl);
      console.log(
        '%cDownvoted Comment',
        'color: rgb(92, 130, 255)'
      );
    }
  } else {
    parentElement.classList.add('comment__vote_btn--voted');
    thisEl.classList.add('comment__downvote_btn--downvoted');
    addCommentVoteBtnUI(thisEl);
    console.log(
      '%cDownvoted Comment',
      'color: rgb(92, 130, 255)'
    );
  }
}

function searchCommentID(thisCommentID, thisCommentArray) {
  for (commentObject of thisCommentArray) {
    if (commentObject.commentID == thisCommentID) {
      return commentObject;
    } else if (commentObject.comments.length > 0) {
      const found = searchCommentID(thisCommentID, commentObject.comments);
      if (found) {
        return found;
      }
    }
  }
}

function addCommentVoteBtnUI(voteBtn) {
  const voteBtnImg = voteBtn.querySelector('.js_post__action_btn_icon');
  const voteBtnCount = voteBtn.querySelector('.js_comment__votes_count');
  const thisCommentID = Number(voteBtn.closest('.js_comment_wrapper').getAttribute('data-comment-id'));
  const commentObject = searchCommentID(thisCommentID, posts[postIndex].comments);
  if (voteBtn.classList.contains('js_comment_upvote_btn')) {
    // Update Counter
    commentObject.upvotesNum++;
    voteBtnCount.innerText = commentObject.upvotesNum;

    if (!upvotedComments[postIndex].includes(thisCommentID)) {
      upvotedComments[postIndex].push(thisCommentID);
      localStorage.setItem('upvotedComments', JSON.stringify(upvotedComments));
    }

    voteBtnImg.src = 'img/system/comment_heart-voted.svg';
  } else {
    // Update Counter
    commentObject.downvotesNum++;
    voteBtnCount.innerText = commentObject.downvotesNum;

    if (!downvotedComments[postIndex].includes(thisCommentID)) {
      downvotedComments[postIndex].push(thisCommentID);
      localStorage.setItem('downvotedComments', JSON.stringify(downvotedComments));
    }

    voteBtnImg.src = 'img/system/comment_heart-crack-voted.svg';
  }
}
function removeCommentVoteBtnUI(voteBtn) {
  const voteBtnImg = voteBtn.querySelector('.js_post__action_btn_icon');
  const voteBtnCount = voteBtn.querySelector('.js_comment__votes_count');
  const thisCommentID = Number(voteBtn.closest('.js_comment_wrapper').getAttribute('data-comment-id'));
  const commentObject = searchCommentID(thisCommentID, posts[postIndex].comments);
  if (voteBtn.classList.contains('js_comment_upvote_btn')) {
    // Update Counter
    commentObject.upvotesNum--;
    voteBtnCount.innerText = commentObject.upvotesNum;

    const tempUpvotedComments = upvotedComments[postIndex].filter((comment) => {
      console.log('comment: ',comment);
      if (comment !== thisCommentID){
        console.log('add');
      }
      return comment !== thisCommentID;
    });
    upvotedComments[postIndex] = tempUpvotedComments;
    localStorage.setItem('upvotedComments', JSON.stringify(upvotedComments));

    voteBtnImg.src = 'img/system/comment_heart.svg';
  } else {
    // Update Counter
    commentObject.downvotesNum--;
    voteBtnCount.innerText = commentObject.downvotesNum;

    const tempDownvotedComments = downvotedComments[postIndex].filter((comment) => {
      return comment !== thisCommentID;
    });
    downvotedComments[postIndex] = tempDownvotedComments;
    localStorage.setItem('downvotedComments', JSON.stringify(downvotedComments));

    voteBtnImg.src = 'img/system/comment_heart-crack.svg';
  }
}

let commentMetas;
let loadedImgs;
let checkDrewThreadlines;
let commentImgs;
renderPosts();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js_posts_comments_wrapper').innerHTML = renderComments(posts[postIndex].comments, -1, -1);

  commentMetas = document.querySelectorAll('.js_comment__meta');
  loadedImgs = 0;
  checkDrewThreadlines = 0;
  commentImgs = document.querySelectorAll('.js_comment__img');
  console.log(commentImgs);
  if (commentImgs.length > 0) {
    //commentImgs is a Nodelist and returns a truthy value even if empty
    commentImgs.forEach((commentImg) => {
      commentImg.addEventListener('load', () => {
        loadedImgs++;
        checkLoadedAllCommentImgs();
      });
    });
  } else {
    drawThreadLines();
  }

  const commentUpvoteBtns = document.querySelectorAll('.js_comment_upvote_btn');
  commentUpvoteBtns.forEach(initFuncs.initCommentUpvoteBtn);
  const commentDownvoteBtns = document.querySelectorAll('.js_comment_downvote_btn');
  commentDownvoteBtns.forEach(initFuncs.initCommentDownvoteBtn);

  if (!checkDrewThreadlines) {
    setTimeout(drawThreadLines, 1000);
  }
});
window.addEventListener('pageshow', () => {
  console.log('================= Check Comments Vote =================');
  const commentsHTML = document.getElementsByClassName('js_comment_wrapper');
  Array.from(commentsHTML).forEach((commentEl) => {
    const checkBtnVoted = commentEl.querySelector('.js_post__vote_btns_wrapper').classList.contains('comment__vote_btn--voted');
    const commentID = Number(commentEl.getAttribute('data-comment-id'));
    if (!checkBtnVoted) {
      if (upvotedComments[postIndex].includes(commentID)) {
        toggleCommentUpvotePost(commentEl.querySelector('.js_comment_upvote_btn'));
        return;
      } else if (downvotedComments[postIndex].includes(commentID)) {
        toggleCommentDownvotePost(commentEl.querySelector('.js_comment_downvote_btn'));
        return;
      }
    } else {
      if (!upvotedComments[postIndex].includes(commentID)) {
        toggleCommentUpvotePost(commentEl.querySelector('.js_comment_upvote_btn'));
        return;
      } else if (!downvotedComments[postIndex].includes(commentID)) {
        toggleCommentDownvotePost(commentEl.querySelector('.js_comment_downvote_btn'));
        return;
      }
    }
  });
});