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

const posts = document.querySelectorAll('.js_post');
posts.forEach(initFuncs.initPost);
const postActions = document.querySelectorAll('.js_post__actions_btn');
postActions.forEach(initFuncs.initPostActions);
const shareBtn = document.querySelectorAll('.js_share_btn');
shareBtn.forEach(initFuncs.initShareBtn);
const upvoteBtns = document.querySelectorAll('.js_upvote_btn');
upvoteBtns.forEach(initFuncs.initUpvoteBtn);
const downvoteBtns = document.querySelectorAll('.js_downvote_btn');
downvoteBtns.forEach(initFuncs.initDownvoteBtn);

let preventPost = 0;

function openPost(){
    if (preventPost === 0){
        const postLink = this.getAttribute('data-href');
        preventPost = 0;
        window.location.href = postLink;
    }
}
function sharePost(){
    const thisPost = this.parentElement.parentElement;
    const postLink = thisPost.getAttribute('data-href');
    navigator.clipboard.writeText(`https://pilotiju.github.io/eng_website/${postLink}`);
    alert(`Copied post into clipboard.`);
}
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
            // remove Upvote
            this.classList.remove('post__upvote_btn--upvoted');
            removeVoteBtnUI(this);
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            // remove other Vote
            otherVoteBtn.classList.remove('post__downvote_btn--downvoted');
            this.classList.add('post__upvote_btn--upvoted');
            removeVoteBtnUI(otherVoteBtn);
            addVoteBtnUI(this);
            console.log('Upvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__upvote_btn--upvoted');
        addVoteBtnUI(this, otherVoteBtn);
        console.log('Upvoted');
    }
}
function toggleDownvotePost(){
    const parentElement = this.parentElement;
    const otherVoteBtn = this.parentElement.querySelector('.js_upvote_btn');
    if (parentElement.classList.contains('post__vote_btn--voted')){
        if (this.classList.contains('post__downvote_btn--downvoted')){
            // remove Downvote
            this.classList.remove('post__downvote_btn--downvoted');
            removeVoteBtnUI(this);
            parentElement.classList.remove('post__vote_btn--voted');
        } else{
            // remove other Vote
            otherVoteBtn.classList.remove('post__upvote_btn--upvoted');
            this.classList.add('post__downvote_btn--downvoted');
            removeVoteBtnUI(otherVoteBtn);
            addVoteBtnUI(this);
            console.log('Downvoted');
        }
    } else{
        parentElement.classList.add('post__vote_btn--voted');
        this.classList.add('post__downvote_btn--downvoted');
        addVoteBtnUI(this, otherVoteBtn);
        console.log('Downvoted');
    }
}
function addVoteBtnUI(thisVoteBtn, otherVoteBtn){
    if (thisVoteBtn.classList.contains('js_upvote_btn')){
        const thisVoteBtnImg =  thisVoteBtn.querySelector('.js_post__action_btn_icon');
        thisVoteBtnImg.src = 'img/system/heart-voted.svg';
    } else{
        const thisVoteBtnImg =  thisVoteBtn.querySelector('.js_post__action_btn_icon');
        thisVoteBtnImg.src = 'img/system/heart-crack-voted.svg';
    }
}
function removeVoteBtnUI(voteBtn){
    if (voteBtn.classList.contains('js_upvote_btn')){
        const voteBtnImg =  voteBtn.querySelector('.js_post__action_btn_icon');
        voteBtnImg.src = 'img/system/heart.svg';
    } else{
        const voteBtnImg =  voteBtn.querySelector('.js_post__action_btn_icon');
        voteBtnImg.src = 'img/system/heart-crack.svg';
    }
}