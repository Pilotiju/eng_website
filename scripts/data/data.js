const users = [
    {
        name: "Unknown John",
        avatar: "hat-glasses.svg",
        description: "",
        joinDate: "",
    },
    {
        name: "Tom Unknown",
        avatar: "hat-glasses.svg",
        description: "",
        joinDate: "",
    },
    {
        name: "Iron Man",
        avatar: "jarvis.webp",
        description: "",
        joinDate: "",
    },
    {
        name: "Nikola tesla",
        avatar: "hat-glasses.svg",
        description: "",
        joinDate: "",
    },
    {
        name: "Spider Man",
        avatar: "spiderman.jpg",
        description: "",
        joinDate: "",
    },
];

const posts = [
    {
        title: "Lorem dolor",
        userIndex: 0,
        date: "02.05.2023",
        content: `
        <p class="feed_post__text normal_fs"> 
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt quas atque natus dolorem consequatur suscipit distinctio. Repellat nostrum alias odit delectus saepe minima fuga odio temporibus facilis? Nostrum, culpa velit.
        </p>
        `,
        flair: "vent",
        upvotesNum: 7,
        downvotesNum: 84,
        commentsNum: 132,
        comments: [
            {
                commenterIndex: 2,
                content: "Yo",
                date: "now",
                upvotesNum: 0,
                downvotesNum: 13,
                comments: []
            },
            {
                commenterIndex: 0,
                content: `this post is so dog water`,
                date: "∞ years ago",
                upvotesNum: 8,
                downvotesNum: 139,
                comments: [
                    {
                        commenterIndex: 1,
                        content: "<strong>You</strong> posted this 😭😭",
                        date: "today",
                        upvotesNum: 13,
                        downvotesNum: 0,
                        comments: [
                            {
                                commenterIndex: 0,
                                content: "Nah",
                                date: "(wdym nah)",
                                upvotesNum: 0,
                                downvotesNum: 0,
                                comments: []
                            }
                        ]
                    },
                    {
                        commenterIndex: 4,
                        content: `<img src="img/comments/temps/albert_nikola.jpg" alt="Comment Img" class="comment__img">`,
                        date: "∞ years ago",
                        upvotesNum: 311,
                        downvotesNum: 10,
                        comments: []
                    }
                ]
            },
            {
                commenterIndex: 2,
                content: "Jarvis like this post",
                date: "10 seconds in the future",
                upvotesNum: 0,
                downvotesNum: 1,
                comments: []
            },
            {
                commenterIndex: 4,
                content: "Spooder time",
                date: "now",
                upvotesNum: 0,
                downvotesNum: 13,
                comments: []
            }
        ]
    },
    {
        title: "sit amet consectetur:",
        userIndex: 1,
        date: "03.04.2010",
        content: `
        <div class="feed_post__image_wrapper">
          <img src="img/posts/temps/shock-shocker.gif" alt="Post BG Image" class="feed_post__image__bg">
          <img src="img/posts/temps/shock-shocker.gif" alt="Post Image" class="feed_post__image">
        </div>
        `,
        flair: "meme",
        upvotesNum: 924,
        downvotesNum: 13,
        commentsNum: 84,
        comments: [
            {
                commenterIndex: 2,
                content: "Yo",
                date: "now",
                upvotesNum: 0,
                downvotesNum: 13,
                comments: []
            }
        ]
    },
    {
        title: "Yo",
        userIndex: 4,
        date: "03.04.2010",
        content: `
        <div class="feed_post__image_wrapper">
          <img src="img/posts/temps/spiderman.webp" alt="Post BG Image" class="feed_post__image__bg">
          <img src="img/posts/temps/spiderman.webp" alt="Post Image" class="feed_post__image">
        </div>
        `,
        flair: "meme",
        upvotesNum: 91236,
        downvotesNum: 4,
        commentsNum: 1,
        comments: [
            
        ]
    }
];

// localStorage.clear();
let upvotedPosts = [];
if (JSON.parse(localStorage.getItem('upvotedPosts'))){
    upvotedPosts = JSON.parse(localStorage.getItem('upvotedPosts'));
}
let downvotedPosts = [];
if (JSON.parse(localStorage.getItem('downvotedPosts'))){
    downvotedPosts = JSON.parse(localStorage.getItem('downvotedPosts'));
}

let upvotedComments = [];
for (let i = 0; i < posts.length; i++){
    upvotedComments.push([]);
}
if (JSON.parse(localStorage.getItem('upvotedComments'))){
    upvotedComments = JSON.parse(localStorage.getItem('upvotedComments'));
}
let downvotedComments = [];
for (let i = 0; i < posts.length; i++){
    downvotedComments.push([]);
}
if (JSON.parse(localStorage.getItem('downvotedComments'))){
    downvotedComments = JSON.parse(localStorage.getItem('downvotedComments'));
}