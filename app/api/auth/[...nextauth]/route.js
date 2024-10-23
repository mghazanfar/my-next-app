// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = users.find(
                    (u) => u.username === credentials.username && u.password === credentials.password
                );

                if (user) {
                    return { id: user.id, username: user.username };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/', // Redirect to the main page for sign in
    },
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
