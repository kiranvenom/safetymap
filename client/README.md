## Safety Map Application FrontEndUser

This project implements the frontend for the User Registration and Safety Information System using React JS

## Features

### User Registration

-   Users can create accounts with required information.
-   User authentication is implemented to ensure secure access.

### Marking Locations

-   Users can mark locations with safety concerns.
-   Form fields include:
    -   Fetch Current location with a specified radius.
    -   Safety concern dropdown with various options.
    -   Safety zone radio buttons for different safety levels.
    -   Comments textarea for additional information.

### View Safety Information

-   Users can view safety information for areas by selecting their locality or searching for a specific location.

### Display Safety Zones on Map

-   Safety zones are displayed on the map with different colors corresponding to safety levels:
    -   Very Safe (Blue Color)
    -   Safe (Green)
    -   Moderate Caution (Yellow)
    -   Unsafe (Orange)
    -   Dangerous (Red)

### Dropdown Options

-   Safety concern dropdown options include:
    -   Theft
    -   Physical attacks or threats of violence
    -   Harassment through verbal, non-verbal, or physical actions
    -   Poor Lighting
    -   Lack of Security Presence
    -   Deserted Area
    -   Other (Users can provide their experience in a few words)

### Tooltip for Comments

-   Comments are displayed in a tooltip format when users hover over a marked location on the map.

## Setup Instructions

1. Clone the repository:

2. Navigate to the client directory:

3. Open the `main.jsx` file in your web browser or deploy the contents of the `client` directory to a web server.

4. Visit the deployed website in your browser to access the application.

## Technologies Used

-   React JS
-   MapBox ( Map API )
-   React-icons
