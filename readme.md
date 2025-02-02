 console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });


    ##  API's ##
    ->authRouter
    -POST /signup
    -POST /signin
    -POST /logout

   -> profileRouter
    -PATCH /profle/edit
    -GET /profile/view
    -PATCH /forgotpassword

    ** Connection Request API **

    Connection Requests
    Status : ["Ignored" , "Interested" , "accepted" , "rejected"]

->Connection Router
    -POST request/send/interested/:userId
    -POST request/send/ignored/:userId

    - The above two API's can be made dynamic by just ->

    -POST request/send/:status/:userId
    here this status = ["interested" , "ignore"]


    -POST /request/review/accepted/:requestID
    -POST /request/review/rejected/:requestID


  ->userRouter
    -GET user/connections or /Matches
    -GET user/requests/
    -GET user/feed - Gets you the profiles of other users on platfrom



** Pagination **

/feed/page=1&limit=10 => first 10 users 1-10

/feed/page = 2 & limit = 10 => 11-20

/feed?page=3&limit =10 => 21-30

/.skip() & .limit()