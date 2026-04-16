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
    }
};

const posts = document.querySelectorAll('.js_post');
posts.forEach(initFuncs.initPost);
const postActions = document.querySelectorAll('.js_post__actions_btn');
postActions.forEach(initFuncs.initPostActions);
/*const shareBtn = document.querySelectorAll('.js_share_btn');*/
shareBtn.forEach(initFuncs.initShareBtn);

let preventPost = 0;

function openPost(){
    if (preventPost === 0){
        const postLink = this.getAttribute('data-href');
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