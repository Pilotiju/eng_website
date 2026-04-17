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
    }
};

const loaderEl = document.getElementById('loader');
window.addEventListener('pageshow', resetLoadingElement);
function resetLoadingElement(){
    const loaderEl = document.getElementById('loader');
    loaderEl.setAttribute("hidden", true);
    console.log('hide');
}

const posts = document.querySelectorAll('.js_post');
posts.forEach(initFuncs.initPost);
const postActions = document.querySelectorAll('.js_post__actions_btn');
postActions.forEach(initFuncs.initPostActions);
/*const shareBtn = document.querySelectorAll('.js_share_btn');*/
// shareBtn.forEach(initFuncs.initShareBtn);
const upvoteBtns = document.querySelectorAll('.js_upvote_btn');
upvoteBtns.forEach(initFuncs.initUpvoteBtn);
const downvoteBtns = document.querySelectorAll('.js_downvote_btn');
downvoteBtns.forEach(initFuncs.initDownvoteBtn);

let preventPost = 0;

function openPost(){
    if (preventPost === 0){
        const postLink = this.getAttribute('data-href');
        loaderEl.setAttribute("hidden", false);
        console.log('unHide');
        preventPost = 0;
        window.location.href = postLink;
    }
}
/*function sharePost(){
    const postLink = this.getAttribute('data-href');
    navigator.clipboard.writeText(postLink);
    alert(`Copied post into clipboard.`);
}*/
function setPreventPostTrue(){
    preventPost = 1;
    console.log(`preventPost: ${preventPost}`);
}
function setPreventPostFalse(){
    preventPost = 0;
    console.log(`preventPost: ${preventPost}`);
}
function toggleUpvotePost(){
    const parentElement = this.parentElement;
    const otherVoteBtn = this.parentElement.querySelector('.js_downvote_btn');
    if (parentElement.classList.contains('post__vote_btn--voted')){
        if (this.classList.contains('post__upvote_btn--upvoted')){
            this.classList.remove('post__upvote_btn--upvoted');
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            otherVoteBtn.classList.remove('post__downvote_btn--downvoted');
            this.classList.add('post__upvote_btn--upvoted');
            console.log('Upvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__upvote_btn--upvoted');
        console.log('Upvoted');
    }
}
function toggleDownvotePost(){
    const parentElement = this.parentElement;
    const otherVoteBtn = this.parentElement.querySelector('.js_upvote_btn');
    if (parentElement.classList.contains('post__vote_btn--voted')){
        if (this.classList.contains('post__downvote_btn--downvoted')){
            this.classList.remove('post__downvote_btn--downvoted');
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            otherVoteBtn.classList.remove('post__upvote_btn--upvoted');
            this.classList.add('post__downvote_btn--downvoted');
            console.log('Downvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__downvote_btn--downvoted');
        console.log('Downvoted');
    }
}