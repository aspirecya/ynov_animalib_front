import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req , token }) {
            if(token) return true // If there is a token, the user is authenticated
        }
    }
})