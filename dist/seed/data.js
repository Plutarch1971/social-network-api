const users = [
    {
        username: "techie_sarah",
        email: "sarah@tech.com",
        thoughts: [],
        friends: []
    },
    {
        username: "dev_john",
        email: "john@dev.com",
        thoughts: [],
        friends: []
    },
    {
        username: "coder_amy",
        email: "amy@code.com",
        thoughts: [],
        friends: []
    }
];
const thoughts = [
    {
        thoughtText: "Learning MongoDB is actually pretty fun!",
        username: "techie_sarah",
        reactions: []
    },
    {
        thoughtText: "TypeScript makes everything better!",
        username: "dev_john",
        reactions: []
    },
    {
        thoughtText: "Just deployed my first NoSQL database!",
        username: "coder_amy",
        reactions: []
    }
];
const reactions = [
    {
        reactionBody: "Totally agree!",
        username: "dev_john"
    },
    {
        reactionBody: "Great insight!",
        username: "coder_amy"
    },
    {
        reactionBody: "Thanks for sharing!",
        username: "techie_sarah"
    }
];
export { users, thoughts, reactions };
