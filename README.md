<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/chaofan-w/gameHub">
    <img src="./frontend/src/assets/img/gamehub_logo.png" alt="Logo" width="150" height="30">
  </a>

  <h3 align="center">  
  a comprehensive and user-friendly gaming information platform.
  </h3>

  <p align="center">
    <br />
    <a href="https://github.com/chaofan-w/gameHub/blob/master/frontend/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://my-game-hub.netlify.app/" style="font-weight:800">View Demo Site</a>
    ·
    <a href="https://github.com/chaofan-w/gameHub/issues">Report Bug</a>
    ·
    <a href="https://github.com/chaofan-w/gameHub/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#data-structure">Data Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://my-game-hub.netlify.app/)

"My Game Hub" is a gaming platform built with Node.js, Express.js, MongoDB, and Redux on the backend, and React with Bootstrap on the frontend. It features user registration, game search with instant suggestions, genre filters, and a user library.

### Built With

- [![JavaScript][javascript.js]][javascript-url]
- [![MongoDB][mongodb.js]][mongodb-url]
- [![ExpressJS][express.js]][express-url]
- [![React][react.js]][react-url]
- [![NodeJS][node.js]][node-url]
- [![Redux][redux.js]][redux-url]
- [![Bootstrap][bootstrap.js]][bootstrap-url]
- [![SASS][SASS]][SASS-url]
- [![JsonWebToken][jsonwebtoken]][jsonwebtoken-url]
- [![aws][aws]][aws-url]
- [![netlify][netlify.js]][netlify-url]
- [![heroku][heroku.js]][heroku-url]

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<h2 style="font-weight:700">Key Tools and Technologies Used:</h2>

<h2>Backend:</h2>

<h4>- Node.js and Express.js: The server-side of the website is powered by Node.js with Express.js, a fast, unopinionated, and minimalist web framework for Node.js.</h4>

<h4>- Authentication: User authentication is handled using JSON Web Tokens (JWT), a compact, URL-safe means of representing claims to be transferred between two parties.</h4>

<h4>- Database: MongoDB is used as the database system, with Mongoose for object modeling, providing a straightforward, schema-based solution to model application data.</h4>

<h4>- APIs: The game data is sourced from the RAWG API, one of the largest video game databases and game discovery services.</h4>

<h4>- State Management: Redux is used for managing the application state, providing a predictable state container for JavaScript apps.</h4>

<h2>Frontend:</h2>

<h4>- React: The user interface is built using React, a JavaScript library for building user interfaces, particularly single-page applications.</h4>

<h4>- Bootstrap and SASS: The website's responsive design and customized styles are achieved using Bootstrap, a popular CSS framework, and SASS, a preprocessor scripting language that is interpreted or compiled into CSS.</h4>

<h2>Key Features:</h2>
<h4>- Dark and Light Mode: The site features both dark and light modes for enhanced user experience.</h4>

<h4>- User Registration and Login: Users can register and log in to the website, with passwords hashed using bcrypt for security.</h4>

<h4>- Keyword Search and Instant Suggestions: Users can search for games using keywords, with instant suggestions provided for a seamless search experience.</h4>

<h4>- Genre Filter: Users can filter games by genre, allowing them to find games that match their preferences.</h4>

<h4>- User Library: Users can create their own library for quick viewing of their favorite games.</h4>

<h4>- Game Ordering and Activation: Users can order and activate games, and deactivate them if they no longer play.</h4>

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

### Data Structure

- customers on MongoDB

```sh
{
    "status": 200,
    "data": {
        "_id": "64be9b736584a6f65c915ecb",
        "firstName": "Guest",
        "lastName": "Guest",
        "username": "guest",
        "email": "guest@email.com",
        "createdDate": "2023-07-24T14:49:38.626Z",
        "gameLibrary": [
            {
                "id": 58175,
                "name": "God of War (2018)",

            },
            {
                "id": 22511,
                "name": "The Legend of Zelda: Breath of the Wild",

            },
        ],
        "openRentals": [
            {
                "id": 58175,
                "name": "God of War (2018)",
                "background_image": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
                "rentalStartDate": "2023-07-24T14:49:38.622Z",
                "_id": "64be9d2f6584a6f65c915f28",
                "rentalEndDate": "2023-07-26T14:49:38.622Z"
            },
            {
                "id": 22511,
                "name": "The Legend of Zelda: Breath of the Wild",
                "background_image": "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
                "rentalStartDate": "2023-07-24T14:49:38.622Z",
                "_id": "64be9d2f6584a6f65c915f29",
                "rentalEndDate": "2023-07-26T14:49:38.622Z"
            },

        ],
        "closedRentals": [
            {
                "id": 39,
                "name": "Prey",
                "background_image": "https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f2.jpg",
                "rentalRecords": [
                    {
                        "rentalStartDate": "2023-07-24T14:49:38.622Z",
                        "rentalEndDate": "2023-07-24T15:52:30.285Z",
                        "_id": "64be9e3e6584a6f65c915f8c"
                    }
                ],
                "_id": "64be9e2d6584a6f65c915f75"
            },
        ]
    },
```

- games, request from RAWG API

```sh
 {
            "id": 3498,
            "name": "Grand Theft Auto V",
            "released": "2013-09-17T00:00:00.000Z",
            "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            "rating": 4.47,
            "ratings_count": 6417,
            "platforms": [
                "PlayStation 5",
                "Xbox Series S/X",
                "PlayStation 4",
                "PC",
                "PlayStation 3",
                "Xbox 360",
                "Xbox One"
            ],
            "genres": [
                "5",
                "59"
            ]
        }
```

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
  or
- yarn

  ```sh
  npm install yarn@latest -g

  ```

### Installation

To install this application, please follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/chaofan-w/gameHub.git
   ```
2. Install packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. Create a .env file in the root directory of the project and add the required environment variables. These should include your MongoDB connection string and any other secret keys that your app uses.
   ```sh
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Chaofan Wu
</br> ![gmail-shield] chaofan.w@gmail.com
</br> [![linkedin-shield]][linkedin-url]
</br> My Portfolio Site: www.chaofanwu.com

Project Link: [https://github.com/chaofan-w/gameHub](https://github.com/chaofan-w/gameHub)

liveDemo Link: https://my-game-hub.netlify.app/

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/chaofanwu/
[product-screenshot]: ./frontend/src/assets/img/gameHub.png
[mongodb.js]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[heroku.js]: https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white
[heroku-url]: https://www.heroku.com/
[netlify.js]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[netlify-url]: https://www.netlify.com/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.dev/en/
[javascript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: https://www.javascript.com/
[materialui.js]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[materialui-url]: https://mui.com/
[gmail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-address]: chaofan.w@gmail.com
[bootstrap.js]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com/
[jsonwebtoken]: https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[jsonwebtoken-url]: https://github.com/auth0/node-jsonwebtoken#readme
[aws]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[aws-url]: https://aws.amazon.com/console/
[SASS]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[SASS-url]: https://sass-lang.com/
