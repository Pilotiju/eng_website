function sharePost() {
  const thisPost = this.parentElement.parentElement;
  const postIndex = thisPost.getAttribute('data-post-index');
  navigator.clipboard.writeText(`https://pilotiju.github.io/eng_website/post_page.html?postIndex=${postIndex}`);
  alert(`Copied post into clipboard.`);
}
function setPreventPostTrue() {
  if (!this.classList.contains('post__comments')) {
    preventPost = 1;
  }
}
function setPreventPostFalse() {
  preventPost = 0;
}
function toggleUpvotePost(thisEl) {
  const parentElement = thisEl.parentElement;
  const otherVoteBtn = thisEl.parentElement.querySelector('.js_downvote_btn');
  if (parentElement.classList.contains('post__vote_btn--voted')) {
    if (thisEl.classList.contains('post__upvote_btn--upvoted')) {
      // remove Upvote
      thisEl.classList.remove('post__upvote_btn--upvoted');
      removeVoteBtnUI(thisEl);
      parentElement.classList.remove('post__vote_btn--voted');
    } else {
      // remove other Vote
      otherVoteBtn.classList.remove('post__downvote_btn--downvoted');
      thisEl.classList.add('post__upvote_btn--upvoted');
      removeVoteBtnUI(otherVoteBtn);
      addVoteBtnUI(thisEl);
      console.log(
        '%cUpvoted',
        'color:rgb(255,89,9)'
      );
    }
  } else {
    parentElement.classList.add('post__vote_btn--voted');
    thisEl.classList.add('post__upvote_btn--upvoted');
    addVoteBtnUI(thisEl, otherVoteBtn);
    console.log(
      '%cUpvoted',
      'color:rgb(255,89,9)'
    );
  }
}
function toggleDownvotePost(thisEl) {
  const parentElement = thisEl.parentElement;
  const otherVoteBtn = thisEl.parentElement.querySelector('.js_upvote_btn');
  if (parentElement.classList.contains('post__vote_btn--voted')) {
    if (thisEl.classList.contains('post__downvote_btn--downvoted')) {
      // remove Downvote
      thisEl.classList.remove('post__downvote_btn--downvoted');
      removeVoteBtnUI(thisEl);
      parentElement.classList.remove('post__vote_btn--voted');
    } else {
      // remove other Vote
      otherVoteBtn.classList.remove('post__upvote_btn--upvoted');
      thisEl.classList.add('post__downvote_btn--downvoted');
      removeVoteBtnUI(otherVoteBtn);
      addVoteBtnUI(thisEl);
      console.log(
        '%cDownvoted Post',
        'color: rgb(92, 130, 255)'
      );
    }
  } else {
    parentElement.classList.add('post__vote_btn--voted');
    thisEl.classList.add('post__downvote_btn--downvoted');
    addVoteBtnUI(thisEl, otherVoteBtn);
    console.log(
      '%cDownvoted Post',
      'color: rgb(92, 130, 255)'
    );
  }
}
function addVoteBtnUI(voteBtn) {
  const thisVoteBtnImg = voteBtn.querySelector('.js_post__action_btn_icon');
  const thisVoteBtnCount = voteBtn.querySelector('.js_post__votes_count');
  const postIndex = voteBtn.parentElement.parentElement.parentElement.getAttribute('data-post-index');
  if (voteBtn.classList.contains('js_upvote_btn')) {
    // Update Counter
    posts[postIndex].upvotesNum++;
    thisVoteBtnCount.innerText = posts[postIndex].upvotesNum;

    if (!upvotedPosts.includes(postIndex)) {
      upvotedPosts.push(postIndex);
      localStorage.setItem('upvotedPosts', JSON.stringify(upvotedPosts));
    }
    console.log(upvotedPosts);

    thisVoteBtnCount.style.color = 'white';
    thisVoteBtnImg.src = 'img/system/heart-voted.svg';
  } else {
    // Update Counter
    posts[postIndex].downvotesNum++;
    thisVoteBtnCount.innerText = posts[postIndex].downvotesNum;

    if (!downvotedPosts.includes(postIndex)) {
      downvotedPosts.push(postIndex);
      localStorage.setItem('downvotedPosts', JSON.stringify(downvotedPosts));
    }
    console.log(downvotedPosts);


    thisVoteBtnCount.style.color = 'white';
    thisVoteBtnImg.src = 'img/system/heart-crack-voted.svg';
  }
}
function removeVoteBtnUI(voteBtn) {
  const voteBtnImg = voteBtn.querySelector('.js_post__action_btn_icon');
  const voteBtnCount = voteBtn.querySelector('.js_post__votes_count');
  const postIndex = voteBtn.parentElement.parentElement.parentElement.getAttribute('data-post-index');
  if (voteBtn.classList.contains('js_upvote_btn')) {
    // Update Counter
    posts[postIndex].upvotesNum--;
    voteBtnCount.innerText = posts[postIndex].upvotesNum;

    const tempUpvotedPosts = upvotedPosts.filter((post) => {
      return post !== postIndex;
    });
    upvotedPosts = tempUpvotedPosts;
    localStorage.setItem('upvotedPosts', JSON.stringify(upvotedPosts));

    voteBtnCount.style.color = 'black';
    voteBtnImg.src = 'img/system/heart.svg';
  } else {
    // Update Counter
    posts[postIndex].downvotesNum--;
    voteBtnCount.innerText = posts[postIndex].downvotesNum;

    const tempDownvotedPosts = downvotedPosts.filter((post) => {
      return post !== postIndex;
    });
    downvotedPosts = tempDownvotedPosts;
    localStorage.setItem('downvotedPosts', JSON.stringify(downvotedPosts));

    voteBtnCount.style.color = 'black';
    voteBtnImg.src = 'img/system/heart-crack.svg';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const postActions = document.querySelectorAll('.js_post__actions_btn');
  postActions.forEach(initFuncs.initPostActions);
  const shareBtn = document.querySelectorAll('.js_share_btn');
  shareBtn.forEach(initFuncs.initShareBtn);
  const upvoteBtns = document.querySelectorAll('.js_upvote_btn');
  upvoteBtns.forEach(initFuncs.initUpvoteBtn);
  const downvoteBtns = document.querySelectorAll('.js_downvote_btn');
  downvoteBtns.forEach(initFuncs.initDownvoteBtn);
});
window.addEventListener('pageshow', () => {
  const postsElHTML = document.getElementsByClassName('js_post_get_data');
  Array.from(postsElHTML).forEach((postEl) => {
    const checkBtnVoted = postEl.querySelector('.js_post__vote_btns_wrapper').classList.contains('post__vote_btn--voted');
    const postElIndex = postEl.getAttribute('data-post-index');
    if (upvotedPosts.includes(postElIndex) && !checkBtnVoted) {
      toggleUpvotePost(postEl.querySelector('.js_upvote_btn'), '');
      return;
    }
    if (downvotedPosts.includes(postElIndex) && !checkBtnVoted) {
      toggleDownvotePost(postEl.querySelector('.js_downvote_btn'), '');
      return;
    }
  });
});