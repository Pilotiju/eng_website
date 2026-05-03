const initFuncs = {
  initPost: function initPost(post) {
    post.addEventListener('click', openPost);
  },
  initPostActions: function initPostActions(postAction) {
    postAction.addEventListener('mouseenter', setPreventPostTrue);
    postAction.addEventListener('mouseleave', setPreventPostFalse);
  },
  initShareBtn: function initShareBtn(shareBtn) {
    shareBtn.addEventListener('click', sharePost);
  },
  initUpvoteBtn: function initUpvoteBtn(upvoteBtn) {
    upvoteBtn.addEventListener('click', () => toggleUpvotePost(upvoteBtn, ''));
  },
  initDownvoteBtn: function initDownvoteBtn(downvoteBtn) {
    downvoteBtn.addEventListener('click', () => toggleDownvotePost(downvoteBtn, ''));
  },
  initCommentUpvoteBtn: function initCommentUpvoteBtn(commentUpvoteBtn) {
    commentUpvoteBtn.addEventListener('click', () => toggleCommentUpvotePost(commentUpvoteBtn));
  },
  initCommentDownvoteBtn: function initCommentDownvoteBtn(commentDownvoteBtn) {
    commentDownvoteBtn.addEventListener('click', () => toggleCommentDownvotePost(commentDownvoteBtn));
  }
};

function error() {
  document.body.innerHTML = /*html*/`
    <div class="error_body_wrapper">
      <div class="error_wrapper">
        <div class="error__item">
          <img class="error__img" src="img/system/frown.svg" alt="Error Img">
        </div>
        <div class="error__item">
          <h1 class="error__h1">Something went wrong :(</h1>
          <h3 class="error__h3">Try to look into the console. Maybe reloading the page helps.</h3>
        </div>
      </div>
    </div>
  `;
}