# NYC Spatial Equity Tool

This repository is where the code for the NYC Spatial Equity Tool is maintained and documented. In collaboration with the MIT Norman B. Leventhal Center for Advanced Urbanism (LCAU) and community organization Transit Alternatives (TA), the tool is an interactive database of maps and information about inequities in New York City’s public spaces.

## Project Setup

This digital platform is made using the React framework. It was bootstrapped with create-react-app.

### File Structure
The diagram below shows a high-level view of the file structure. Not all files are shown.

```
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
 ```

* `📂components` contains the React components for the frontend.
* `📂data` contains the pre-processed data anlysis used to render visualizations. Files include `council_districts.json` and `community_bourds.json` which contain data for all metrics across all council districts and community boards. JSON files in this directory will need to be updated accordingly.
* `📂fonts` contains ttf files of fonts for the web app
* `📂img` contains media such as organization and institution logos
* `📜package.json` defines the dependencies and start scripts.


## Local Development
Go through the following steps to get started:

0. Make sure you have [Node](https://nodejs.org/en/download/) installed and that
   you can run the `npm` command in your terminal.
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
the repository using `git clone` into your local workspace.
2. Once you are in the project root directory, run `npm install` to install the
   dependencies. 
3. Run the command `npm run dev` to start the app, which is served by
   default on http://localhost:3000.


## Update Information

### Update indicator

#### Updating data
0. Update `rankings.json` accordingly
1. Recalculate the least performing issues of each council district and community board by copying the contents of `rankings.json` into `top_three.py` and running the script. 
2. Update the council_districts.json and community_boards.json files with the correct list of noteable indicators under `least_performing`

#### Updating text
0. Navigate to `issues.json`
1. If the category of an indicator is to be changed, update the `issues_data` field accordingly. Then under the `specific_issues_data` field, navigate to  the entry of the indicator to be updated and change `issue_type_ID` field accordingly.
2. If text is to be updated, navigate to the field responsible for the text (for example, `specific_issue_name` is where the name of the indicator is referenced and `specific_issue_solutions` is where the list of solutions for each indicator is referenced. Change text accordingly while formatting hyperlinks correctly. 

### Add new indicator

0. Create a new ID for the new indicator. 
1. In `issues.json`, add the new ID to the list of integers under the `all_issues_ID` field.
2. In the `issues_data` field, add the new ID to the correct category.
3. In the `specific_issues_data` field, create a new entry using the new ID and fill in the fields that other indicators have accordingly.
4. Update `rankings.json` accordingly with data that takes the new indicator into account.
5. Recalculate the least performing issues of each council district and community board by copying the contents of `rankings.json` into `top_three.py`. and running the script. 
6. Update the council_districts.json and community_boards.json files with the correct list of noteable indicators under `least_performing`.

### Update demographic data
0. Recalculate bins for demographic data
1. Navigate to `demographic_percentage.json` and update the `perc_list` field accordingly.


