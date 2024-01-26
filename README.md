# csci-3308-summer22-003

Project Members: Catherine Xie, Chris Rooney, Ethan Kellerhals, Zach Griffith


Color coded is an application designed to provide the user with color codes to implant into their own projects. The user does not need to sign in to use the service, but has the option to create an account in order to save previous colors. The user is first greeted by the home page where they will be met with a large RGB spectrum that spans across the width of the page. This spectrum has a slider range attached to it, giving the user the ability to change the brightness of all the colors simultaneously. Once the user has chosen a color, a modal appears presenting the user with the hex code, a sample of the color, and a view of their history of saved colors, provided they are logged in. If they are not logged in, no colors are saved. There is also an about page that can be reached by the navbar. It gives the user our names and links to our github, instagram, etc. It was originally intended to have the functionality to suggest colors, but due to lack of time, we didn’t get that far though the core functionality is solid.

To run the website, you have to clone the repo and run docker-compose up. It uses port 8000, so localhost:8000 in your web browser. 