# NYC Spatial Equity Tool

This repository is where the code for the NYC Spatial Equity Tool is maintained and documented. In collaboration with the MIT Norman B. Leventhal Center for Advanced Urbanism (LCAU) and community organization Transit Alternatives (TA), the tool is an interactive database of maps and information about inequities in New York City’s public spaces.

## Project Setup

This digital platform is made using the React framework. It was bootstrapped with create-react-app.

### File Structure
The diagram below shows a high-level view of the file structure. Not all files are shown.

📦spatial-equity
 ┣ 📂.github
 ┣ 📂.idea
 ┣ 📂build
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂data
 ┃ ┣ 📂fonts
 ┃ ┣ 📂img
 ┃ ┣ 📂texts
 ┃ ┣ 📂utils
 ┃ ┣ 📜App.css
 ┃ ┗ 📜App.js
 ┣ 📜procfile
 ┗ 📜package.json

* `📂components` contains the React components for the frontend.
* `📂data` contains the pre-processed data anlysis used to render visualizations. Files include `council_districts.json` and `community_bourds.json` which contain data for all metrics across al council districts and community boards. JSON files in this directory will need to be updated accordingly.
* `📂fonts` contains ttf files of fonts for the web app
* `📂img` contains media such as organization and institution logos
* `📜package.json` defines the dependencies and start scripts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.




