const postActions = document.querySelectorAll('.js_post__actions_btn');
postActions.forEach(initFuncs.initPostActions);
const shareBtn = document.querySelectorAll('.js_share_btn');
shareBtn.forEach(initFuncs.initShareBtn);
const upvoteBtns = document.querySelectorAll('.js_upvote_btn');
upvoteBtns.forEach(initFuncs.initUpvoteBtn);
const downvoteBtns = document.querySelectorAll('.js_downvote_btn');
downvoteBtns.forEach(initFuncs.initDownvoteBtn);

function sharePost(){
    const thisPost = this.parentElement.parentElement;
    const postIndex = thisPost.getAttribute('data-post-index');
    navigator.clipboard.writeText(`https://pilotiju.github.io/eng_website/post_page.html?post-index=${postIndex}`);
    alert(`Copied post into clipboard.`);
}
function setPreventPostTrue(){
    if (!this.classList.contains('post__comments')){
        preventPost = 1;
        console.log(`preventPost: ${preventPost}`);
    }
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
    const thisVoteBtnImg =  thisVoteBtn.querySelector('.js_post__action_btn_icon');
    const thisVoteBtnCount =  thisVoteBtn.querySelector('.js_post__votes_count');
    const postIndex = thisVoteBtn.parentElement.parentElement.parentElement.getAttribute('data-post-index');
    console.log(postIndex);
    if (thisVoteBtn.classList.contains('js_upvote_btn')){
        // Update Counter
        posts[postIndex].upvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].upvotesNum;

        thisVoteBtnCount.style.color = 'white';
        thisVoteBtnImg.src = 'img/system/heart-voted.svg';
    } else{
        // Update Counter
        posts[postIndex].downvotesNum++;
        thisVoteBtnCount.innerText = posts[postIndex].downvotesNum;

        thisVoteBtnCount.style.color = 'white';
        thisVoteBtnImg.src = 'img/system/heart-crack-voted.svg';
    }
}
function removeVoteBtnUI(voteBtn){
    const voteBtnImg =  voteBtn.querySelector('.js_post__action_btn_icon');
    const voteBtnCount =  voteBtn.querySelector('.js_post__votes_count');
    const postIndex = voteBtn.parentElement.parentElement.parentElement.getAttribute('data-post-index');
    if (voteBtn.classList.contains('js_upvote_btn')){
        // Update Counter
        posts[postIndex].upvotesNum--;
        voteBtnCount.innerText = posts[postIndex].upvotesNum;

        voteBtnCount.style.color = 'black';
        voteBtnImg.src = 'img/system/heart.svg';
    } else{
        // Update Counter
        posts[postIndex].downvotesNum--;
        voteBtnCount.innerText = posts[postIndex].downvotesNum;

        voteBtnCount.style.color = 'black';
        voteBtnImg.src = 'img/system/heart-crack.svg';
    }
}