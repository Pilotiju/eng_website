const initFuncs = {
    initPost: function initPost(post){
        post.addEventListener('click', openPost);
    },
    initPostActions: function initPostActions(postAction){
        postAction.addEventListener('mouseenter', setPreventPostTrue);
        postAction.addEventListener('mouseleave', setPreventPostFalse);
    },
    initShareBtn: function initShareBtn(shareBtn){
        shareBtn.addEventListener('click', sharePost);
    },
    initUpvoteBtn: function initUpvoteBtn(upvoteBtn){
        upvoteBtn.addEventListener('click', () => toggleUpvotePost(upvoteBtn, ''));
    },
    initDownvoteBtn: function initDownvoteBtn(downvoteBtn){
        downvoteBtn.addEventListener('click', () => toggleDownvotePost(downvoteBtn, ''));
    },
    initCommentUpvoteBtn: function initCommentUpvoteBtn(commentUpvoteBtn){
        commentUpvoteBtn.addEventListener('click', () => toggleCommentUpvotePost(commentUpvoteBtn));
    },
    initCommentDownvoteBtn: function initCommentDownvoteBtn(commentDownvoteBtn){
        commentDownvoteBtn.addEventListener('click', () => toggleCommentDownvotePost(commentDownvoteBtn));
    }
};