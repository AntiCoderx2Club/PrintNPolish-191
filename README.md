# PrintNPolish-191
https://xd.adobe.com/view/bf39d4ea-35a7-472f-a6e6-fb0c351da254-ea6a/?fullscreen&amp;hints=off


## UPDATE: 11/9/21
_After hours of trial and error, most of the code is working (woohoo). Here is what still needs to be done:_
    
- Routing login/register stuff to /users directory. (I.E. Homepage Navbar would have most the items the same, but instead of /login and /register it needs to be /users/login and /users/register for EVERY page.
- Routing the POST to the /users directory. Once that is done, I literally believe it will successfully be able to write to MongoDB and we’ll be DONE (at least for this sprint).

---    
> P.S-Also this is based on Sprint007-node instead of Sprint008, so for any changes made to the website like adding the services stuff will need to be re-implemented (my bad lol) For further explanations, I will try to make a video and post it to our Google Drive

##Update 11/15/21 Current Issues:
    -The app.use(expressLayouts) is currently commented out of the code, this needs to be working to have the register page show with all the bootstrap elements
    -Register page is updated with hashing and password confirm, HOWEVER gives error when attempting to write to DB.
    -Error seen: "Error: No default engine was specified and no extension was provided."
        -Must be related to Routes/Views folder needing to be modified due to new bootstrap implementation
