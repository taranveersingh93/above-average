# Above Average

## [Explore the App here](https://taranveer-above-average.vercel.app/)

### Preview of App:
![above-average-ipad-gif](https://user-images.githubusercontent.com/122247155/258600085-ceba6d3f-75ab-4c5e-96d9-a40a7278b882.gif)<br>
![above-average-gif](https://user-images.githubusercontent.com/122247155/258600054-7a285880-a061-4534-8f64-3a61ceabc804.gif)

## Installation Instructions
In order to clone this application:
- Create a directory in your local machine, go to terminal and run `git clone git@github.com:taranveersingh93/above-average.git`
- Run `cd above-average`
- Run `npm i`
- run `npm start` 

## Abstract: 
Above Average is a free to use app that pulls all the stock constituents from Nasdaq, filters out the stocks weak in absolute momentum and ranks the stocks based on relative momentum. The app also lets users search a stock by name/symbol and save the stock to a watchlist. 
The user can also click on a stock to view a chart.

### Context:
At the time of this project, I'm in Mod 3 of the Turing Frontend Development Program. A total of 20 hours were spent on this project.

### Technical note: 
The app was initially storing an api key on the frontend as an environment variable but this api key was visible in the network requests. To protect that api key, I coded/deployed this 
[proxy api server](https://github.com/taranveersingh93/above-average-api).
This proxy server has the api key as an environment variable and exposes the required endpoints to frontend. The frontend makes fetch requests to these endpoints and then the proxy api server in turn calls the actual api service for the data.

## Contributors
<table>
     <tr>
        <td> Taranveer Singh <a href="https://github.com/taranveersingh93">Github</td>
    </tr>
    <tr>
        <td><img src="https://avatars.githubusercontent.com/u/122247155?v=4" alt="Taranveer GH img"
    width="150" height="auto" /></td>
    </tr>
</table>

### Learning Goals:
- Utilize React concepts
- Implement Cypress E2E Testing
- Implement React Router
- Make network requests to retrieve data from the server.
- Maintain proper git workflow and practices.
- Screen responsiveness


### Tech Stack
- JavaScript, CSS/HTML, Cypress, Webpack, React, React Router, FETCH API's

#### Dependencies
npm i
