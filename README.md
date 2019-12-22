# social-network
The goal of this test was to create a Web app for examining a Social Network. Web app provides functionality to choose a person within the group stored in the dataset provided and display the following information about this person:

* Direct friends: those people who are directly connected to the chosen user;<br>
* Friends of friends: those who are two steps away from the chosen user but not directly connected to the chosen user;<br>
* Suggested friends: people in the group who know 2 or more direct friends of the chosen user but are not directly connected to the chosen user;

*There were some inconsistencies in given dataset (user with id 18 has only one friend (id 17) but two other user has this user as friend (id 17 and 20)) so some results may not come out as expected.
___
## Prerequisites
Live server is required to run this project.
___
## Installing
Just clone repository and run it with live server.
___
## Folder sturcture
<pre><font color="#3465A4"><b>.</b></font>
├── <font color="#3465A4"><b>assets</b></font>
│   ├── data.json // Provided dataset
│   └── <font color="#3465A4"><b>style</b></font>
│       └── style.css
├── index.html
├── <font color="#75507B"><b>preview.gif</b></font>
├── README.md
└── <font color="#3465A4"><b>src</b></font>
    ├── <font color="#3465A4"><b>components</b></font>
    │   └── user.js
    ├── index.js
    ├── <font color="#3465A4"><b>layout</b></font>
    │   ├── content.js
    │   ├── footer.js
    │   └── header.js
    └── <font color="#3465A4"><b>utilities</b></font>
        ├── services.js // function for retrieving all users 
        └── utilities.js // functions for retrieving direct friends, friends of friends and suggested friends.
</pre>
___
## Preview 
![](preview.gif)
___
## Known Issues 
App will crash during resizing of window (Lines drawn from chosen user to friends won't redraw but users will change their position).
___
