# Splash Course

by Diego Yanez-Laguna

[Check it out](https://splash-course.vercel.app/)

<kbd>![ss-landing](https://github.com/user-attachments/assets/082e081a-c557-4b0e-9950-19ffc22d8d06)</kbd>
[Check it out](https://splash-course.vercel.app/)
<br></br>

## OVERVIEW
Splash Course is a prototype EdTech site for watching, creating, and commenting on educational videos.
I decided to make it ocean themed to give it some design direction.

<em>*Some Elements that were not part of the main functionalities were added for fleshing out the visual design</em>

### Layout
I decided to have three main pages:
- Landing Page (input a username)
- List Page (lists all videos)
- Watch Page (video playback + comment section)

Also, there is a navbar on all pages, except for the landing page, and contains the folllowing:
- Logo Button => goes back to Landing Page
- Search Bar => just a dummy, you can type stuff, but won't actually search
- Create Video Button => opens Create Video Popup
- Profile Button => just for visuals, doesn't work

I thought that this would be a simple flow for the users to follow and having few pages keeps the navbar pretty simple and doesn't require any distracting side menus. 

### Landing Page
A really simple page to introduce users to the ocean theme and prompting them to choose a username before entering the site. This username is passed in as a prop to other pages so that it can be displayed on things like comments they make.

### List Page
Each listed-video has:
- thumbnail (which is just gray in the app for now)
- title
- author name
- description

I made each component pretty big so you can see the thumbnails in detail and have enough space for longer video descriptions. I thought this would be useful if your search returns videos with similar titles, so you can still get more info to decide which one to watch. I also thought about adding more metadata about the videos, but thought it might get too congested.
<br></br>
There is a tab for all videos and one for user-uploaded videos. Originally i thought the user videos were a list of videos they "favorited" or something like that so i kept it on the list page, but I think it could have also been a separate "channel" page if the user is uploading videos they created. New videos that are uploaded will appear in this tab.
<br></br>
Clicking on any listed-video (thumnail or text) will send you to the watch page for that video

### Watch Page
I split this into two halves: Video Playback and Comment Section. I didn't want the whole comment section to be buried under the video, because users might miss it. Both halves are independently scrollable so that scrolling on the comment section won't make the video go out of view (but you can still scroll on the video side in the case of a long video description). The video comes from a VideoPlayer component where I made all the custom playback controls.
<br></br>
However, I made sure that on narrower screens the two halves switch to stacking on top of each other so the video doesnt get too narrow.
<br></br>
The comment section is pretty simple, featuring a column of Comment components and at the bottom a text box for writing new ones. I also added "like" buttons that you can toggle. The Comment component just consists of username, comment text, and a boolean for liked state.

### Create Video Popup
This is a pretty simple component that contains a form for inputting video data and submitting it. The submit button text changes from "Submit" to "Submitting" while the API processes the POST request. Once processed the popup closes automatically.

### API
I have two files (videos.js and comments.js) which contain both GET and POST functions for comments and videos.
<br></br>


## INSTRUCTIONS
I hosted this on Vercel, so you should be able to visit this link:
- [https://splash-course.vercel.app/](https://splash-course.vercel.app/)
<br></br>


## SCREENSHOTS
### Landing Page
Users have to input a username for when they make commments
<kbd>![ss-landing](https://github.com/user-attachments/assets/082e081a-c557-4b0e-9950-19ffc22d8d06)</kbd>
<br></br>


### Video List Page
Lists all videos, with another tab for user uploaded videos
<kbd>![ss-list](https://github.com/user-attachments/assets/18e2f6eb-1da7-463a-b007-d605635f1633)</kbd>
<br></br>


### Watch Video Page
Contains video player with custom playback controls and a comment section where users can write new comments
<kbd>![ss-watch](https://github.com/user-attachments/assets/836a388a-bf3b-4678-89b0-c22db65c5fb4)</kbd>
<br></br>


### Create Video
A popup where you can add info for a new video, which gets added to the User Videos tab in the Video List Page
- Note: If you are already on the user videos tab, you have to press it again to refresh the list after adding a new video
<kbd>![ss-create](https://github.com/user-attachments/assets/9a191fbb-6cca-4e00-a6d5-8787af718ac5)</kbd>
<br></br>



## Final Notes
- Still some loose ends that I could keep working on, but I think the main functionalities are already pretty fleshed out in this version
