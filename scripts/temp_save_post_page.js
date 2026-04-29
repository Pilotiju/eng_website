function addCommentVoteBtnUI(thisVoteBtn, otherVoteBtn, thisCommentVoteNum){
  // ! WIP!
  const thisVoteBtnImg =  thisVoteBtn.querySelector('.js_post__action_btn_icon');
  const thisVoteBtnCount =  thisVoteBtn.querySelector('.js_comment__votes_count');
  const commentIndex = thisVoteBtn.parentElement.getAttribute('data-comment-index');
  const thisCommentWrapper = thisVoteBtnImg.closest('.js_comment_wrapper');

  const commentObject = thisCommentWrapper.getAttribute('data-comment-object');
  console.log(commentObject);

    if (thisVoteBtn.classList.contains('js_comment_upvote_btn')){
        // Update Counter
        posts[postIndex].comments[commentIndex].upvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].comments[commentIndex].upvotesNum;

        thisVoteBtnImg.src = 'img/system/comment_heart-voted.svg';
    } else{
        // Update Counter
        posts[postIndex].comments[commentIndex].downvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].comments[commentIndex].downvotesNum;

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

        voteBtnImg.src = 'img/system/comment_heart.svg';
    } else{
        // Update Counter
        posts[postIndex].comments[commentIndex].downvotesNum--;
        voteBtnCount.innerText = posts[postIndex].comments[commentIndex].downvotesNum;

        voteBtnImg.src = 'img/system/comment_heart-crack.svg';
    }
}