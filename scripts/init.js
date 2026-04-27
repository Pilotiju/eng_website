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
        upvoteBtn.addEventListener('click', toggleUpvotePost);
    },
    initDownvoteBtn: function initDownvoteBtn(downvoteBtn){
        downvoteBtn.addEventListener('click', toggleDownvotePost);
    },
    initCommentUpvoteBtn: function initUpvoteBtn(commentUpvoteBtn){
        commentUpvoteBtn.addEventListener('click', toggleCommentUpvotePost);
    },
    initCommentDownvoteBtn: function initDownvoteBtn(commentDownvoteBtn){
        commentDownvoteBtn.addEventListener('click', toggleCommentDownvotePost);
    }
};