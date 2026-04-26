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
        name: "MyNameIsNull",
        avatar: "hat-glasses.svg",
        description: "",
        joinDate: "",
    },
    {
        name: "Iron Man",
        avatar: "hat-glasses.svg",
        description: "",
        joinDate: "",
    },
    {
        name: "Nikola tesla",
        avatar: "hat-glasses.svg",
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
        postLink: "temp1-post.html",
        upvotesNum: 7,
        downvotesNum: 84,
        commentsNum: 132,
        comments: [
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
                    },
                    {
                        commenterIndex: 4,
                        content: `<img src="img/comments/temps/albert_nikola.jpg" alt="Comment Img" class="comment__img">`,
                        date: "∞ years ago",
                        upvotesNum: 311,
                        downvotesNum: 10,
                    }
                ]
            },
            {
                commenterIndex: 3,
                content: "Jarvis like this post",
                date: "10 seconds in the future",
                upvotesNum: 0,
                downvotesNum: 1,
            }
        ]
    },
    {
        title: "sit amet consectetur:",
        userIndex: 1,
        avatar: "hat-glasses.svg",
        date: "03.04.2010",
        content: `
        <div class="feed_post__image_wrapper">
          <img src="img/posts/temps/shock-shocker.gif" alt="Post BG Image" class="feed_post__image__bg">
          <img src="img/posts/temps/shock-shocker.gif" alt="Post Image" class="feed_post__image">
        </div>
        `,
        flair: "meme",
        postLink: "temp2-post.html",
        upvotesNum: 924,
        downvotesNum: 13,
        commentsNum: 84,
        comments: [
            
        ]
    }
];