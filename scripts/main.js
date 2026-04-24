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

let preventPost = 0;

// =====================================================
function renderPosts(){
    let postsHTML = '';
    for (let i = 0; i < posts.length; i++){
        const postObject = posts[i];
        const {title, author, date, content, flair, upvotesNum, downvotesNum, commentsNum, postLink, avatar} = postObject;
        const postIndex = i;
        const html = /*html*/`
            <div data-href="${postLink}" data-post-index="${postIndex}" class="feed_post js_feed_post">
              <div class="post__meta post__item">
                <div class="post__user_wrapper">
                  <img src="img/avatars/${avatar}" alt="Avatar" class="post__avatar">
                  <div class="post_username">${author}</div>
                </div>
                <div class="whitespace"></div>
                <div class="post__date">${date}</div>
              </div>

            <div class="post__content post__item">
              <h1 class="feed_post__heading">
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
                <button class="post__comments post__actions_btn js_post__actions_btn post__actions_other_btn">
                  <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/comments.svg" alt="Comments">
                  <span class="js_comments_count post__comments_count">${commentsNum}</span>
                </button>
                <div class="whitespace"></div>
                <button class="js_share_btn post__share_btn post__actions_btn js_post__actions_btn post__actions_other_btn">
                    <div class="post__share_text">Share</div>
                    <img class="js_post__action_btn_icon post__action_btn_icon" src="img/system/share.svg" alt="Share">
                </button>
            </div>
            </div>
        `;
        postsHTML += html;
    }

    document.querySelector('.post_feed').innerHTML = postsHTML;
}
// =====================================================

renderPosts();

const postsEl = document.querySelectorAll('.js_feed_post');
postsEl.forEach(initFuncs.initPost);
const postActions = document.querySelectorAll('.js_post__actions_btn');
postActions.forEach(initFuncs.initPostActions);
const shareBtn = document.querySelectorAll('.js_share_btn');
shareBtn.forEach(initFuncs.initShareBtn);
const upvoteBtns = document.querySelectorAll('.js_upvote_btn');
upvoteBtns.forEach(initFuncs.initUpvoteBtn);
const downvoteBtns = document.querySelectorAll('.js_downvote_btn');
downvoteBtns.forEach(initFuncs.initDownvoteBtn);

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