#Stack: React.Js , Javascript, HTML ,CSS Material UI has been used for styling

The web page fetches a list from the given API and displays it in the grid structure, namely mission name, flight number, launch year, launch time, rockcet name and details and links to youtube video and wikipedia page.

THere are options to filter the list by successful launch, successful land and search by year of launch and a button to reset all the filters.

The successful land feature always cover all the successful launches and therefore "on selecting successful land filter, successful launch is reset", the search by launch year filters the current list by the year of launch and displays it. To use the search by launch year filter, first reset button is to be clicked to reset the current list to original list.

Two values in form of string are stored in local storage which tells if launch/land filter and search by launch year filters are used and on the basis of that the previous state is retrieved via corresponding API calls and filtering.
